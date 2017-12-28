import React, { Component } from 'react'
import {
  Collapse,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap'

class Users extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p><strong>This is the users component.</strong></p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Users
