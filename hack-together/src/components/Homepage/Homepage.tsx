import { User, Role } from "../../Schemas/Schemas";
import { useStateTogether } from 'react-together';
import { Button } from "../../components/ui/button"

function Homepage() {
  const [users, setUsers] = useStateTogether<User[]>("user-list", []);

  return (
    <>
      <div className="flex justify-center h-screen mt-32">
        <span className="font-black text-7xl">LEARN TOGETHER.</span>
        <Button className="w-42">Create new class</Button>
        <Button className="w-32">Join class</Button>
      </div>
    </>
  );
}

export default Homepage;
