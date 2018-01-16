import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import auth0 from 'auth0-js'

import { addProfile } from "../../actions/profileActions"
import CreateUsername from "../../components/profile/CreateUsername"

import {
  Row,
  Col,
  Jumbotron
} from 'reactstrap'

class SignInCallback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      newProfile: false,
      submissionSuccess: false,
      submissionError: false,
      profile: false,
      auth_id: this.getParameterByName('id_token'),
      auth_access: this.getParameterByName('access_token')
    }
    this.auth0 = new auth0.WebAuth({
      domain: 'xtrarad.auth0.com',
      clientID: `oAfmxY0WUVFXYrZDkT7tvc8zWz-pKnA-`,
      redirectUri: 'http://localhost:3000/sign-in',
      audience: 'https://xtrarad.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email profile'
    })
    this.handleUsernameForm = this.handleUsernameForm.bind(this)
  }
  componentWillMount() {
    console.log('component will mount')
    this.fetchProfile((err,profile) => {
      if (!err) {
        this.setState({
          profile: profile
        })
        this.isProfileNew()
      }
    })
  }
  getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  }
  fetchProfile(cb) {
    this.auth0.client.userInfo(this.state.auth_access, (err, profile) => {
      profile.auth = {
        id: this.state.auth_id,
        access: this.state.auth_access
      }
      cb(err,profile)
    })
  }
  isProfileNew() {
    console.log('is profile new called')
    console.log(this.state.profile)
    if(this.state.profile) {
      axios.get('/api/person/checkById/' + this.state.profile.sub)
      .then(response => {
        console.log(response.data)
        if(response.data==null)
          this.setState({
            loading: false,
            newProfile: true
          })
        else
          this.handleExistingProfile()
      })
    }
  }
  async handleExistingProfile() {
    console.log('handle existing profile')
    this.props.addProfileToState(await this.refreshProfileAuth())
    this.props.history.push('/')
  }
  refreshProfileAuth() {
    return new Promise(resolve => {
      axios.post('/api/person/update',{
        id: this.state.profile.sub,
        update: {
          auth: {
            id: this.state.profile.auth.id,
            access: this.state.profile.auth.access
          }
        }
      })
      .then(function(response) {
        resolve(response.data)
      })
      .catch(function(error) {
        resolve(error)
      })
    })
  }
  createNewProfile(profile) {
    return new Promise(resolve => {
      axios.post('/api/person/create',profile)
      .then(function(response) {
        resolve(response.data.person)
      })
      .catch(function(error) {
        resolve(error)
      })
    })
  }
  isUsernameValid(username) {
    return new Promise(resolve => {
      axios.get('/api/person/check/' + username )
      .then(response => {
        if(response.data==='existing') {
          resolve(false)
        } if(response.data==='new') {
          resolve(true)
        }
      })
    })
  }
  async handleUsernameForm(username) {
    if(await this.isUsernameValid(username)) {
      /* local state */
      this.setState({
        loading: false,
        newProfile: false,
        submissionSuccess: true
      })
      /* redux state */
      this.props.addProfileToState(
        await this.createNewProfile({
          username: username,
          id: this.state.profile.sub,
          email: this.state.profile.email,
          firstName: this.state.profile.given_name,
          lastName: this.state.profile.family_name,
          picture: this.state.profile.picture,
          gender: this.state.profile.gender,
          auth: {
            id: this.state.profile.auth.id,
            access: this.state.profile.auth.access
          }
        })
      )
    } else {
      this.setState({
        loading: false,
        newProfile: true,
        submissionError: 'Username already exists :('
      })
    }
  }
  render() {
    if(this.state.loading)
      return(<h1>Loading...</h1>)
    if(this.state.newProfile)
      return(<CreateUsername
              firstName={this.state.profile.given_name}
              handleUsernameForm={this.handleUsernameForm}
              submissionError={this.state.submissionError}
             />)
    if(this.state.submissionSuccess)
      return(
        <Row>
          <Col>
            <Jumbotron>
              <h2>Glad to have you aboard the Good Ship Xtra,
              Captain {this.state.profile.family_name}!</h2>
            </Jumbotron>
          </Col>
        </Row>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProfileToState: (profile) => dispatch(addProfile(profile)),
  }
}

export default withRouter(
  connect(null,mapDispatchToProps)(SignInCallback)
)
