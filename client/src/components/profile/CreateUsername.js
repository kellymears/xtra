import React from 'react'

import {
  Row,
  Col,
  Alert
} from 'reactstrap'

const CreateUsername = props => {
  const handleUsernameForm = event => {
    event.preventDefault()
    props.handleUsernameForm(this.username.value)
  }
  return (
    <Row>
      <Col>
        <br/>
        <h1>Thanks for signing up for Xtra, { props.first_name }!</h1>
        <hr/>
        <h2 className="lead">
          <strong>All thats left is to pick a username:</strong>
        </h2>
        { props.submissionError &&
          <Alert color="danger">
            This username is already taken :(
          </Alert>
        }
        <form onSubmit={ handleUsernameForm }>
          <input id="username" ref={(input) => this.username = input} type="text" placeholder="username" />
          <button className="btn btn-outline-secondary" type="submit">Submit</button>
        </form>
      </Col>
    </Row>
  )
}

export default CreateUsername
