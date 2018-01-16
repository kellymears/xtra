function updatedMetaNav(visibility) {
  return {
    type:    'META_NAV_UPDATE',
    visible: visibility
  }
}

export function updateMetaNav(visible) {
  return (dispatch) => {
    dispatch(updatedMetaNav(visible))
  }
}
