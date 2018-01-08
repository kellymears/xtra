import axios from 'axios'
import auth0 from 'auth0-js'
import decode from 'jwt-decode'
// import Auth from '../util/auth'

const auth = new auth0.WebAuth({
  domain: 'xtrarad.auth0.com',
  clientID: `oAfmxY0WUVFXYrZDkT7tvc8zWz-pKnA-`,
  redirectUri: 'http://localhost:3000/sign-in',
  audience: 'https://xtrarad.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid email profile'
})

function signInAction() {
  return {
    type: 'SIGN_IN'
  }
}

export function signIn(){
  return (dispatch) => {
      dispatch(signInAction())
    auth.authorize()
  }
}

export function signOut(){
  return (dispatch) => {
    localStorage.removeItem('state')
    dispatch(removeState())
  }
}

export function authenticate() {
  return (dispatch, getState) => {
    const profile = getState().profile.data
    if(!profile.auth.id && isTokenExpired(profile.auth.id))
      signOut()
  }
}

function addState(profile) {
  return {
    type: 'SIGN_IN',
    profile: profile
  }
}

export function addProfile(profile) {
  return (dispatch) => {
    dispatch(addState(profile))
  }
}

function removeState() {
  return {
    type: 'SIGN_OUT',
    data: undefined
  }
}

export function removeProfile() {
  return (dispatch) => {
    dispatch(removeState())
  }
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp)
    return null
  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
