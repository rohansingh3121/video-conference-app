# Video Conference Web Application

## Overview

This project is a video conferencing web application built using React for the frontend and Node.js for the backend. The backend server uses Express and Socket.io for real-time communication, and the frontend is designed with Material-UI. This application includes features such as user authentication, host and participant views, session management, and real-time event handling.

## Features

- **User Authentication**: Hosts can sign up and log in to manage conferences.
- **Host View**: Hosts can start a meeting, see the list of participants, and control session timers.
- **Participant View**: Participants can join a meeting using a unique link, see timers started by the host, and raise their hands during the session.
- **Real-Time Communication**: Uses websockets to communicate between host and participants.
- **Share Link**: Unique, shareable meeting links.
- **Raise Hand**: Participants can signal the host during the session.
- **Countdown Timer**: Host can start timers which are visible to participants.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js (version 20.12.1)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rohansingh3121/video-conference-app.git
2. Replace the placeholder MONGODB-CONNECTION with your actual MongoDB connection string.
3. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
4. Open a new terminal, navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
### Notes
Ensure you are using Node.js version 20.12.1 to avoid compatibility issues.
The project does not integrate actual video streaming. It focuses on session management and real-time communication features.
