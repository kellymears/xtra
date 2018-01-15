import axios from 'axios'

function gotPerson(payload) {
  return {
      type: 'PERSON_LOAD_SUCCESS',
      Person: payload
  }
}

export function getPerson(payload) {
  return (dispatch) => {
    axios.get('/api/person/get/' + payload.person + '/' + payload.Person)
      .then(response => {
        dispatch(gotPerson(response.data))
      })
  }
}
