import './App.css';
import { WhiteboardComponent } from './components/whiteboard';
import { User, Role } from "./Schemas/Schemas"
import { useStateTogether } from 'react-together'


function App() {
  const [users, setUsers] = useStateTogether<User[]>("user-list", [
    { id: 1, username: "Tomas", role: Role.Student },
    { id: 2, username: "Matos", role: Role.Student },
    { id: 3, username: "Francisco", role: Role.Student },
    { id: 4, username: "Tiago", role: Role.Student },
    { id: 5, username: "Guilherme", role: Role.Student },
  ]);

  setUsers([])

  return (
    <WhiteboardComponent users={users} roomId={312312321312} />
  );
}

export default App;
