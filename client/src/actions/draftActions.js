export function createDraft(draft) {
  return {
    type: 'CREATE_DRAFT',
    title: draft.title,
    subtitle: draft.subtitle,
    body: draft.body,
  }
}

export function updateDraftState(draft) {
  return (dispatch) => {
    if(draft.body)
      dispatch(updateDraftBody(draft.body))
    if(draft.title)
      dispatch(updateDraftTitle(draft.title))
    if(draft.subtitle)
      dispatch(updateDraftSubtitle(draft.subtitle))
  }
}

function updateDraftTitle(title) {
  return {
    type: 'UPDATE_DRAFT_TITLE',
    title: title
  }
}

function updateDraftSubtitle(subtitle) {
  return {
    type: 'UPDATE_DRAFT_SUBTITLE',
    subtitle: subtitle
  }
}

function updateDraftBody(body) {
  return {
    type: 'UPDATE_DRAFT_BODY',
    body: body
  }
}
