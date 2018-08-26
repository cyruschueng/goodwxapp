// pages/image/image.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        currentPage: 1,
        loadingHidden: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.currentPage = 1;
        this.requestData()
    },

    scrolltoupper: function () {
        this.currentPage = 1
        this.setData({
            list: []
        })

        this.requestData()
    },

    scrolltolower: function () {
        this.currentPage += 1
        this.requestData()
    },

    requestData: function () {
        var that = this;

        wx.request({
            url: getApp().data.API_URL,
            data: {
                page: that.currentPage,
                type: getApp().data.API_TYPE_IMAGE,
                showapi_appid: getApp().data.API_ID,
                showapi_sign: getApp().data.API_SIGN
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.showapi_res_body.pagebean.contentlist)
                var resList = res.data.showapi_res_body.pagebean.contentlist
                that.setData({
                    // 拼接数组
                    list: that.data.list.concat(resList),
                    loadingHidden: true,
                })
            },
            fail: function (e) {
                console.log(e)
                loadingHidden: true
            }
        })
    },

    /**
     * 查看大图
     */
    lookBigPicture: function () {
        
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

    }
})