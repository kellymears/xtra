import React, { Component } from 'react';
import decode from 'jwt-decode'
import auth0 from 'auth0-js'

class Auth extends Component {
  auth0 = new auth0.WebAuth({
    domain: 'xtrarad.auth0.com',
    clientID: `oAfmxY0WUVFXYrZDkT7tvc8zWz-pKnA-`,
    redirectUri: 'http://10.0.0.62:3000/sign-in',
    audience: 'https://xtrarad.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid email profile'
  })
  constructor() {
    super()
  }
  login() {
    this.auth0.authorize()
  }
  logout() {
    this.clearIdToken()
    this.clearAccessToken()
    window.location.href = "https://xtrarad.auth0.com/v2/logout?returnTo=http%3A%2F%2F10.0.0.62%3A3000%2Fsign-out"
  }
  getIdToken() {
    return localStorage.getItem('id_token')
  }
  clearIdToken() {
    localStorage.removeItem('id_token')
  }
  clearAccessToken() {
    localStorage.removeItem('access_token')
  }
  getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  }
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken)
      throw new Error('No access token found')
    return accessToken
  }
  setAccessToken() {
    let accessToken = this.getParameterByName('access_token')
    if(accessToken)
      localStorage.setItem('access_token', accessToken)
  }
  setIdToken() {
    let idToken = this.getParameterByName('id_token')
    if(idToken)
      localStorage.setItem('id_token', idToken)
  }
  isLoggedIn() {
    const idToken = this.getIdToken();
    return !!idToken && !this.isTokenExpired(idToken)
  }
  getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken)
    if (!token.exp)
      return null
    const date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date
  }
  isTokenExpired(token) {
    const expirationDate = this.getTokenExpirationDate(token)
    return expirationDate < new Date()
  }
  getProfile(cb) {
    let accessToken = this.getAccessToken()
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      cb(err,profile)
    })
  }
  render() {
    return null
  }
}

export default Auth
