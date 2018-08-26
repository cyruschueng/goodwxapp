const API_HOST = 'https://apple110.wpweixin.com'

const API = {}

API.request = function(url, method = "GET", data = '', args = { showLoading: true, token: true, cache_key: '', cache_time: 3600 }) {
        if (args.cache_key && args.cache_time && API.getStorageSync(args.cache_key)) {
            console.log(args.cache_key + '过期时间：', (wx.getStorageSync(args.cache_key + '_expired_in') - Date.now()) / 1000, '秒');
            return Promise.resolve(API.getStorageSync(args.cache_key));
        } else {
            return new Promise(function(resolve, reject) {
                if (args.showLoading) {
                    wx.showLoading({
                        title: '加载中',
                    });
                }

                console.log(url);

                url = API_HOST + url;
                if (args.token && API.token()) {
                    url = url + '?access_token=' + API.token();
                }

                console.log(url);

                wx.request({
                    url: url,
                    data: data,
                    method: method,
                    success: function(res) {
                        if (args.showLoading) {
                            wx.hideLoading();
                        }

                        if (res.data.errcode == 0) {
                            if (args.cache_key && args.cache_time) {
                                API.setStorageSync(args.cache_key, res.data, args.cache_time);
                            }

                            resolve(res.data);
                        } else if (res.data.errcode && res.data.errcode === 'illegal_access_token') {
                            wx.showToast({
                                title: "用户信息有误\n请重试",
                            });

                            API.signout();
                        } else if (res.data.errmsg) {
                            wx.showToast({
                                    title: res.data.errmsg,
                                })
                                // reject(res.data);
                        } else {
                            if (args.cache_key && args.cache_time) {
                                API.setStorageSync(args.cache_key, res.data, args.cache_time);
                            }

                            resolve(res.data);
                        }
                    },
                    fail: function(err) {
                        if (args.showLoading) {
                            wx.hideLoading();
                        }

                        console.log(err);
                        reject(err);
                    }
                })
            });
        }
}

API.get = function(url, args = { showLoading: true, token: true }) {
    return API.request(url, "GET", '', args);
}


API.post = function(url, data, args = { showLoading: true, token: true }) {
    return API.request(url, "POST", data, args);
}

API.getStorageSync = function(key) {
    if (Date.now() < wx.getStorageSync(key + '_expired_in')) {
        return wx.getStorageSync(key);
    } else {
        return false;
    }
}

API.setStorageSync = function(key, value, cache_time = 3600) {
    wx.setStorageSync(key, value);
    wx.setStorageSync(key + '_expired_in', Date.now() + cache_time * 1000);
}

API.signon = function(data) {
    return new Promise(function(resolve, reject) {
        API.post('/api2/auth.signon.json', data, { showLoading: false, token: false }).then(res => {
            if (res.errcode === 0) {
                API.storageUser(res);
                resolve(res.user);
            } else {
                reject(res.errmsg);
            }
        }, err => {
            reject(err);
        });
    });
}

API.storageUser = function(res){
    wx.setStorageSync('user', res.user);
    wx.setStorageSync('token', res.access_token);
    wx.setStorageSync('expired_in', Date.now() + parseInt(res.expired_in, 10) * 1000 - 60000);
}

API.signout = function() {
    wx.removeStorageSync('user');
    wx.removeStorageSync('token');
    wx.removeStorageSync('expired_in');
}

API.token = function() {
    if (Date.now() < wx.getStorageSync('expired_in') && wx.getStorageSync('token')) {
        return wx.getStorageSync('token');
    } else {
        return '';
    }
}

API.debugMode = function() {
    return API.get('/api2/debug.mode.json', { showLoading: false });
}

API.getBanner = function() {
    return API.get('/api2/get_wxapp_banner.json', { showLoading: false, cache_key: 'banner', cache_time: 3600 });
}

API.getGroupSpeeds = function(data) {
    return API.post('/api2/group.speeds.json', data)
}

API.createWxacode = function(data) {
    return API.post('/api2/create.wxacode.json', data);
}

module.exports = API