import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import NavContainer from './containers/NavContainer'
import MetaNavContainer from './containers/MetaNavContainer'
import Home from './components/app/Home'

import People from './components/people/People'
import Person from './components/people/Person'
import Stories from './components/stories/Stories'

import StoryContainer from './containers/StoryContainer'

class XtraRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <MetaNavContainer />
          <NavContainer />
          <div className="routeContainer">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/@:person/:story" component={StoryContainer}/>
              <Route path="/stories" component={Stories}/>
              <Route path="/people" component={People}/>
              <Route path="/@:person" component={Person}/>
              <Redirect from='*' to='/'/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default XtraRouter
