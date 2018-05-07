import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import keenImage from '../assets/keen-v3.png'; // Importing image -> ADDED IN THIS STEP
// var request = require('request');
// var cheerio = require('cheerio');
// _ = require('underscore');

//do axios to get the stuffs from /api


export default class Hello extends Component {
// var url = "https://www.reddit.com/top";
// var url = "https://www.nytimes.com/";

// window.items = [];
// let __homeglobals = [];

// componentDidMount() {
//   this.scrapWebsite();
// };

// scrapWebsite() {
//   var url = "https://www.huffingtonpost.com/entry/rudy-giuliani-donald-trump-james-comey-fired_us_5aea7082e4b022f71a04e62a";
  
//   request(url, function(err, response, html) {
    
//     if(!err) {
//       var $ = cheerio.load(html);

//       // var allItems = $("#shell").children();
      
//       var allItems = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();

//       var items = [];

//       // allItems.each(function(index) {
//       //   items.push($("#shell").children());
//       // });

//       // var heading = $(".story-heading").children();

//       // console.log(items);
//       // window.items.push(allItems);
//       __homeglobals.push(allItems);
      

//       console.log(__homeglobals);
      
//       // console.log(allItems);
//       // console.log(heading);
//     }
//   });
// };

  render() {
    // console.log(window.items);
    // console.log(__homeglobals);
    return (
      <div>
        Hello from react
        {/* <img src={ keenImage } alt='Commander Keen' /> */}
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));