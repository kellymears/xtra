import React from "react"

import {
  Collapse,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'

const Story = (props) => (
  <Container>
    <Row>
      <Col>
        <h2>{props.story.title}</h2>
        <h3>{props.story.subtitle}</h3>
        <hr/>
        {props.story.body}
      </Col>
    </Row>
    <Row>
      <Col>
        <hr/>
        <h3>One clap, two clap, three clap, forty?</h3>
        By clapping more or less, you can signal to us which stories really stand out.
      </Col>
    </Row>
  </Container>
)

export default Story
