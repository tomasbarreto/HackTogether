import { useEffect, useState } from 'react';
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

    // Determine the role: Teacher if the room is empty, otherwise Student
    const userRole = users.length === 0 ? Role.Teacher : Role.Student;

    // Check if user is already in the list before adding to avoid duplicates
    setUsers((prevUsers = []) => {
      if (Array.isArray(prevUsers) && prevUsers.some((user) => user.id === userId)) {
        return prevUsers;
      }
      return [
        ...prevUsers,
        { id: userId, username: randomUsername, role: userRole, hasDoubt: false },
      ];
    });
  }, [userId, setUsers, users.length]);

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
        userId={userId}
        username={username}
        onUsernameChange={updateUsername}       
        setUsers={setUsers}
        />
    </div>
  );
}

export default CanvasApp;