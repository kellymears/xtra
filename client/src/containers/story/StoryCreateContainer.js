import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { createStory } from "../../actions/storyActions"

import {
  Collapse,
  Container,
  Row,
  Col,
  Button,
  Input,
} from 'reactstrap'

import Editor from 'react-medium-editor'

import './StoryCreate.css'

require('medium-editor/dist/css/medium-editor.css')
require('medium-editor/dist/css/themes/default.css')

class StoryCreateContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      draft: "<h1>Start writing your story...</h1>",
      time: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    console.log('submitted form')
    event.preventDefault()
    this.props.createStory({
      title: this.storyTitle.value,
      subtitle: this.storySubtitle.value,
      body: this.storyBody.value,
    })
  }
  handleChange(draft,medium){
    console.log(this.state.draft)
  }
  render() {
    if(!this.props.profile) this.props.history.push('/')
    return (
      <Container>
        <Row>
          <Col>
            <Editor
              text={this.state.draft}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              options={{toolbar: {buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'anchor']}}}
            />
            <Button className="storyCreateSubmit" type="button" color="secondary">Publish story</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createStory: (story) => dispatch(createStory(story))
  }
}

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoryCreateContainer))
