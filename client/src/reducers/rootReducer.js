import { combineReducers } from 'redux'
import { story } from './storyReducer'
import { person } from './personReducer'

export default combineReducers({
  story: story,
  person: person,
})
