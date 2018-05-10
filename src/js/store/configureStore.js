import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';
import apiMiddleware from './apiMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';


export default function configureStore() {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(thunk)
    composeWithDevTools(applyMiddleware(thunk, apiMiddleware))
  );
}