import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { updateMetaNav } from "../../actions/navActions"

import Auth from '../../util/auth'

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

import Mdsearch from 'react-icons/lib/md/search'

import './MetaNav.css'

class MetaNavContainer extends Component {
  constructor(props){
    super(props)
    this.auth = new Auth()
  }
  handleSignInClick() {
    this.auth.login()
  }
  handleSignOutClick() {
    this.auth.logout()
  }
  _updateNavState(newState) {
    this.props.updateMetaNav(newState)
  }
  render() {
    return (
      <div className="MetaNav clearfix">
        <Row>
          <Col xs="5" className="hidden-md-down">
            <p className="aboutXTRA">
              <Link className="hidden-md-down align-bottom" to="/about">About XTRA</Link>
            </p>
          </Col>
          <Col xs="2">
            <h1 className="MetaNav-title">
              <Link to="/"><img src={require("../../assets/img/xtra-medium.jpg")} /></Link>
            </h1>
          </Col>
            { !this.props.isLoggedIn &&
              <Col className="getStartedButtonCol" xs="5">
                <Button onClick={() => this.handleSignInClick()} className="getStartedButton" outline color="success">Sign In</Button>
                <div className="search-icon">
                  <Link to="/search">
                    <Mdsearch color="grey" />
                  </Link>
                </div>
              </Col>
            }
            { this.props.isLoggedIn &&
              <Col className="getStartedButtonCol" xs="5">
                <Button onClick={() => this.handleSignOutClick()} className="getStartedButton" outline color="success">Sign Out</Button>
                <div className="search-icon">
                  <Link to="/search">
                    <Mdsearch color="grey" />
                  </Link>
                </div>
              </Col>
            }
        </Row>
        <Waypoint
          onEnter={({ event }) => { this._updateNavState('visible') }}
          onLeave={({ event }) => { this._updateNavState('hidden') }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    visibleMetaNav: state.metaNav.visible,
    isLoggedIn: state.profile.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMetaNav: (visible) => dispatch(updateMetaNav(visible)),
  }
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(MetaNavContainer))
