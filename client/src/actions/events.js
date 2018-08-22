import * as request from 'superagent'
import {baseUrl} from '../constants'

export const GET_EVENTS = 'GET_EVENTS'
export const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'

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

  request
    .get(`${baseUrl}/events`)
    // .then(result=> {console.log(result); console.log(today, result.body.filter(event=> { console.log(event.end, today, event.end > today); return event.end.toString() > today})) ; return result.body.filter(event=> event.end > today)})
    .then(result=> result.body.filter(event=> event.end > today))
    .then(events=> dispatch(getEventsSuccess(events)))
    .catch(error => console.error(error))
}


const getEventSuccess = (event) => ({
  type: GET_SINGLE_EVENT,
  payload: event
})

export const getEvent = (id) => (dispatch) =>{
  request
    .get(`${baseUrl}/events/${id}`)
    // .then(result=> {console.log(result); console.log(today, result.body.filter(event=> { console.log(event.end, today, event.end > today); return event.end.toString() > today})) ; return result.body.filter(event=> event.end > today)})
    .then(result=> dispatch( getEventSuccess( result.body)))
    .catch(error => console.error(error))
}