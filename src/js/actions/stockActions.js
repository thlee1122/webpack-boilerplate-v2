import * as types from './stockActionTypes';

export const getStockInfo = () => {
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
        endpoint: `https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10`,
        actionTypes: {
          success: types.GET_STOCK_INFO_SUCCESS,
          error: types.GET_STOCK_INFO_ERROR
        }
      }
    });
  }
}