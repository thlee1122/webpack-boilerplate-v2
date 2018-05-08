import axios from 'axios';
import jsonp from 'jsonp';

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

function successDispatch(dispatch, axiosConfig, options, response) {

  if (options.actionTypes.success === undefined)
    throw `Please define 'success' actionType for request ${axiosConfig.url}`;

  if(typeof options.actionTypes.success === 'string') {
  
    return dispatch({
      type: options.actionTypes.success,
      data: response
    });
  
  } else if(typeof options.actionTypes.success === 'function') {

    return dispatch(options.actionTypes.success(response));

  }

}

function errorDispatch(dispatch, axiosConfig, options, response) {

  if(typeof options.actionTypes.error === 'string') {
    
    const errorData = (response.response)
      ? { status: response.response.status, message: response.message }
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

function buildURL(options) {
  let URL = '';

  debugger;

  switch(options.service) {
    
    case 'news':
      // URL = 'http://localhost:8081';
      debugger;
      return URL;
      break;
    
    default:
      throw `service '${options.service}' does not exist`;
      break;
  };

  if (options.service === undefined && options.url !== undefined) {
    debugger;
    return options.url;  
  }

  if (options.service === undefined) {
    throw "please define 'service' for options";
  }
  
  return URL;
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
          .then(response => successDispatch(dispatch, axiosConfig, options, response.data))    
          .catch(responseError => errorDispatch(dispatch, axiosConfig, options, responseError));

        break;

      }
      case 'ASR_POST_REQUEST': {
        
        if (options.actionTypes === undefined || options.actionTypes.success === undefined) {
          throw "Please define actionTypes for ASR_POST_REQUEST action";
          return next(action);
        }
        const axConfig = createAxiosConfig(options);

        jsonp(axConfig.url, function (err, data) {
              if (err) {
                if (options.actionTypes.error) {
                  options.actionTypes.error(err);
                } else console.log(err.message);
               
              } else {
                options.actionTypes.success(data);
              }
              
        });
        break;
      }

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