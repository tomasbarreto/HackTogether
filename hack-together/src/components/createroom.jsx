import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './mainpage'; // Import your HomePage component
import RoomPage from './RoomPage'; // Import the RoomPage component

function createroom() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<mainpage />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default createroom;