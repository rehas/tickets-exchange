import {GET_SINGLE_EVENT} from '../actions/events'

const initialState = null

export default function (state=initialState, {type, payload}){
  switch (type) {
    case GET_SINGLE_EVENT:
      return payload
  
    default:
      return state
  }
}