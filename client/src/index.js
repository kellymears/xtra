import React from 'react'
import { render } from 'react-dom'

import Header from './components/app/Header'
import Footer from './components/app/Footer'
import XtraRouter from './router'

import './index.css'

import registerServiceWorker from './registerServiceWorker'

render(
  <div>
    <Header/>
    <XtraRouter/>
  </div>,
  document.getElementById('root')
)

registerServiceWorker()
