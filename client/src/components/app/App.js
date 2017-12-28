import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

export class Header extends Component {
  render() {
    return (
      <header className="Header">
        <img src={logo} className="Header-logo" alt="logo" />
        <h1 className="Header-title">Welcome to XTRA</h1>
        <h2 className="Header-subtitle">A <em>Medium</em> for Malcontents</h2>
      </header>
    )
  }
}

export class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <span>
          <a href="https://github.com/kellymears/xtra">
            Github
          </a>
        </span>
      </footer>
    )
  }
}
