import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'

import { updateMetaNav } from "../../../actions/navActions"
import { signIn, signOut } from "../../../actions/profileActions"

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
  }
  handleSignInClick() {
    this.props.signIn()
  }
  handleSignOutClick() {
    this.props.signOut()
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateMetaNav: (visible) => dispatch(updateMetaNav(visible)),
    signIn: () => dispatch(signIn()),
    signOut: () => dispatch(signOut())
  }
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(TopicNavContainer))
