const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded',
};


function getDefaultAdapter() {
  if (wx.request) {
    return wxAdapter;
  }
  return xhrAdapter;
}

const defaults = {
  adapter: getDefaultAdapter(),
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
  transformRequest: [function transformRequest(data) {
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],
};

function encode(val) {
  return encodeURIComponent(val)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
}

function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

function isDate(val) {
  return Object.prototype.call(val) === '[object Date]';
}

function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
}

function createError(message, config, code, request, response) {
  const error = new Error(message);
  return enhanceError(error, config, code, request, response);
}

function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
    // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
        `Request failed with status code ${response.status}`,
        response.config,
        null,
        response.request,
        response,
      ));
  }
}

function buildUrl(url, params) {
  if (!params) {
    return url;
  }
  let serializedParams;
  if (isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    const parts = [];

    params.forEach((val, key) => {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (Array.isArray(val)) {
        key += '[]';
      } else {
        val = [val];
      }

      val.forEach((v) => {
        if (isDate(v)) {
          v = v.toISOString();
        } else if (Object.prototype.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(`${encode(key)}=${encode(v)}`);
      });
    });

    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

function transformData(data, headers, fns) {
  /* eslint no-param-reassign:0 */
  fns.forEach((fn) => {
    data = fn(data, headers);
  });

  return data;
}

function dispatchRequest(config) {
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest,
  );

  config.headers = merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {},
  );

  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'].forEach(
    (method) => {
      delete config.headers[method];
    },
  );

  const adapter = config.adapter || defaults.adapter;
  return adapter(config).then((response) => {
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse,
    );
    return response;
  }, (reason) => {
    if (reason && reason.response) {
      reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse,
      );
    }
    return Promise.reject(reason);
  });
}

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
  });
  return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function (id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

InterceptorManager.prototype.forEach = function (fn) {
  this.handlers.forEach((h) => {
    if (h !== null) {
      fn(h);
    }
  });
};

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };
}

Axios.prototype.request = function (config) {
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = merge(this.defaults, config);

  config.method = config.method ? config.method.toLowerCase() : 'get';

  const chain = [dispatchRequest, undefined];

  let promise = Promise.resolve(config);

  this.interceptors.request.forEach((interceptor) => {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach((interceptor) => {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
['delete', 'get', 'head', 'options'].forEach((method) => {
    /* eslint func-names:0 */
  Axios.prototype[method] = function (url, config) {
    return this.request(merge(config || {}, {
      method: method,
      url: url,
    }));
  };
});

['post', 'put', 'patch'].forEach((method) => {
    /* eslint func-names:0 */
  Axios.prototype[method] = function (url, data, config) {
    return this.request(merge(config || {}, {
      method: method,
      url: url,
      data: data,
    }));
  };
});

function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let requestData = config.data;
    const requestHeaders = config.headers;

    let request = new XMLHttpRequest();
    const loadEvent = 'onreadystatechange';

    request.open(config.method.toUpperCase(), buildUrl(config.url, config.params), true);

    request.timeout = config.timeout;

    request[loadEvent] = function handleLoad() {
      if (!request) {
        return;
      }
      const responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;

      const response = {
        data: responseData,
            // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: null,
        config: config,
        request: request,
      };

      settle(resolve, reject, response);

      request = null;
    };

    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

          // Clean up request
      request = null;
    };

    request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

        // Clean up request
      request = null;
    };

    request.ontimeout = function handleTimeout() {
      reject(createError(`timeout of ${config.timeout}ms exceeded`, config, 'ECONNABORTED',
          request));

        // Clean up request
      request = null;
    };

    if ('setRequestHeader' in request) {
      requestHeaders.forEach((val, key) => {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
            // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    if (requestData === undefined) {
      requestData = null;
    }

      // Send the request
    request.send(requestData);
  });
}

function wxAdapter(config) {
  return new Promise((resolve, reject) => {
    config.success = function (res) {
      resolve(res);
    };
    config.fail = function (err) {
      reject(err);
    };
    wx.request(config);
  });
}


['delete', 'get', 'head'].forEach((method) => {
  defaults.headers[method] = {};
});

['put', 'post', 'patch'].forEach((method) => {
  defaults.headers[method] = merge({}, DEFAULT_CONTENT_TYPE);
});

function bind(fn, thisArg) {
  return function wrap() {
    const args = new Array(arguments.length);
    for (let i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
}

function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (Array.isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

function merge() {
  const result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

function extend(a, b, thisArg) {
  forEach(b, (val, key) => {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context);
  // Copy axios.prototype to instance
  extend(instance, Axios.prototype, context);

  // Copy context to instance
  extend(instance, context);
  return instance;
}

const axios = createInstance(defaults);

axios.create = function create(instanceConfig) {
  return createInstance(merge(defaults, instanceConfig));
};

export default axios;
