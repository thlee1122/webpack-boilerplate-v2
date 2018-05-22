import React, { Component }                 from 'react';
import { render }                           from 'react-dom';
import {connect}                            from 'react-redux';
import {bindActionCreators}                 from 'redux';
import axios                                from 'axios';
import * as newsActions                     from '../actions/newsActions';
import * as stockActions                    from '../actions/stockActions';

import Card                                 from '@material-ui/core/Card';
import CardActions                          from '@material-ui/core/CardActions';
import CardContent                          from '@material-ui/core/CardContent';
import CardMedia                            from '@material-ui/core/CardMedia';
import Typography                           from '@material-ui/core/Typography';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import ButtonBase                            from '@material-ui/core/ButtonBase';
import '../../css/style.css';

class mainIndex extends Component {

  constructor() {
    super();
    this.techCrunchNewsDate = '';
    this.newsSourceName = 'tech-crunch';
  }

  componentDidMount() {
    this.props.getNewsApi();
    this.props.getStockInfo();
  }

  displayCards() {
    const { fetchedNewsApiOrg, newNews, fetchedNewsDesc } = this.props.news;

    // console.log(this.props);

    if( fetchedNewsApiOrg.articles) {
      if(fetchedNewsApiOrg.articles.length > 1) {
        return (
          <div className="news-list">
            { Object.keys(fetchedNewsApiOrg.articles).map((key, index) => {
                const articlesItem = fetchedNewsApiOrg.articles[key];
                const articlesItemDate = articlesItem.publishedAt;

                return (
                  <a
                    href={articlesItem.url}
                    style={{cursor:'pointer'}}
                    key={index}
                  >
                    <Card key={index}>
                        <CardMedia
                          image={ articlesItem.urlToImage }
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

                            : fetchedNewsDesc[index] !== undefined ?

                            <React.Fragment>
                              <Typography component="p">
                                { fetchedNewsDesc[index].bodyOne }
                              </Typography>

                              <Typography component="p">
                                { fetchedNewsDesc[index].bodyTwo }
                              </Typography>
                            </React.Fragment>

                            :

                            <React.Fragment></React.Fragment>
                          }

                          <Typography component="p">
                            Source: { articlesItem.source.name }
                          </Typography>

                          <Typography component="p">
                            Author: { articlesItem.author }
                          </Typography>

                          <Typography component="p">
                            Published at: { articlesItem.publishedAt.slice(0, 10) }
                          </Typography>
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
  }

  searchNewSource = (event) => {
    this.newsSourceName = event.target.value;
  }

  handleSearchClick = () => {
    this.props.fetchNewsApiOrg(this.newsSourceName);
    this.props.getNewsDesc(this.newsSourceName);
  }

  render() {

    console.log(this.props);

    return (
      <div>
        <div className="search-section">
          <TextField
            required
            label="Search News"
            placeholder="Type news source name"
            className="news-source-textfield"
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
    news: state.news,
    stockInfo: state.stockInfo
  };
}

export default connect(
  mapStateToProps,
  {
    ...newsActions,
    ...stockActions
  }
)(mainIndex);

