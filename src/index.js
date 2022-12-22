import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import io from 'socket.io-client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const socket = io('http://localhost:8080')

socket.on('connect', () => {
  console.log(`You connected with id: ${[socket.id, socket.username]}`)
})

export default socket;
