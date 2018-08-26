/**
 * 工具类包，提供以下功能：
 * 1、日期之间的转换，日期和字符串的转换
 *
 */
import DataStructure from '../datamodel/DataStructure'
import settings from '../datamodel/Settings'

const _ = require('./underscore.modified');
const BASE_URL = 'https://www.newpictown.com/';

const Course = new DataStructure.Course();

/**
 * 格式化输出数字，固定位数
 * @param n，位数
 */
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude);
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2);
    latitude = latitude.toFixed(2);

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

/**
 * 深度克隆
 * @param obj
 * @returns {*}
 */
function deepClone(obj) {

    let clone = obj.constructor === Array ? [] : {};

    // 递归
    for (let item in obj) {
        if (obj.hasOwnProperty(item)) {
            clone[item] = typeof obj[item] === "object" ? deepClone(obj[item]) : obj[item];
        }
    }

    return clone;
}

function isEqual(a, b) {
    return _.isEqual(a, b);
}

function showModal(title, content) {
    wx.showModal({
        title: title,
        content: content,
    });
}

/**
 * 同步爱撸铁设计的动作信息
 * @param host
 */
function syncActions(host) {
    // 获取后台服务器上的动作数据
    wx.request({
        url: 'https://www.newpictown.com/part/allPredefinedOnes',
        success: function (res) {
            // console.log("in syncActions, body info:", res.data);
            let actionArray = res.data;
            let body = new Body.PartsWithActions(actionArray);

            // console.log("in syncActions, body info:", body);
            // console.log(Storage);

            // 保存在本地
            saveData(Settings.Storage.PartsWithActions, body);
        }
    });
}

/**
 * 同步用户的微信信息
 * @param host
 */
function syncWechatUserInfo(host) {
    // 获取用户的微信信息
    wx.getUserInfo({
        success: res => {
            // 可以将 res 发送给后台解码出 unionId
            console.log("in syncWechatUserInfo, wechatUserInfo: ", res.userInfo);
            host.wechatUserInfo = res.userInfo;
            host.userInfoLocal.nickName = res.userInfo.nickName;
            host.userInfoLocal.gender = res.userInfo.gender === 1 ? "Male" : "Female";
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (host.userInfoReadyCallback) {
                host.userInfoReadyCallback(res);
            }
        },
        fail: res => {
            console.log("failed: ", res);
        }
    });
}

/**
 * 同步由爱撸铁设计的用户数据信息
 * @param host
 * @param type
 * @param data2Sever
 * @param data2Local
 */
function syncUserInfo(host, type, data2Sever, data2Local) {
    if (host) {
        wx.login({
            success: function (res) {
                console.log("in syncUserInfo, login.res.code:", res);
                if (res.code) {
                    // 1、获取js_code，去后台换取OpenId
                    wx.request({
                        url: urls.user.getOpenId(res.code),
                        method: 'GET',
                        success: function (res) {
                            let openId = res.data;
                            console.log("in syncUserInfo, openId:", openId);
                            // 2、根据OpenId获取服务器上用户信息
                            if (typeof openId !== 'undefined' || openId !== '') {
                                wx.request({
                                    url: urls.user.byOpenId(openId),
                                    method: 'GET',
                                    success: function (res) {
                                        if (typeof res.data.id !== 'undefined') {
                                            console.log("in syncData, res.data:", res.data);
                                            copyInfo(host, res);
                                            console.log("in syncData, host.userInfoLocal:", host.userInfoLocal);
                                            saveData(Settings.Storage.UserInfo, host.userInfoLocal);
                                        } else {
                                            console.log("in syncData, host.userInfoLocal:", host.userInfoLocal);
                                            host.userInfoLocal.wechatOpenId = openId;
                                            console.log("in syncData, user didn't register on server!");
                                            wx.showModal({
                                                title: 'Error',
                                                content: '还未注册，去注册？',
                                                success: function (res) {
                                                    if (res.confirm) {
                                                        // 去注册
                                                        wx.redirectTo({
                                                            url: '/pages/settings/modify/modify?model=newUser',
                                                        });
                                                    } else if (res.cancel) {
                                                        console.log('用户取消UserUID');
                                                    }
                                                }
                                            });

                                        }
                                    },
                                    fail: function (res) {
                                        console.log("Get user id fail: ", res.data);
                                    }
                                }
                                );
                            } else {
                                console.log("Get OpenId fail: ", res.data);
                                wx.showModal({
                                    title: 'Error',
                                    content: '未能获取用户的OpenId，请检查网络',
                                });
                            }
                        },
                        fail: function (res) {
                            console.log("get OpenId fail: ", res.data);
                            wx.showModal({
                                title: 'Error',
                                content: '未能获取用户的OpenId，请检查网络',
                            });
                        }
                    })
                }
            }
        });
    } else {
        if (data2Sever.id === -1) {
            delete data2Sever.id;
            createData(type, data2Sever, data2Local);
        } else {
            updateData(type, data2Sever, data2Local);
        }
    }

}

function syncPlan(host, type, data2Sever, data2Local) {
    if (data2Sever.id === -1) {
        delete data2Sever.id;
        createData(type, data2Sever, data2Local);
    } else {
        updateData(type, data2Sever, data2Local);
    }

}

function syncReality(host, type, data2Sever, data2Local) {
    // wx.showLoading({
    //     title: '同步数据',
    // });
    let data = {
        "fromDate": host.selectedDateString,
        "toDate": host.selectedDateString,
        "userId": host.userInfoLocal.userUID
    };
    wx.request({
        url: 'https://www.newpictown.com/reality/page/',
        data: data,
        method: 'POST',
        success: function (res) {
            console.log("in syncReality, reality info:", res.data);
            // 查询当天是否存有reality
            let realityId = -1;
            for (let item of res.data.content) {
                if (item.date === host.selectedDateString) {
                    realityId = item.id;
                }
            }

            if (realityId === -1) {
                delete data2Sever.id;
                createData(type, data2Sever, data2Local);
            } else {
                data2Sever.id = realityId;
                updateData(type, data2Sever, data2Local);
            }
            // wx.hideLoading();
        }
    });

}


/**
 * 同步数据
 * @param host
 * @param type
 * @param data2Sever
 * @param data2Local
 */
function syncData(host, type, data2Sever, data2Local) {
    switch (type) {
        case "predefined":
            // 爱撸铁自定义动作列表
            syncActions(host);
            break;
        case "wechat":
            // 微信用户信息
            syncWechatUserInfo(host);
            break;
        case "user":
            // 爱撸铁用户信息
            syncUserInfo(host, type, data2Sever, data2Local);
            break;
        case "plan":
            syncPlan(host, type, data2Sever, data2Local);
            break;
        case "reality":
            syncReality(host, type, data2Sever, data2Local);
            break;
        default:
            console.log("in createData, wrong type!");
            break;
    }
}

/**
 * 到服务端创建数据，本地保存新建的数据
 * @param type
 * @param data2Sever
 * @param data2Local
 */
function createData(type, data2Sever, data2Local) {
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
function updateData(type, data2Sever, data2Local) {
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
                        saveData(Settings.Storage.UserInfo, data2Local);
                        break;
                    case "plan":
                        let newPlanId = res.data.id;
                        data2Sever.id = newPlanId;
                        data2Local.push(data2Sever);

                        saveData(Settings.Storage.UserPlanSet, data2Local);
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

                        saveData(Settings.Storage.RealitySet, data2Local);
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


module.exports = {
    formatLocation: formatLocation,
    formatNumber: formatNumber,
    deepClone: deepClone,
    isEqual: isEqual,
    underscore: _,
    showModal: showModal,
    syncData: syncData,

};
