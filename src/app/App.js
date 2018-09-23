import React, { Component } from 'react';
import iconNotepad from './image/icon-notepad.svg';
import './App.css';
import Notepad from './Notepad';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={iconNotepad} className="App-logo" alt="icon" />
          <h1 className="App-title">Welcome to Notepad</h1>
        </header>
        <Notepad />
      </div>
    );
  }
}

export default App;
