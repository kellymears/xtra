export function story(state = [], action) {
  switch (action.type) {
    case 'STORY_LOAD_SUCCESS':
      return action.story
    default:
      return state
  }
}
