import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'

// Global error handler to prevent silent "black screen" crashes
window.onerror = function(message, source, lineno, colno, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="background: #000; color: #ff006e; padding: 40px; font-family: sans-serif; min-h-screen;">
        <h1>Something went wrong.</h1>
        <p>${message}</p>
        <button onclick="localStorage.clear(); location.reload();" style="background: #ff006e; color: white; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold;">
          Reset Data & Reload
        </button>
      </div>
    `;
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
)
