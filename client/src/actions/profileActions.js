function addState(profile) {
  return {
    type: 'SIGN_IN',
    profile: profile
  }
}

export function addProfile(profile) {
  return (dispatch) => {
    dispatch(addState(profile))
  }
}

function removeState() {
  return {
    type: 'SIGN_OUT',
    data: undefined
  }
}

export function removeProfile() {
  return (dispatch) => {
    dispatch(removeState())
  }
}
