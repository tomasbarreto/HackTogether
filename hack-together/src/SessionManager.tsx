// @ts-ignore
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from './components/Popup';
import './SessionManager.css';

function SessionManager() {
  const [showPopup, setShowPopup] = useState(false);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = Date.now().toString();
    navigate(`/room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    } else {
      alert('Please enter a valid room ID');
    }
  };

  return (
    <div className='bg'>
      <main className='mainBox'>
        <button className='create-button' onClick={handleCreateRoom}>Create Room</button>
        <div className='join'>
          <input
            className='input'
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button className='join-button' onClick={handleJoinRoom}>Join</button>
        </div>
        {showPopup && (
          <Popup trigger={showPopup} setTrigger={setShowPopup}>
            <div>
              <h2>Create a New Room</h2>
              <p>Click "Create" to start a new session.</p>
            </div>
          </Popup>
        )}
      </main>
    </div>
  );
}

export default SessionManager;
