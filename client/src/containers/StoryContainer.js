import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getStory, createStory } from "../actions/storyActions"
import Story from "../components/stories/StoryComponent"
import StoryCreateContainer from "./StoryCreateContainer"

class StoryContainer extends Component {
  componentDidMount(){
    this.props.getStory({
      person: this.props.match.params.person,
      story:  this.props.match.params.story,
    })
  }
  render() {
    console.log(this.props.story)
    return (
      <div id="StoryContainer">
        <Story {...this.props.story} />
        <StoryCreateContainer />
      </div>
    )
  }
}

StoryContainer.propTypes = {
    getStory: PropTypes.func.isRequired,
    story: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    story: state.story.story,
    person: state.person,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStory: (story) => dispatch(getStory(story))
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryContainer)
