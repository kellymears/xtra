import React from "react"

import {
  Collapse,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap'

function renderMarkup(html) {
  return {__html: html};
}

const Story = (props) => (
    <Row>
      <Col>
        <h2>{props.title}</h2>
        <h3>{props.subtitle}</h3>
        <div dangerouslySetInnerHTML={renderMarkup(props.body)} />
        <hr/>
      </Col>
    </Row>
)

export default Story
