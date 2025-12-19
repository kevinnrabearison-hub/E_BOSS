import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme-context'
import { ChristmasProvider } from './context/christmas-context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ChristmasProvider>
          <App />
        </ChristmasProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)