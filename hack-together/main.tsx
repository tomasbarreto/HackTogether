import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactTogether } from 'react-together'

import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env.VITE_APP_ID,
        apiKey: import.meta.env.VITE_API_KEY,
        name: import.meta.env.VITE_SESSION_NAME,
        password: import.meta.env.VITE_SESSION_PASSWORD,
      }}
    >
      <App />
    </ReactTogether>
  </StrictMode>
)
