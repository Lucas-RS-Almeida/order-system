import { createServer } from 'http';

import { Server } from 'socket.io';

import express from 'express';
import 'express-async-errors';

import dotenv from 'dotenv';
dotenv.config();

import cors from './middlewares/cors';

import routes from './routes';

import errorHandler from './middlewares/errorHandler';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(routes);
app.use(errorHandler);

interface SocketRequest {
  email: string;
  socketId: string;
}

let onlines: Array<SocketRequest> = [];

function addNewUser({ email, socketId }: SocketRequest) {
  onlines.push({ email, socketId });
}

function getUsers(email: string) {
  return onlines.find((item) => item.email === email);
}

function removerUser(id: string) {
  onlines = onlines.filter((item) => item.socketId === id);
}

io.on('connection', (socket) => {
  socket.on('newUser', (email) => {
    addNewUser({ email, socketId: socket.id });
  });

  socket.on('sendNotification', (email, message) => {
    const receiver = getUsers(email);

    io.to(receiver?.socketId || '').emit('getNotification', message);
  });

  socket.on('disconnect', () => {
    removerUser(socket.id);
  });
});

httpServer.listen(8080);
