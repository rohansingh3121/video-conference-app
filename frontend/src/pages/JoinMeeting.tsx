import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const JoinMeeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const joinMeeting = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/meeting/join/${meetingId}`
        );
        if (response.data) {
          socket.emit("join-meeting", {
            meetingId,
            participant: "Participant",
          });
          navigate(`/meeting/${meetingId}`);
        }
      } catch (error) {
        console.error("Failed to join meeting", error);
      }
    };
    joinMeeting();
  }, [meetingId, navigate]);

  return (
    <div>
      <h1>Joining Meeting...</h1>
    </div>
  );
};

export default JoinMeeting;
