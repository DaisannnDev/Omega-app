import assert from 'node:assert'
import process from 'node:process'

import { io as createClient, Socket } from 'socket.io-client'

import { PORT } from '../config/env.js'
import { start, httpServer } from '../server.js'
import type { MessageDoc } from '../utils/types.js'

const waitForSocketEvent = <T>(
  socket: Socket,
  event: string,
  timeoutMs = 5000
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout waiting for socket event "${event}"`))
    }, timeoutMs)

    socket.once(event, (payload: T) => {
      clearTimeout(timer)
      resolve(payload)
    })
  })

const run = async () => {
  const wasListening = httpServer.listening
  if (!wasListening) {
    await start()
  }

  const baseUrl = `http://localhost:${PORT}`
  console.log(`[test] server ready at ${baseUrl}`)

  const client = createClient(baseUrl, {
    transports: ['websocket'],
    timeout: 5000,
  })

  await new Promise<void>((resolve, reject) => {
    client.once('connect', () => resolve())
    client.once('connect_error', (error) => reject(error))
  })

  console.log('[test] socket connected')

  const roomId = `test-room-${Date.now()}`
  const uniqueUser = `tester-${process.pid}`
  const uniqueText = `integration-${Date.now()}`

  client.emit('join_room', { roomId, user: uniqueUser })
  client.emit('hydrate', { roomId, limit: 20 })

  // Fire-and-forget hydration result (ensures handler works without awaiting)
  waitForSocketEvent<MessageDoc[]>(client, 'init_messages', 5000)
    .then((messages) => {
      console.log(`[test] hydrate returned ${messages.length} messages`)
    })
    .catch((error) => {
      console.warn('[test] hydrate failed', error.message)
    })

  const newMessagePromise = waitForSocketEvent<MessageDoc>(client, 'new_message', 5000)

  client.emit('send_message', { roomId, user: uniqueUser, text: uniqueText })

  const received = await newMessagePromise
  console.log('[test] received new_message', received)

  assert.strictEqual(received.roomId, roomId, 'RoomId mismatch in new_message')
  assert.strictEqual(received.text, uniqueText, 'Text mismatch in new_message')

  const response = await fetch(`${baseUrl}/api/messages/${roomId}`)
  assert.ok(response.ok, `Expected 2xx from REST endpoint, got ${response.status}`)
  const restMessages = (await response.json()) as MessageDoc[]

  const exists = restMessages.some((message) => message.text === uniqueText)
  assert.ok(exists, 'Message not present in REST response')
  console.log('[test] REST verification passed')

  client.close()

  if (!wasListening) {
    await new Promise<void>((resolve, reject) => {
      httpServer.close((error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
    console.log('[test] server closed')
  }
}

run()
  .then(() => {
    console.log('[test] SUCCESS')
    process.exit(0)
  })
  .catch((error) => {
    console.error('[test] FAILURE', error)
    process.exit(1)
  })
