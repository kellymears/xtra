export function draft(state = [], action) {
  switch (action.type) {
    case 'CREATE_DRAFT':
      return {
        ...state,
        content: action.draft
      }
    case 'UPDATE_DRAFT':
      return {
        ...state,
        content: action.draft,
      }
    default:
      return state
  }
}
