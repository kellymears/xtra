import React from 'react'
import { render } from 'react-dom'

import { Header, Footer } from './components/app/App'
import XtraRouter from './router'

import './index.css'

import registerServiceWorker from './registerServiceWorker'

render(
  <div>
    <Header/>
    <XtraRouter/>
    <Footer/>
  </div>,
  document.getElementById('root')
)

registerServiceWorker()
