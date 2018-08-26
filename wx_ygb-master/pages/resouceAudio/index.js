import * as utils from '../../utils/util'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        audioAni: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var { toObj, title } = options;

        this.setData({ toObj, title });

        utils.setPageTile(title);

        var { icon, nickName, resource } = JSON.parse(toObj);
        var { url, message, time } = resource;

        this.setData({ title, icon, nickName, url, message, time });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.myAudio = wx.createAudioContext('myAudio');

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
        return this.onShare();
    },

    play() {
        this.myAudio.play();
        this.setData({
            audioAni: true
        })
    },
    pause() {
        this.myAudio.pause();
        this.setData({
            audioAni: false
        })
    },
    onShare() {
        var { message, toObj, title } = this.data;

        return {
            title: message,
            path: `/pages/resouceAudio/index?toObj=${toObj}&title=${title}`
        }

    }
})