import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersonProvider } from './Providers/selectPersonContext.js'
import { AuthProvider } from './Providers/AuthContext.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PersonProvider>
        <App />
      </PersonProvider>
    </AuthProvider>
  </StrictMode>,
)
