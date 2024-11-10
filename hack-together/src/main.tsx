import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactTogether } from 'react-together'
import './index.css'
import App from './App.tsx'
import Mainpage from './mainpage.tsx'

createRoot(document.getElementById('root')!).render(
    <ReactTogether
      sessionParams={{
        appId: "dev.reacttogether.hacktogetherapp",
        apiKey: "2F0ycxv7oTQKzT9TFUcIgydcSdMacginczP0KSlc7o",
        name: "hacktogethersession2",
        password: "Pass123!",
      }}
    >
    <Mainpage />
    </ReactTogether>
)
