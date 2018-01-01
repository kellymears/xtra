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

import { Header } from './App'
import StoryCreateContainer from '../../containers/StoryCreateContainer'

class Home extends Component {
  render() {
    return (
      <div id="Home">
        <Container>
          <Row>
            <Col>
              <Alert color="primary">
                To be real I have very little idea what I am doing.
              </Alert>
              <Jumbotron>
                <h2 className="display-5">
                  XTRA is currently in early development.
                </h2>
              </Jumbotron>
              <p className="lead">It uses the following technologies to <em>some</em> effect:</p>
              <ListGroup>
                <ListGroupItem>NodeJS</ListGroupItem>
                <ListGroupItem>Mongoose</ListGroupItem>
                <ListGroupItem>Express</ListGroupItem>
                <ListGroupItem>Redux</ListGroupItem>
                <ListGroupItem>Redux Thunk</ListGroupItem>
                <ListGroupItem>React</ListGroupItem>
                <ListGroupItem>Axios</ListGroupItem>
                <ListGroupItem>Reactstrap</ListGroupItem>
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
