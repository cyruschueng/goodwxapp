function wxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                //成功
                resolve(res);
            };
            obj.fail = function (res) {
                //失败
                reject(res);
            };
            fn(obj);
        });
    }
}

//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
    let getRequest = wxPromisify(wx.request);
    return getRequest({
        url: url,
        method: 'GET',
        data: data,
        header: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequestWithAuth(url, header) {
    let getRequest = wxPromisify(wx.request);
    return getRequest({
        url: url,
        method: 'GET',
        header: header
    })
}


/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
    let postRequest = wxPromisify(wx.request);
    return postRequest({
        url: url,
        method: 'POST',
        data: data
    });
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequestWithAuth(url, header, data) {
    let postRequest = wxPromisify(wx.request);
    return postRequest({
        url: url,
        method: 'POST',
        data: data,
        header: header
    });
}

/**
 * 微信请求put方法封装
 * url
 * data 以对象的格式传入
 */
function putRequest(url, data) {
    let putRequest = wxPromisify(wx.request);
    return putRequest({
        url: url,
        method: 'PUT',
        data: data,
    });
}

/**
 * 微信请求put方法封装
 * url
 * data 以对象的格式传入
 */
function putRequestWithAuth(url, header, data) {
    let putRequest = wxPromisify(wx.request);
    return putRequest({
        url: url,
        method: 'PUT',
        header: header,
        data: data,
    });
}

module.exports = {
    postRequest: postRequest,
    postRequestWithAuth: postRequestWithAuth,
    getRequest: getRequest,
    getRequestWithAuth: getRequestWithAuth,
    putRequest: putRequest,
    putRequestWithAuth: putRequestWithAuth
}