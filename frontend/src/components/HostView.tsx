import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from '@mui/material';

const socket = io('http://localhost:4000');

const HostView: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    socket.on('start-timer', (data) => {
      // Handle timer start
    });

    socket.on('raise-hand', (data) => {
      // Handle raise hand
    });
  }, []);

  const startTimer = (duration: number) => {
    socket.emit('start-timer', { duration });
  };

  return (
    <div>
      <h1>Host View</h1>
      <Button onClick={() => startTimer(15)}>Start 15s Timer</Button>
      <Button onClick={() => startTimer(30)}>Start 30s Timer</Button>
      {/* Display participants and raised hands */}
    </div>
  );
};

export default HostView;
