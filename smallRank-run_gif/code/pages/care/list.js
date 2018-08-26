// notice.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newNotices: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.request({
            url: app.API_URL + "werun/care/list/"+options.type+"/"+app.getUserId()+"/"+options.id,
            method: "GET",
            success: function (data) {
                console.log()
                if(data.data.status===1){

                    let notices = data.data.data;
                    console.log(notices);
                    for(let i=0;i<notices.length;i++){
                        notices[i].addTime=app.run.dateTime.formatDateTime(notices[i].addTime)
                        notices[i].nickName = notices[i].nickName.substring(0,7)
                    }



                    _this.setData({
                        newNotices: notices,
                    })
                }
            }
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