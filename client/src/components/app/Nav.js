import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import "./Nav.css"

class XtraNav extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isLoggedIn: false,
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <Navbar id="XtraNav" className="navbar-dark bg-dark sticky-top" toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand><Link to="/">XTRA</Link></NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink><Link to="/people">People</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/stories">Stories</Link></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default XtraNav
