import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import axios from 'axios';

import '../css/style.css';

import MainIndex from './components/index';

import configureStore from './store/configureStore';

const initialState = {};

const store = configureStore(initialState);

// export default class Hello extends Component {

//   render() {
//     // console.log(window.items);
//     // console.log(__homeglobals);

//     console.log(this.techCrunchNewsDate);


//     return (
//       <div>
//         Hello from react
//         {/* <img src={ keenImage } alt='Commander Keen' /> */}
//       </div>
//     );
//   }
// }

ReactDOM.render(
  <Provider store={store}>
    <MainIndex />
  </Provider>,
  document.getElementById('app')
);

// render(<Hello />, document.getElementById('app'));