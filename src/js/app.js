import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { JssProvider } from 'react-jss';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import rootReducer from './reducers';

import App from './components/index';

import configureStore from './store/configureStore';

const initialState = {};

const store = configureStore(initialState);

// const history = syncHistoryWithStore(browserHistory, store);

// const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

// render(
//   <Provider store={createStoreWithMiddleware(rootReducer)}>
//     <App />
//   </Provider>, 
//   document.getElementById('app')
// );

/* Redux 'Provider' component only allows 1 child. this is a way around this */
// const App = ({children}) => children;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <App>
//       <UserPermissions />
//       <JssProvider jss={jss}>
//         <Router history={history} routes={routes} />
//       </JssProvider>
//     </App>
//   </Provider>, document.getElementById('app-root')
// );