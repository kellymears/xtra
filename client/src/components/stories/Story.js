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

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: []
    }
  }
  componentDidMount() {
    axios.get('/api/story/get/' +
    this.props.match.params.person + '/' +
    this.props.match.params.story)
      .then(response => {
         this.setState({
           story: response.data
         })
      })
  }
  render() {
    console.log(this.state.story)
    if(!(this.state.story)) {
      return (
        <Container>
          <Row>
            <Col>
              <p><strong>This story hasn't been written yet.</strong></p>
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
              <hr/>
              <h1>{this.state.story.title}</h1>
              <h2>{this.state.story.subtitle}</h2>
              <hr/>
              {this.state.story.body}
            </Col>
          </Row>
          <Row>
            <Col>
              <hr/>
              <h3>One clap, two clap, three clap, forty?</h3>
              By clapping more or less, you can signal to us which stories really stand out.
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default Story
