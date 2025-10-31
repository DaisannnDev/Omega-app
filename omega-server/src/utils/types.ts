export interface ChatMessageDTO {
  roomId: string
  user: string
  text: string
}

export interface HydratePayload {
  roomId: string
  limit?: number
}

export interface RoomUserPayload {
  roomId: string
  user: string
}

export interface MessageDocLean {
  user: string
  text: string
  roomId: string
  createdAt: Date
}

export interface MessageDoc extends MessageDocLean {
  _id: string
}

export interface SystemMessage {
  type: 'info' | 'error'
  message: string
}

export interface ServerToClientEvents {
  new_message: (message: MessageDoc) => void
  init_messages: (messages: MessageDoc[]) => void
  system: (payload: SystemMessage) => void
}

export interface ClientToServerEvents {
  join_room: (payload: RoomUserPayload) => void
  leave_room: (payload: RoomUserPayload) => void
  send_message: (payload: ChatMessageDTO) => void
  hydrate: (payload: HydratePayload) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  user?: string
}
