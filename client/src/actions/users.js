import * as request from 'superagent'
import {baseUrl} from '../constants'
import {isExpired, userId } from '../jwt'

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USERS = 'UPDATE_USERS'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'


export const logout = () => ({
  type: USER_LOGOUT
})

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const setCurrentUserDetails = (user) =>({
  type: SET_CURRENT_USER,
  payload: user
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'Unknown error'
})

const userSignupFailed = (error) => ({
  type: USER_SIGNUP_FAILED,
  payload: error || 'Unknown error'
})

const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const updateUsers = (users) => ({
  type: UPDATE_USERS,
  payload: users
})

export const login = (email, password) => (dispatch) =>
	request
		.post(`${baseUrl}/logins`)
    .send({email, password})
    .then(result => {
      dispatch(userLoginSuccess(result.body));
    })
    .then(_ => dispatch(getCurrentUser()))
    .catch(err => {
    	if (err.status === 400) {
    		dispatch(userLoginFailed(err.response.body.message))
    	}
    	else {
    		console.error(err)
    	}
    })

export const signup = (email, password, fullName, adminCheck) => (dispatch) =>{

  const isAdmin = (adminCheck === 'sadmin') ? true : false

 return request
  .post(`${baseUrl}/users`)
  .query({ isAdmin: isAdmin })
  .send({ fullName, password, email})
  .then(result => {
    dispatch(userSignupSuccess());
    dispatch(login(email, password))
  })
  .catch(err => {
    if (err.status === 400) {
      dispatch(userSignupFailed(err.response.body.message))
      alert(err.response.body.message)
    }
    else {
      console.error(err)
    }
  })
}

export const getUsers = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateUsers(result.body)))
    .catch(err => console.error(err))
}

export const getCurrentUser = () => (dispatch, getState) =>{
  const jwt = getState().currentUserJWT.jwt
  const id = userId(jwt)
  request
    .get(`${baseUrl}/users/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(setCurrentUserDetails(result.body)))
    .catch(e=> console.err(e))
}
