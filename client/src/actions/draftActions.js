export function createDraft(draft) {
  return {
    type: 'CREATE_DRAFT',
    draft: draft
  }
}

function updateDraftState(draft) {
  return {
    type: 'UPDATE_DRAFT',
    draft: draft
  }
}

export function updateDraft(draft) {
  return {
    type: 'UPDATE_DRAFT',
    draft: draft
  }
}
