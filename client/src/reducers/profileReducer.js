export function profile(state = [], action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        data: action.profile,
      }
    case 'SIGN_OUT':
      return {
        ...state,
        data: undefined,
      }
    default:
      return state
  }
}
