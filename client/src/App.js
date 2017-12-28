import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to XTRA</h1>
        </header>
        <p className="App-intro">
          A <em>Medium</em> for Malcontents
        </p>
        <hr/>
        <p><strong>This is so fucking difficult.</strong></p>
      </div>
    )
  }
}


export default App
