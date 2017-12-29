import React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import XtraRouter from './router'

import 'bootstrap/dist/css/bootstrap.css'

render(
  <div id="App"><XtraRouter/></div>,
  document.getElementById('root')
)
registerServiceWorker()
