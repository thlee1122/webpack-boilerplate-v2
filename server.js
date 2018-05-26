var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var cors = require('cors');
var proxy = require('http-proxy-middleware');



// var url = "https://www.reddit.com/top";
// var url = "https://www.nytimes.com/";
var url = "https://www.huffingtonpost.com/entry/rudy-giuliani-donald-trump-james-comey-fired_us_5aea7082e4b022f71a04e62a";

// window.items = [];
let __homeglobals = [];

app.use(cors({credentials:true, origin: 'http://localhost:8080'}));
// app.use(cors({credentials:true, origin: 'http://localhost:8081'}));
// app.use(cors({credentials:true, origin: 'http://localhost:8082'}));
app.set("jsonp callback", true);


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080/");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/api', proxy({target: 'https://newsapi.org/v2'}));


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
    
    // console.log(newItems);
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


let articleUrlArray = [];
// let articleUrlArray = ['https://techcrunch.com/2018/05/19/shared-housing-startups-are-taking-off/',];
// let articleUrlArray = [ 'https://techcrunch.com/2018/05/19/shared-housing-startups-are-taking-off/',
//   'https://techcrunch.com/2018/05/19/shared-housing-startups-are-taking-off/',
//   'https://techcrunch.com/2018/05/19/my-data-request-lists-guides-to-get-data-about-you/',
//   'https://techcrunch.com/2018/05/19/siempos-new-app-will-break-your-smartphone-addiction/',
//   'https://techcrunch.com/2018/05/19/la-belle-vie-wants-to-compete-with-amazon-prime-now-in-paris/',
//   'https://techcrunch.com/2018/05/19/apple-started-paying-15-billion-european-tax-fine/',
//   'https://techcrunch.com/2018/05/19/original-content-dear-white-people/',
//   'https://techcrunch.com/2018/05/19/meet-the-judges-for-the-tc-startup-battlefield-europe-at-vivatech/',
//   'https://techcrunch.com/2018/05/18/nasas-newest-planet-hunting-satellite-takes-a-stellar-first-test-image/',
//   'https://techcrunch.com/video-article/turning-your-toys-into-robots-with-circuit-cubes/',
//   'https://techcrunch.com/2018/05/18/does-googles-duplex-violate-two-party-consent-laws/' ];

//fetch news by category
// app.get('/news/api/:newsName', function(req, res) {
//   const API_KEY = '6c78608600354f199f3f13ddb0d1e71a';

//   let data = '';

//   // const techCrunchURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
//   // const techCrunchURL = `https://newsapi.org/v2/everything?sources=techcrunch&apiKey=${API_KEY}`
//   const techCrunchURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
//   // const techCrunchURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&page=30&pageSize=30&apiKey=${API_KEY}`;

//   const businessInsiderURL = `https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=${API_KEY}`

//   let fetchedTechCrunchNews = {
//     totalResults: '',
//     articles: ''
//   };


//   let techCrunchObj = {
//     articlesInfo: ''
//   };

//   switch(req.params.newsName) {
//     case 'tech-crunch':
//       request(techCrunchURL, function(err, response, html) {
//         // var $ = cheerio.load(html);

//         // if($('.article-content').children('p').eq(0).text().split(' ').length > 50) {
//         //   techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
//         // } else {
//         //   techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
//         //   techCrunchNewsItems.bodyTwo = $('.article-content').children('p').eq(1).text();
//         // }
        
//         let formattedData = JSON.parse(response.body);

//         // console.log(formattedData);
//         // console.log(formattedData.status);
//         // console.log(formattedData.totalResults);

//         // newsArticles = formattedData.articles;



//         // console.log(formattedData.articles);
//         // console.log(typeof formattedData.articles);
//         // console.log(newsArticles[0].url);

//         for(let i = 0; i < formattedData.articles.length; i++) {
//           articleUrlArray.push(formattedData.articles[i].url);
//         }

//         console.log(articleUrlArray);
        
//         // fetchedTechCrunchNews.totalResults = response.body.totalResults;
//         // fetchedTechCrunchNews.articles = response.body.articles;

//         // console.log(fetchedTechCrunchNews);
//         // console.log(response.body);
//         // console.log(typeof response.body);
//         // console.log(JSON.parse(response.body));
//         // console.log(JSON.parse(response.body).status);
//         // console.log(response.body.status);

//         data = response.body;
//         // data = fetchedTechCrunchNews;
//         // data = techCrunchNewsItems;
//         // console.log(response);
//         // console.log(response.body);
//         // console.log(response.body.status);
//         // console.log(JSON.stringify(response));

//         // res.send(JSON.stringify(data));
//         res.setHeader('Content-Type', 'application/json');
//         res.send(data);
//         // res.end(data);
//       });
//       break;

//     case 'business insider':
//       request(businessInsiderURL, function(err, response, html) {
//         let formattedData = JSON.parse(response.body);

//         data = response.body;

//         res.setHeader('Content-Type', 'application/json');
//         res.send(data);
//         // res.end();
//       });
//       break;

//     default:
//       data = 'Please type in correct news source';
//       break;
//   }
// })

function getNewsNames(newsName, callback) {
    const API_KEY = '6c78608600354f199f3f13ddb0d1e71a';
    let data = '';
    const techCrunchURL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
    const wiredURL = `https://newsapi.org/v2/top-headlines?sources=wired&apiKey=${API_KEY}`

    switch (newsName) {
        case 'tech-crunch':
            request(techCrunchURL, function (err, response, html) {

                if(articleUrlArray.length !== 0) {
                  articleUrlArray = [];
                }

                let formattedData = JSON.parse(response.body);

                for (let i = 0; i < formattedData.articles.length; i++) {
                    articleUrlArray.push(formattedData.articles[i].url);
                }

                data = response.body;
                callback(null, data);
            });

            break;

        case 'wired':
          request(wiredURL, function (err, response, html) {

                if(articleUrlArray.length !== 0) {
                  articleUrlArray = [];
                }

                let formattedData = JSON.parse(response.body);

                for (let i = 0; i < formattedData.articles.length; i++) {
                    articleUrlArray.push(formattedData.articles[i].url);
                }

                data = response.body;
                callback(null, data);
            });

            break;

        default:
            data = 'Please type in correct news source';
            callback('Error', data);
            break;
    }
}

app.get('/news/api/:newsName', function (req, res) {

    getNewsNames(req.params.newsName, (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
        }

        return res.send(data);
    })
})

app.get('/stock/:stockTicker', function (req, res) {
  const stock_info_api_url = `https://api.iextrading.com/1.0/stock/${req.params.stockTicker}/batch?types=quote,news,chart&range=1m&last=10`;

  request(stock_info_api_url, function (err, response, html) {
    data = response.body;

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
    // res.end();
  });
});

app.get('/stock/financial/:stockTicker', function (req, res) {
  const stock_financial_api_url = `https://api.iextrading.com/1.0/stock/${req.params.stockTicker}/financials`;

  request(stock_financial_api_url, function (err, response, html) {
    data = response.body;

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});


app.get('/news/news-desc/:newsName', (req, res) => {
    const checkBody = res => (err, response, html) => {
        const $ = cheerio.load(html);
        let articleContent = '';
        let bodyOne = '';
        let bodyTwo = '';
        const isExtensive = bodyOne.split(' ').length > 50

        switch(req.params.newsName) {
          case 'tech-crunch':

            articleContent = $('.article-content').children('p')
            bodyOne = articleContent.eq(0).text()
            bodyTwo = articleContent.eq(1).text()

            res(isExtensive ? { bodyOne } : { bodyOne, bodyTwo })
            
            break;

          case 'wired':
            // const $ = cheerio.load(html);
            articleContent = $('.article-body-component').children('div').children('p');
            bodyOne = articleContent.eq(0).text();
            bodyTwo = articleContent.eq(1).text();
            // const isExtensive = bodyOne.split(' ').length > 50;
            res(isExtensive ? { bodyOne } : { bodyOne, bodyTwo })

            break;

          default:
            res('wrong news source name');
            break;
        }

    }

    const getArticle = article => new Promise(res => request(article, checkBody(res)));

    getNewsNames(req.params.newsName, (err, data) => {
        // by now, the articleUrlArray array will be filled
        Promise.all(articleUrlArray.map(getArticle)).then(data => res.send(JSON.stringify(data)))
    })
})


// app.get('/news/news-desc', (req, res) => {
//     const checkBody = res => (err, response, html) => {
//         const $ = cheerio.load(html);
//         const articleContent = $('.article-content').children('p')
//         const bodyOne = articleContent.eq(0).text()
//         const bodyTwo = articleContent.eq(1).text()
//         const isExtensive = bodyOne.split(' ').length > 50
//         res(isExtensive ? { bodyOne } : { bodyOne, bodyTwo })
//     }

//     const getArticle = article => new Promise(res => request(article, checkBody(res)))

//     Promise.all(articleUrlArray.map(getArticle)).then(data => res.send(JSON.stringify(data)))
// })

// const checkBody = (err, response, html) => {
//     const $ = cheerio.load(html);
//     const articleContent = $('.article-content').children('p')
//     const bodyOne = articleContent.eq(0).text()
//     const bodyTwo = articleContent.eq(1).text()
//     const isExtensive = bodyOne.split(' ').length > 50
//     // console.log(bodyOne);
//     // console.log(bodyTwo);

//     return isExtensive ? { bodyOne } : { bodyOne, bodyTwo }

// }

// const getArticle = article => request(article, checkBody)

// app.get('/news/news-desc', (req, res) => {

//     Promise.all(articleUrlArray.map(article => checkBody(article))).then(data => res.send(JSON.stringify(data)));

//     // Promise.all(articleUrlArray.map(getArticle)).then(data => res.send(JSON.stringify(data)))
// })

// for(var i = 0; i < articleUrlArray.length-1; i++) {
//   app.get('/news/news-desc', function(req, res) {

//     var data = '';

//     // var techCrunchNewsItems = {
//     //   bodyOne: '',
//     //   bodyTwo: ''
//     // };

//     var techCrunchNewsItems = [];

//     request( articleUrlArray[i], function(err, response, html) {
//       var $ = cheerio.load(html);

//       if($('.article-content').children('p').eq(0).text().split(' ').length > 50) {

//         techCrunchNewsItems.push({
//           bodyOne: $('.article-content').children('p').eq(0).text()
//         });
//         // techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
//       } else {
//         // techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
//         // techCrunchNewsItems.bodyTwo = $('.article-content').children('p').eq(1).text();

//         techCrunchNewsItems.push({
//           bodyOne: $('.article-content').children('p').eq(0).text(),
//           bodyTwo: $('.article-content').children('p').eq(1).text()
//         });
//       }
        
//       data = techCrunchNewsItems;

//       res.send(JSON.stringify(data));
//     });
//   })
// }

  // app.get('/news/news-desc', function(req, res) {

  //   var data = '';

  //   // var techCrunchNewsItems = {
  //   //   bodyOne: '',
  //   //   bodyTwo: ''
  //   // };

  //   var techCrunchNewsItems = [];

  // for(var i = 0; i < articleUrlArray.length-1; i++) {
  //   request( articleUrlArray[i], function(err, response, html) {
  //     var $ = cheerio.load(html);

  //     if($('.article-content').children('p').eq(0).text().split(' ').length > 50) {

  //       techCrunchNewsItems.push({
  //         bodyOne: $('.article-content').children('p').eq(0).text()
  //       });
  //       // techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
  //     } else {
  //       // techCrunchNewsItems.bodyOne = $('.article-content').children('p').eq(0).text();
  //       // techCrunchNewsItems.bodyTwo = $('.article-content').children('p').eq(1).text();

  //       techCrunchNewsItems.push({
  //         bodyOne: $('.article-content').children('p').eq(0).text(),
  //         bodyTwo: $('.article-content').children('p').eq(1).text()
  //       });
  //     }
        
  //     data = techCrunchNewsItems;

  //   });
  // }
  //     res.send(JSON.stringify(data));

  // })


// app.get('/news/news-desc', function(req, res) {

//   var data = '';

//   const techCrunchURL = "https://techcrunch.com/2018/05/04/nsa-triples-metadata-collection-numbers-sucking-up-over-500-million-call-records-in-2017/";

//   var techCrunchNewsItems = {
//     bodyOne: '',
//     bodyTwo: ''
//   };

//   request( techCrunchURL, function(err, response, html) {
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
// })

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


