export function story(state = [], action) {
  switch (action.type) {
    case 'STORY_LOAD_SUCCESS':
      console.log(action.story)
      return {
        ...state,
        story: action.story
      }
    case 'STORY_CREATE_SUCCESS':
      console.log('storyReducer create success called')
      return {
        ...state,
        story: action.story
      }
    case 'STORY_DELETE_SUCCESS':
      return state
    case 'STORY_UPDATE_SUCCESS':
      return state
    default:
      return state
  }
}
