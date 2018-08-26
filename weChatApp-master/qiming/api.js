/**
 * Created by songyongming on 2017/4/17.
 */
var system = require('./utils/system.js')
var utils = require('./utils/util.js')

function qiming(fName,year,month,day,hour,min,timeType,gender,searchType,searchInfo,len,flag, successCB,failCB) {
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/common/get',
        {
            url:'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/qiming.pae.baidu.com/data/querynamelist?'+
            'fName='+fName+
            '&year='+year+
            '&month='+month+
            '&day='+day+
            '&hour='+hour+
            '&min='+min+
            '&timeType='+timeType+
            '&gender='+gender+
            '&searchType='+searchType+
            '&searchInfo='+searchInfo+
            '&len='+len+
            '&flag='+flag
        },successCB,failCB);
}

function detail(fName,lName,year,month,day,hour,min,timeType,gender,flag, successCB,failCB) {
    system.myRequest('https://api.maiyizhi.cn/index.php?r=api/common/get',
        {
            url:'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/qiming.pae.baidu.com/data/namedetail?'+
            'fName='+fName+
            '&lName='+lName+
            '&year='+year+
            '&month='+month+
            '&day='+day+
            '&hour='+hour+
            '&min='+min+
            '&timeType='+timeType+
            '&gender='+gender+
            '&flag='+flag
        },successCB,failCB);
}
function getPayParamsApi(open_id, price,successCB) {
    system.myRequest1('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/qimingpay',{user_id:open_id,price:price},successCB);
}
function empty(successCB,failCB) {
  system.myRequest1('https://api.maiyizhi.cn/index.php?r=api/common/empty',successCB,failCB);
}
function login(sucess,fail,title){
    var that= this
    var app = getApp()
    console.log(app)
    if(!title){
        title = '授权登录失败，部分功能将不能使用，是否重新登录？'
    }
    var user = app.globalData.user;
    if(utils.isEmptyObject(user)){
        wx.login({
            success: function (code) {
                var code = code.code;
                wx.getUserInfo({
                    success: function (res) {
                        that.getLoginApi(code, function (info) {
                            console.log("indo")
                            console.log(info.openid)

                            var _user={'openid':info.openid,'user_name':res.userInfo.nickName,'avatar':res.userInfo.avatarUrl}
                            wx.setStorageSync("user",_user)
                            app.globalData.user = _user
                            sucess(_user)
                        })
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: '提示',
                            content: title,
                            showCancel: true,
                            cancelText: "否",
                            confirmText: "是",
                            success: function (info) {
                                if (info.confirm) {
                                    if (wx.openSetting) {
                                        wx.openSetting({
                                            success: (res) => {
                                                if (res.authSetting["scope.userInfo"]) {
                                                    wx.getUserInfo({
                                                        success: function (res) {
                                                            console.log(res)
                                                            that.getLoginApi(code, function (info) {
                                                                console.log(res)
                                                                var _user={'openid':info.openid,'user_name':res.userInfo.nickName,'avatar':res.userInfo.avatarUrl}
                                                                wx.setStorageSync("user",_user)
                                                                app.globalData.user = _user
                                                                sucess(_user)
                                                            })
                                                        }
                                                    })
                                                } else {
                                                    fail()
                                                }
                                            },
                                            fail: function () {
                                                fail()
                                            }
                                        })
                                    } else {
                                        fail()
                                    }
                                }else{
                                    fail()
                                }
                            }
                        })
                    }
                })
            },
            fail: function (res) {
                fail()
            }
        })
    }else{
        sucess(user)
    }
}
/* 登录 */
function getLoginApi(jscode, successCB) {
    var data = {
        jscode: jscode,
        app:'xiaoqiming'
    }
    system.myRequest1('https://api.maiyizhi.cn/index.php?r=api/weixinzhushou/userLogin',data,successCB);
}
module.exports = {
    qiming: qiming,
    detail:detail,
  empty:empty,
    getLoginApi:getLoginApi,
    login:login,
    getPayParamsApi:getPayParamsApi
}
