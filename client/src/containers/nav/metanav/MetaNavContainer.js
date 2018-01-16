import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'  //eslint-disable no-unused-vars
import {Link, withRouter} from 'react-router-dom'
import {updateMetaNav} from '../../../actions/navActions'
import {signIn, signOut} from '../../../actions/profileActions'

import Waypoint from 'react-waypoint'

import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import Mdsearch from 'react-icons/lib/md/search'

import './MetaNav.css'

class MetaNavContainer extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
  handleSignInClick() {
    this.props.signIn()
  }
  handleSignOutClick() {
    this.props.signOut()
  }
  handleClick(click){
    switch (click) {
    case 'logout':
      this.props.signOut()
      break
    case 'create':
      this.props.history.push('/create')
      break
    default:
      console.log('weird!')
    }
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
              <Link to="/"><img src={require('../../../assets/img/xtra-medium.jpg')} /></Link>
            </h1>
          </Col>
          { !this.props.profile &&
          <Col className="getStartedButtonCol" xs="5">
            <Button onClick={() => this.handleSignInClick()} className="getStartedButton" outline color="success">Sign In</Button>
            <div className="search-icon">
              <Link to="/search">
                <Mdsearch color="grey" />
              </Link>
            </div>
          </Col>
          }
          { this.props.profile &&
          <Col className="profileDropdown" xs="5">
            <div className="float-right">
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size="sm">
                <DropdownToggle
                  tag="span"
                  onClick={this.toggle}
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpen}
                >
                  <img className="profilePicture" src={this.props.profile.picture} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleClick('create')}>Write Story</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.handleSignOutClick('logout')}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Col>
          }
        </Row>
        <Waypoint
          onEnter={({event}) => { this._updateNavState('visible') }}
          onLeave={({event}) => { this._updateNavState('hidden') }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    visibleMetaNav: state.metaNav.visible,
    profile:        state.profile.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMetaNav: (visible) => dispatch(updateMetaNav(visible)),
    signIn:        () => dispatch(signIn()),
    signOut:       () => dispatch(signOut())
  }
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(MetaNavContainer))
