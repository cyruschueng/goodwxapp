// pages/login/login.js


Page({

    /**
     * 页面的初始数据
     */
    data: {
        login_logo: "../../images/Icon-60.png",
        icon_login_account: "../../images/icon_log_in_user.png",
        icon_login_password: "../../images/icon_log_in_password.png",
        icon_login_verifycode: "../../images/icon_login_identifycode.png",
        verifyCodeImg: "",

        account: '',
        password: "",
        verifycode: "",

        content:'账号或密码错误'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideShareMenu() // 没有作用

        let app = getApp()
        new app.ToastPannel()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    accountInput: function (e) {
        this.setData({
            account: e.detail.value
        })
        console.log(e.detail.value)
    },

    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    // 登录
    loginBtnAction: function (e) {
        var user = this.data.account;
        var pass = this.data.password;

        wx.showLoading({
            title: '',
        })

        var that = this;
        setTimeout(function(){
            wx.hideLoading();

            if (user == 'admin' && pass == '111111') {
                wx.switchTab({
                    url: '../index/index',
                })
            } else {
                that.show(that.data.content);
            }
        },1000)
    }
})