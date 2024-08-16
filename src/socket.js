import { WebSocketServer } from 'ws';
import http from 'http';

// Create an HTTP server (necessary for WebSocketServer)
const server = http.createServer();

// Create WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

// Map to keep track of WebSocket connections by userId
const users = new Map();

wss.on('connection', (socket, request) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const userId = url.searchParams.get('userId');

  if (userId) {
    users.set(userId, socket);

    socket.on('message', (message) => {
      try {
        const payload = JSON.parse(message);
        const recipientSocket = users.get(payload.recipientId);

        if (recipientSocket && recipientSocket.readyState === recipientSocket.OPEN) {
          const message = JSON.stringify({ senderId: userId, ...payload });
          recipientSocket.send(message);
        }
      } catch (error) {
        console.error('Message handling error:', error);
      }
    });

    socket.on('close', () => {
      users.delete(userId);
    });
  } else {
    socket.close();
  }
});

server.listen(3001, () => {
  console.log('WebSocket server is running on ws://localhost:3001');
});
