/**
 * Created by demongao on 2017/9/4.
 */
import wepy from 'wepy';
import G from './global';

export default {
    log(data){
        console.log(data);
    },
    // 模态框
    showModal(title = '提示',content, showCancel = true){
        return new Promise((reslove, reject) => {
            wx.showModal({
                title: title,
                content: content,
                showCancel: showCancel,
                success: function(res) {
                    if (res.confirm) {
                        reslove('用户点击确定');
                    } else if (res.cancel) {
                        reject('用户点击取消');
                    }
                }
            });
        })
    },
    showToast(title){
        wx.showToast({
            title: title,
            image: '/static/img/icon/waring.png',
            duration: 1000
        })
    },
    /**
     * wx.checkSession封装成Promise
     * @returns {Promise}
     */
    checkSession (){
        return new Promise((resolve, reject) => {
            wx.checkSession({
                success(){
                    resolve();
                },
                fail(){
                    reject();
                }
            })
        })
    },
    /**
     * code 置换登录态 session 接口
     */
    getSession (code) {
        return wepy.request({
            url: G.host + 'tpcyh/doLogin',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                code: code
            }
        });
    },
    /**
     * 封装 request 方法，在第一次登陆态失效后自动登录并转换 session 后重发请求
     */
    request (data, tryagain) {
        return new Promise((resolve, reject) => {
            data.method = 'POST';
            data.header = {'content-type': 'application/x-www-form-urlencoded'};
            wepy.request(data).then(res => {
                // console.log(res);
                if (res.data.code == "SUCCESS") {
                    resolve(res);
                } else {
                    if (['000008', '000019', '000006'].includes(res.data.code)) {
                        // 登录态验证失败
                        if (tryagain) {
                            reject('code 换取 session_key 异常'); // code 置换 session 后依然返回登录态验证失败
                            return;
                        }
                        console.log("........");
                        return wepy.login() // 可能是session过期等原因，获取最新 code
                            .then(loginRes => this.getSession(loginRes.code)) // 使用最新code置换 session
                            .then(sessionData => {
                                this.setLocalStorageSync(G.session_3rd, sessionData.data.body.session_3rd);
                                return this.request(data, true); // 重发请求
                            }).catch(reject(res));
                    } else {
                        console.error(`ajax返回失败 { 错误码:${res.data.code},错误信息:${res.data.msg} }`);
                        console.error(res);
                        wx.hideLoading();
                        reject(res);
                    }
                }
            }).catch(res => {
                console.error("request Error: " + res);
                wx.hideLoading();
            });
        });
    },

    openSetting(){
        var That = this;
        return new Promise((resolve, reject) => {
            wx.openSetting({
                success(res) {
                    console.log("调起客户端小程序设置界面");
                    resolve(res);
                },
                fail(res) {
                    console.log("调起客户端小程序设置界面调用失败!");
                    reject(res);
                }
            });
        });
    }
    ,
    // 设置本地存储
    getLocalStorageSync(key){
        return wx.getStorageSync(key);
    },
    // 获取本地存储
    setLocalStorageSync(key, value){
        wx.setStorageSync(key, value);
    },

    getLocation(){
        var That = this;
        let location = this.getLocalStorageSync(G.location);
        return new Promise( (resolve, reject) => {
            if(location){
                console.log(location);
                resolve(location);
                return ;
            }
            wx.getLocation({
                type: 'wgs84',
                success(res) {
                    That.setLocalStorageSync(G.location , res);
                    console.log(res);
                    resolve(res);


                },
                fail(res){
                    That.setLocalStorageSync(G.location , {
                        accuracy: 65,
                        altitude: 0,
                        errMsg: "getLocation:ok",
                        horizontalAccuracy: 65,
                        latitude: 31.24563,
                        longitude: 121.5062,
                        speed: -1,
                        verticalAccuracy: 65
                    });
                    resolve({
                        accuracy: 65,
                        altitude: 0,
                        errMsg: "getLocation:ok",
                        horizontalAccuracy: 65,
                        latitude: 31.24563,
                        longitude: 121.5062,
                        speed: -1,
                        verticalAccuracy: 65
                    })

                }
            });
        });

    },
    // 上传用户当前位置
    async loadFpUserIdByCoordinate() {
        // 异步等待
        let location = await this.getLocation();
        let data = {
            url: G.host + 'tpcyh/loadFpUserIdByCoordinate',
            data: {
                longitude: location.longitude,
                latitude: location.latitude
            }
        };
        return this.request(data);
    },



};
