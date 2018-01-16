import React, {Component} from 'react'
import {connect} from 'react-redux'

import Welcome from '../../components/messages/Welcome'
import ProjectGoals from '../../components/messages/ProjectGoals'
import AboutContainer from '../../containers/AboutContainer'

import {Button} from 'reactstrap'

class Home extends Component {
  render() {
    if(this.props.profile)
      return (
        <div id="Home">
          <Welcome profile={this.props.profile} />
          <AboutContainer/>
        </div>
      )
    if(!this.props.profile)
      return (
        <div id="Home">
          <ProjectGoals />
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.data
  }
}

export default connect(mapStateToProps,
  null)(Home)
