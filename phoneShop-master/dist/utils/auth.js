import API from 'api';

/*
|-------------------------------------------------------------------------------
| 基于token验证机制的微信小程序授权模块
|-------------------------------------------------------------------------------
| login()			- 登陆
| logout()			- 注销
| check()			- 验证当前用户授权是否有效/过期
| checkOrLogin()	- 验证当前授权是否有效, 无效则重新登录
| guest()			- 判断当前用户是否为游客
| user()			- 获取当前用户信息
| openid()			- 获取当前用户的openid
| token()			- 获取本地token
| code()			- 获取code
*/
const Auth = {}

/**
 * 获取当前登陆用户的openid
 * @return {string}
 */
Auth.openid = function() {
    const user = Auth.user()
    if (user && user.openid) {
        return user.openid
    } else {
        return ''
    }
}

/**
 * 判断当前用户是否为游客
 * @return {boolean}
 */
Auth.guest = function() {
    if (!Auth.user()) {
        return true
    } else {
        return false
    }
}

/**
 * 获取当前登陆用户信息
 * @return {object}
 */
Auth.user = function() {
    return wx.getStorageSync('user');
}

/**
 * 获取token
 * @return {string}
 */
Auth.token = function() {
    return wx.getStorageSync('token');
}

/**
 * 注销
 * @return {boolean}
 */
Auth.logout = function() {
    wx.removeStorageSync('user')
    wx.removeStorageSync('token')
    wx.removeStorageSync('expired_in')

    return true
}

/**
 * 登陆
 * @return {Promise} 用户
 */
Auth.login = function(msg) {
    return new Promise(function(resolve, reject) {
        Auth.code().then(code => {
            wx.getUserInfo({
                withCredentials: true,
                // lang: 'zh_CN',
                success: function(res) {
                    API.signon(code, res.iv, res.encryptedData).then(res => {
                        getApp().globalData.userInfo = res;
                        console.log('登录成功');
                        resolve(res);
                    }, err => {
                        console.log('登录失败', err);
                        reject(err);
                    });
                },
                fail: function(err) {
                    wx.showModal({
                        title: '温馨提示',
                        content: msg,
                        success: function(res) {
                            if (res.confirm) {
                                wx.openSetting({
                                    complete: function(res) {
                                            reject(res);
                                        }
                                        // success: function(res){
                                        // 	// if(res.authSetting["scope.userInfo"]){
                                        // 	// 	Auth.login().then(res=>{
                                        // 	// 		resolve(res);
                                        // 	// 	}, err=>{
                                        // 	// 		reject(err);
                                        // 	// 	});
                                        // 	// }else{
                                        // 		reject(res);	// 这里一定要返回 reject ，不会会有同时两个 auth.signon 请求，但是模拟器上会有bug
                                        // 	// }
                                        // },

                                    // fail: function(err) {
                                    // 	reject(err);
                                    // }
                                });
                            }
                        },
                        fail: function(err) {
                            reject(err);
                        }
                    });
                }
            });
        }, err => {
            reject(err);
        });
    });
}

/**
 * 获取登录code
 * @return code
 */
Auth.code = function() {
    if (wx.getStorageSync('code') && Date.now() < wx.getStorageSync('code_expired_in')) {
        console.log('local.code', wx.getStorageSync('code'));
        return Promise.resolve(wx.getStorageSync('code'));
    } else {
        return new Promise(function(resolve, reject) {
            wx.login({
                success: function(res) {

                    wx.setStorageSync('code', res.code)
                    wx.setStorageSync('code_expired_in', Date.now() + (300 - 30) * 1000)

                    console.log('wx.login.code', res.code);
                    resolve(res.code);
                },

                fail: function(err) {
                    reject(err);
                }
            });
        });
    }
}

/**
 * 判断token还是否在有效期内
 * @return {boolean}
 */
Auth.check = function() {
    if (Auth.user() && Date.now() < wx.getStorageSync('expired_in') && Auth.token) {
        console.log('access_token过期时间：', (wx.getStorageSync('expired_in') - Date.now()) / 1000, '秒');
        return true;
    } else {
        return false;
    }
}

/**
 * 验证当前授权是否有效, 无效则重新登录
 * @return {Promise} 用户
 */
Auth.checkOrLogin = function(msg = '您必须授权才可以操作') {
    if (Auth.check()) {
        return Promise.resolve(Auth.user());
    } else {
        return new Promise(function(resolve, reject) {
            Auth.login(msg).then(res => {
                resolve(res.user);
            }, err => {
                reject(err);
            });
        });
    }
}

module.exports = Auth