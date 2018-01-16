import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {addProfile, removeProfile} from '../../actions/profileActions'

class SignOutCallback extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.removeProfile()
    this.props.history.push('/')
  }
  render() {
    return (null)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeProfile: () => dispatch(removeProfile())
  }
}

export default withRouter(connect(null,
  mapDispatchToProps)(SignOutCallback))
