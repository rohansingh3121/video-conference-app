import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HostDashboard from "./pages/HostDashboard";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import JoinMeeting from "./pages/JoinMeeting";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/host" element={<HostDashboard />} />
        <Route path="/join/:meetingId" element={<JoinMeeting />} />
        <Route path="/participant" element={<ParticipantDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
