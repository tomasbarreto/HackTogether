import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStateTogether } from 'react-together';
import { WhiteboardComponent } from './components/whiteboard';
import { User, Role } from './Schemas/Schemas';
import { v4 as uuidv4 } from 'uuid';

function CanvasApp() {
  const { roomId } = useParams<{ roomId: string }>();
  const parsedRoomId = roomId ? parseInt(roomId, 10) : Date.now(); // Ensure roomId is a number
  const [users, setUsers] = useStateTogether<User[]>(`user-list-${parsedRoomId}`, []);
  const [userId] = useState(() => uuidv4()); // Generate a unique user ID as a string
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Generate a random username when the user joins
    const randomUsername = `User${Math.floor(Math.random() * 1000)}`;
    setUsername(randomUsername);

    // Check if user is already in the list before adding to avoid duplicates
    setUsers((prevUsers = []) => {
      // Ensure prevUsers is always an array
      if (Array.isArray(prevUsers) && prevUsers.some((user) => user.id === userId)) {
        return prevUsers;
      }
      return [
        ...prevUsers,
        { id: userId, username: randomUsername, role: Role.Student },
      ];
    });
  }, [userId, setUsers]);

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername);
    setUsers((prevUsers = []) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, username: newUsername } : user
      )
    );
  };

  return (
    <div>
      <WhiteboardComponent
        roomId={parsedRoomId.toString()}
        users={users}
        username={username}
        onUsernameChange={updateUsername}
      />
    </div>
  );
}

export default CanvasApp;
