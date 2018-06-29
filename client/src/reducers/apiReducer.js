import {GET_IMG_LINKS, GET_NEW_IMG_DATA} from '../actions/types'
const initialState = {
  imgs: [],
  imgsData: [],
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
      console.log(action.payload);
      const newImgsData = [...state.imgsData];
      newImgsData.push(action.payload);
      return {
        ...state,
        imgsData: newImgsData
      }
    default:
      return state;
  }
}
