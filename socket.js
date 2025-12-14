import { io } from 'socket.io-client';

export const socket = io('http://13.204.207.15:3001', {
  transports: ['websocket'],autoConnect: true
}); //	use the IP address of your machine
