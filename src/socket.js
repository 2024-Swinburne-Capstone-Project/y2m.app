import { WebSocketServer } from 'ws';

let wss;

export default function handler(req, res) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (socket) => {
      socket.on('message', (message) => {
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(message);
          }
        });
      });
    });
  }

  res.status(200).json({ status: 'WebSocket server is running' });
}
