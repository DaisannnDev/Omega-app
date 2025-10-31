# Omega Server

Omega เป็น backend สำหรับระบบแชตแบบเรียลไทม์ คล้าย Discord ใช้ Express + Socket.IO + MongoDB (ผ่าน Mongoose) และเขียนด้วย TypeScript

## เริ่มต้นใช้งาน

```bash
cd omega-server
npm install
cp .env.example .env    # หรือสร้างไฟล์ .env ตามตัวอย่างด้านล่าง
npm run dev
```

เซิร์ฟเวอร์จะเริ่มที่ `http://localhost:4000` (หรือพอร์ตที่กำหนดไว้ใน `.env`)

## สคริปต์ที่มี

- `npm run dev` – รันเซิร์ฟเวอร์ด้วย `ts-node`
- `npm run build` – คอมไพล์ TypeScript ไปยังโฟลเดอร์ `dist`
- `npm run start` – รันโค้ดที่คอมไพล์แล้ว (`dist/server.js`)
- `npm run test:socket` – อินทิเกรชันทดสอบ Socket.IO

## ตัวอย่างไฟล์ `.env`

```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
PORT=4000
```

## REST API

- `GET /api/messages/:roomId?limit=50&before=<ISO>` – ดึงข้อความเรียงตามเวลา (เก่าก่อนไปใหม่)
- `POST /api/messages` – สร้างข้อความใหม่ `{ user, text, roomId }`

## ตัวอย่าง Socket.IO Client

```ts
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

socket.on('connect', () => {
  socket.emit('join_room', { roomId: 'general', user: 'alice' })

  socket.emit('hydrate', { roomId: 'general', limit: 20 })
  socket.on('init_messages', (messages) => console.log('history', messages))

  socket.emit('send_message', { roomId: 'general', user: 'alice', text: 'hello!' })
})

socket.on('new_message', (message) => {
  console.log('incoming message', message)
})
```

## การทดสอบ

เปิดเซิร์ฟเวอร์ (`npm run dev`) ในเทอร์มินัลหนึ่ง แล้วรัน `npm run test:socket` ในอีกหน้าต่างหนึ่งเพื่อตรวจสอบการทำงานของ Socket.IO และ REST endpoint

