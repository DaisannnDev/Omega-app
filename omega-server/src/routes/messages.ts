import { Router } from 'express'
import mongoose from 'mongoose'

import { Message } from '../models/Message.js'
import type { ChatMessageDTO, MessageDoc } from '../utils/types.js'

const router = Router()

const toMessageDoc = (doc: unknown): MessageDoc => {
  const message = doc as {
    _id: mongoose.Types.ObjectId
    user: string
    text: string
    roomId: string
    createdAt: Date
  }

  return {
    _id: message._id.toString(),
    user: message.user,
    text: message.text,
    roomId: message.roomId,
    createdAt: message.createdAt,
  }
}

router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params
  const { limit = '50', before } = req.query

  if (!roomId) {
    return res.status(400).json({ error: 'roomId is required' })
  }

  const limitNumber = Math.min(Number(limit) || 50, 100)
  const filters: Record<string, unknown> = { roomId }

  if (before) {
    const beforeDate = new Date(String(before))
    if (Number.isNaN(beforeDate.getTime())) {
      return res.status(400).json({ error: 'Invalid "before" timestamp' })
    }
    filters.createdAt = { $lt: beforeDate }
  }

  try {
    const docs = await Message.find(filters)
      .sort({ createdAt: -1 })
      .limit(limitNumber)
      .lean()
      .exec()

    const messages = docs.map((doc) => toMessageDoc(doc)).reverse()
    return res.json(messages)
  } catch (error) {
    console.error('[routes/messages] fetch error', error)
    return res.status(500).json({ error: 'Failed to load messages' })
  }
})

router.post('/', async (req, res) => {
  const { user, text, roomId } = req.body as ChatMessageDTO

  if (!user || !text || !roomId) {
    return res.status(400).json({ error: 'user, text and roomId are required' })
  }

  try {
    const created = await Message.create({ user, text, roomId })
    const message = toMessageDoc(created.toObject())
    return res.status(201).json(message)
  } catch (error) {
    console.error('[routes/messages] create error', error)
    return res.status(500).json({ error: 'Failed to save message' })
  }
})

export default router
