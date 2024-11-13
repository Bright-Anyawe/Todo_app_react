import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './component/Layout/App.jsx'
import routes from './component/Layout/RouteLayout.jsx'
import './index.css'
import "./styles/style.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
