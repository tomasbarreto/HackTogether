import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactTogether } from 'react-together'

import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['dev.reacttogether.hacktogetherapp'],
        apiKey: import.meta.env['2F0ycxv7oTQKzT9TFUcIgydcSdMacginczP0KSlc7oY'],
        // Having the two args below will make React Together immediately connect
        // to a new session. Remove them if you want users to start "offline"
        name: import.meta.env['hacktogethersession'],
        password: import.meta.env['Pass123!'],
      }}
    >
      <App />
    </ReactTogether>
  </StrictMode>
)
