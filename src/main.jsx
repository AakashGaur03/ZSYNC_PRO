import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeContextProvider from './Contexts/ThemeContextProvider.jsx'
import ClockContextProvider from './Contexts/ClockContextProvider.jsx'
import { ConfirmModalContextProvider } from './Contexts/ConfirmModalProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClockContextProvider>
    <ThemeContextProvider>
    <ConfirmModalContextProvider>
    <App />
    </ConfirmModalContextProvider>
    </ThemeContextProvider>
    </ClockContextProvider>
  </React.StrictMode>,
)
