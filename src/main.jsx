import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeContextProvider from './Contexts/ThemeContextProvider.jsx'
import ClockContextProvider from './Contexts/ClockContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClockContextProvider>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </ClockContextProvider>
  </React.StrictMode>,
)
