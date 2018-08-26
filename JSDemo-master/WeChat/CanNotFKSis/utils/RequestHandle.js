// RequestHandle.js

/**
 * 网络请求
 * url 请求url
 * params 参数
 * loadingMsg loading message
 * showLoading ture/false
 * success 成功回调函数
 * fail 失败回调函数
 */
function requestWithLoading(url, params, loadingMsg, showLoading, success, fail) {
    if (showLoading == true) {
        wx.showLoading({
            title: loadingMsg,
        })
    }

    wx.request({
        url: url,
        data: params,
        method: "GET",

        success: function (res) {
            if (showLoading == true) {
                wx.hideLoading()
            }

            if (res.statusCode == '200') {
                success(res.data)
            } else {
                fail()
            }
        },
        fail: function (error) {
            if (showLoading == true) {
                wx.hideLoading()
            }
            fail()
        }
    })
}

/**
 * 网络请求，没有提示
 */
function request(url, params, success, fail) {
    this.requestWithLoading(url, params, "", false, success, fail)
}

module.exports = {
    request: request,
    requestWithLoading: requestWithLoading
}