Page({
    data: {
        user: null,
        userinfo: ''
    },
    onLoad: function () {
        const user = wx.getStorageSync('user')
        const userinfo = JSON.stringify(user, null, 4)
        this.setData({user, userinfo})
    }
});
