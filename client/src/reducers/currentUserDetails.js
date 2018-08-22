import {SET_CURRENT_USER, USER_LOGOUT} from '../actions/users'

const initialState = null

export default function (state = initialState, {type, payload}) {
	switch (type) {
		case SET_CURRENT_USER:
      return payload
    
    case USER_LOGOUT:
      return initialState

		default:
      return state
	}
}