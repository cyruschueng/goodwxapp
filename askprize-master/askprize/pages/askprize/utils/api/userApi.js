/**
 * 微信统一接口类
 * 
 * @author fuqiang
 */

import { baseApi } from "./baseApi";

function userApi(page) {
    // 继承基类
    baseApi.call(this);
    // 引入页面page类对象
    this.init(page);
    // this.ckPromission();
}

// 属性方法
userApi.prototype = {
    data: {
        // 是否已授权
        loginStatus: false,
        // 当前城市信息
        city: {},
        // 定位
        location: '',
        // 登录信息
        userInfo: {},
        // 手机号授权
        has_mobile: 'has_mobile',
        cacheValues: {},
    },

    // 缓存信息
    cacheK: {
        // 微信授权状态
        accredit: 'user_wx_accredit',
        // 位置信息
        location: 'user_city',
        // 登录信息
        login: 'user_info',
        // 手机号授权
        has_mobile: 'user_has_mobile',
    },

    // 接口地址
    apiURL: {
        // 登录
        login: '/passport/clientapi/wxxcxLog',
        // 定位
        location: '/app/xcx/lng-lat/?location=',
        // 动态码请求
        verifyCode: '/passport/ark/sendVerifyCode',
        // 手机号校验
        phoneVerify: '/passport/clientapi/wxxcxMobile',
        //城市选择
        cityList: '/app/yaohao/city',
        //摇号查询
        query: '/app/yaohao/luck',
        //摇号提醒
        remind: '/app/yaohao/note',
        // 个人信息
        personal: '/user/basic/personal',
        // 个人信息
        userapply: '/user/withdraw/apply',
        
    },


    interval: {
        obj: false,
        run: false,
        num: 0
    },

    /**
     * 登录状态检测
     */
    checkLogin: function () {
        var res = { 'status': false, 'promission': true };
        console.log(getApp().accredit);
        // 授权检测
        if (!getApp().accredit) {
            this.ckPromission();
            res['promission'] = false;
        } else {
            // 登录信息检测
            res['status'] = this.getLoginInfo() ? true : false;
        }

        return res;
    },

    /**
     * 1.0 强制检测用户授权状态
     */
    ckPromission: function () {
        var that = this;
        // that.data.accredit = wx.getStorageSync(that.cacheK.accredit);
        that.data.accredit = getApp().accredit;
        if (!that.data.accredit) {
            wx.getSetting({
                success: (res) => {
                    // that.getPromission();
                    if (res.authSetting['scope.userInfo']) {
                        // 设置全局授权状态
                        getApp().accredit = true;
                        console.log('scope.userInfo access success');
                    } else {
                        // 设置全局授权状态
                        getApp().accredit = false;
                        console.log('scope.userInfo access fail');
                        that.openPromission();
                    }
                    /*
                     * res.authSetting = {
                     *   "scope.userInfo": true,
                     *   "scope.userLocation": true
                     * }
                     */
                },
                fail: function () {
                    console.log('user access fail')
                }
            });
        } else if (!getApp().accredit) {
            getApp().accredit = wx.getStorageSync();
        }
    },

    /**
     * 1.1 获取授权允许信息(that.data.loginStatus=[true|false])
     */
    openPromission: function () {
        var that = this;

        wx.openSetting({
            success: function (data) {
                // 标识全局授权状态
                getApp().accredit = true;
            },
            fail: function () {
                // 标识全局授权状态
                getApp().accredit = false;
            }
        });
    },

    /**
     * 1、微信用户信息授权
     * 
     * @remark app.js中调用
     */
    wxlogin: function (callback) {
        var that = this;
        var loginInfo = wx.getStorageSync(that.globalKey.login);
        if (loginInfo && typeof (loginInfo.token) != 'undefined' && loginInfo.token) {
            // 赋值全局变量(app.js调用不能立刻使用getAPP())
            setTimeout(function () {
                getApp().globalData.userInfo = loginInfo;
                getApp().accredit = wx.getStorageSync(that.globalKey.accredit);
            }, 100);

            // 页面方法回调
            that.callback_page(callback, loginInfo, { 'from': 'cache' });
            return true;
        }

        wx.login({
            success: function (res) {
                wx.getUserInfo({
                    success: function (user) {
                        console.log(user);
                        var data = {};
                        data['code'] = res.code;
                        data['type'] = 'xcx';
                        data['encryptedData'] = user.encryptedData;
                        data['iv'] = user.iv;
                        data['callback'] = callback;
                        data['appkey'] = 'wenda';

                        // 电动邦登录
                        that.postURLData(that.apiURL['login'], data, '_setLoginCache');
                    }, fail: function (failRes) {
                        // 拒绝授权，再次唤醒
                        console.log('授权失败，唤醒授权');
                        that.ckPromission();
                    }
                })
            },
            fail: function () {
                console.log('wx login fail');
            }
        });// end wx.login
        // }
    },

    /**
     * 2.1 设置登录信息
     */
    _setLoginCache: function (res, opt) {
        var that = this;
        if (res.code == 0) {
            if (typeof (res.data.data) != 'undefined') {
                // 全局授权信息
                getApp().accredit = res.data.data;

                wx.setStorage({
                    key: that.globalKey.accredit,
                    data: res.data.data,
                });
            }
            // 记录登录信息
            if (typeof (res.data.user) != 'undefined') {
                var user = { 'mobile': '', 'has_mobile': false };
                // 授权信息
                user.data = res.data.data;
                user.token = res.data.token;
                // 过滤字段
                var fields = 'id,mobile,name,nickname,isforbid,img,sex,powers,praise_num,fans_num,follow_num,comment_num,article_num';
                for (let k in res.data.user) {
                    if (fields.indexOf(k) > -1) {
                        user[k] = res.data.user[k];
                    }
                }
                // 手机号绑定判断
                user.has_mobile = user.mobile.length == 11 ? true : false;

                // 设置缓存
                wx.setStorageSync(that.globalKey.login, user);

                // 设置全局属性
                getApp().globalData.userInfo = user;
                getApp().globalData.has_mobile = user.has_mobile;

                // 页面回调
                if (typeof (opt.callback) != 'undefined') {
                    that.callback_page(opt.callback, res.data.user, opt);
                }
            } else if (res.data.data) {
                var accredit = res.data.data;
                accredit['name'] = accredit.out_uname;
                accredit['img'] = accredit.out_uavatar;
                accredit['id'] = 0;
                accredit['follow_num'] = 0;
                accredit['article_num'] = 0;
                accredit['fans_num'] = 0;
                accredit['token'] = '';
                accredit['has_mobile'] = '';
                that.callback_page(opt.callback, accredit, { 'from': 'accredit' });
            }

        } else {
            that.showError(res.message);
        }
    },

    /**
     * 获取授权信息
     */
    getAccredit: function () {
        var accredit = wx.getStorageSync(this.globalKey.accredit);
        // 兼容登录用户名及头像展示
        if (accredit) {
            accredit['name'] = accredit['out_uname'];
            accredit['img'] = accredit['out_uavatar'];
        }
        return accredit;
    },

    // 清除登录缓存
    clearLoginCache: function () {
        var that = this;
        wx.clearStorageSync(that.globalKey.login);
    },


    // 获取登录信息
    getLoginInfo: function (callback) {
        var that = this;
        var loginInfo = getApp().globalData.userInfo;
        if (!loginInfo) {
            // 从缓存中获取
            loginInfo = wx.getStorageSync(that.globalKey.login);
        }
        if (loginInfo && typeof (loginInfo.token) != 'undefined' && loginInfo.token && loginInfo.has_mobile) {
            return loginInfo;
        } else {
            return false;
        }
        // var loginInfo = wx.getStorageSync(that.globalKey.login);
        // if (typeof (loginInfo.id) != 'undefined') {
        //   if (callback && typeof (callback) != 'undefined') {
        //     return that.callback_page(callback, loginInfo, { 'from': cache });
        //   } else {
        //     return loginInfo;
        //   }
        // } else {
        //   return {id:0, has_mobile:false, mobile:''};
        // }
    },


    /*******************缓存通用方法(start)******************/
    /**
     * 缓存相关
     */
    getCacheFavorite: function (ftype) {
        var data = wx.getStorageSync(this.cacheK.favorites + '_' + ftype)
        return typeof (data) != 'object' ? [] : data;
    },

    // 初始化缓存值转换成string
    parseCacheVal: function (args) {
        if (!args) {
            return args;
        }

        var arr = [];
        if (typeof (args) == 'object') {
            for (let k in args) {
                arr.push(args[k]);
            }
            arr = arr.join('_');
        } else {
            arr = args;
        }
        return arr;
    },


    /*******************缓存通用方法(end)******************/

    /**
     *  手机动态码
     * 
     */
    verifyCode: function (args, callback) {
        var that = this;
        if (args) {
            that.getURLData(that.apiURL['verifyCode'], args, callback);
        } else {
            console.log('mobile is empty');
        }
    },

    /**
     * 手机号登录
     */
    phoneVerify: function (args, callback) {
        var that = this;
        var accredit = wx.getStorageSync(that.globalKey.accredit);
        if (typeof (accredit.unionId) != 'undefined') {
            args['unionId'] = accredit.unionId;
        }
        that.postURLData(that.apiURL['phoneVerify'], args, callback);
    },


    /**
   * 城市选择
   * 
   * @param [string]  页面回调方法
   */
    cityList: function (callback) {
        var that = this;
        that.getURLData(that.apiURL['cityList'], {}, callback);
    },

    /**
   * 个人信息 - 个人主页
   * 
   * @param [int]     authorid    [用户id]
   * @param [string]  callback    [页面回调方法]
   */
    personal: function (authorid, callback) {
        var that = this;
        var args = { authorid: authorid };
        that.postURLData(that.apiURL['personal'], args, callback);
    },
    /**
   * 个人 - 提现
   * 
   * @param [int] 
   * @param [string]  callback    [页面回调方法]
   */
    userapply:function(args, callback) {
        var that = this;
        // var args = {
        //     uid: uid,
        //     amount: amount,
        //     wechat_num: wechat_num};
        that.postURLData(that.apiURL['userapply'], args, callback);
    },





    /**
     * 摇号查询
     */
    query: function (args, callback) {
        var that = this;
        that.postURLData(that.apiURL['query'], args, callback);
    },


    /**
     * 摇号提醒
     */
    remind: function (args, callback) {
        var that = this;
        that.postURLData(that.apiURL['remind'], args, callback);
    },
}

// 声明类方法
module.exports.userApi = userApi;