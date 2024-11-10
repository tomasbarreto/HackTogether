import Popup from "./components/Popup.tsx"; 
import "./Mpc.css"
import { useState} from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import { useNavigate } from 'react-router-dom';

function Mpc() { 
    const[buttonPopup, setButtonPopup] = useState(false);
    const navigate = useNavigate();
    // @ts-ignore
    const handleButtonClick = () => {
      const roomId = uuidv4(); // Generate a unique room ID
      navigate(`/room/${roomId}`); // Navigate to the new page with the room ID
    };
    
    return (
        <div className="mainpage">
            <main>
                <br />
                <button className='button' onClick={() => setButtonPopup(true)}>Create</button>
            </main> 
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h1 className='text'>Insira o seu nome!</h1>
                    <input type="text" className='username'/>
                    <br />
                    
            </Popup>
        </div>
    );
}

export default Mpc;