import { combineReducers } from 'redux'
import { profile } from './profileReducer'
import { story } from './storyReducer'
import { person } from './personReducer'
import { metaNav } from './metaNavReducer'

export default combineReducers({
  story: story,
  person: person,
  metaNav: metaNav,
  profile: profile,
})
