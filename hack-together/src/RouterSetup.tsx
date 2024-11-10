import { Routes, Route } from 'react-router-dom';
import SessionManager from './SessionManager';
import CanvasApp from './CanvasApp';

function RouterSetup() {
  return (
    <Routes>
      <Route path="/" element={<SessionManager />} />
      <Route path="/room/:roomId" element={<CanvasApp />} />
    </Routes>
  );
}

export default RouterSetup;
