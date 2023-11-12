import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <div style={{ rotate: !IS_DEVELOPMENT ? '90deg' : '0deg' }}>
      <App />
    </div>
  </React.StrictMode>,
);
