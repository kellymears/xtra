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

class SignOutCallback extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth()
  }
  componentDidMount() {
    this.props.removeProfile()
    this.props.history.push('/')
  }
  render() { return (null) }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeProfile: () => dispatch(removeProfile()),
  }
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(SignOutCallback))
