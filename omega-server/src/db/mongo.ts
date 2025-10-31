import mongoose from 'mongoose'

import { MONGO_URI } from '../config/env.js'

export const connectMongo = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return mongoose
  }

  try {
    const conn = await mongoose.connect(MONGO_URI)
    const { host, name } = conn.connection
    console.log(`[mongo] connected to ${host}/${name}`)
    return conn
  } catch (error) {
    console.error('[mongo] connection error', error)
    throw error
  }
}
