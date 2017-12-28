import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Home from './components/app/Home'
import Posts from './components/posts/Posts'
import Users from './components/users/Users'

class XtraRouter extends Component {
    constructor(props) {
      super(props)
    }
    render() {
        return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/posts" component={Posts}/>
              <Route path="/users" component={Users}/>
              <Redirect from='*' to='/' />
            </Switch>
          </BrowserRouter>
        )
    }
}

export default XtraRouter
