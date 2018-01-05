import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { store } from '../store'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import {
  Alert,
  Collapse,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

import '../components/app/App.css'
import '../components/app/Nav.css'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MetaNavContainer from "../containers/MetaNavContainer"
import NavContainer from "../containers/NavContainer"
import Home from "../components/app/Home"

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
