import cors from 'cors'
import express from 'express'
import http from 'node:http'
import { Server } from 'socket.io'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { PORT } from './config/env.js'
import { connectMongo } from './db/mongo.js'
import messagesRouter from './routes/messages.js'
import { registerChatHandlers } from './sockets/chat.js'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './utils/types.js'

export const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: false,
  })
)
app.use(express.json())

app.use('/api/messages', messagesRouter)

const httpServer = http.createServer(app)

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    cors: {
      origin: 'http://localhost:5173',
      credentials: false,
    },
  }
)

registerChatHandlers(io)

export { httpServer }

export const start = async (): Promise<void> => {
  await connectMongo()
  if (httpServer.listening) {
    return
  }

  await new Promise<void>((resolve) => {
    httpServer.listen(PORT, () => {
      console.log(`[server] listening on http://localhost:${PORT}`)
      resolve()
    })
  })
}

const isDirectRun = (() => {
  const currentFile = fileURLToPath(import.meta.url)
  const entryFile = process.argv[1] ? path.resolve(process.argv[1]) : ''
  return currentFile === entryFile
})()

if (isDirectRun) {
  start().catch((error) => {
    console.error('[server] failed to start', error)
    process.exit(1)
  })
}
