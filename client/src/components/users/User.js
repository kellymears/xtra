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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      posts: []
    }
  }
  componentDidMount() {
    axios.get('/api/user/get/' + this.props.match.params.user)
    .then(response => {
      if(!(response.data==null)) {
        console.log(response.data.user)
        this.setState({
          user: response.data.user,
          posts: response.data.posts
        })
      }
      else {
        this.setState({
          user: null,
          posts: null
        })
      }
    })
  }
  render() {
    if(this.state.user==null) {
      return (
        <Container>
          <Row>
            <Col>
              <p><strong>Requested User:</strong>@{this.props.match.params.user} could not be found.</p>
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
              <h2>@{this.state.user.username}</h2>
              <p><strong>ID:</strong>{this.state.user._id}</p>
              <p><strong>Email:</strong>{this.state.user.email}</p>
              <p><strong>Password:</strong>{this.state.user.password}</p>
              <h2>Posts</h2>
              {
                this.state.posts.map(( {title, subtitle} ) => {
                  return <p key={title}>{title} - {subtitle}</p>
                })
              }
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default User
