import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createStory } from "../actions/storyActions"

import {
  Collapse,
  Container,
  Row,
  Col,
  Button,
  Input,
} from 'reactstrap'

class StoryCreateContainer extends Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.createStory({
      title: this.storyTitle.value,
      subtitle: this.storySubtitle.value,
      body: this.storyBody.value,
    })
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Create Story</h2>
            <hr/>
            <form onSubmit={ this.handleSubmit }>
              <Row>
                <Col className="form-group">
                  <input id="storyTitle" ref={(input) => this.storyTitle = input} type="text" placeholder="Story Title" />
                </Col>
              </Row>
              <Row>
                <Col className="form-group">
                  <input id="storySubtitle" ref={(input) => this.storySubtitle = input} type="text" placeholder="Story Subtitle" />
                </Col>
              </Row>
              <Row>
                <Col className="form-group">
                  <textarea id="storyBody" rows="3" ref={(input) => this.storyBody = input} placeholder="Story Content"></textarea>
                </Col>
              </Row>
              <Row>
                <Col className="form-group">
                  <button id="storySubmit" className="btn btn-primary">Submit</button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    story: state.story.story,
    person: state.person,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createStory: (story) => dispatch(createStory(story))
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryCreateContainer)
