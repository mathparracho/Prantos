import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Upload } from './components/upload';
import { About } from './components/about';
import { Header } from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;