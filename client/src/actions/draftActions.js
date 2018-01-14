import axios from 'axios'

export function createDraft(draft) {
  return {
    type: 'CREATE_DRAFT',
    title: draft.title,
    subtitle: draft.subtitle,
    body: draft.body,
  }
}

export function updateDraft(draft) {
  return (dispatch) => {
    if(draft.body)
      dispatch(updateDraftBody(draft.body))
    if(draft.title)
      dispatch(updateDraftTitle(draft.title))
    if(draft.subtitle)
      dispatch(updateDraftSubtitle(draft.subtitle))
  }
}

export function publishDraft(draft) {
  return (dispatch) => {
    console.log(draft)
    /* here we need a call to check if the story
    title already exist for this user. If so, we need to append
    a number to the URI of this story to maintain unique URLs */
    axios.post('/api/story/create',draft)
      .then(response => {
        console.log(response)
        dispatch(publishedDraft(draft))
      })
      .catch(function(err) {
        console.log(err)
      })
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

function publishedDraft(draft) {
  return {
    type: 'PUBLISH_DRAFT',
    draft: draft
  }
}
