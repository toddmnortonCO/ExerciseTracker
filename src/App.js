import React, { Component }from 'react';
import Header from './Components/header';
import './App.css';
import Dashboard from './Components/dashboard';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
