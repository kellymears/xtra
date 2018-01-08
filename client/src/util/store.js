import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'
import decode from 'jwt-decode'
import axios from 'axios'

import { loadStateFromStorage,
         saveStateToStorage,
         removeStateFromStorage } from './localstorage'

import reducer from '../reducers/rootReducer'

function getTokenExpiry(encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp)
    return null
  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

function checkTokenFreshness(token) {
  const expirationDate = getTokenExpiry(token)
  return expirationDate < new Date()
}

function handleProfileTokens(profile) {
  if(!profile.auth.id ||
  checkTokenFreshness(profile.auth.id)) {
    console.log('store logged user out')
    store.dispatch({
      type: 'SIGN_OUT'
    })
    removeStateFromStorage()
  }
}

const authMiddleware = store => next => action => {
  if(action.type!=='SIGN_OUT') {
    const profile = store.getState().profile.data
    if(profile)
      handleProfileTokens(profile)
  }
  next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk,authMiddleware))
const persistedState = loadStateFromStorage()
const store = createStore(reducer,persistedState,enhancer)

store.subscribe(throttle(() => {
  if(store.getState().profile) {
    saveStateToStorage({
      profile: store.getState().profile
    })
  }
}, 1000))

export { store }
