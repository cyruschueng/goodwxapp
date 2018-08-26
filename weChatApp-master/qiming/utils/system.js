var util = require('./util.js')
var wc = require('./wcache.js')

function myRequest(url, data, successCB, failCB) {
    if (!data["user_id"]) {
        var app = getApp()
        data["user_id"] = app.globalData.user ? app.globalData.user.openid : '';
    }
    wx.request({
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.log(res)
            var alpclipboard = 'alpclipboard'
            if (res.data.msg == 'success' && successCB) {
                if (res.data.clipboardData && !wc.get(alpclipboard)) {
                    wc.put(alpclipboard, res.data.clipboardData, 200)
                }
                successCB(res.data.data)
            } else {
                if (failCB) {
                    failCB(res.data.msg);
                } else {
                    if (res.data.msg) {
                        wx.showToast({
                            image: '/styles/info_icon.png',
                            title: '输入有误，请检查哦',
                            duration: 2000
                        });
                    }
                }
                //this.setData({isLoading: false });
            }
        },
        fail: function(msg) {
            console.log(msg)
            wx.showToast({
                title: '系统繁忙，请稍后再试',
                image: '/styles/info_icon.png',
                duration: 2000
            });
            //this.setData({isLoading: false });
        }
    })
}

function myRequest1(url, data, successCB, failCB) {
    //data["position"] = user.getPosition();
    wx.request({
        url: url,
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log("-------1")
            console.log(res)
            if (res.data.success && successCB) {
                successCB(res.data.data)
            } else {
                if (failCB) {
                    failCB(res.data.message);
                } else {
                    if (res.data.message) {
                        wx.showToast({
                            image: '../../styles/info_icon.png',
                            title: '输入有误，请检查哦',
                            duration: 2000
                        });
                    }
                }
            }
        },
        fail: function(msg) {
            // console.log(msg)
            wx.showToast({
                title: '系统繁忙，请稍后再试',
                image: '../../styles/info_icon.png',
                duration: 2000
            });
        }
    })
}
module.exports = {
    myRequest: myRequest,
    myRequest1: myRequest1
}