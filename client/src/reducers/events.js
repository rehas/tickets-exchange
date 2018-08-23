import {GET_EVENTS} from '../actions/events'

const initialState = []

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_EVENTS:
      return payload
  
    default:
      return state
  }
}