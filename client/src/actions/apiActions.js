import { GET_IMG_LINKS } from './types';
import axios from 'axios';

export const getImgLinks = (chapter) => dispatch => {
  const url = `http://localhost:3000/manga/api/chapter/${chapter}`
  axios.get(url)
  .then(res => {
      dispatch({
      type: GET_IMG_LINKS,
      payload: res.data
    })
  })
  
}