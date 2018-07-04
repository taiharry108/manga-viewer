import { GET_IMG_LINKS,
  GET_NEW_IMG_DATA,
  GET_SUGG_FROM_BACKEND,
  CLEAR_SUGG,
  GET_CHAPTERS,
  CLEAR_IMG,
  ALLOW_GET_IMG,
  STOP_GET_IMG
} from '../actions/types'
const initialState = {
  imgs: [],
  imgsData: [],
  suggestions: [],
  chapterData: {},
  referer: null,
  shouldStopGettingImgs: {}
}

export default function(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ALLOW_GET_IMG:
      newState = {...state.shouldStopGettingImgs};
      newState[action.payload] = false;
      return {
        ...state,
        shouldStopGettingImgs: newState
      }
    case STOP_GET_IMG:
      newState = {};
      Object.keys(state.shouldStopGettingImgs).map(k => {
        newState[k] = true;
      })      
      return {
        ...state,
        shouldStopGettingImgs: newState
      }
    case GET_IMG_LINKS:
      return {
        ...state,
        imgs: action.payload.imgs,
        referer: action.payload.referer,        
      }
    case GET_NEW_IMG_DATA:    
      const newImgsData = [...state.imgsData];
      if (state.imgs.length !== 0)
        newImgsData.push(action.payload.imgData);
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
        imgsData: [],
        imgs: [],
        referer: null
      }

    default:
      return state;
  }
}
