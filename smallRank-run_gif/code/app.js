//app.js
App({

    // API_URL: "https://api.mood.hh-idea.com/api/v1/",
    API_URL: "https://wx.xqzs.cn/xpi/",
    PROGRAM_ID:2,
    fromuserid:0,
    APP_ID:'wx43317052cc1b35a6',
    DOWN_LOAD_URL:"https://wx.xqzs.cn/ali-oss",
    replaceDownUrl:function (v) {
        return v.replace('http://oss.xqzs.cn',this.DOWN_LOAD_URL)
    },
    onShow: function () {


        let _this = this;
         let user = wx.getStorageSync('user') || {};
         let wxUser=_this.getWxUserInfo();
         //
         wx.getSetting({
            success(res) {
                if (!user.id||!wxUser) {
                    console.log('12121')
                     wx.login({
                        success: function (loginRes) {
                            // console.log(loginRes);
                             wx.authorize({
                                scope: 'scope.userInfo',
                                success(errMsg) {
                                     wx.getUserInfo({
                                        success: res => {
                                            let encryptedData;
                                            let iv;
                                            encryptedData = res.encryptedData;
                                            iv = res.iv;
                                            wx.setStorageSync('wxuser', res.userInfo);//存储userInfo
                                            if (loginRes.code) {
                                                 let code = loginRes.code;

                                                wx.request({
                                                    url: _this.API_URL + "user/create/by/secret",
                                                    method: 'PUT',
                                                    data: ({js_code: code, encryptedData: encryptedData, iv: iv}),
                                                    success: function (res) {
                                                        _this.getUserRunData();
                                                        let user = res.data.data;
                                                        wx.setStorageSync('user', user);//存储userInfo


                                                        wx.reLaunch({
                                                            url: '/pages/index/index'
                                                        });

                                                    }
                                                });


                                            } else {
                                                console.log('获取用户登录态失败！' + loginRes.errMsg)
                                            }


                                        },
                                        fail: function (res) {

                                            wx.reLaunch({
                                                url: '/pages/index/index'
                                            })
                                            console.log("授权许可")
                                            wx.showModal({
                                                title: '授权许可',
                                                content: '是否授权访问您的信息?',
                                                success: function (res) {
                                                    if (res.confirm) {
                                                        wx.openSetting({
                                                            success: function (data) {
                                                                if (data) {
                                                                    if (data.authSetting["scope.userInfo"] == true) {
                                                                        wx.reLaunch({
                                                                            url: '/pages/index/index'
                                                                        })
                                                                    }
                                                                }

                                                            },
                                                            fail: function () {
                                                                console.info("设置失败返回数据");
                                                            }
                                                        });
                                                    } else if (res.cancel) {

                                                    }
                                                }
                                            });
                                            console.log("fail")
                                            console.log(res)
                                        },
                                        complete: function (res) {

                                        }
                                    });
                                    console.log("success")
                                },
                                fail() {

                                },
                                complete() {
                                 }

                            });


                        }
                    });


                } else {
                    _this.getUserRunData();

                }
            }
        });


    },

    run: {
        dateTime: {
            DATE_TIME: "date_time",
            TIME: "time",
            DATE_PATH: "date_path",
            _format: function (type, time) {
                time = time * 1000;
                let now = new Date(time);
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let date = now.getDate();
                let hour = now.getHours();
                let minute = now.getMinutes();
                let second = now.getSeconds();
                if (month < 10) month = "0" + month;
                if (date < 10) date = "0" + date;
                if (hour < 10) hour = "0" + hour;
                if (minute < 10) minute = "0" + minute;
                if (second < 10) second = "0" + second;
                if (type === this.DATE_TIME) {
                    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
                } else if (type === this.TIME) {
                    return hour + ":" + minute;
                } else if (type === this.DATE_PATH) {
                    return year + "/" + month + "/" + date
                }
            },
            formatTime: function (time) {
                return this._format(this.TIME, time);
            },
            formatDateTime: function (time) {
                return this._format(this.DATE_TIME, time);
            },
            getTimeStamp: function (dateTime) {
                var _timestamp = new Date().getTime();
                if (dateTime) {
                    _timestamp = Date.parse(dateTime);
                }
                _timestamp = parseInt(_timestamp / 1000);
                return _timestamp;


            }


        },
    },


    getUserRunData: function () {
        let _this = this;
        wx.login({
            success: function (loginRes) {
                // console.log(loginRes);
                wx.getWeRunData({
                    success(runRes) {
                        //发起网络请求
                        wx.request({
                            url: _this.API_URL + "wei/xin/post/decrypt/data",
                            method: "POST",
                            data: {
                                iv: runRes.iv,
                                encryptedData: runRes.encryptedData,
                                code: loginRes.code
                            },
                            success: function (data) {

                                if (data.data.data.stepInfoList) {
                                    _this.setRunStorageData(data.data.data.stepInfoList);
                                }


                            }
                        })

                    }
                });
            }
        });
    },

    getUser: function () {
        return wx.getStorageSync('user');
    },
    getUserId: function () {
        let user = this.getUser();
        return user.id;
    },
    setUser: function (user) {
        wx.setStorageSync('user', user)
    },
    getRunStorageData: function () {
        return wx.getStorageSync('runData');
    },
    setRunStorageData: function (data) {
        wx.setStorageSync('runData', data)
    },
    visit: function (code) {
        let _this=this;

        wx.request({
            url: _this.API_URL + 'log/visit?id=' + code+"&fullUrl=eeeeeeeeeeee",
            method: 'GET',
            success: function (res) {


            }
        });

    },
    string:{
        smallFace:function (url) {
            if(url==null||url==undefined){
                return '';
            }
            return url.replace(/\/0$/i, '/132');
        }
    },
    copy:function (v) {
        wx.setClipboardData({
            data: v,
            success: function(res) {
                wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 1000
                })
            }
        })
    },
    setStorageSync:function (k,v) {
        wx.setStorageSync(k, v)
    },
    getStorageSync:function (k) {
        return  wx.getStorageSync(k)
    },
    setMiniProgramQrUrl:function (url) {
        wx.setStorageSync('mini_program_qr_url', url)
    },
    getMiniProgramQrUrl:function () {
        return  wx.getStorageSync('mini_program_qr_url')
    },
    showLoading:function (data) {
        if(!data)data={};
        wx.showLoading(data);
    },
    hideLoading:function () {
        wx.hideLoading();
    },
    getWxUserInfo(){
        return   wx.getStorageSync('wxuser');
    },

})