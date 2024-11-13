import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './component/Layout/App.jsx'
import routes from './component/Layout/RouteLayout.jsx'
import './index.css'
import "./styles/style.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(routes)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
    <App />
  </StrictMode>,
)
