import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import keenImage from '../assets/keen-v3.png'; // Importing image -> ADDED IN THIS STEP

export default class Hello extends Component {

  render() {
    console.log(window.items);

    return (
      <div>
        Hello from react
        {/* <img src={ keenImage } alt='Commander Keen' /> */}
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));