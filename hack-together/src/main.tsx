import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import RouterSetup from './RouterSetup';

createRoot(document.getElementById('root')!).render(
  <Router>
    <RouterSetup />
  </Router>
);
