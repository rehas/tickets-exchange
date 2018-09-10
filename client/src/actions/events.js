import * as request from 'superagent'
import {baseUrl} from '../constants'

console.log("events actions")
console.log(process)
console.log(process.env)

export const GET_EVENTS = 'GET_EVENTS'
export const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
export const FILTER_EVENTS = 'FILTER_EVENTS'

const getEventsSuccess = (events) => ({
  type: GET_EVENTS,
  payload: events
})

export const getEvents = () => (dispatch) =>{

  // filter only unfinished events
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() < 10 ? '0'+( date.getMonth() +1) : (date.getMonth() +1)
  const day = date.getDate()

  const today = year + '-' + month + '-' + day 

  console.log("events actions")
  console.log(process)
  console.log(process.env)
  console.log(baseUrl)


  request
    .get(`${baseUrl}/events`)
    .then(result=> result.body.filter(event=> event.end > today))
    .then(events=> dispatch(getEventsSuccess(events)))
    .catch(error => console.error(error))
}


const getEventSuccess = (event) => ({
  type: GET_SINGLE_EVENT,
  payload: event
})

const filterEventsAction = (str) =>({
  type: FILTER_EVENTS,
  payload: str
})

export const getEvent = (id) => (dispatch) =>{
  request
    .get(`${baseUrl}/events/${id}`)
    .then(result=> dispatch( getEventSuccess( result.body)))
    .catch(error => console.error(error))
}

export const createEvent = (title, picture, start, end) => (dispatch, getState) =>{
  const state = getState()
  if (!state.currentUserJWT) return null
  const jwt = state.currentUserJWT.jwt
  
  return request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({title, picture, start, end})
    .then(result=> dispatch(getEvents()))
    .catch(error=> console.error(error))

}

export const editEvent = (title, picture, start, end, eventid) => (dispatch, getState) =>{
  const state = getState()
  if (!state.currentUserJWT) return null
  const jwt = state.currentUserJWT.jwt
  
  return request
    .patch(`${baseUrl}/events/${eventid}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({title, picture, start, end})
    .then(result=> dispatch(getEvents()))
    .catch(error=> console.error(error))

}

export const deleteEvent = (eventid) => (dispatch, getState) =>{
  const state = getState()
  if (!state.currentUserJWT) return null
  const jwt = state.currentUserJWT.jwt
  
  return request
    .delete(`${baseUrl}/events/${eventid}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result=> dispatch(getEvents()))
    .catch(error=> console.error(error))
}

export const filterEvents = (str) => (dispatch, getState) =>{
  dispatch( filterEventsAction(str))
}