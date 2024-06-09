import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const socket = io('http://localhost:4000');

const ParticipantView: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');

  const handleNameSubmit = () => {
    setOpen(false);
    socket.emit('join', { name });
  };

  useEffect(() => {
    socket.on('start-timer', (data) => {
      // Handle timer start
    });

    socket.on('raise-hand', (data) => {
      // Handle raise hand
    });
  }, []);

  const raiseHand = () => {
    socket.emit('raise-hand', { name });
  };

  return (
    <div>
      <h1>Participant View</h1>
      <Button onClick={raiseHand}>Raise Hand</Button>
      
      <Dialog open={open} onClose={() => {}}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join the conference, please enter your name here.
          </DialogContentText>
          <TextField autoFocus margin="dense" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNameSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParticipantView;
