import {GET_IMG_LINKS} from '../actions/types'
const initialState = {
  imgs: []
}

export default function(state = initialState, action) {

  switch (action.type) {    
    case GET_IMG_LINKS:
      return {
        ...state,
        imgs: action.payload
      }
    default:
      return state;
  }
}
