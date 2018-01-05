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

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    axios.get('/api/users/get/')
    .then(response => {
      if(!(response.data==null)) {
        console.log(response.data)
        this.setState({
          users: response.data
        })
      }
      else {
        this.setState({
          users: null
        })
      }
    })
  }
  render() {
    if(this.state.users==null)
      return (
        <Row>
          <Col>
            <h4>People</h4>
            <p>Huh. It looks like there are no users.</p>
          </Col>
        </Row>
      )
      return (
        <Row>
          <Col>
            <h4>People</h4>
            <hr/>
            {
              this.state.users.map(( {username, email} ) => {
                console.log(username)
                return <p><Link to={`/@${username}`}>{username} - {email}</Link></p>
              })
            }
          </Col>
        </Row>
      )
  }
}

export default People
