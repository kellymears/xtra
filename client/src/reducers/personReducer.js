export function person(state = [], action) {
  switch (action.type) {
  case 'PERSON_LOAD_SUCCESS':
    return action.person
  default:
    return state
  }
}
