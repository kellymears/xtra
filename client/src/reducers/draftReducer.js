export function draft(state = [], action) {
  switch (action.type) {
  case 'CREATE_DRAFT':
    return {
      ...state,
      title:    action.title,
      subtitle: action.subtitle,
      body:     action.body
    }
  case 'UPDATE_DRAFT_BODY':
    return {
      ...state,
      body: action.body
    }
  case 'UPDATE_DRAFT_TITLE':
    return {
      ...state,
      title: action.title
    }
  case 'UPDATE_DRAFT_SUBTITLE':
    return {
      ...state,
      subtitle: action.subtitle
    }
  default:
    return state
  }
}
