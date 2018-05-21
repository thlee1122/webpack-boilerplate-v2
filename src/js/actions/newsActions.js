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
        endpoint: `http://localhost:8082/news/tech-crunch`,
        actionTypes: {
          success: types.GET_NEWS_API_SUCCESS,
          error: types.GET_NEWS_API_ERROR
        }
      }
    });
  }
}

export const getNewsDesc = (newsSourceName) => {
  debugger;

  return (dispatch, getState) => {
    dispatch({
      type: 'API_REQUEST',
      options: {
        method: 'GET',
        service: 'news',
        endpoint: `http://localhost:8082/news/news-desc/${newsSourceName}`,
        actionTypes: {
          success: types.FETCH_NEWS_DESC_SUCCESS,
          error: types.FETCH_NEWS_DESC_SUCCESS
        }
      }
    });
  }
}

export const fetchNewsApiOrg = (newsSourceName) => {
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
        // endpoint: `http://localhost:8082/news/api/tech-crunch`,
        endpoint: `http://localhost:8082/news/api/${newsSourceName}`,
        actionTypes: {
          success: types.FETCH_NEWS_API_ORG_SUCCESS,
          error: types.FETCH_NEWS_API_ORG_ERROR
        }
      }
    });
  }
}