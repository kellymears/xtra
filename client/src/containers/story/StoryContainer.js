import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getStory} from '../../actions/storyActions'
import Story from '../../components/stories/StoryComponent'

class StoryContainer extends Component {
  componentDidMount(){
    this.props.getStory({
      person: this.props.match.params.person,
      title:  this.props.match.params.title
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
  return {story: state.story.story}
}

const mapDispatchToProps = (dispatch) => {
  return {getStory: (story) => dispatch(getStory(story))}
}

export default connect(mapStateToProps,
  mapDispatchToProps)(StoryContainer)
