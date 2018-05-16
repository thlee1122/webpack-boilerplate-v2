import * as types from '../actions/actionTypes';

const initialState = {
  newNews: [],
  fetchedNewsApiOrg: []
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

    case types.FETCH_NEWS_API_ORG_SUCCESS:
      debugger;
      return { ...state, fetchedNewsApiOrg: action.data };

    case types.FETCH_NEWS_API_ORG_ERROR:
      debugger;
      return { ...state, error: action.data };

    default: {
      return state;
    };
  };
};



export default getNewsAPIReducer;