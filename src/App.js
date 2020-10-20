import React, { Component }from 'react';
import Header from './Components/header';
import './App.css';
import Dashboard from './Components/dashboard';
import About from './Components/about';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <About />
    </div>
  );
}

export default App;
