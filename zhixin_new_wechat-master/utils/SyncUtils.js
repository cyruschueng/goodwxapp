/**
 * 网络请求类，这里是异步请求，那么get，post等不能直接写到对应的类里面
 */
import StorageUtils from './StorageUtils'
import DateTimeUtils from './DateTimeUtils'
import Settings from '../datamodel/Settings'
import wxApi from './wxApi'
import wxRequest from './wxRequest'
import Util from './Util'

const BASE_URL = "https://www.yongrui.wang/WeChatMiniProgram/";
const Setting = new Settings.Settings();

const wxLogin = wxApi.wxLogin();
const wxGetSystemInfo = wxApi.wxGetSystemInfo();
const wxGetSetting = wxApi.wxGetSetting();
const wxGetUserInfo = wxApi.wxGetUserInfo();

function startSync(type) {
    console.log("start to " + type);

    // 显示同步数据，等待
    wx.showLoading({
        title: '同步数据',
        duration: 20000
    });
}

function finishSync(userInfo, page) {
    let app = getApp();

    // 根据状态重新装载Tab
    app.bottom_tabBar.reload();
    wx.hideLoading();

    console.log("page", page);

    if (typeof page !== "undefined") {
        if (page.type === "redirect") {
            wx.redirectTo({
                url: page.url,
            });
        } else if (page.type === "navigate") {
            wx.navigateTo({
                url: page.url,
            });
        }

    } else {
        wx.navigateBack({});
    }

    console.log("sync end!");
}

/**
 * 同步用户数据
 */
function syncUserInfo(invited) {
    startSync("syncUserInfo");

    // 先读取本地内容
    let wechatUserInfo;

    wxLogin().then(res => {
        console.log("wxLogin success, res:", res.code);
        let url = 'https://www.yongrui.wang/WeChatMiniProgram/user/weChatMPOpenIdByJSCode/' + res.code;
        wxRequest.getRequest(url)
            .then(res => {
                console.log("get openId success, res.data:", res.data);
                let mpOpenId = res.data.mpOpenId;
                wxGetSetting()
                    .then(res => {
                        console.log("wxGetSetting success, res:", res);
                        wxGetUserInfo({
                            data: {
                                'withCredentials': true
                            }
                        })
                            .then(res => {
                                // 可以将 res 发送给后台解码出 unionId
                                console.log("wxGetUserInfo success, userInfo:", res.userInfo);
                                // 复制微信信息
                                wechatUserInfo = res.userInfo;

                                // 取得openId后去获取unionId，并带回服务器上用户的数据
                                let url = 'https://www.yongrui.wang/WeChatMiniProgram/user/weChatMPUnionIdQuery';
                                let data = {
                                    mpOpenId: mpOpenId,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv
                                };
                                wxRequest.postRequest(url, data)
                                    .then(res => {
                                        // 最核心的部分，获取成功以后，保存信息
                                        console.log("get userInfo from server success, res:", res);
                                        wx.hideLoading();
                                        saveBasicInfo(wechatUserInfo, res, invited);
                                    })
                                    .catch(res => {
                                        console.log("get userInfo from server failed, res:", res);

                                    });
                            })
                            .catch(res => {
                                console.log("getUserInfo failed, res:", res);
                            });
                    })
                    .catch(res => {
                        console.log("wxGetSetting failed, res:", res);
                    });
            })
            .catch(res => {
                console.log("get openId failed, res:", res);
                // finishSync(userInfo);
            });
    })
        .catch(res => {
            console.log("wxLogin failed, res:", res);
            // wx.hideLoading();
        })
        .finally(() => {
            console.log("wxLogin finally!");

        });

}

/**
 * 去服务器注册
 * @param userInfo
 * @param createBy
 * @param pageUrl
 */
function createUserInfo(userInfo, createBy, pageUrl) {
    startSync("createUserInfo");

    let url = 'https://www.yongrui.wang/WeChatMiniProgram/user/viaWeChat';

    let userData = Util.removeNoValueItems(userInfo);

    // // TODO 暂时删除userSetting，为了测试是否userSetting影响
    // delete userData.userSetting;

    wxRequest.postRequest(url, userData)
        .then(res => {
            userInfo.id = res.data.id;
            // 后台创建或更新，并同步保存到本地
            console.log("saved userInfo:", userInfo);
            console.log("createUserInfo success, res.data:", res.data);

            if (createBy === "parent") {
                let parent_UserInfo = StorageUtils.loadUserInfo();
                parent_UserInfo.parentSet.push({
                    id: res.data.id
                });

                StorageUtils.saveUserInfo(parent_UserInfo);
                updateUserInfo(parent_UserInfo);

            } else {
                StorageUtils.saveCurrentId(res.data.id);
                StorageUtils.saveUserInfo(userInfo);
            }
            // 即时保存，不在complete里完成，以防其他页面再次读取到未更新的数据
        })
        .catch(res => {
            console.log("createUserInfo failed, res:", res);
            // 即时保存，不在complete里完成，以防其他页面再次读取到未更新的数据
        })
        .finally(() => {
            console.log("createUserInfo finally!");
            finishSync(userInfo, pageUrl);
        });

}

/**
 * 更新用户数据
 */
function updateUserInfo(userInfo, pageUrl) {
    // 登录，等待服务器反应
    startSync("updateUserInfo");

    let userData = Util.removeNoValueItems(userInfo);

    // // TODO 暂时删除userSetting，为了测试是否userSetting影响
    // delete userData.userSetting;

    console.log("updateUserInfo, userData:", userData);

    let url = 'https://www.yongrui.wang/WeChatMiniProgram/user/';

    let request_header = StorageUtils.loadRequestHeader();

    wxRequest.putRequestWithAuth(url, request_header, userData)
        .then(res => {
            console.log("updateUserInfo success, res.data:", res.data);
            StorageUtils.saveUserInfo(userInfo);
        })
        .catch(res => {
            console.log("updateUserInfo success, res.data:", res.data);
        })
        .finally(() => {
            console.log("updateUserInfo finally!");
            finishSync(userInfo, pageUrl);
        });
}

/**
 *
 * @param course
 */
function createCourseByTeacher(course) {
    startSync("createCourseByTeacher");

    let userInfo = StorageUtils.loadUserInfo();
    let request_header = StorageUtils.loadRequestHeader();

    let courseToServer = Util.removeNoValueItems(course);

    let url = 'https://www.yongrui.wang/WeChatMiniProgram/course';
    wxRequest.postRequestWithAuth(url, request_header, courseToServer)
        .then(res => {
            // 后台创建或更新，并同步保存到本地
            console.log("createCourseByTeacher success, res.data:", res.data);
            // 根据返回id，更新本地信息
            course.id = res.data.id;
            course.location.id = res.data.location.id;

            userInfo.teacherCourseSet.push(course);
            StorageUtils.saveUserInfo(userInfo);

        })
        .catch(res => {
            // 失败也要保存
            userInfo.teacherCourseSet.push(course);
            console.log("createCourseByTeacher failed, res:", res);
        })
        .finally(() => {
            console.log("createCourseByTeacher finally!");
            finishSync(userInfo);
            wx.navigateBack({});
        });
}

/**
 *
 * @param course
 */
function updateCourseByTeacher(course) {
    startSync("updateCourseByTeacher");

    let userInfo = StorageUtils.loadUserInfo();
    let request_header = StorageUtils.loadRequestHeader();
    let url = 'https://www.yongrui.wang/WeChatMiniProgram/course';

    let courseToServer = Util.removeNoValueItems(course);

    wx.setStorageSync("temp", courseToServer);

    wxRequest.putRequestWithAuth(url, request_header, courseToServer)
        .then(res => {
            // 后台创建或更新，并同步保存到本地
            console.log("updateCourseByTeacher success, res.data:", res.data);
            // 根据返回id，更新本地信息
            course.id = res.data.id;
            course.location.id = res.data.location.id;
            for (let idx = 0; idx < userInfo.teacherCourseSet.length; idx++) {
                if (userInfo.teacherCourseSet[idx].id === res.data.id) {
                    // 插入新数据
                    userInfo.teacherCourseSet.splice(idx, 1, course);
                    break;
                }
            }

            StorageUtils.saveUserInfo(userInfo);

            console.log("saved userInfo:", userInfo);
        })
        .catch(res => {
            // 失败也要保存
            userInfo.teacherCourseSet.push(course);
            console.log("updateCourseByTeacher failed, res:", res);
        })
        .finally(() => {
            console.log("updateCourseByTeacher finally!");
            finishSync(userInfo);
            wx.navigateBack({});
        });
}


/**
 *
 * @param self
 */
function getCourseAtLaunch(self, courseId) {
    startSync("getCourseAtLaunch");

    let course = {};

    console.log("getCourseAtLaunch, courseId:", courseId);
    console.log("getCourseAtLaunch with Authorization");
    let url = "https://www.yongrui.wang/WeChatMiniProgram/course/basicInfo/" + parseInt(courseId);
    wxRequest.getRequest(url)
        .then(res => {
            console.log("getCourseAtLaunch success, res:", res.data);
            console.log("self:", self);
            course = res.data;

            self.data.currentCourse = res.data;
            self.initPageCourse();
            wx.hideLoading();
        }).catch(res => {
        console.log("getCourseAtLaunch failed, res:", res);
    })
        .finally(() => {
            console.log("getCourseAtLaunch finally!");
        });


}


function getCourseById(id) {
    startSync("getCourseAtLaunch");

    let url = "https://www.yongrui.wang/WeChatMiniProgram/course/" + parseInt(id);
    let course = {};

    let request_header = StorageUtils.loadRequestHeader();

    wxRequest.getRequestWithAuth(url, request_header)
        .then(res => {
            console.log("getCourseAtLaunch success, res:", res);
            course = res.data;

        }).catch(res => {
        console.log("getCourseAtLaunch failed, res:", res);
    })
        .finally(() => {
            console.log("getCourseAtLaunch finally!");
        });

}

/**
 *
 * @param wechatUserInfo
 * @param response
 * @param invited
 */
function saveBasicInfo(wechatUserInfo, response, invited) {
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
    StorageUtils.saveRequestHeader(request_header);

    let app = getApp();

    // 如果未注册，不返回id，去注册页面
    if (typeof response.data.id === "undefined") {
        // 如果未返回id，表示服务器端没有注册上，去注册
        // 清理空间

        let userInfo = StorageUtils.loadUserInfo();
        userInfo.nickName = wechatUserInfo.nickName;
        userInfo.gender = (wechatUserInfo.gender === 1) ? "Male" : "Female";
        userInfo.avatarUrl = wechatUserInfo.avatarUrl;

        userInfo.weChatInfo.unionId = response.data.weChatInfo.unionId;

        app.userInfo = userInfo;

        // 先保存一些信息，然后去注册页面调取
        // StorageUtils.saveUserInfo(userInfo);

        if (invited) {
            wx.redirectTo({
                url: '/pages/normalpages/user/general/general' + '?route=register' + '&role=general' + '&model=invited',
            });
        } else {
            wx.redirectTo({
                url: '/pages/normalpages/user/general/general' + '?route=register' + '&role=general',
            });
        }
    } else {
        // 如果返回id，表示已经注册
        // 需要进一步判断是否本地删除过小程序，如果是，则找回用户信息，在获取了用户id之后，更新用户信息，这步必须的。
        let userInfo = StorageUtils.loadUserInfo(response.data.id);
        StorageUtils.saveCurrentId(response.data.id);

        if (userInfo.id === -1) {
            // 这是本地数据删除的情况
            console.log("syncUserInfo, local storage is empty, userInfo:", userInfo);

            // 1、同步用户信息
            for (let item in response.data) {
                if (userInfo.hasOwnProperty(item)) {
                    // 复制信息
                    userInfo[item] = response.data[item];
                }
            }

            // 2、同步课程
            let url = "https://www.yongrui.wang/WeChatMiniProgram/user/withCourse/" + response.data.id;
            wxRequest.getRequestWithAuth(url, request_header)
                .then(res => {
                    console.log("get user course success, res:", res);
                    if (typeof res.data.teacherCourseSet !== "undefined") {
                        userInfo.teacherCourseSet = res.data.teacherCourseSet;
                        console.log("has teacher course, saved!");

                    }
                    StorageUtils.saveUserInfo(userInfo);

                    if (invited) {
                        wx.navigateTo({
                            url: '/pages/normalpages/user/select_role/select_role'
                        });
                    } else {
                        console.log(app);
                        let url = app.bottom_tabBar.changeTabByRole(userInfo.roleSet[0].name);
                        console.log(userInfo.roleSet[0].name, url);

                        wx.redirectTo({
                            url: url
                        });
                    }
                })
                .catch(res => {
                    console.log("get user course failed,res:", res);
                    StorageUtils.saveUserInfo(userInfo);
                });

            // 将来还要同步通知等
            console.log("syncToLocal", userInfo);

        } else {
            // TODO 需要进一步考虑逻辑，重要！
            console.log("syncUserInfo, local storage has data, userInfo:", userInfo);
            console.log("local storage time:", userInfo.lastModifiedDate);
            console.log("server storage time:", response.data.lastModifiedDate);

            // 1、同步用户信息
            let localStorageTime = DateTimeUtils.getTimeMills(userInfo.lastModifiedDate);
            let serverStorageTime = DateTimeUtils.getTimeMills(response.data.lastModifiedDate);

            if (localStorageTime > serverStorageTime) {
                console.log("local newer, sync to sever");
                // syncToServer(userInfo, response);

            } else if (localStorageTime < serverStorageTime) {
                console.log("sever newer, sync to local");
                for (let item in response.data) {
                    if (userInfo.hasOwnProperty(item)) {
                        // 复制信息
                        userInfo[item] = response.data[item];
                    }
                }
            }

            // 2、同步用户课程
            let url = "https://www.yongrui.wang/WeChatMiniProgram/user/withCourse/" + response.data.id;
            wxRequest.getRequestWithAuth(url, request_header)
                .then(res => {
                    console.log("get user course success,res:", res);
                })
                .catch(res => {
                    console.log("get user course failed,res:", res);
                });


            // 页面跳转
            if (invited) {
                wx.navigateTo({
                    url: '/pages/normalpages/user/select_role/select_role'
                });
            } else {
                console.log(app);
                let url = app.bottom_tabBar.changeTabByRole(userInfo.roleSet[0].name);
                console.log(userInfo.roleSet[0].name, url);

                wx.redirectTo({
                    url: url
                });
            }
        }

        // 保存善后

    }
}

function syncToLocal(userInfo, response) {


}

function syncToServer(userInfo, response) {
    console.log("need further");
}


module.exports = {
    // SyncUtils: SyncUtils,
    syncUserInfo: syncUserInfo,
    updateUserInfo: updateUserInfo,
    createUserInfo: createUserInfo,
    createCourseByTeacher: createCourseByTeacher,
    updateCourseByTeacher: updateCourseByTeacher,
    getCourseAtLaunch: getCourseAtLaunch,
    getCourseById: getCourseById
};