import mongoose from 'mongoose'

import type { MessageDocLean } from '../utils/types.js'

const { Schema, model, models } = mongoose

const messageSchema = new Schema<MessageDocLean>(
  {
    user: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    roomId: { type: String, required: true, index: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
)

messageSchema.index({ roomId: 1, createdAt: 1 })

export const Message = models.Message ?? model<MessageDocLean>('Message', messageSchema)
