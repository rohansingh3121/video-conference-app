import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";

const socket = io("http://localhost:4000");

const Root = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E3F2FD",
}));

const TimerButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ParticipantCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  minWidth: 275,
}));

const HostDashboard: React.FC = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [raisedHands, setRaisedHands] = useState<string[]>([]);
  const [meetingId, setMeetingId] = useState<string | null>(null);

  useEffect(() => {
    const createMeeting = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/meeting/create",
          { host: "Host" }
        );
        setMeetingId(response.data.meetingId);
        socket.emit("join-meeting", {
          meetingId: response.data.meetingId,
          participant: "Host",
        });
      } catch (error) {
        console.error("Failed to create meeting", error);
      }
    };
    createMeeting();

    socket.on("new-participant", (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    });

    socket.on("raise-hand", (participant) => {
      setRaisedHands((prevRaisedHands) => [...prevRaisedHands, participant]);
    });

    return () => {
      socket.off("new-participant");
      socket.off("raise-hand");
    };
  }, []);

  const startTimer = (duration: number) => {
    if (meetingId) {
      socket.emit("start-timer", { meetingId, duration });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Link copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <Root>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Host Dashboard
        </Typography>
        <div>
          <TimerButton
            variant="contained"
            color="primary"
            onClick={() => startTimer(15)}
          >
            Start 15s Timer
          </TimerButton>
          <TimerButton
            variant="contained"
            color="primary"
            onClick={() => startTimer(30)}
          >
            Start 30s Timer
          </TimerButton>
        </div>
        {meetingId && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h6">
              Share this link with participants:
            </Typography>
            <Typography variant="body1" style={{ wordBreak: "break-all" }}>
              {`http://localhost:3000/join/${meetingId}`}
              <Tooltip title="Copy link">
                <IconButton
                  onClick={() =>
                    copyToClipboard(`http://localhost:3000/join/${meetingId}`)
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Typography>
          </div>
        )}
        <Grid container spacing={3}>
          {participants.map((participant, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <ParticipantCard>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {participant}
                  </Typography>
                  {raisedHands.includes(participant) && (
                    <Typography variant="body2" color="textSecondary">
                      Raised Hand
                    </Typography>
                  )}
                </CardContent>
              </ParticipantCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Root>
  );
};

export default HostDashboard;
