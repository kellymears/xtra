import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
  Collapse,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios.get('/api/posts/get')
      .then(response => {
         this.setState({
           posts: response.data
         })
      })
  }

  render() {
    if(!(this.state.posts)) {
      return (
        <Container>
          <Row>
            <Col>
              <p><strong>This is the posts component.</strong></p>
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

export default Posts
