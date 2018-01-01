import axios from 'axios'

function constructURI(payload,method) {
  return '/api/story/' + method + '/' +
          payload.person + '/' + payload.story
}

function createdStory(story) {
  console.log('createdStory action called')
  return {
    type: 'STORY_CREATE_SUCCESS',
    story: story
  }
}

export function createStory(story) {
  console.log('createStory action called')
  return (dispatch) => {
    dispatch(createdStory(story))
  }
}

function gotStory(story) {
  return {
    type: 'STORY_LOAD_SUCCESS',
    story: story
  }
}

export function getStory(payload) {
  return (dispatch) => {
    axios.get(constructURI(payload,"get"))
      .then(response => {
        dispatch(gotStory(response.data))
      })
  }
}

function updatedStory(payload) {
  return {
    type: 'STORY_UPDATE_SUCCESS',
    story: payload
  }
}

export function updateStory(payload) {
  return (dispatch) => {
    axios.post(constructURI(payload,"post"))
      .then(response => {
        dispatch(updatedStory(response.data))
      })
  }
}

function deletedStory(payload) {
  return {
    type: 'STORY_DELETE_SUCCESS',
    story: payload
  }
}

export function deleteStory(payload) {
  return (dispatch) => {
    axios.post(constructURI(payload,"post"))
      .then(response => {
        dispatch(deletedStory(response.data))
      })
  }
}
