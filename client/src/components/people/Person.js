import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
  Collapse,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap'

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: []
    }
  }
  componentDidMount() {
    axios.get('/api/person/get/' + this.props.match.params.person)
    .then(response => {
      if(!(response.data==null))
        this.setState({ person: response.data.person })
    })
  }
  render() {
    if(this.state.person.username == null) {
      return (
        <Container>
          <Row>
            <Col>
              <p>@{this.props.match.params.person} could not be found.</p>
            </Col>
          </Row>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <Row>
            <Col>
              <h1>{this.state.person.first_name} {this.state.person.last_name}</h1>
              <h2>@{this.state.person.username}</h2>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default Person
