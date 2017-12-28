import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

export class Header extends Component {
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

export class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <h1>
          <a href="https://github.com/kellymears/xtra">
            Github
          </a>
        </h1>
      </div>
    )
  }
}
