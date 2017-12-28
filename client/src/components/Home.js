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

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-5">XTRA is currently in early development.</h1>
              <hr/>
              <p className="lead">It uses the following technologies to <em>some</em> effect:</p>
              <ListGroup>
                <ListGroupItem>NodeJS</ListGroupItem>
                <ListGroupItem>Express</ListGroupItem>
                <ListGroupItem>MongooseJS</ListGroupItem>
                <ListGroupItem>React</ListGroupItem>
                <ListGroupItem>Axios</ListGroupItem>
                <ListGroupItem>Reactstrap</ListGroupItem>
              </ListGroup>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
