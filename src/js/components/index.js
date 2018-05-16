import React, { Component }                 from 'react';
import { render }                           from 'react-dom';
import {connect}                            from 'react-redux';
import {bindActionCreators}                 from 'redux';
import axios                                from 'axios';
import * as newsActions                     from '../actions/newsActions';
import Card                                 from '@material-ui/core/Card';
import CardActions                          from '@material-ui/core/CardActions';
import CardContent                          from '@material-ui/core/CardContent';
import CardMedia                            from '@material-ui/core/CardMedia';
import Typography                           from '@material-ui/core/Typography';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import ButtonBase                            from '@material-ui/core/ButtonBase';
import '../../css/style.css';

// var request = require('request');
// var cheerio = require('cheerio');
// _ = require('underscore');

//do axios to get the stuffs from /api


class mainIndex extends Component {
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
    this.newsSourceName = 'tech-crunch';
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
    // this.props.fetchNewsApiOrg();
    // this.props.fetchNewsApiOrg(this.newsSourceName);
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

  // displayTopHeadlines(articles) {
  //   if(articles) {
  //     return (
  //       <div>
  //         <ul className="articles-ul">
  //           {Object.keys(articles).map((key, index) => {
  //             const articlesItem = articles[key];
  //             const articlesItemDate = articlesItem.publishedAt;

  //             return (
  //               <div className="single-article-box" key={index} style={{border: '1px solid black'}}>
  //                 <a href={articlesItem.url} style={{textDecoration:'none', color:"black"}}>
  //                   <p>{this.displayDate(articlesItemDate)}</p>
  //                   <h5>{articlesItem.title}</h5>
  //                   <img src={articlesItem.urlToImage} style={{width:'200px', height:'200px'}}/>
  //                   <p>{articlesItem.description}</p>
  //                   {articlesItem.author ? <p>by {articlesItem.author}</p> : <p>by Newspaper Company</p>}
  //                 </a>
  //               </div>
  //             )
  //           })}
  //         </ul>
  //       </div>
  //     )
  //   }
  // }

  displayCards() {
    const { fetchedNewsApiOrg, newNews } = this.props.news;

    console.log(fetchedNewsApiOrg);
    // console.log(newNews);
    console.log(newNews);

    if( fetchedNewsApiOrg.articles) {
      if(fetchedNewsApiOrg.articles.length > 1) {
        return (
          <div className="news-list">
            { Object.keys(fetchedNewsApiOrg.articles).map((key, index) => {
                const articlesItem = fetchedNewsApiOrg.articles[key];
                const articlesItemDate = articlesItem.publishedAt;

                if(articlesItem.description !== null) {
                  console.log(articlesItem.description.split(' ').length);
                }

                return (
                    <a
                    href={articlesItem.url}
                    style={{cursor:'pointer'}}
                    >
                  <Card key={index}>
                      
                      <CardMedia
                        image={ articlesItem.urlToImage }
                        title="testing"
                        style={{width: '300px', height: '300px'}}
                      />

                      <CardContent>
                        <Typography component="h1">
                          { articlesItem.title }
                        </Typography>

                        { articlesItem.description !== null && articlesItem.description.split(' ').length > 25 ? 
                            <Typography component="p">
                              { articlesItem.description }
                            </Typography>
                          
                          :
                          
                          <React.Fragment>
                            <Typography component="p">
                              {newNews.bodyOne}
                            </Typography>

                            <Typography component="p">
                              {newNews.bodyTwo}
                            </Typography>
                          </React.Fragment>
                        }
                      </CardContent>
                  </Card>
                    </a>
                );
              })
            }
          </div>
        );
      }
    }

    // if( fetchedNewsApiOrg.articles) {
    //   if(fetchedNewsApiOrg.articles.length > 1) {
    //     return (
    //       <React.Fragment>
    //         <Card>
    //           <CardMedia
    //             image={ fetchedNewsApiOrg.articles[1].urlToImage }
    //             title="testing"
    //             style={{width: '300px', height: '300px'}}
    //           />

    //           <CardContent>
    //             <Typography component="h2">
    //               { fetchedNewsApiOrg.articles[1].title }
    //             </Typography>

    //             <Typography component="p">
    //               { fetchedNewsApiOrg.articles[1].description }
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </React.Fragment>
    //     );
    //   }
    // } else {
    //   console.log('false');
    // } 
  }

  searchNewSource = (event) => {
    // console.log(event.target.value);
    this.newsSourceName = event.target.value;
    console.log(this.newsSourceName);
  }

  handleSearchClick = () => {
    this.props.fetchNewsApiOrg(this.newsSourceName);
  }

  render() {
    // console.log(window.items);
    // console.log(__homeglobals);

    // console.log(this.techCrunchNewsDate);

    // const { fetchedNewsApiOrg, newNews } = this.props.news;
    // console.log(this.props);
    // console.log(fetchedNewsApiOrg);
    // console.log(newNews);


    return (
      <div>
        <div className="search-section">
          <TextField
            required
            label="Search News"
            placeholder="Type news source name"
            className="news-source-textfield"
            // fullWidth
            onChange={this.searchNewSource.bind(this)}
          />

          <Button
            className="search-button"
            onClick={this.handleSearchClick.bind(this)}
          >
            Search
          </Button>
        </div>


        {this.displayCards()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.news
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     newsActions: bindActionCreators(newsActions, dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  {
    ...newsActions,
  }
  // mapDispatchToProps
)(mainIndex);

//create componentDidMount() and call the action



