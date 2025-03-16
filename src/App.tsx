import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Biology from './pages/Biology';
import HeartModel from './pages/HeartModel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biology" element={<Biology />} />
        <Route path="/biology/heart" element={<HeartModel />} />
      </Routes>
    </Router>
  );
}

export default App;