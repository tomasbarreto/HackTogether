import { createRoot } from 'react-dom/client';
import { ReactTogether } from 'react-together';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import RouterSetup from './RouterSetup';
import { Toaster } from './components/ui/toaster';

const roomId = new URLSearchParams(window.location.search).get('roomId');

createRoot(document.getElementById('root')!).render(
  <ReactTogether
    sessionParams={{
      appId: "dev.reacttogether.hacktogetherapp",
      apiKey: "2F0ycxv7oTQKzT9TFUcIgydcSdMacginczP0KSlc7o",
      name: roomId || 'default',
      password: 'shared-session-password'
    }}
  >
    <Router>
      <RouterSetup />
    </Router>
    <Toaster />
  </ReactTogether>
);
