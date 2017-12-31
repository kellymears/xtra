import axios from 'axios'

function createdPerson(payload) {
   return {

   }
}

export function createPerson(payload) {
  return {

  }
}

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

function deletedPerson(payload) {
  return {

  }
}

export function deletePerson(payload) {
  return {

  }
}
