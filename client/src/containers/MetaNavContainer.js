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

class MetaNavContainer extends Component {
  _updateNavState(newState) {
    console.log(newState)
    this.props.updateMetaNav(newState)
  }
  render() {
    return (
          <Container className="Header">
            <Row>
              <Col xs="5" className="hidden-md-down">
                <p className="aboutXTRA align-bottom">
                  <Link className="hidden-md-down align-bottom" to="/about">About XTRA</Link>
                </p>
              </Col>
              <Col xs="2">
                <h1 className="Header-title align-middle">
                  <Link className="align-middle" to="/">XTRA</Link>
                </h1>
              </Col>
              <Col className="getStartedButtonCol align-middle" xs="5">
                <Button className="getStartedButton align-middle" outline color="success">Get Started</Button>
              </Col>
            </Row>
            <Waypoint
              onEnter={({ event }) => { this._updateNavState('visible') }}
              onLeave={({ event }) => { this._updateNavState('hidden') }} />
          </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    visibleMetaNav: state.metaNav.visible,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMetaNav: (visible) => dispatch(updateMetaNav(visible)),
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(MetaNavContainer)
