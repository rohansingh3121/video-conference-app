import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HostDashboard from './pages/HostDashboard';
import ParticipantDashboard from './pages/ParticipantDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/host" Component={HostDashboard} />
        <Route path="/participant" Component={ParticipantDashboard} />
      </Routes>
    </Router>
  );
};

export default App;
