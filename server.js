var request = require('request');
var cheerio = require('cheerio');

// var url = "https://www.reddit.com/top";
// var url = "https://www.nytimes.com/";
var url = "https://www.huffingtonpost.com/entry/rudy-giuliani-donald-trump-james-comey-fired_us_5aea7082e4b022f71a04e62a";

// window.items = [];

request(url, function(err, response, html) {
  if(!err) {
    var $ = cheerio.load(html);

    // var allItems = $("#shell").children();
    
    var allItems = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();

    var items = [];

    // allItems.each(function(index) {
    //   items.push($("#shell").children());
    // });

    // var heading = $(".story-heading").children();

    // console.log(items);
    // window.items.push(allItems);
    console.log(allItems);
    // console.log(heading);
  }
});