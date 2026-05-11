import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Game from './pages/Game';
import History from './pages/History';
import Wallet from './pages/Wallet';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/history" element={<History />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </Router>
  );
}

export default App;