import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'

import "./Nav.css"

class XtraNav extends Component {
  render() {
    return (
      <Container id="XtraNav" className="sticky-top">
        <Row>
          <Col xs="10">
            <Nav className="navbar-light bg-light">
              <NavItem>
                <NavLink><Link to="/people">People</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/stories">Stories</Link></NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs="2">
            <Button className="getStartedButton" outline color="success">Get Started</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default XtraNav
