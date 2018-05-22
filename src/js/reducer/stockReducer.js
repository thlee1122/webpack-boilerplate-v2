import * as types from '../actions/stockActionTypes';

const initialState = {
  stockInfo: [],
};

const getStockInfoReducer = (state = initialState, action) => {
  debugger;
  
  switch(action.type) {
    case types.GET_STOCK_INFO_SUCCESS:
      debugger;
      return { ...state, stockInfo: action.data };
      
    case types.GET_STOCK_INFO_ERROR:
    	debugger;
      return { ...state, error: action.data };

    default: {
      return state;
    };
  };
};



export default getStockInfoReducer;