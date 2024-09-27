import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './practice/jira-dashboard/App';
// import App from './practice//autocomplete/App';
// import App from './practice/progress-bar/App';
// import App from './practice/race-game/App';
// import App from './practice/transfer-list-n/App';
// import App from './practice/transfer-list-2/App';
// import App from './practice/tic-tac/App';
import App from './interview/App';
// import App from './App';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
