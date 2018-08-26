import * as utils from '../../utils/util'

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var { toObj, title } = options;

        this.setData({ toObj, title })

        utils.setPageTile(title);

        var { icon, nickName, resource } = JSON.parse(toObj);
        var { images, message } = resource;

        images = images.map((item) => {
            return {
                src: item,
                width: '',
                height: ''
            }
        })

        this.setData({ title, icon, nickName, images, message });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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

    photoLoad(e) {

        //图片索引
        var { index } = e.currentTarget.dataset;

        //图片宽高
        var { width, height } = e.detail;

        var { images } = this.data;

        images[index].width = Math.min(width, 750);
        images[index].height = Math.min(height, 1334);

        this.setData({ images })

    },

    onShare() {

        var { message, images, toObj, title } = this.data;

        var imageUrl = images[0].src || '';

        return {
            title: message,
            imageUrl,
            path: `/pages/resouceImages/index?toObj=${toObj}&title=${title}`
        }

    }
})