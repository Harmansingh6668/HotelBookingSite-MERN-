import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import { HotelProvider } from './context/hotelContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <HotelProvider>
        <App />
      </HotelProvider>
    </AdminAuthProvider>
  </StrictMode>
)
