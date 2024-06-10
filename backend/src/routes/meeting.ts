import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

interface Meeting {
  host: string;
  participants: string[];
}

let meetings: Record<string, Meeting> = {};

router.post('/create', (req: Request, res: Response) => {
  const meetingId = uuidv4();
  meetings[meetingId] = { host: req.body.host, participants: [] };
  res.json({ meetingId });
});

router.get('/join/:meetingId', (req: Request, res: Response) => {
  const { meetingId } = req.params;
  if (meetings[meetingId]) {
    res.json({ meetingId });
  } else {
    res.status(404).send('Meeting not found');
  }
});

router.post('/addParticipant', (req: Request, res: Response) => {
  const { meetingId, participant } = req.body;
  if (meetings[meetingId]) {
    meetings[meetingId].participants.push(participant);
    res.json({ message: 'Participant added' });
  } else {
    res.status(404).send('Meeting not found');
  }
});

export default router;
