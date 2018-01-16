import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {
  Row,
  Col
} from 'reactstrap'

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  }
  componentDidMount() {
    axios.get('/api/story/get/all')
      .then(response => {
        this.setState({
          stories: response.data
        })
        console.log(response.data)
      })
  }
  render() {
    return (
      <Row>
        <Col>
          <h4>Stories</h4>
          <hr/>
          {
            this.state.stories.map(({title, subtitle, author}) => {
              return <p key={title}>
                <Link to={`/@${author.username}/${title}`}>{title}</Link> - {subtitle}</p>
            })
          }
        </Col>
      </Row>
    )
  }
}

export default Stories
