import { GET_IMG_LINKS,
  GET_NEW_IMG_DATA,
  GET_SUGG_FROM_BACKEND,
  CLEAR_SUGG,
  GET_CHAPTERS,
  CLEAR_IMG,
  ALLOW_GET_IMG,
  STOP_GET_IMG } from './types';
import axios from 'axios';

export const getImgLinks = (chapter) => dispatch => {
  const url = `${SERVER_URL}manga/api/chapter/${chapter}`;
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

export const getNewImageData = (imgData, referer) => dispatch => {
  dispatch({
    type: GET_NEW_IMG_DATA,
    payload: {imgData, referer}
  });
}

export const getSuggestionFromBackend = name => dispatch => {
  const encodedName = encodeURI(name);
  const url = `${SERVER_URL}manga/api/sugg/${encodedName}`;
  console.log(url);
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
  const url = `${SERVER_URL}manga/api/name/${mangaName}`
  axios.get(url)
    .then(res => {
      dispatch({
        type: GET_CHAPTERS,
        payload: res.data
      })
    })
}

export const clearImages = () => dispatch => {
  dispatch({
    type: CLEAR_IMG
  })
}

export const stopGetImage = () => dispatch => {
  dispatch({
    type: STOP_GET_IMG,
  })
}

export const allowGetImage = (referer) => dispatch => {
  dispatch({
    type: ALLOW_GET_IMG,
    payload: referer
  })
}