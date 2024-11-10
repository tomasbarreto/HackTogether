import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from './components/Popup';

function SessionManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = Date.now().toString();
    navigate(`/room/${newRoomId}?roomId=${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}?roomId=${roomId}`);
    } else {
      alert('Please enter a valid room ID');
    }
  };

  return (
    <div className="mainpage">
      <button onClick={handleCreateRoom}>Create Room</button>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join</button>
      {showPopup && (
        <Popup trigger={showPopup} setTrigger={setShowPopup}>
          <div>
            <h2>Create a New Room</h2>
            <p>Click "Create" to start a new session.</p>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default SessionManager;
