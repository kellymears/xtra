import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class Header extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to XTRA</h1>
          <h2>A <em>Medium</em> for Malcontents</h2>
        </header>
      </div>
    )
  }
}

export default Header