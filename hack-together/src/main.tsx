import { createRoot } from 'react-dom/client'
import { ReactTogether } from 'react-together'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import Mainpage from './mainpage.tsx'
import { Toaster } from './components/ui/toaster'

createRoot(document.getElementById('root')!).render(
    <ReactTogether
      sessionParams={{
        appId: "dev.reacttogether.hacktogetherapp",
        apiKey: "2F0ycxv7oTQKzT9TFUcIgydcSdMacginczP0KSlc7o",
        name: "hacktogethersession3",
        password: "Pass123!",
      }}
    >
    <App />
    <Toaster />
    </ReactTogether>
)
