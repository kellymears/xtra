import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { updateMetaNav } from "../../../actions/navActions"

import Auth from '../../../util/auth'

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

import './TopicNav.css'

class TopicNavContainer extends Component {
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
  getButtonStyle() {
    console.log(this.props.navState)
    if(this.props.navState=='visible')
      return 'hidden'
    else
      return 'visible'
  }
  render() {
    return (
      <div id="XtraNav" className="sticky-top">
        <Nav className="bg-light">
          <NavItem>
            <NavLink><Link to="/people">People</Link></NavLink>
          </NavItem>
          <NavItem>
            <NavLink><Link to="/stories">Stories</Link></NavLink>
          </NavItem>
          <NavItem>
            <NavLink><Link to="/topics">Topics</Link></NavLink>
          </NavItem>
        </Nav>
      { !this.props.profile &&
        <Nav className="bg-light float-right">
          <NavItem className={this.getButtonStyle()}>
            <Button onClick={() => this.handleSignInClick()} className="getStartedButton" color="success">Sign In</Button>
          </NavItem>
        </Nav>
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navState: state.metaNav.navState,
    profile: state.profile.data
  }
}

export default withRouter(connect(mapStateToProps,
  null)(TopicNavContainer))
