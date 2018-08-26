import * as utils from '../../utils/util'
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var { src, resouce } = options;

        // var url = `${src}`;
        //视频链接分带参数和不带参数2种情况
        // if (obj) {
        //     obj = JSON.parse(obj);
        //     url += '?';
        //     for (var o in obj) {
        //         url += (`${o}=${obj[o]}&`)
        //     }
        // }

        this.setData({ src, resouce });

        if (app.title) {
            utils.setPageTile(app.title);
        }

        if (resouce) {
            var { message, icon, nickName, poster } = JSON.parse(resouce);
            this.setData({ message, icon, nickName, poster })
        }


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.videoContext = wx.createVideoContext('myVideo');
        this.videoContext.play();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return this.onShare();
    },
    showCmsg(value) {
        this.setData({
            cmsgValue: value
        });
        setTimeout(() => {
            this.setData({
                cmsgValue: ''
            });
        }, 2000);
    },
    playError(e) {
        this.showCmsg(e.detail.errMsg);
    },

    onShare() {
        var { message, icon, nickName, poster, src, resouce } = this.data;
        return {
            title: message,
            imageUrl: poster,
            path: `/pages/resouceVideo/index?src=${src}&resouce=${resouce}`
        }
    }
})