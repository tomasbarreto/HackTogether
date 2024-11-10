import './App.css';
import { WhiteboardComponent } from './components/whiteboard';
import { User, Role } from "./Schemas/Schemas"
import { useStateTogether } from 'react-together'
import { pdfjs } from 'react-pdf'; // Import pdfjs from react-pdf

// Set the worker path using import.meta.url (for Vite or modern bundlers)
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

function App() {
  // @ts-ignore
  const [users, setUsers] = useStateTogether<User[]>("user-list", [
    { id: 1, username: "Tomas", role: Role.Student },
    { id: 2, username: "Matos", role: Role.Student },
    { id: 3, username: "Francisco", role: Role.Student },
    { id: 4, username: "Tiago", role: Role.Student },
    { id: 5, username: "Guilherme", role: Role.Student },
  ]);

  return (
    <>
      <WhiteboardComponent users={users} roomId={312312321312} />
    </>
  );
}

export default App;
