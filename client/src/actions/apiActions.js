import { GET_IMG_LINKS,
  GET_NEW_IMG_DATA,
  GET_SUGG_FROM_BACKEND,
  CLEAR_SUGG,
  GET_CHAPTERS } from './types';
import axios from 'axios';

export const getImgLinks = (chapter) => dispatch => {
  const url = `http://localhost:3000/manga/api/chapter/${chapter}`;
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

export const getSuggestionFromBackend = name => dispatch => {
  const encodedName = encodeURI(name);
  const url = `http://localhost:3000/manga/api/sugg/${encodedName}`;
  axios.get(url)
    .then(res => {
      dispatch({
        type: GET_SUGG_FROM_BACKEND,
        payload: res.data
      })
    })
}

export const clearSugg = () => dispatch => {
  dispatch({
    type: CLEAR_SUGG
  })
}

export const getChapters = mangaName => dispatch => {
  const url = `http://localhost:3000/manga/api/name/${mangaName}`
  axios.get(url)
    .then(res => {
      dispatch({
        type: GET_CHAPTERS,
        payload: res.data
      })
    })
}