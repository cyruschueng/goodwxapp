// import wx from 'labrador';
import stringify from 'qs/lib/stringify';
import config from '../config';
import * as types from '../types';

// 有效HTTP方法列表
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'];

export function create (options) {
  options = Object.assign({
    apiRoot: typeof API_ROOT === 'undefined' ? '' : API_ROOT,
    store: void 0
  }, options);

  const getToken = () => {
    return new Promise(resolve => {
      wx.getStorage({
        key: config.apiTokenKey,
        complete ({err, data}) {
          if (err || typeof data !== 'string') {
            resolve('');
          } else {
            resolve(data);
          }
        }
      })
    });
  };

  const setToken = (token) => {
    wx.setStorage({key: config.apiTokenKey, data: token});
  };

  /**
   * 通用Alaska RESTFUL风格API请求,如果alaska接口返回错误,则抛出异常
   * @param {string} [method] 请求方法,可选默认GET,有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   * @param {string} apiName  API名称,必选
   * @param {object} [data]   数据,可选,如果方法为GET或DELETE,则此对象中的所有数据将传入URL query
   * @param {object} [header] HTTP头对象,可选
   * @returns {*}
   */
  function request (method, apiName, data, header) {
    const apiRoot = options.apiRoot || '';
    const defaultHeader = options.defaultHeader;
    const store = options.store;
    const whiteListCodes = [544011];

    if (methods.indexOf(method) === -1) {
      header = data;
      data = apiName;
      apiName = method;
      method = 'GET';
    }

    // let url = apiRoot + apiName;

    let url;
    if (apiName.indexOf('https') > -1) {
      url = apiName;
    } else {
      url = apiRoot + apiName;
    }

    if (['POST', 'PUT'].indexOf(method) === -1 && data) {
      let querystring = stringify(data);
      if (url.indexOf('?') > -1) {
        url += '&' + querystring;
      } else {
        url += '?' + querystring;
      }
      data = undefined;
    }

    header = Object.assign({}, defaultHeader, header);

    return getToken()
      .then((token) => {
        if (token) {
          header['XCXSessionId'] = token;
        } else {
          header['XCXSessionId'] = '1';
        }
        return new Promise((resolve, reject) => {
          wx.request({
            method, url, data, header, complete: function (res) {
              console.log('res', res);
              if (res.statusCode != 200) {
                let msg = res.errMsg;
                if (msg === 'request:0k') {
                  msg = JSON.stringify(res.data);
                }
                msg = `[${res.statusCode}] ${msg}`;
                wx.showModal({
                  title: '网络异常',
                  content: '您当前的网络环境好像有点问题，请检查后重试~',
                  showCancel: false,
                  confirmColor: '#ff2551'
                });
                console.error('request error', msg);
                return reject(res.data);
              }
              if (res.data && res.data.data && res.data.data.token) {
                setToken(res.data.data.token);
              }

              if (res.data) {
                if (res.data.status === 401) {
                  if (store) {
                    store.dispatch({
                      type: types.USER_NEED_RELOGIN
                    });
                    return reject({
                      type: 'API_ERROR',
                      message: res.data.msg
                    });
                  }
                }

                if (res.data.status !== 1) {
                  if (whiteListCodes.indexOf(res.data.status) === -1) {
                    wx.showModal({
                      title: '系统提示',
                      content: JSON.stringify(res.data.msg) || '',
                      confirmColor: '#ff2551'
                    });
                    return reject({
                      type: 'API_ERROR',
                      message: res.data.msg,
                      data: res.data
                    });
                  } else {
                    return reject({
                      type: 'API_ERROR',
                      message: res.data.msg,
                      data: res.data
                    });
                  }
                }
              }

              resolve(res.data);
            }
          });
        });
      });
  }

  methods.forEach((method) => {
    request[method.toLowerCase()] = function (...args) {
      return request(method, ...args);
    };
  });

  request.setStore = function (store) {
    console.log(store);
    options.store = store;
  };

  return request;
}

export default create();
