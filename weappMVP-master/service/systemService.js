function login() {
    return new Promise((resolve, reject) => {
        wx.login({success: resolve, fail: reject})
    });

}

function getShareInfo(ticket) {
    return new Promise((resolve, reject) => {
            wx.getShareInfo({
                shareTicket: ticket,
                success: resolve,
                fail: reject
            });
        }
    );
}

function fetchUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({success: resolve, fail: reject})
    })
}

function setStorage(key, value) {
    return new Promise((resolve, reject) => {
        wx.setStorage({key: key, data: value, success: resolve, fail: reject})
    })
}

function getStorage(key) {
    return new Promise((resolve, reject) => {
        wx.getStorage({key: key, success: resolve, fail: reject})
    })
}

function setStorageSync(key, value) {
    wx.setStorageSync(key, value);
}

function getStorageSync(key) {
    return wx.getStorageSync(key);
}

function getLocation(type) {
    return new Promise((resolve, reject) => {
        wx.getLocation({type: type, success: resolve, fail: reject})
    })
}

function checkSession() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: resolve, fail: reject
        })
    })
}

function removeStorageSync(key) {
    wx.removeStorageSync(key);
}

function addPhoneContact(params) {
    return new Promise((resolve, reject) => {
        var dict = Object.assign(params, {
            success: resolve, fail: reject
        });
        wx.addPhoneContact(dict);
    })
}

module.exports = {
    login,
    fetchUserInfo,
    setStorage,
    getStorage,
    getLocation,
    checkSession: checkSession,
    setStorageSync: setStorageSync,
    getStorageSync: getStorageSync,
    addPhoneContact: addPhoneContact,
    removeStorageSync: removeStorageSync,
    getShareInfo: getShareInfo,
}
