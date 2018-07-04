import { GET_IMG_LINKS,
  GET_NEW_IMG_DATA,
  GET_SUGG_FROM_BACKEND,
  CLEAR_SUGG,
  GET_CHAPTERS,
  CLEAR_IMG
} from '../actions/types'
const initialState = {
  imgs: [],
  imgsData: [],
  suggestions: [],
  chapterData: {},
  referer: null
}

export default function(state = initialState, action) {

  switch (action.type) {    
    case GET_IMG_LINKS:
      return {
        ...state,
        imgs: action.payload.imgs,
        referer: action.payload.referer
      }
    case GET_NEW_IMG_DATA:
      const newImgsData = [...state.imgsData];
      newImgsData.push(action.payload);
      return {
        ...state,
        imgsData: newImgsData
      }
    case GET_SUGG_FROM_BACKEND:
      return {
        ...state,
        suggestions: action.payload
      }
    case CLEAR_SUGG:
      return {
        ...state,
        suggestions: []
      }
    case GET_CHAPTERS:
      return {
        ...state,
        chapterData: action.payload
      }
    case CLEAR_IMG:
      return {
        ...state,
        imgsData: []
      }

    default:
      return state;
  }
}
