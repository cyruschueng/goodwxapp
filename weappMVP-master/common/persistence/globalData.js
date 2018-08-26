function getUserInfo() {
    return getApp().globalData.userInfo;
}

function setUserInfo(userInfo) {
    getApp().globalData.userInfo = userInfo;
}

function getApplication() {
    return getApp();
}

module.exports = {
    getUserInfo: getUserInfo,
    setUserInfo: setUserInfo,
    getApplication: getApplication
};