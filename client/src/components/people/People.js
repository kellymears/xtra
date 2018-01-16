import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {
  Row,
  Col
} from 'reactstrap'

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
  }
  componentDidMount() {
    axios.get('/api/person/get/all').
      then(response => {
        console.log(response)
        this.setState({
          people: response.data
        })
      })
  }
  render() {
    if(this.state.people!==null)
      return (
        <Row>
          <Col>
            <h4>People</h4>
            <hr/>
            {
              this.state.people.map(({username, email}) => {
                return <p><Link to={`/@${username}`}>{username} - {email}</Link></p>
              })
            }
          </Col>
        </Row>
      )
  }
}

export default People
