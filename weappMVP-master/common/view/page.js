function navigateTo(obj) {
    wx.navigateTo(obj);
}

function redirectTo(obj) {
    wx.redirectTo(obj);
}

function reLaunch(obj) {
    wx.reLaunch(obj);
}

function switchTab(obj) {
    wx.switchTab(obj);
}

function addPhoneContact(obj) {
    return new Promise((resolve, reject) => {
        wx.addPhoneContact(Object.assign(obj, { success: resolve, fail: reject }))
    })
}

function navigateBack(obj) {
    wx.navigateBack(obj);
}

function startPullDownRefresh(obj) {
    return new Promise((resolve, reject) => {
        wx.startPullDownRefresh(Object.assign(obj, { success: resolve, fail: reject }))
    })
}

function stopPullDownRefresh() {
    wx.stopPullDownRefresh();
}

function setNavigationBarTitle(obj) {
    return new Promise((resolve, reject) => {
        wx.setNavigationBarTitle(Object.assign(obj, { success: resolve, fail: reject }))
    })
}

function showNavigationBarLoading() {
    wx.showNavigationBarLoading();
}

function hideNavigationBarLoading() {
    wx.hideNavigationBarLoading();
}

function makePhoneCall(obj) {
    return new Promise((resolve, reject) => {
        wx.makePhoneCall(Object.assign(obj, { success: resolve, fail: reject }))
    })
}

//要求小程序返回分享目标信息
function showShareMenu(show) {
    wx.showShareMenu({
        withShareTicket: show
    });
}

function previewImage(data) {
    wx.previewImage(data);
}

function navigateToMiniProgram(data) {
    wx.navigateToMiniProgram(data);
}

function canIUse(openType) {
    wx.canIUse(openType);
}

module.exports = {
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    switchTab: switchTab,
    navigateBack: navigateBack,
    addPhoneContact: addPhoneContact,
    startPullDownRefresh: startPullDownRefresh,
    stopPullDownRefresh: stopPullDownRefresh,
    setNavigationBarTitle: setNavigationBarTitle,
    showNavigationBarLoading: showNavigationBarLoading,
    hideNavigationBarLoading: hideNavigationBarLoading,
    makePhoneCall: makePhoneCall,
    showShareMenu: showShareMenu,
    previewImage: previewImage,
    navigateToMiniProgram: navigateToMiniProgram,
    canIUse: canIUse
};