export function metaNav(state = [], action) {
  switch (action.type) {
  case 'META_NAV_UPDATE':
    return {
      ...state,
      navState: action.visible
    }
  default:
    return state
  }
}
