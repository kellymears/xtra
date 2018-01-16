import React from 'react'

import {
  Row,
  Col,
  Jumbotron
} from 'reactstrap'

const ProjectGoals = props => {
  console.log(props)
  return (
    <Row>
      <Col>
        <Jumbotron>
          <h2>A <em>Medium</em> for Malcontents</h2>
          <h5 className="lead">The internet was built on the principle
          of freely sharing information, media and experiences,
          not being the fuckin <em>Uber</em> of think pieces.</h5>
        </Jumbotron>
      </Col>
    </Row>
  )
}

export default ProjectGoals
