import { TOGGLE_SIDEBAR
} from '../actions/types'
const initialState = {
  sidebarIsShown: false
}

export default function(state = initialState, action) {

  switch (action.type) {    
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarIsShown: !state.sidebarIsShown
      }
    default:
      return state;
    }
}