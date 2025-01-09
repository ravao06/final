import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { loadWAFEnv } from './utils/index.js';

(async () => {
  try {
    await loadWAFEnv();
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize the application:', error);
  }
})();
