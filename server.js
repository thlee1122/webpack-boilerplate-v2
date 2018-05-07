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

  const techCrunchURL = "https://techcrunch.com/2018/05/04/nsa-triples-metadata-collection-numbers-sucking-up-over-500-million-call-records-in-2017/";

  const businessInsiderURL = "http://www.businessinsider.com/tesla-elon-musk-is-acting-more-like-a-desperate-man-than-a-visionary-2018-5";

  const wiredURL = "https://www.wired.com/story/chinese-american-elites-lament-a-brewing-trade-war/";

  const techRadarURL = "https://www.techradar.com/news/google-io-2018";

  const bloombergURL = "https://www.bloomberg.com/news/articles/2018-05-02/tesla-projects-end-to-cash-burning-era-as-model-3-gains-traction";

  const telegraphURL = "https://www.telegraph.co.uk/science/2018/05/06/17-british-sperm-donors-have-fathered-500-children-figures-show/";

  var techCrunchNewsItems = {
    bodyOne: '',
    bodyTwo: ''
  };

  var BINewsContent = {};

  var wiredItems = {
    bodyOne: '',
    bodyTwo: ''
  };

  var techRadarItems = {
    bodyOne: '',
    bodyTwo: ''
  };

  var bloombergItems = {
    bodyOne: '',
    bodyTwo: ''
  };

  var telegraphItems = {
    bodyOne: '',
    bodyTwo: ''
  }

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

      request(businessInsiderURL, function(err, response, html) {
        var $ = cheerio.load(html);

        // BINewsItems.body = $('.post-content').children('div').children('ul').children('li').text();

        $('.post-content').children('div').children('ul').children('li').each(function(i, elem) {
          BINewsContent[i] = $(this).text();
        });

        data = BINewsContent;

        res.send(JSON.stringify(data));
      });

      break;

    case 'wired':

      request(wiredURL, function(err, response, html) {
        var $ = cheerio.load(html);

        if($('.article-body-component').children('div').children('p').eq(0).text().split(' ').length > 50) {
          wiredItems.bodyOne = $('.article-body-component').children('div').children('p').eq(0).text();
        } else {
          wiredItems.bodyOne = $('.article-body-component').children('div').children('p').eq(0).text();
          wiredItems.bodyTwo = $('.article-body-component').children('div').children('p').eq(1).text();
        }

        data = wiredItems;

        res.send(JSON.stringify(data));
      });

      break;

    case 'tech-radar':

      request(techRadarURL, function(err, response, html) {
        var $ = cheerio.load(html);


        if($('.content-wrapper').children('#article-body').children('p').eq(0).text().split(' ').length > 50) {
          techRadarItems.bodyOne = $('.content-wrapper').children('#article-body').children('p').eq(0).text();
        } else {
          techRadarItems.bodyOne = $('.content-wrapper').children('#article-body').children('p').eq(0).text();
          techRadarItems.bodyTwo = $('.content-wrapper').children('#article-body').children('p').eq(1).text();
        }

        data = techRadarItems;

        res.send(JSON.stringify(data));
      });

      break;

    case 'bloomberg':

      request(bloombergURL, function(err, response, html) {
        var $ = cheerio.load(html);

        if($('.main-column-v2').children('.body-columns').children('.middle-column').children('.body-copy-v2').children('p').eq(0).text().split(' ').length > 50) {
          bloombergItems.bodyOne = $('.main-column-v2').children('.body-columns').children('.middle-column').children('.body-copy-v2').children('p').eq(0).text();
        } else {
          bloombergItems.bodyOne = $('.main-column-v2').children('.body-columns').children('.middle-column').children('.body-copy-v2').children('p').eq(0).text();
          bloombergItems.bodyTwo = $('.main-column-v2').children('.body-columns').children('.middle-column').children('.body-copy-v2').children('p').eq(1).text();
        }
        
        data = bloombergItems;

        res.send(JSON.stringify(data));
      });

      break;

    case 'telegraph':

      request(telegraphURL, function(err, response, html) {
        var $ = cheerio.load(html);

        if($('.articleBodyText').children('.article-body-text').children('.component-content').children('p').eq(0).text().split(' ').length > 50) {
          telegraphItems.bodyOne = $('.articleBodyText').children('.article-body-text').children('.component-content').children('p').eq(0).text();
        } else {
          telegraphItems.bodyOne = $('.articleBodyText').children('.article-body-text').children('.component-content').children('p').eq(0).text();
          telegraphItems.bodyTwo = $('.articleBodyText').children('.article-body-text').children('.component-content').children('p').eq(1).text();
        }

        data = telegraphItems;

        res.send(JSON.stringify(data));
      });

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

