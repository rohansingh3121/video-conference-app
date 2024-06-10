import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import meetingRoutes from './routes/meeting';

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/meeting', meetingRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('join-meeting', (data) => {
    const { meetingId, participant } = data;
    socket.join(meetingId);
    io.to(meetingId).emit('new-participant', participant);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('start-timer', (data) => {
    const { meetingId, duration } = data;
    io.to(meetingId).emit('start-timer', duration);
  });

  socket.on('raise-hand', (data) => {
    const { meetingId, participant } = data;
    io.to(meetingId).emit('raise-hand', participant);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
