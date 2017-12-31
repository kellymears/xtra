import axios from 'axios'

function storyLoadSuccess(data) {
  return {
      type: 'STORY_LOAD_SUCCESS',
      story: data
  }
}

export function getStoryData(payload) {
  return (dispatch) => {
    axios.get('/api/story/get/' + payload.person + '/' + payload.story)
      .then(response => {
        console.log(response.data)
        dispatch(storyLoadSuccess(response.data))
      })
  }
}
