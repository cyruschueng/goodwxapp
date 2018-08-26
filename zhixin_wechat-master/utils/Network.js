/**
 * 网络请求类，这里是异步请求，那么get，post等不能直接写到对应的类里面
 */
import StorageUtils from './StorageUtils'
import Settings from '../datamodel/Settings'

const BASE_URL = "https://www.yongrui.wang/WeChatMiniProgram/";
const Setting = new Settings.Settings();

// TODO
// 增加Promise

/**
 * 使用GET方法获取数据
 * @param type
 * @param key
 */
function getData(type, key) {
    wx.showLoading({
        title: '同步数据',
    });

    wx.request({
            url: BASE_URL + type + "/" + key,
            method: 'GET',
            success: function (res) {
                if (typeof res.data.id !== 'undefined') {
                    console.log("return id:", res.data.id);
                    switch (type) {
                        case "user":
                            data2Local.userUID = parseInt(res.data.id);
                            StorageUtils.saveData(Settings.Storage.UserInfo, data2Local);
                            console.log("data2Local: ", data2Local);
                            console.log("create user successful, res.data:", res.data);
                            wx.hideLoading();
                            break;
                        case "plan":
                            data2Sever.id = res.data.id;
                            data2Local.push(data2Sever);
                            StorageUtils.saveData(Settings.Storage.UserPlanSet, data2Local);
                            console.log("create plan successful, res.data:", res.data);
                            wx.hideLoading();
                            wx.switchTab({
                                url: '../../student/student',
                            });
                            break;
                        case "reality":
                            data2Sever.id = res.data.id;
                            data2Local.push(data2Sever);
                            StorageUtils.saveData(Settings.Storage.RealitySet, data2Local);
                            wx.hideLoading();
                            console.log("create reality successful, res.data:", res.data);
                            break;
                        default:
                            console.log("in createData, wrong type!");
                            break;
                    }
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.switchTab({
                    url: '../../student/student',
                });
                console.log("create fail: ", res.data);
            }
        }
    );
}

/**
 * 到服务端创建数据，本地保存新建的数据
 * @param type
 * @param data2Sever
 * @param data2Local
 */
function postData(type, data2Sever, data2Local) {
    wx.showLoading({
        title: '同步数据',
    });

    wx.request({
            url: BASE_URL + type + "/",
            method: 'POST',
            data: data2Sever,
            success: function (res) {
                if (typeof res.data.id !== 'undefined') {
                    console.log("return id:", res.data.id);
                    switch (type) {
                        case "user":
                            data2Local.userUID = parseInt(res.data.id);
                            saveData(Settings.Storage.UserInfo, data2Local);
                            console.log("data2Local: ", data2Local);
                            console.log("create user successful, res.data:", res.data);
                            wx.hideLoading();
                            break;
                        case "plan":
                            data2Sever.id = res.data.id;
                            data2Local.push(data2Sever);
                            saveData(Settings.Storage.UserPlanSet, data2Local);
                            console.log("create plan successful, res.data:", res.data);
                            wx.hideLoading();
                            wx.switchTab({
                                url: '../../student/student',
                            });
                            break;
                        case "reality":
                            data2Sever.id = res.data.id;
                            data2Local.push(data2Sever);
                            saveData(Settings.Storage.RealitySet, data2Local);
                            wx.hideLoading();
                            console.log("create reality successful, res.data:", res.data);
                            break;
                        default:
                            console.log("in createData, wrong type!");
                            break;
                    }
                }
            },
            fail: function (res) {
                wx.hideLoading();
                wx.switchTab({
                    url: '../../student/student',
                });
                console.log("create fail: ", res.data);
            }
        }
    );
}

/**
 * 到服务端更新数据，本地保存更新的数据
 * @param type
 * @param data2Sever
 * @param data2Local
 */
function putData(type, data2Sever, data2Local) {
    // 后台更新
    wx.showLoading({
        title: '同步数据',
    });
    wx.request({
            url: BASE_URL + type + "/",
            method: 'PUT',
            data: data2Sever,
            success: function (res) {
                if (typeof res.data.id !== 'undefined') {
                    switch (type) {
                        case "user":
                            console.log("update user success: ", res.data);
                            saveData(Setting.Storage.UserInfo, data2Local);
                            break;
                        case "plan":
                            let newPlanId = res.data.id;
                            data2Sever.id = newPlanId;
                            data2Local.push(data2Sever);

                            saveData(Setting.Storage.UserPlanSet, data2Local);
                            console.log("update plan successful, res.data:", res.data);
                            wx.hideLoading();
                            wx.switchTab({
                                url: '../../student/student',
                            });
                            break;
                        case "reality":
                            let newRealityId = res.data.id;
                            data2Sever.id = newRealityId;
                            data2Local.push(data2Sever);

                            saveData(Setting.Storage.RealitySet, data2Local);
                            console.log("update reality successful, res.data:", res.data);
                            wx.hideLoading();
                            break;
                        default:
                            console.log("in createData, wrong type");
                            break;
                    }
                }

            },
            fail: function (res) {
                console.log("update", type, "fail: ", res.data);
            }
        }
    );

}

/**
 * 同步用户数据
 */
function syncUserInfo(self) {
    // 登录
    // 等待服务器反应
    wx.showLoading({
        title: '同步数据',
    });

    // 先读取本地内容
    let userInfoLocal = StorageUtils.loadData(Setting.Storage.WeChatUser);

    wx.login({
        success: res => {
            console.log("login success, res:", res.code);
            wx.request({
                url: 'https://www.yongrui.wang/WeChatMiniProgram/user/weChatMPOpenIdByJSCode/' + res.code,
                // 获取OpenId成功
                success: response => {
                    console.log("openId response.data:", response.data);
                    let mpOpenId = response.data.mpOpenId;
                    // 获取用户信息
                    wx.getSetting({
                        success: res => {
                            // if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                                data: {
                                    'withCredentials': true
                                },
                                success: res => {
                                    // 可以将 res 发送给后台解码出 unionId
                                    console.log("res.userInfo", res.userInfo);
                                    // 复制微信信息
                                    userInfoLocal.nickName = res.userInfo.nickName;
                                    userInfoLocal.gender = (res.userInfo.gender === 1) ? "Male" : "Female";
                                    userInfoLocal.avatarUrl = res.userInfo.avatarUrl;

                                    // 取得openId后去获取unionId，并带回服务器上用户的数据
                                    wx.request({
                                        url: 'https://www.yongrui.wang/WeChatMiniProgram/user/weChatMPUnionIdQuery',
                                        method: 'POST',
                                        data: {
                                            mpOpenId: mpOpenId,
                                            encryptedData: res.encryptedData,
                                            iv: res.iv
                                        },
                                        success: response => {
                                            // 形成其他request要的header
                                            let userAuth = response.data.weChatInfo.unionId + ":password";
                                            let arrayBuffer = new ArrayBuffer(userAuth.length * 2);
                                            let bufferView = new Uint16Array(arrayBuffer);
                                            for (let i = 0, strLen = userAuth.length; i < strLen; i++) {
                                                bufferView[i] = userAuth.charCodeAt(i);
                                            }

                                            let basicAuth = "Basic " + wx.arrayBufferToBase64(bufferView);

                                            let request_header = {
                                                Authorization: basicAuth
                                            };

                                            console.log(request_header);

                                            // 将来注册和查询用
                                            self.tempData.request_header = request_header;
                                            self.tempData.unionId = response.data.weChatInfo.unionId;

                                            userInfoLocal.weChatInfo.unionId = response.data.weChatInfo.unionId;

                                            console.log("unionId response.data:", response.data);
                                            // 判断本地是否数据
                                            if (userInfoLocal.id === -1) {
                                                // 如果未注册，不返回id，去注册页面
                                                if (typeof response.data.id === "undefined") {
                                                    // 先保存，然后在另外一个页面再调用localStorage
                                                    StorageUtils.saveData(Setting.Storage.WeChatUser, userInfoLocal);
                                                    wx.hideLoading();

                                                    wx.redirectTo({
                                                        url: '/pages/normalpages/modify/modify' + '?model=register',
                                                    });
                                                } else {
                                                    // 如果返回id，表示本地删除过小程序，找回用户信息，在获取了用户id之后，更新用户信息，这步必须的。
                                                    // 复制信息
                                                    // userInfoLocal.id = response.data.id;
                                                    // userInfoLocal.nickName =response.data.

                                                    for (let item in response.data) {
                                                        if (userInfoLocal.hasOwnProperty(item)) {
                                                            userInfoLocal[item] = response.data[item];
                                                        }
                                                    }

                                                    if (typeof response.data.roleSet !== "undefined") {
                                                        let authorities = [];
                                                        for (let item of response.data.roleSet) {
                                                            switch (item.id) {
                                                                case 2:
                                                                    authorities.push("teacher");
                                                                    break;
                                                                case 3:
                                                                    authorities.push("student");
                                                                    break;
                                                                case 4:
                                                                    authorities.push("parent");
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                        }

                                                        userInfoLocal.authorities = authorities;
                                                    }

                                                    StorageUtils.saveData(Settings.Storage.WeChatUser, userInfoLocal);

                                                    wx.hideLoading();
                                                }
                                            } else {
                                                // 有的话也要同步，万一多设备登录
                                                for (let item in response.data) {
                                                    if (userInfoLocal.hasOwnProperty(item)) {
                                                        userInfoLocal[item] = response.data[item];
                                                    }
                                                }

                                                if (typeof response.data.roleSet !== "undefined") {
                                                    let authorities = [];
                                                    for (let item of response.data.roleSet) {
                                                        switch (item.id) {
                                                            case 2:
                                                                authorities.push("teacher");
                                                                break;
                                                            case 3:
                                                                authorities.push("student");
                                                                break;
                                                            case 4:
                                                                authorities.push("parent");
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }

                                                    userInfoLocal.authorities = authorities;
                                                }

                                                StorageUtils.saveData(Setting.Storage.WeChatUser, userInfoLocal);
                                                wx.hideLoading();
                                            }

                                        },
                                        fail: response => {
                                            console.log("failed response:", response);
                                        },
                                    });

                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res);
                                    }
                                },
                                fail: res => {
                                    console.log("getUserInfo failed, res:", res);
                                }
                            })
                            // }
                        },
                        fail: res => {
                            console.log("getSetting failed, res:", res);
                        }
                    })
                },
                // 获取OpenId失败
                fail: function (res) {
                    console.log(res);
                    console.log("get OpenId failed, res:", res);
                }
            })
        },
        fail: res => {
            console.log("login failed, res: ", res.code);
        }
    });

}

module.exports = {
    syncUserInfo: syncUserInfo
};