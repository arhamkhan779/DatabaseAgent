import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Ensure root element takes full height
const rootElement = document.getElementById('root')!;
rootElement.style.minHeight = '100vh';
rootElement.style.width = '100%';
rootElement.style.overflow = 'auto';

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
