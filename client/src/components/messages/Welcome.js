import React from "react"

import {
  Row,
  Col,
} from 'reactstrap'

const Welcome = props => {
  console.log(props)
  return (
    <Row>
      <Col>
        <h1>Why hello there, { props.profile.name.first }!</h1>
        <hr/>
      </Col>
    </Row>
  )
}

export default Welcome
