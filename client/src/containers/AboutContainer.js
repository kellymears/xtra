import React, {Component} from 'react'
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

class AboutContainer extends Component {
  render() {
    return (
      <Row>
        <Col>
          <h4 className="lead">Xtra is currently in very early development using:</h4>
          <br/>
          <ListGroup>
            <ListGroupItem>NodeJS</ListGroupItem>
            <ListGroupItem>Mongoose</ListGroupItem>
            <ListGroupItem>Express</ListGroupItem>
            <ListGroupItem>Redux</ListGroupItem>
            <ListGroupItem>Redux Thunk</ListGroupItem>
            <ListGroupItem>Immutable.js</ListGroupItem>
            <ListGroupItem>Axios</ListGroupItem>
            <ListGroupItem>React</ListGroupItem>
            <ListGroupItem>Auth0</ListGroupItem>
            <ListGroupItem>Reactstrap</ListGroupItem>
            <ListGroupItem>Slate.js</ListGroupItem>
            <ListGroupItem>React Waypoint</ListGroupItem>
            <ListGroupItem>React Icons</ListGroupItem>
            <ListGroupItem>React Headroom</ListGroupItem>
          </ListGroup>
          <br/><br/>
          <h4 className="text-center">Do you think a non-exploitative version of Medium is a cool idea?</h4>
          <p className="text-center"><a className="btn btn-primary" href="https://github.com/kellymears/xtra">Contribute on Github</a></p>
          <br/><br/>
        </Col>
      </Row>
    )
  }
}

export default AboutContainer
