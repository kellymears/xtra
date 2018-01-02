import { combineReducers } from 'redux'
import { story } from './storyReducer'
import { person } from './personReducer'
import { metaNav } from './metaNavReducer'

export default combineReducers({
  story: story,
  person: person,
  metaNav: metaNav,
})
