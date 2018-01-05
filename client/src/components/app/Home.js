import React, { Component } from 'react'
import { connect } from 'react-redux'

import Auth from '../../util/auth'

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

import Stories from '../stories/Stories'
import People from  '../people/People'
import AboutContainer from '../../containers/AboutContainer'

class Home extends Component {
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
  render() {
    return (
      <div id="Home">
        <br/>
        <Row>
          <Col>
            { this.props.user &&
              <div>
                <h1>Why hello there, { this.props.user.given_name }!</h1>
                <hr/>
              </div>
            }
            <h3>The aim of Xtra is to be a <em>Medium</em> for Malcontents</h3>
            <h5>The internet was built on the principle of freely sharing
            information, media and experiences, not being the fuckin <em>Uber</em> of think pieces.</h5>
          </Col>
        </Row>
        <br/><br/>
        <AboutContainer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.profile.data
  }
}

export default connect(mapStateToProps,
  null)(Home)
