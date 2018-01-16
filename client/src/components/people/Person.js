import React, {Component} from 'react'
import axios from 'axios'

import {
  Row,
  Col
} from 'reactstrap'

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: []
    }
  }
  componentDidMount() {
    axios.get('/api/person/get/' + this.props.match.params.person).
      then(response => {
        if(!(response.data===null))
          this.setState({person: response.data.person})
      })
  }
  render() {
    if(this.state.person.username===null)
      return (
        <Row>
          <Col>
            <p>@{this.props.match.params.person} could not be found.</p>
          </Col>
        </Row>
      )
    else
      return (
        <Row>
          <Col>
            <h1>{this.state.person.firstName} {this.state.person.lastName}</h1>
            <h2>@{this.state.person.username}</h2>
          </Col>
        </Row>
      )
  }
}

export default Person
