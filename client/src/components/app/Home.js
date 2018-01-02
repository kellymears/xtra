import React, { Component } from 'react'
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

import StoryCreateContainer from '../../containers/StoryCreateContainer'

class Home extends Component {
  render() {
    return (
      <div id="Home">
        <Container>
          <Row>
            <Col>
              <h3>The aim of Xtra is to be a <em>Medium</em> for Malcontents</h3>
              <h5>The internet was built on the principle of freely sharing
              information, media and experiences, not being the fuckin' <em>Uber</em> of think pieces.</h5>
              <hr/>
              <h4 className="lead">Xtra is currently in very early development:</h4>
              <ListGroup>
                <ListGroupItem>NodeJS</ListGroupItem>
                <ListGroupItem>Mongoose</ListGroupItem>
                <ListGroupItem>Express</ListGroupItem>
                <ListGroupItem>Redux</ListGroupItem>
                <ListGroupItem>Redux Thunk</ListGroupItem>
                <ListGroupItem>React</ListGroupItem>
                <ListGroupItem>Axios</ListGroupItem>
                <ListGroupItem>Reactstrap</ListGroupItem>
                <ListGroupItem>React Waypoint</ListGroupItem>
              </ListGroup>
              <br/>
              <StoryCreateContainer />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home
