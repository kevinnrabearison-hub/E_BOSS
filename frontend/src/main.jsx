import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/theme-context'
import { ChristmasProvider } from './context/christmas-context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ChristmasProvider>
          <AppRoutes />
        </ChristmasProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)