import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoProvider } from './components/providers/TodoProvider.jsx'
import './app.css'
import Header from './jsx/Header.jsx'
import Content from './jsx/Content.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <Header />
    <TodoProvider>
      <Content />
    </TodoProvider>
  </StrictMode>,
)
