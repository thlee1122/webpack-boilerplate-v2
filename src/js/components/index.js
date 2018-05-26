import React, { Component }                 from 'react';
import { render }                           from 'react-dom';
import {connect}                            from 'react-redux';
import {bindActionCreators}                 from 'redux';
import axios                                from 'axios';
import classNames                           from "classnames";
import * as newsActions                     from '../actions/newsActions';
import * as stockActions                    from '../actions/stockActions';

import Card                                 from '@material-ui/core/Card';
import CardActions                          from '@material-ui/core/CardActions';
import CardContent                          from '@material-ui/core/CardContent';
import CardMedia                            from '@material-ui/core/CardMedia';
import Typography                           from '@material-ui/core/Typography';
import Button                               from '@material-ui/core/Button';
import TextField                            from '@material-ui/core/TextField';
import ButtonBase                           from '@material-ui/core/ButtonBase';

import { withStyles }                       from '@material-ui/core/styles';
import Table                                from '@material-ui/core/Table';
import TableBody                            from '@material-ui/core/TableBody';
import TableCell                            from '@material-ui/core/TableCell';
import TableHead                            from '@material-ui/core/TableHead';
import TableRow                             from '@material-ui/core/TableRow';
import Paper                                from '@material-ui/core/Paper';
import '../../css/style.css';

class mainIndex extends Component {

  constructor() {
    super();
    this.techCrunchNewsDate = '';
    this.newsSourceName = 'tech-crunch';
    this.stockTicker = '';
  }

  componentDidMount() {
    this.props.getNewsApi();
    // this.props.getStockInfo('ROKU');
    this.props.getStockFinancialInfo('ROKU');
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
  };

  searchStockInfo = (event) => {
    this.stockTicker = event.target.value;
  };

  handleSearchClick = () => {
    this.props.fetchNewsApiOrg(this.newsSourceName);
    this.props.getNewsDesc(this.newsSourceName);
  }

  handleSearchStockClick = () => {
    this.props.getStockInfo(this.stockTicker);
    this.props.getStockFinancialInfo(this.stockTicker);
  }

  displayStocks() {
    const { quote } = this.props.stockInfo.stockInfo;

    const { financials } = this.props.stockInfo.stockFinancialInfo;

    let percentChangeSign = '';
    let percentChange = '';

    let extendedPercentChangeSign = '';
    let extendedPercentChange = '';
    let percentageColor = '';
    let extendedPercentageColor = '';

    let closedTime = '';
    let closedHour = '';
    let closedMinute = '';
    let newClosedTime = '';
    let AMPMSign = '';
    let stockHigh = '';
    let stockLow = '';
    let stockMktCap = '';

    if(quote !== undefined) {
      percentChangeSign = quote.change > 0 ? '+' : '';
      percentChange = (quote.changePercent * 100).toFixed(2);

      extendedPercentChangeSign = quote.extendedChange > 0 ? '+' : '';
      extendedPercentChange = (quote.extendedChangePercent * 100).toFixed(2);

      percentageColor = classNames({
        'percentage-green': percentChange > 0 ? true : false,
        'percentage-red': percentChange < 0 ? true : false
      });

      extendedPercentageColor = classNames({
        'extended-percentage-green': extendedPercentChange > 0 ? true : false,
        'extended-percentage-red': extendedPercentChange < 0 ? true : false
      });

      closedTime = new Date(quote.extendedPriceTime).toString().split(' ')[4];
      closedHour = closedTime.substring(0,2) > 12 ? closedTime.substring(0,2) % 12 : closedTime.substring(0,2);
      closedMinute = closedTime.substring(3,5);
      AMPMSign = closedTime.substring(0,2) < 12 ? 'AM' : 'PM';

      newClosedTime = `${closedHour}:${closedMinute} ${AMPMSign}`;

      stockHigh = quote.high !== null ? quote.high : '';
      stockLow = quote.low !== null ? quote.low : '';
      stockMktCap = this.numberConverter(quote.marketCap);

    } else if(financials !== undefined) {
      console.log(financials);
    }

    console.log(quote);
    // console.log(financials);

    return (
      <div className="stock-section">
        { quote !== undefined && financials !== undefined ?
          <div>
            <h2>{`${quote.companyName} Stock Info`}</h2>
            {/* <h2>{quote.companyName}</h2> */}
            { quote.primaryExchange === 'Nasdaq Global Select' ?
              <React.Fragment>
                <h2>{`NASDAQ: ${quote.symbol}`}</h2>
                <p>{`Sector: ${quote.sector}`}</p>
              </React.Fragment>
              :
              <React.Fragment>
                <h2>{`NYSE: ${quote.symbol}`}</h2>
                <p>{`Sector: ${quote.sector}`}</p>
              </React.Fragment>
            }
            
            <h2>{`${quote.close} USD `} <span className={percentageColor}>{`${percentChangeSign}${quote.change} (${percentChange}%)`}</span></h2>
            <p>{`Closed ${quote.latestTime} ${newClosedTime} EDT · Disclaimer`}</p>
            
            { new Date().getHours() >= 16 ?
              <p>After hours {`${quote.extendedPrice} USD`} <span className={extendedPercentageColor}>{`${extendedPercentChangeSign}${quote.extendedChange} (${extendedPercentChange}%)`}</span></p>
              :
              <React.Fragment></React.Fragment>
            }

            <Paper className='stock-info-table' style={{width: '300px', display: 'inline-block'}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><b>Open:</b> {`${quote.open}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>High:</b> {`${stockHigh}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Low:</b> {`${stockLow}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Mkt cap:</b> {`${stockMktCap}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>P/E ratio:</b> {`${quote.peRatio}`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <Paper className='stock-info-table' style={{width: '300px', display: 'inline-block', marginLeft: '20px', marginBottom: '50px'}}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><b>Div yield: </b></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>Prev Close:</b> {`${quote.previousClose}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>52-wk high:</b> {`${quote.week52High}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><b>52-wk low:</b> {`${quote.week52Low}`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>

            <div className="financial-report-section">
              <h2>{`${quote.companyName} Financial Reports`}</h2>
              
              { Object.keys(financials).map((key, index) => {
                  const financialItem = financials[key];

                  return (
                    <div className="financial-report-section-content" key={index}>
                      <h3>{`Financial Report ${financialItem.reportDate}`}</h3>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>(USD)</TableCell>
                            <TableCell>{financialItem.reportDate}</TableCell>
                            <TableCell>Y/Y</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Revenue
                            </TableCell>
                            <TableCell numeric>{this.numberConverter(financialItem.totalRevenue)}</TableCell>
                            <TableCell numeric></TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell component="th" scope="row">
                              Net Income
                            </TableCell>
                            <TableCell numeric>{this.numberConverter(financialItem.netIncome)}</TableCell>
                            <TableCell numeric></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  );
                })
              }

            </div>        

          </div>
          :
          <React.Fragment></React.Fragment>
        }
        
      </div>
    );
  }


  numberConverter(num) {
    // Nine Zeroes for Billions
    return Math.abs(Number(num)) >= 1.0e+9

    ? (Math.abs(Number(num)) / 1.0e+9) + "B"
    // Six Zeroes for Millions 
    : (Math.abs(Number(num)) >= 1.0e+6)

    ? (Math.abs(Number(num)) / 1.0e+6) + "M"
    // Three Zeroes for Thousands
    : (Math.abs(Number(num)) >= 1.0e+3)

    ? (Math.abs(Number(num)) / 1.0e+3) + "K"

    : Math.abs(Number(num)).toFixed(2);
  }

  displayStockNews() {
    const { news } = this.props.stockInfo.stockInfo;
    console.log(news);

    if(news !== undefined) {
      return (
        <div className="stock-news-section">
          <h2>News</h2>
          { Object.keys(news).map((key, index) => {
              const articleItem = news[key];
              // console.log(articleItem);
              const articleDate = articleItem.datetime.substring(0, articleItem.datetime.indexOf('T'));

              return (
                <a 
                  href="#" 
                  style={{cursor: 'pointer'}}
                  key={index}
                >
                  <Card key={index}>
                    <CardContent>
                      <Typography component="h1" style={{fontSize: '18px', fontWeight: 'bold'}}>
                        { articleItem.headline }
                      </Typography>

                      <Typography component="p" style={{paddingTop: '10px'}}>
                        { !!articleItem.summary && articleItem.summary !== "No summary available." ? articleItem.summary : '' }
                      </Typography>

                      <Typography component="p" style={{paddingTop: '10px'}}>
                        { articleItem.source }
                      </Typography>

                      <Typography component="p" style={{paddingTop: '10px'}}>
                        {`Published on ${articleDate}`}
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

  render() {

    console.log(this.props);

    const { stockInfo } = this.props;
    // console.log(stockInfo);
    const { quote, news, chart } = stockInfo.stockInfo;

    // console.log(quote);

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

        <div className="search-stock-section" style={{marginTop: '20px'}}>
          <TextField
            required
            label="Search Stock"
            placeholder="Type stock ticker"
            className="news-source-textfield"
            onChange={this.searchStockInfo.bind(this)}
          />

          <Button
            className="search-button"
            onClick={this.handleSearchStockClick.bind(this)}
          >
            Search
          </Button>
        </div>

        {this.displayStocks()}
        {this.displayStockNews()}
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

