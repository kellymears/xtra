import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import XtraNav from './components/app/Nav'
import Home from './components/Home'
import Posts from './components/posts/Posts'
import Users from './components/users/Users'

class XtraRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <XtraNav/>
          <div className="routeContainer">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/posts" component={Posts}/>
              <Route path="/users" component={Users}/>
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default XtraRouter
