import React from 'react'
import { render } from 'react-dom'

import XtraRouter from './router'
import App from './components/app/App'

import registerServiceWorker from './registerServiceWorker'

render(
  <div>
    <App/>
    <XtraRouter/>
  </div>,
  document.getElementById('root')
)

registerServiceWorker()
