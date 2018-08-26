//index.js
//获取应用实例
const app = getApp()

const request = require('../../utils/request.js')
var CONFIG = require('../../utils/config.js')
const util = require('../../utils/util.js')
var IMAGE = require('../../utils/image.js');

var width;
var height;

Page({
        data: {
                motto: 'Hello World',
                userInfo: {},
                camperCar: [],
                width: '',
                height: '',
                telstatus: true,
                hasUserInfo: false,
                canIUse: wx.canIUse('button.open-type.getUserInfo')
        },
        //事件处理函数
        bindViewTap: function () {
                wx.navigateTo({
                        url: '../logs/logs'
                })
        },
        goTel: function (e) {
                app.tel("");
        },
        goScan: function (e) {
                var token = wx.getStorageSync('token')
                if (token == "") {
                        wx.navigateTo({
                                url: '../login/index?id=1'
                        })
                } else {
                        wx.scanCode({
                                onlyFromCamera: true,
                                success: (res) => {
                                        var result = res.result.replace("?", "\?")
                                        console.log(result)
                                        var parameterObject = util.getQueryObject(result)
                                        wx.reLaunch({
                                                url: '../openLockIng/index?lockcode=' + parameterObject.lockcode
                                        });
                                }, fail: (res) => {
                                        // console.log("fail" + res)
                                        // wx.reLaunch({
                                        //         url: '../index/index'
                                        // });
                                }, complete: (res) => {
                                        console.log("complete")
                                }
                        })
                }
        },
        /**
         * 接口调用成功处理
         */
        successFun: function (id, res, selfObj) {
                if (res.res_code == 200) {
                        var camperCar = res.data;
                        var camperCars = [];
                        if (camperCar.length > 0) {
                                for (var i = 0; i < camperCar.length; i++) {
                                        var obj = camperCar[i]
                                        // obj.Img1 = spiltStr(obj.Img)[0] + "_" + parseInt(width * 3 / 4) + "X" + parseInt(width / 2) + ".jpg";
                                        obj.Img = util.spiltStr(obj.CarImg)[0] + "_" + parseInt(width) + "X" + parseInt(width / 2) + ".jpg";
                                        obj.i = i;
                                        if (obj.Num == 1) {
                                                obj.yes = true;
                                        } else {
                                                obj.yes = false;
                                        }
                                        camperCars.push(obj);
                                }
                        }
                        selfObj.setData({
                                camperCar: camperCars
                        });
                }

                wx.stopPullDownRefresh(); //停止下拉刷新
        },
        /**
         * 接口调用失败处理
         */
        failFun: function (res, selfObj) {
                console.log('failFun', res)
        },
        onLoad: function (options) {
                if (!util.isEmpty(options.inviteId)) {

                        console.error("inviteId:" + options.inviteId)
                        wx.setStorageSync('inviteId', options.inviteId)
                }
                var that = this
                width = app.globalData.width
                height = app.globalData.height

                if (app.globalData.userInfo) {
                        this.setData({
                                userInfo: app.globalData.userInfo,
                                hasUserInfo: true
                        })
                } else if (this.data.canIUse) {
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        app.userInfoReadyCallback = res => {
                                this.setData({
                                        userInfo: res.userInfo,
                                        hasUserInfo: true
                                })
                        }
                } else {
                        // 在没有 open-type=getUserInfo 版本的兼容处理
                        wx.getUserInfo({
                                success: res => {
                                        app.globalData.userInfo = res.userInfo
                                        this.setData({
                                                userInfo: res.userInfo,
                                                hasUserInfo: true
                                        })
                                }
                        })
                }

                this.getList(that);

                // var url = CONFIG.API_URL.GET_WxOpenId
                // var params = {}
                // request.GET(url, params, this, this.successFun, this.failFun)


                // wx.request({
                //         url: 'https://api.weixin.qq.com/sns/jscode2session',
                //         data: {
                //                 appid: 'wx64e0ed63ac933aaa',
                //                 secret: '38afc76beaea8ee4e2b090c474c8cb96',
                //                 js_code: res.code,
                //                 grant_type: 'authorization_code'
                //         },
                //         success: function (res) {
                //                 //res.data.openid  用户唯一标识  res.data.session_key 会话密钥   unionid	用户在开放平台的唯一标识符
                //                 console.log(res.data)

                //                 GET_WxOpenId
                //         }
                // })

        },
        getUserInfo: function (e) {
                console.log(e)
                app.globalData.userInfo = e.detail.userInfo
                this.setData({
                        userInfo: e.detail.userInfo,
                        hasUserInfo: true
                })
        },
        onPullDownRefresh: function () {
                var that = this;
                console.log("下拉刷新")
                this.getList(that);
        },
        getList: function (that) {
                //获取住房车列表
                var url = CONFIG.API_URL.GET_CamperCarAll
                var params = {}
                request.GET(url, params, 100, true, that, that.successFun, that.failFun)
        },
        binderrorimg: function (e) {
                // var errorImgIndex = e.target.dataset.errorimg //获取循环的下标
                // var imgObject = "camperCar[" + errorImgIndex + "].Img" //carlistData为数据源，对象数组
                // console.error(imgObject)//camperCar[5].Img
                // var errorImg = {}
                // errorImg[imgObject] = "https://w.chesudi.com/Public/web/img/onerrorcar.png" //我们构建一个对象
                // this.setData(errorImg) //修改数据源对应的数据

                var _that = this;
                IMAGE.errImgFun(e, _that);

        },
        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function (options) {
                var inviteId = wx.getStorageSync('memberguid')
                
                console.log("inviteId:"+inviteId)
                console.log('onShareAppMessage')
                var shareObj = {
                        title: '房车行',
                        desc: '房车行',
                        path: '/pages/index/index?inviteId=' + inviteId,
                        success: function (res) {
                                console.log('success')
                                var shareTickets = res.shareTickets;
                                console.log('shareTickets：' + shareTickets)
                                // if (shareTickets.length == 0) {
                                //         return false;
                                // }
                                // wx.getShareInfo({
                                //         shareTicket: shareTickets[0],
                                //         success: function (res) {
                                //                 var encryptedData = res.encryptedData;
                                //                 var iv = res.iv;
                                //         }
                                // })
                        },
                        fail: function () {
                                console.log('fail')
                        },
                        complete: function () {
                               
                        }
                };

                // 来自页面内的按钮的转发
                // if (options.from == 'button') {
                //         var eData = options.target.dataset;
                //         console.log(eData.name);     // shareBtn
                //         // 此处可以修改 shareObj 中的内容
                //         shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
                // }
                return shareObj;
        }

})


