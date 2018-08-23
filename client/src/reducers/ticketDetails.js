import {GET_SINGLE_TICKET} from '../actions/tickets'

const initialState = null

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_SINGLE_TICKET:
      return payload
  
    default:
      return state
  }
}