// pages/word/word.js

var RequestHandle = require("../../utils/RequestHandle.js")

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
        // this.requestData()
        this.requestData2()
    },

    /**
     * 刷新
     */
    scrolltoupper: function (e) {
        // this.currentPage = 1
        // this.setData({
        //     list: []
        // })
        // this.requestData()
    },

    /**
     * 加载
     */
    scrolltolower: function (e) {
        this.currentPage++
        this.requestData()
    },

    /**
     * 请求数据
     */
    requestData: function () {
        var that = this;
        console.log(this.data.currentPage)
        wx.request({
            url: 'https://route.showapi.com/255-1',
            data: {
                page: that.currentPage,
                showapi_appid: '51741',
                showapi_sign: '5f15f298085543b3aa91cd45c277b096',
                type: '29'
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
            fail: function (res) {
                loadingHidden: true
                console.log(res)
            }
        })
    },

    requestData2: function () {
        var that = this;
        var url = 'https://route.showapi.com/255-1'

        var param = {
            "page": that.data.currentPage,
            "showapi_appid": '51741',
            "showapi_sign": '5f15f298085543b3aa91cd45c277b096',
            "type": '29'
        }

        RequestHandle.requestWithLoading(url, param, "正在加载..", true,
            function (res) {
                console.log(res)
                console.log(res.showapi_res_body.pagebean.contentlist)
                var resList = res.showapi_res_body.pagebean.contentlist
                that.setData({
                    // 拼接数组
                    list: that.data.list.concat(resList),
                    loadingHidden: true,
                })
            }, function (error) {
                console.log(error)
            })
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
        wx.showNavigationBarLoading()
        wx.showNavigationBarLoading()
        this.currentPage = 1
        this.setData({
            list: []
        })
        this.requestData()
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
        return {
            title:"来自姐的分享",
            path:'pages/index/index'
        }
    }
})