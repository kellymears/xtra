import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { Footer } from './components/app/App'
import XtraNav from './components/app/Nav'
import Home from './components/app/Home'

import People from './components/people/People'
import Person from './components/people/Person'
import Stories from './components/stories/Stories'
import Story from './components/stories/Story'

class XtraRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <XtraNav/>
          <div className="routeContainer">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/@:person/:story" component={Story}/>
              <Route path="/stories" component={Stories}/>
              <Route path="/people" component={People}/>
              <Route path="/@:person" component={Person}/>
              <Redirect from='*' to='/'/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default XtraRouter
