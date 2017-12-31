import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/reducer'

export const store = createStore(reducer, {}, applyMiddleware(thunk))
