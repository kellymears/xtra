import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker'

import { store } from './store'
import XtraRouter from './router'

import 'bootstrap/dist/css/bootstrap.css'

render(
  <Provider store={store}>
    <div id="App">
      <XtraRouter/>
    </div>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
