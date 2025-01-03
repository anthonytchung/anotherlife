import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import "7.css/dist/7.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
