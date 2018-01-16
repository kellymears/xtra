import {combineReducers} from 'redux'
import {metaNav} from './metaNavReducer'
import {profile} from './profileReducer'
import {draft} from './draftReducer'

/* the following are deprecated/need to be reworked */
import {story} from './storyReducer'
import {person} from './personReducer'

export default combineReducers({
  metaNav: metaNav,
  profile: profile,
  draft:   draft,
  story:   story,
  person:  person
})
