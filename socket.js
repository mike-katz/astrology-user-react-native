import { io } from 'socket.io-client';

export const socket = io('https://socket.astrotalkguruji.com', {
  transports: ['websocket'], autoConnect: false
}); //	use the IP address of your machine
