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
        signedOut: true
      }
    case 'SIGNING_IN':
      return state
    default:
      return state
  }
}
