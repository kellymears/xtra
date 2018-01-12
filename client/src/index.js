import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker'

import { store } from './util/store'
import XtraRouter from './util/router'

import 'bootstrap/dist/css/bootstrap.min.css'

render(
  <Provider store={store}>
    <XtraRouter/>
  </Provider>,
  document.getElementById('app')
)

registerServiceWorker()
