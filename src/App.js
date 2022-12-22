import './App.css';
import socket from "./index.js";


function createGame() {
  socket.emit('loggedIn', document.getElementById('nickname').value)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <script>console.log(script)</script>
        <script>createGame()</script>
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
