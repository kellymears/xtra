import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash/throttle'

import Auth from './auth'
import reducer from '../reducers/rootReducer'
import { loadStateFromStorage, saveStateToStorage, removeStateFromStorage } from './localstorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)
const persistedState = loadStateFromStorage()
const store = createStore(reducer,persistedState,enhancer)

let auth = new Auth()

/* localStorage to persist between refreshes *chef's kiss* */
store.subscribe(throttle(() => {
  if(auth.isLoggedIn()) {
    saveStateToStorage({
      profile: store.getState().profile
    })
  }
}, 1000))

store.subscribe(throttle(() => {
  if(!auth.isLoggedIn()) {
    let serializedState = localStorage.getItem('state')
    if(serializedState) {
      localStorage.removeItem('state')
      store.dispatch({ type: 'SIGN_OUT' })
    }
  }
}, 1000))

export { store }
