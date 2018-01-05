import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addProfile, removeProfile } from "../actions/profileActions"

import {
  Alert,
  Collapse,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

import Auth from './auth';

class SignInCallback extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()
  }
  componentDidMount() {
    this.auth.setAccessToken()
    this.auth.setIdToken()
    this.auth.getProfile((err,profile) => {
      if (!err)
        console.log(profile)
        this.props.addProfile(profile)
        this.props.history.push('/')
    })
  }
  render() { return(null) }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProfile: (profile) => dispatch(addProfile(profile)),
  }
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(SignInCallback))
