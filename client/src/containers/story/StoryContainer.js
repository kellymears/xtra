import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getStory } from "../../actions/storyActions"
import Story from "../../components/stories/StoryComponent"

class StoryContainer extends Component {
  componentDidMount(){
    console.log(this.props.match.params.person)
    console.log(this.props.match.params.story)
    this.props.getStory({
      person: this.props.match.params.person,
      title:  this.props.match.params.title,
    })
  }
  render() {
    return (
      <div id="StoryContainer">
        <Story {...this.props.story} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    story: state.story.story
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStory: (story) => dispatch(getStory(story))
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryContainer)
