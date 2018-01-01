import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <h1 className="Header-title"><Link to="/">XTRA</Link></h1>
      </header>
    )
  }
}

class Footer extends Component {
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

export {
  Header,
  Footer
}
