import {
  GET_PROFILE,
  GET_USER_IMAGE,
  LOGIN_USER,
  SIGNUP_USER,
  GET_RESTAURANTS,
  GET_RESTAURANT_DETAILS,
  GET_RESTAURANT_MENU,
  GET_RESTAURANT_SECTIONS,
  GET_SECTIONS_MENU,
  USER_ORDER,
  GET_USER_ORDER,
  GET_USER_PAST_ORDERS
} from '../actions'

export default function (state ={}, action) {
  // let newState = { ...state }
  switch (action.type) {
    case GET_PROFILE:
      return action.payload
    case GET_USER_IMAGE:
      return action.payload
    case LOGIN_USER:
      // newState = action.payload;
      // console.log(action.payload.token);
      // newState.token = action.payload.token
      // console.log(action.payload.status);
      // if (action.payload.status === 200) {
      //   console.log(action.payload.status);
      //   sessionStorage.setItem("JWT", newState.token);
      // }
      // console.log(newState);
      // return newState;
      return action.payload
    case SIGNUP_USER:
      return action.payload
    case GET_RESTAURANTS:
      return action.payload
    case GET_RESTAURANT_DETAILS:
      return action.payload
    case GET_RESTAURANT_MENU:
      return action.payload
    case GET_RESTAURANT_SECTIONS:
      return action.payload
    case GET_SECTIONS_MENU:
      return action.payload
    case USER_ORDER:
      return action.payload
    case GET_USER_ORDER:
      return action.payload
    case GET_USER_PAST_ORDERS:
      return action.payload

    // case ERROR:
    //   return action.payload

    default:
      return { ...state }
  }
}
