import React from 'react'
import {Provider} from 'react-redux';
import {store} from '../util/store'

import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import {Container} from 'reactstrap'

import {storiesOf} from '@storybook/react'

import MetaNavContainer from '../containers/nav/metanav/MetaNavContainer'
import '../containers/nav/metanav/MetaNav.css'

import NavContainer from '../containers/nav/topicnav/TopicNavContainer'
import '../containers/nav/topicnav/TopicNav.css'

import Home from '../containers/home/Home'

storiesOf('Navigation', module)
  .addDecorator(story =>
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          {story()}
        </Container>
      </BrowserRouter>
    </Provider>)
  .add('Meta Navigation', () => <MetaNavContainer />)

storiesOf('Navigation', module)
  .addDecorator(story =>
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          {story()}
        </Container>
      </BrowserRouter>
    </Provider>)
  .add('Topic Navigation', () => <NavContainer />)

storiesOf('Pages', module)
  .addDecorator(story =>
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <MetaNavContainer/>
          <NavContainer/>
          {story()}
        </Container>
      </BrowserRouter>
    </Provider>)
  .add('Home', () => <Home />)
