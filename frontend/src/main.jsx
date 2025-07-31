import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import Header from './jsx/Header.jsx'
import Content from './jsx/Content.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <Header />
    <Content />
  </StrictMode>,
)
