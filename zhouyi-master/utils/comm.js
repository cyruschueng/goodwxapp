const apiurl = 'https://friend-guess.playonwechat.com/';
function getUserInfo(cb) {
    wx.getUserInfo({
        success: function (res) {
             console.log(res)
            typeof cb === 'function' && cb(res)
            let sign = wx.getStorageSync('sign');
            let kid = wx.getStorageSync('kid');
            let userInfo = res.userInfo;
            let info = {
              nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                gender: userInfo.gender,
                province: userInfo.province,
                city: userInfo.city,
                country: userInfo.country
            }
            console.log("info:", info);
            wx.request({
                url: apiurl + '/api/save-user-info?sign=' + sign + '&operator_id=' + kid,
                method: "POST",
                data: {
                    info: info
                },
                success(res) {
                    console.log(res)
                }

            })
        },
        fail: function (res) {
            wx.showModal({
                title: '提示',
                content: '系统检测到你没有授权，是否去授权',
                success: function (res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: (res) => {
                                wx.getSetting({
                                    success: (res) => {
                                        if (res.authSetting['scope.userInfo']) {
                                            let userInfo = res.userInfo;
                                            let info = {
                                                wx_name: userInfo.nickName,
                                                avatarUrl: userInfo.avatarUrl,
                                                gender: userInfo.gender,
                                                province: userInfo.province,
                                                city: userInfo.city,
                                                country: userInfo.country
                                            }
                                            wx.request({
                                                url: apiurl + '/api/save-user-info?sign=' + sign + '&operator_id=' + kid,
                                                methos: "POST",
                                                data: {
                                                    info: info
                                                },
                                                success(res) {
                                                    console.log(res)
                                                }

                                            })
                                        } else {
                                            wx.showToast({
                                                title: '授权失败',
                                                icon: 'success',
                                                duration: 2000
                                            })
                                        }
                                    }
                                })

                                /*
                                 * res.authSetting = {
                                 *   "scope.userInfo": true,
                                 *   "scope.userLocation": true
                                 * }
                                 */
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        },
        complete: function () {
            // complete

        }
    })
}

module.exports = {
    getUserInfo
}