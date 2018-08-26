/**
 * @desc    API请求接口类简单封装
 * 
 */

/**
 * POST请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestPostApi(url, params, id, showloading, sourceObj, successFun, failFun, completeFun) {
        requestApi(url, params, 'POST', id, showloading, sourceObj, successFun, failFun, completeFun)
}

/**
 * GET请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestGetApi(url, params, id, showloading, sourceObj, successFun, failFun, completeFun) {
        requestApi(url, params, 'GET', id, showloading, sourceObj, successFun, failFun, completeFun)
}

/**
 * 请求API
 * @param  {String}   url         接口地址
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {int}   id      多个请求id
 * @param  {boolean}   showloading  是否显示加载中
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  接口调用成功返回的回调函数
 * @param  {Function} failFun     接口调用失败的回调函数
 * @param  {Function} completeFun 接口调用结束的回调函数(调用成功、失败都会执行)
 */
function requestApi(url, params, method, id, showloading, sourceObj, successFun, failFun, completeFun) {
        if (showloading) {
                wx.showLoading({
                        title: '加载中...',
                })
        }
        if (method == 'POST') {
                var contentType = 'application/x-www-form-urlencoded'
        } else {
                var contentType = 'application/json'
        }
        var token = wx.getStorageSync('token')
        var memberguid = wx.getStorageSync('memberguid')
        var a = {
                "token": token,
                "memberguid": memberguid,
        }
        //方法一
        // params = combin(a, params)
        //方法二
        // var str = '{"age":23,"name":"你"}'
        // var params1 = JSON.parse(str)
        if (params != null) {
                params.token = token
                params.memberguid = memberguid
        }
        console.error(url + JSON.stringify(params))
        wx.request({
                url: url,
                method: method,
                data: params,
                header: { 'Content-Type': contentType },
                success: function (res) {
                        console.log("success:" + JSON.stringify(res.data))
                        typeof successFun == 'function' && successFun(id, res.data, sourceObj)
                },
                fail: function (res) {
                        console.log("fail:" + JSON.stringify(res.data))
                        typeof failFun == 'function' && failFun(id, res.data, sourceObj)
                },
                complete: function (res) {
                        wx.hideLoading()
                        typeof completeFun == 'function' && completeFun(id, res.data, sourceObj)
                }
        })
}

function combin(a, b) {
        for (var i in b) {
                a[i] = b[i]
        }
        return a;
}

module.exports = {
        POST: requestPostApi,
        GET: requestGetApi
}