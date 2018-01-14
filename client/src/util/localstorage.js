export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState == null) {
      console.log('serializedState is null')
      return undefined
    }
    return JSON.parse(serializedState)
    console.log(serializedState)
  } catch (err) {
    console.log('error loading state')
    return undefined
  }
}

export const saveStateToStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state',serializedState)
  } catch (err) {
    return undefined
  }
}

export const removeStateFromStorage = (state) => {
  try {
    localStorage.removeItem('state')
  } catch (err) {
    return undefined
  }
}
