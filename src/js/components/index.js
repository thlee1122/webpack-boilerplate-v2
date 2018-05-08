import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import * as AllNewsApiActions from '../actions/newsApiActions';


import axios from 'axios';

import '../../css/style.css';

class App extends Component {
// var url = "https://www.reddit.com/top";
// var url = "https://www.nytimes.com/";

// window.items = [];
// let __homeglobals = [];

  constructor() {
    super();
    // this.textFields = {};
    // this.dropDown = {};
    // this.newErrors = {...this.state.errors};
    // this.formInfo = {
    //   customfields: [],
    //   radioButtonValue:[]
    // };

    this.techCrunchNewsDate = '';
  }

  // componentDidMount() {
  //   axios.get(`http://localhost:8082/news/tech-crunch`)
  //     .then(res => {
  //       const data = res.data;
  //       // this.setState({
  //       //   techCrunchNewsDate: data
  //       // });

  //       this.techCrunchNewsDate = data;
  //     });
  // }

  componentDidMount() {
  	this.props.getNewsApi();
  	debugger;
  }

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

    // console.log(this.techCrunchNewsDate);
    console.log(this.props);


    return (
      <div>
        <p>Hello from react</p>
        <p>Sample Testing</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    newNews: state.newNews
});


export default connect(mapStateToProps, {
  ...AllNewsApiActions
})(App);
