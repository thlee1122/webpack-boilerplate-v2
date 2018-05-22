
import axios from 'axios';
import jsonp from 'jsonp';

let __homeglobals = {};

function getGlobal(global_key) {

    return __homeglobals[global_key];
}



function createAxiosConfig(options) {

  let axiosConfig = {
    method: options.method.toLowerCase(),
    url: buildURL(options),
    withCredentials: options.withCredentials !== undefined ? options.withCredentials : true
  };
  
  if (options.data !== undefined)
    axiosConfig.data = options.data;

  return axiosConfig;

}

function buildURL(options) {
  let URL = '';

  if (options.service === undefined && options.url !== undefined) {
    return options.url;  
  }

  if (options.service === undefined) {
    throw "please define 'service' for options";
  }

  // let destinationHost = apihostname;
  let destinationHost = '';

  switch(options.service) {
    // case 'feed':
    //   URL = 'http://developer.gartner.com:8081';
    //   break;

    case 'news':
      destinationHost = getGlobal("wwww_s");
      URL = options.endpoint;
      return URL;
      break;

    // case 'researchBoard':
    //   destinationHost = getGlobal("www_s");
    //   URL = process.env.EXPLORE_JSON_SERVER + options.endpoint;
    //   return URL;
    //   break;

    case 'search':
      URL = process.env.SEARCH_JSON_SERVER + options.endpoint;
      return URL;
      break;
      
    default:
      throw `service '${options.service}' does not exist`;
      break;

  }

  // if (process.env.SERVER_TYPE === "node") {
  //   URL += options.endpoint;
  // } else if (process.env.SERVER_TYPE === "dev") {
  //   URL += ((URL.substr(-1) !== '/') ? "/" : "") + options.endpoint;
  // } else if (process.env.SERVER_TYPE === "prod") {
  //   URL = "https://" + destinationHost + URL + options.endpoint;
  // }
  
  return URL;
}

function successDispatch(dispatch, axiosConfig, options, response) {

  if (options.actionTypes.success === undefined)
    throw `Please define 'success' actionType for request ${axiosConfig.url}`;

  if(typeof options.actionTypes.success === 'string') {

    return dispatch({
      type: options.actionTypes.success,
      data: response.data,
      headers: {
        ...response.headers,
        status: response.status,        
      }
    });
  
  } else if(typeof options.actionTypes.success === 'function') {

    return dispatch(
      options.actionTypes.success(response.data, {
        ...response.headers,
        status: response.status
      })
    );

  }

}

function errorDispatch(dispatch, axiosConfig, options, response) {

  if(typeof options.actionTypes.error === 'string') {
    
    const errorData = (response.response)
      ? { 
          status: response.response.status, 
          message: response.message,
          data: response.response.data ? response.response.data : {}
        }
      : response.message;

    return dispatch({
      type: options.actionTypes.error,
      errorno: response.errno ? response.errorno : null,
      data: errorData
    });
  
  } else if(typeof options.actionTypes.error === 'function') {

    return dispatch(options.actionTypes.error(response));

  }

}


function apiMiddleWare({ dispatch, getState }) {
 
  return next => action => {

    const options = (action.options) ? { ...action.options } : {};

    switch(action.type) {

      case 'API_REQUEST': {

        if (!options.service === undefined && options.url === undefined)
          return next(action);

        if (options.actionTypes === undefined) {
          throw "Please define actionTypes for API_REQUEST action";
          return next(action);
        }
        
        const axiosConfig = createAxiosConfig(options);

        axios(axiosConfig)
          .then(response => successDispatch(dispatch, axiosConfig, options, response))    
          .catch(responseError => errorDispatch(dispatch, axiosConfig, options, responseError));

        break;

      }
      
      // case 'ASR_POST_REQUEST': {
        
      //   if (options.actionTypes === undefined || options.actionTypes.success === undefined) {
      //     throw "Please define actionTypes for ASR_POST_REQUEST action";
      //     return next(action);
      //   }

      //   const axConfig = createAxiosConfig(options);

      //   jsonp(axConfig.url, function(err, data) {
      //     if (err) {
      //       if (options.actionTypes.error) {
      //         options.actionTypes.error(err);
      //       } else console.log(err.message);
      //     } else {
      //       options.actionTypes.success(data);
      //     }
      //   });

      //   break;
      // }

      default: {
        return next(action);
        break;
      }

    }

    if (options.actionTypes.loading !== undefined) {
      return (typeof options.actionTypes.loading === 'function')
        ? dispatch(options.actionTypes.loading())
        : dispatch({ type: options.actionTypes.loading });
    }
  
  };

}

export default apiMiddleWare;