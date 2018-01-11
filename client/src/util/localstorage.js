export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    console.log(serializedState)
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
    localStorage.setItem('state',serializedState)
  } catch (err) {
    // bleh
  }
}

export const removeStateFromStorage = (state) => {
  try {
    localStorage.removeItem('state')
  } catch (err) {
    // err
  }
}
