import type { Server, Socket } from 'socket.io'
import mongoose from 'mongoose'

import { Message } from '../models/Message.js'
import type {
  ChatMessageDTO,
  ClientToServerEvents,
  HydratePayload,
  MessageDoc,
  RoomUserPayload,
  ServerToClientEvents,
} from '../utils/types.js'

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

const handleJoinRoom = (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  payload: RoomUserPayload
) => {
  const { roomId, user } = payload
  if (!roomId || !user) {
    socket.emit('system', { type: 'error', message: 'roomId and user are required to join.' })
    return
  }

  socket.join(roomId)
  console.log(`[socket] ${socket.id} joined ${roomId}`)
  io.to(roomId).emit('system', {
    type: 'info',
    message: `${user} joined room ${roomId}`,
  })
}

const handleLeaveRoom = (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  payload: RoomUserPayload
) => {
  const { roomId, user } = payload
  if (!roomId) {
    socket.emit('system', { type: 'error', message: 'roomId is required to leave.' })
    return
  }

  socket.leave(roomId)
  console.log(`[socket] ${socket.id} left ${roomId}`)
  if (user) {
    io.to(roomId).emit('system', {
      type: 'info',
      message: `${user} left room ${roomId}`,
    })
  }
}

const handleSendMessage = async (
  io: Server<ClientToServerEvents, ServerToClientEvents>,
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  payload: ChatMessageDTO
) => {
  const { roomId, user, text } = payload
  if (!roomId || !user || !text) {
    socket.emit('system', {
      type: 'error',
      message: 'roomId, user, and text are required',
    })
    return
  }

  try {
    const doc = await Message.create({ roomId, user, text })
    const message = toMessageDoc(doc.toObject())
    io.to(roomId).emit('new_message', message)
  } catch (error) {
    console.error('[socket] send_message failed', error)
    socket.emit('system', {
      type: 'error',
      message: 'Failed to send message',
    })
  }
}

const handleHydrate = async (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  payload: HydratePayload
) => {
  const { roomId, limit = 50 } = payload
  if (!roomId) {
    socket.emit('system', { type: 'error', message: 'roomId is required to hydrate.' })
    return
  }

  const safeLimit = Math.min(Math.max(limit, 1), 100)

  try {
    const docs = await Message.find({ roomId })
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .lean()
      .exec()

    const messages = docs.map((doc) => toMessageDoc(doc)).reverse()
    socket.emit('init_messages', messages)
  } catch (error) {
    console.error('[socket] hydrate failed', error)
    socket.emit('system', { type: 'error', message: 'Failed to load history' })
  }
}

export const registerChatHandlers = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on('connection', (socket) => {
    console.log(`[socket] connected ${socket.id}`)

    socket.on('join_room', (payload) => handleJoinRoom(io, socket, payload))
    socket.on('leave_room', (payload) => handleLeaveRoom(io, socket, payload))
    socket.on('send_message', (payload) => void handleSendMessage(io, socket, payload))
    socket.on('hydrate', (payload) => void handleHydrate(socket, payload))

    socket.on('disconnect', (reason) => {
      console.log(`[socket] disconnected ${socket.id} (${reason})`)
    })
  })
}
