import { GET_IMG_LINKS, GET_NEW_IMG_DATA } from './types';
import axios from 'axios';

export const getImgLinks = (chapter) => dispatch => {
  const url = `http://localhost:3000/manga/api/chapter/${chapter}`
  axios.get(url)
  .then(res => {
      dispatch({
      type: GET_IMG_LINKS,
      payload: {
      	imgs:res.data,
      	referer:`https://www.manhuaren.com/${chapter}/`
      }
    })
  })
  
}

export const getNewImageData = (imgData) => dispatch => {
  dispatch({
    type: GET_NEW_IMG_DATA,
    payload: imgData
  });
}