import { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer();

const wss = new WebSocketServer({ server });

const chatClients = new Map();

wss.on('connection', (socket, request) => {
  const url = new URL(request.url ?? '', `http://${request.headers.host}`);
  const userId = url.searchParams.get('userId');
  const chatId = Number(url.searchParams.get('chatId'));

  console.log(`Connection parameters - userId: ${userId}, chatId: ${chatId}`);

  if (userId && chatId) {
    if (!chatClients.has(chatId)) {
      chatClients.set(chatId, new Set());
    }

    chatClients.get(chatId)?.add(socket);

    socket.on('message', (message) => {
      try {
        const messageString = message.toString();
        const parsedMessage = JSON.parse(messageString);

        if (chatId === parsedMessage.chatId) {
          chatClients.get(parsedMessage.chatId)?.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(messageString);
            }
          });
        }
      } catch (error) {
        console.error('Message handling error:', error);
      }
    });

    socket.on('close', () => {
      chatClients.get(chatId)?.delete(socket);
      if (chatClients.get(chatId)?.size === 0) {
        chatClients.delete(chatId);
      }
    });
  } else {
    socket.close();
  }
});

server.listen(3001, () => {
  console.log('WebSocket server is running on ws://localhost:3001');
});
