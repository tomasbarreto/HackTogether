import './Popup.css';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function Popup({ trigger, setTrigger, children }: PopupProps) {
  const navigate = useNavigate();

  const handleCreateSession = () => {
    const roomId = Date.now().toString();
    navigate(`/room/${roomId}?roomId=${roomId}`);
  };

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {children}
        <button className="create-btn" onClick={handleCreateSession}>Create</button>
        <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
      </div>
    </div>
  ) : null;
}

export default Popup;
