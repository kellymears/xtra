import React, { Component } from 'react'
import {
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

class Home extends Component {
  render() {
    return (
      <div id="Home">
        <Header/>
        <Container>
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-5">XTRA is currently in early development.</h1>
                <hr/>
                <p className="lead">It uses the following technologies to <em>some</em> effect:</p>
                <ListGroup>
                  <ListGroupItem>NodeJS</ListGroupItem>
                  <ListGroupItem>Mongoose</ListGroupItem>
                  <ListGroupItem>Express</ListGroupItem>
                  <ListGroupItem>Redux</ListGroupItem>
                  <ListGroupItem>React</ListGroupItem>
                  <ListGroupItem>Axios</ListGroupItem>
                  <ListGroupItem>Reactstrap</ListGroupItem>
                </ListGroup>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home
