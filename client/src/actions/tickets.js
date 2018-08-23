import * as request from 'superagent'
import {baseUrl} from '../constants'

export const GET_TICKETS_BY_EVENT = 'GET_TICKETS_BY_EVENT'
export const GET_SINGLE_TICKET = 'GET_SINGLE_TICKET'

const getTicketsByEventSuccess = (events) => ({
  type: GET_TICKETS_BY_EVENT,
  payload: events
})

export const getTicketsByEvent = (eventid) => (dispatch) =>{

  // filter only unfinished events
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() < 10 ? '0'+( date.getMonth() +1) : (date.getMonth() +1)
  const day = date.getDate()

  const today = year + '-' + month + '-' + day 

  request
    .get(`${baseUrl}/event/${eventid}/tickets`)
    // .then(result=> {console.log(result); console.log(today, result.body.filter(event=> { console.log(event.end, today, event.end > today); return event.end.toString() > today})) ; return result.body.filter(event=> event.end > today)})
    .then(result=> result.body.filter(event=> event.end > today))
    .then(events=> dispatch(getTicketsByEventSuccess(events)))
    .catch(error => console.error(error))
}


const getTicketSuccess = (ticket) => ({
  type: GET_SINGLE_TICKET,
  payload: ticket
})

export const getTicket = (eventid, ticketid) => (dispatch) =>{
  console.log("@ get ticket action dispatcher")
  request
    .get(`${baseUrl}/tickets/${ticketid}/risk`)
    // .then(result=> {console.log(result); console.log(today, result.body.filter(event=> { console.log(event.end, today, event.end > today); return event.end.toString() > today})) ; return result.body.filter(event=> event.end > today)})
    .then(result=> dispatch( getTicketSuccess( result.body)))
    .catch(error => console.error(error))
}