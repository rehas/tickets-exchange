import {GET_EVENTS, FILTER_EVENTS} from '../actions/events'

const initialState = []

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_EVENTS:
      return payload
  
    case FILTER_EVENTS:
      return state.filter(event=> event.title.toLowerCase().trim().includes(payload.toLowerCase().trim()))  
    default:
      return state
  }
}