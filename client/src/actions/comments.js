import * as request from 'superagent'
import {baseUrl} from '../constants'

import {GET_SINGLE_TICKET, getTicket} from './tickets'



export const addComment = (ticketid, body) => (dispatch, getState) =>{
  const state = getState()
  if (!state.currentUserJWT) return null
  const jwt = state.currentUserJWT.jwt
  
  return request
    .post(`${baseUrl}/tickets/${ticketid}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({body})
    .then(result=> dispatch(getTicket(null, ticketid)))
    .catch(error=> console.error(error))

}


export const deleteComment = (commentid, ticketid) => (dispatch, getState) =>{
  const state = getState()
  if (!state.currentUserJWT) return null
  const jwt = state.currentUserJWT.jwt
  
  return request
    .delete(`${baseUrl}/tickets/${ticketid}/comments/${commentid}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result=> dispatch(getTicket(null, ticketid)))
    .catch(error=> console.error(error))

}