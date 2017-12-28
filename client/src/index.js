import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App'
import Posts from './components/posts/Posts'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/posts" component={Posts} />
    </div>
  </Router>
), document.getElementById('root'))

registerServiceWorker()
