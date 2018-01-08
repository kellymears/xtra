export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('state.profile')
    if(serializedState == null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state.profile',serializedState)
  } catch (err) {
    // bleh
  }
}

export const removeStateFromStorage = (state) => {
  try {
    localStorage.clear()
  } catch (err) {
    // err
  }
}
