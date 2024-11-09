import Popup from "./components/Popup"; 
import { useState} from 'react';
function mainpage() {
    const[buttonPopup, setButtonPopup] = useState(false);
    return (
        <div className="mainpage">
            <main>
                <h1>Popup</h1>
                <br></br>
                <button onClick={() => setButtonPopup(true)}>Create</button>
            </main> 
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h1>Insira o seu nome!</h1>
                    <text>username</text>
            </Popup>
        </div>
    )
}

export default mainpage;