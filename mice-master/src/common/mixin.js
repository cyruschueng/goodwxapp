function listToH5Active(url, p2) {
    if(!url) { return }
    wx.navigateTo({
        url: `/pages/webview/index?url=${url}`
    })
}

module.exports = {
    listToH5Active
}