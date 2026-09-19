import { io, Socket } from 'socket.io-client'

const URL = 'http://localhost:5173'

export const socket: Socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
})
