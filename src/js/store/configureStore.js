import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMiddleware from './apiMiddleware';

import NewsApiReducer from '../reducers/newsApiReducer.js';

const reducers = combineReducers({
	routing: routerReducer,
	newNews: NewsApiReducer
});

export default function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware))
  );
  return store;
}


// const rootReducer = combineReducers({
//   newNews: NewsApiReducer
// });