var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

// var url = "https://www.reddit.com/top";
// var url = "https://www.nytimes.com/";
var url = "https://www.huffingtonpost.com/entry/rudy-giuliani-donald-trump-james-comey-fired_us_5aea7082e4b022f71a04e62a";

// window.items = [];
let __homeglobals = [];


request(url, function(err, response, html) {
  if(!err) {
    var $ = cheerio.load(html);

    // var allItems = $("#shell").children();
    var newItems = {
      title: ''
    };
    
    // var allItems = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();
    newItems.title = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();

    var items = [];

    // allItems.each(function(index) {
    //   items.push($("#shell").children());
    // });

    // var heading = $(".story-heading").children();

    // console.log(items);
    // window.items.push(allItems);
    // __homeglobals.push(allItems);
    

    // console.log(__homeglobals);
    
    console.log(newItems);
    // console.log(allItems);
    // console.log(heading);
  }
});

// app.get('/api', function(req, res) {

//   var url = "https://www.huffingtonpost.com/entry/rudy-giuliani-donald-trump-james-comey-fired_us_5aea7082e4b022f71a04e62a";

//   let data = '';

//   var newItems = {
//     title: ''
//   };

//   request(url, function(err, response, html) {
//     var $ = cheerio.load(html);

//     // var allItems = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();
//     // data = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();

//     newItems.title = $(".desktop").children('.main').children('#main').children('.entry').children('.entry__header').children('.js-headline').children('.headline__title').text();
//     data = newItems;
//     // var items = [];

//     // __homeglobals.push(allItems);
//     res.send(JSON.stringify(data));
//   });

// });

app.get('/news/:newsName', function(req, res) {
  // console.log(req.params.newsName);
  // console.log(typeof req.params.newsName);

  var data = "";

  var techCrunchURL = "https://techcrunch.com/2018/05/04/nsa-triples-metadata-collection-numbers-sucking-up-over-500-million-call-records-in-2017/";

  var techCrunchNewsItems = {
    bodyOne: '',
    bodyTwo: ''
  };

  switch(req.params.newsName) {
    case 'tech-crunch':

      request(techCrunchURL, function(err, response, html) {
        var $ = cheerio.load(html);

        if($('.article-content').children('p').eq(0).text().split(' ').length > 50) {
          techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
        } else {
          techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
          techCrunchNewsItems.bodyTwo = $('.article-content').children('p').eq(1).text();
        }
          
        data = techCrunchNewsItems;

        res.send(JSON.stringify(data));
      });

      break;

    case 'business-insider':
      data = 'business-insider';
      break;
    default:
      data = 'Please type in correct news source';
      break;
  }
});

// app.get('/api/tech-crunch', function(req, res) {

//   var url = "https://techcrunch.com/2018/05/04/nsa-triples-metadata-collection-numbers-sucking-up-over-500-million-call-records-in-2017/";

//   let data = "";

//   var techCrunchNewsItems = {
//     bodyOne: '',
//     bodyTwo: ''
//   };

//   request(url, function(err, response, html) {
//     var $ = cheerio.load(html);

//     if($('.article-content').children('p').eq(0).text().split(' ').length > 50) {
//       techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
//     } else {
//       techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
//       techCrunchNewsItems.bodyTwo = $('.article-content').children('p').eq(1).text();
//     }
      
//     data = techCrunchNewsItems;

//     res.send(JSON.stringify(data));
//   });
// });

var server = app.listen(8082, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});


// 1. express
// 2. app.get('/api') -> do line 13 to line 46 in that route
// 3. spit out in json format

