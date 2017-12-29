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
      person: [],
      stories: []
    }
  }
  componentDidMount() {
    axios.get('/api/user/get/' + this.props.match.params.person)
    .then(response => {
      console.log(response.data)
      if(!(response.data==null)) {
        this.setState({
          person: response.data.user,
          stories: response.data.posts
        })
      }
      else {
        this.setState({
          person: null,
          stories: null
        })
      }
    })
  }
  render() {
    if(this.state.person==null) {
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
              <h2>@{this.state.person.username}</h2>
              <p><strong>ID:</strong>{this.state.person._id}</p>
              <p><strong>Email:</strong>{this.state.person.email}</p>
              <p><strong>Password:</strong>{this.state.person.password}</p>
              <h2>Stories</h2>
              {
                this.state.stories.map(( {title, subtitle} ) => {
                  return (
                    <div>
                      <h2>
                        <Link to={`/@${this.state.person.username}/${title}`}>
                          {title}
                        </Link>
                      </h2>
                      <h3>{subtitle}</h3>
                    </div>
                  )
                })
              }
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default Person
