import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './component/Layout/App.jsx'
import './index.css'
import "src/styles/style.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
