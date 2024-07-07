const socket = io('http://localhost:3000', {
  query: { token: 'your_access_token' } // access_token = localStorage.access_token
});

socket.on('connect', () => {
  console.log('Connected to server');
  const roomId = 'room123'; // roomId = localStorage.roomId
  socket.emit('joinRoom', roomId);
});

socket.on('message', (data) => {
  console.log(`Message from room: ${data}`);
});

function sendMessage(msg, autoreply) {
  const roomId = 'room123'; // roomId = localStorage.roomId
  socket.emit('message', { roomId, msg, autoreply });
}

//simulation send message
sendMessage('Hello, world!', true); // true = localStorage.autoreply

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
