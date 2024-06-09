import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import Host from './models/Host';
import Participant from './models/Participant';
import Session from './models/Session';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

connectDB();

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('start-timer', (data) => {
    io.emit('start-timer', data);
  });

  socket.on('raise-hand', (data) => {
    io.emit('raise-hand', data);
  });
});

app.use(express.json());
app.use('/api/auth', authRoutes);

server.listen(4000, () => {
  console.log('listening on *:4000');
});
