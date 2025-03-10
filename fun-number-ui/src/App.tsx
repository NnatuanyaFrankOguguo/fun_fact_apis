import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ClassifyNumber from './pages/ClassifyNumber';
import Metrics from './pages/Metrics';
import ApiLogs from './pages/Apilogs';
import SocketMessages from './components/socketMessages.js';
import './App.css';

const App: React.FC = () => {

  return (
    <>
      <SocketMessages />
      <div className="app">
        <header className="header">
          <h1>Fun Numbers Dashboard</h1>
          <nav>
            <ul>
              <li><Link to="/">Classify Number</Link></li>
              <li><Link to="/metrics">Performance Metrics</Link></li>
              <li><Link to="/logs">API Logs</Link></li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<ClassifyNumber />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/logs" element={<ApiLogs />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 Fun Numbers API</p>
        </footer>
      </div>
    </>
  );
};

export default App;
