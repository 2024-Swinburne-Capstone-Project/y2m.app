import { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer();

const wss = new WebSocketServer({ server });

const chatClients = new Map();

wss.on('connection', (socket, request) => {
  const url = new URL(request.url ?? '', `http://${request.headers.host}`);
  const userId = url.searchParams.get('userId');
  const chatId = Number(url.searchParams.get('chatId'));

  if (userId && chatId) {
    if (!chatClients.has(chatId)) {
      chatClients.set(chatId, new Set());
    }
    chatClients.get(chatId)?.add(socket);

    socket.on('message', (message) => {
      try {
        const { chatId: msgChatId } = JSON.parse(message.toString());

        if (chatId === msgChatId) {
          chatClients.get(msgChatId)?.forEach((client) => {
            if (client.readyState === client.OPEN) {
              client.send(message);
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
