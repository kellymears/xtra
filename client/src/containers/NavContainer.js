import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { updateMetaNav } from "../actions/navActions"

import Waypoint from 'react-waypoint'

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

import '../components/app/App.css'
import '../components/app/Nav.css'

class NavContainer extends Component {
  getButtonStyle() {
    if(this.props.navState=='visible')
      return 'hidden'
    else
      return 'visible'
  }
  render() {
    return (
      <Row id="XtraNav" className="sticky-top">
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
        <Col xs="2" className={this.getButtonStyle()}>
          <Button className="getStartedButton" outline color="success">Get Started</Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navState: state.metaNav.navState
  }
}

export default connect(mapStateToProps,
  null)(NavContainer)
