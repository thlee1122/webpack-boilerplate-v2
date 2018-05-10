// import { API_URL } from '../../constants';

// export const SET_CHARACTERS = "SET_CHARACTERS";

// export function getCharacters() {
// 	return dispatch => 
// }

import * as types from './actionTypes';

const API_KEY = "6c78608600354f199f3f13ddb0d1e71a";

export const getNewsApi = () => {
  debugger;
  return (dispatch, getState) => {
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        service: 'news',
     //    mode: 'cors',
	    // headers:{
	    //     'Access-Control-Allow-Origin':'*'
	    // },
        endpoint: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`,
        actionTypes: {
          success: types.GET_NEWS_API_SUCCESS,
          error: types.GET_NEWS_API_ERROR
        }
      }
    });
  }
}