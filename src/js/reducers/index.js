import { combineReducers } from 'redux';
import NewsApiReducer from './newsApiReducer.js';

const rootReducer = combineReducers({
  newNews: NewsApiReducer
});

export default rootReducer;
