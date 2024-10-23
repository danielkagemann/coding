import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// the styling
import './assets/index.scss'
import './assets/highlight.scss'
import './assets/backgrounds.scss'
import 'animate.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
