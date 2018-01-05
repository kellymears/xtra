import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import SignInCallback from './SignInCallback'
import SignOutCallback from './SignOutCallback'

import MetaNavContainer from '../containers/MetaNav/MetaNavContainer'
import TopicNavContainer from '../containers/TopicNav/TopicNavContainer'
import StoryContainer from '../containers/StoryContainer'
import AboutContainer from '../containers/AboutContainer'

import Home from '../components/app/Home'
import People from '../components/people/People'
import Person from '../components/people/Person'
import Stories from '../components/stories/Stories'

import { Container } from 'reactstrap'

class XtraRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <MetaNavContainer />
          <TopicNavContainer />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/sign-in" component={SignInCallback}/>
            <Route exact path="/sign-out" component={SignOutCallback}/>
            <Route exact path="/about" component={AboutContainer}/>
            <Route path="/@:person/:story" component={StoryContainer}/>
            <Route path="/stories" component={Stories}/>
            <Route path="/people" component={People}/>
            <Route path="/@:person" component={Person}/>
            <Redirect from='*' to='/'/>
          </Switch>
        </Container>
      </BrowserRouter>
    )
  }
}

export default XtraRouter
