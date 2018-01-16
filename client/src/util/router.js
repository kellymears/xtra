import React, {Component} from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {connect} from 'react-redux'

import {authenticate} from '../actions/profileActions'

import SignInCallback from '../containers/profile/SignInCallback'
import SignOutCallback from '../containers/profile/SignOutCallback'
import StoryCreateContainer from '../containers/story/StoryCreateContainer'

import MetaNavContainer from '../containers/nav/metanav/MetaNavContainer'
import TopicNavContainer from '../containers/nav/topicnav/TopicNavContainer'
import StoryContainer from '../containers/story/StoryContainer'
import AboutContainer from '../containers/AboutContainer'

import Home from '../containers/home/Home'
import People from '../components/people/People'
import Person from '../components/people/Person'
import Stories from '../components/stories/Stories'

import {Container} from 'reactstrap'

class XtraRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <MetaNavContainer />
          <TopicNavContainer />
          <Container id="appRoot">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/sign-in" component={SignInCallback}/>
              <Route exact path="/sign-out" component={SignOutCallback}/>
              <Route exact path="/create" component={StoryCreateContainer} />
              <Route exact path="/about" component={AboutContainer}/>
              <Route path="/@:person/:title" component={StoryContainer}/>
              <Route path="/stories" component={Stories}/>
              <Route path="/people" component={People}/>
              <Route path="/@:person" component={Person}/>
              <Redirect from='*' to='/'/>
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    )
  }
}

export default XtraRouter
