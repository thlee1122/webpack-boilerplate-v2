import * as types from '../actions/newsTypes';

const initialState = {
  newNews: []
};

const getNewsAPIReducer = (state = initialState, action) => {
  debugger;
  
  switch(action.type) {
    case types.GET_NEWS_API_SUCCESS:
      debugger;
      return { ...state, newNews: action.data };
      
    case types.GET_NEWS_API_ERROR:
    	debugger;
      return { ...state, error: action.data };

    default: {
      return state;
    };
  };
};

export default getNewsAPIReducer;