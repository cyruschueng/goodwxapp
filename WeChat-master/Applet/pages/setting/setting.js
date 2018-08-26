// pages/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**需要授权的方法
     * scope 列表
     scope    对应接口    描述
     scope.userInfo    wx.getUserInfo    用户信息
     scope.userLocation    wx.getLocation, wx.chooseLocation    地理位置
     scope.address    wx.chooseAddress    通讯地址
     scope.invoiceTitle    wx.chooseInvoiceTitle    发票抬头
     scope.werun    wx.getWeRunData    微信运动步数
     scope.record    wx.startRecord    录音功能
     scope.writePhotosAlbum    wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum    保存到相册
     scope.camera        摄像头
     */

    //打开授权设置界面
    openSettingFun:function () {
        wx.openSetting({
            success: function(res) {
                console.log('打开授权设置界面success',res);
            },
            fail:function (res) {
                console.log('打开授权设置界面fail',res);
            },
            complete:function(res){
                console.log('打开授权设置界面complete',res);
            }
        })
    },

    //获取授权信息
    getSettingFun:function () {
        wx.getSetting({
            success: function(res) {
                console.log('获取授权信息success',res);
                console.log('用户信息',res.authSetting['scope.userInfo']);
                console.log('地理位置',res.authSetting['scope.userLocation']);
                console.log('通讯地址',res.authSetting['scope.address']);
                console.log('发票抬头',res.authSetting['scope.invoiceTitle']);
                console.log('微信运动步数',res.authSetting['scope.werun']);
                console.log('录音功能',res.authSetting['scope.record']);
                console.log('保存到相册',res.authSetting['scope.writePhotosAlbum']);
                console.log('摄像头',res.authSetting['scope.camera']);
            },
            fail:function (res) {
                console.log('获取授权信息fail',res);
            },
            complete:function(res){
                console.log('获取授权信息complete',res);
            }
        })
    },

    //获取用户信息
    getUserInfoFun:function () {
        wx.getUserInfo({
            withCredentials:true,//是否带上登录态信息
            lang:'zh_CN',
            success: function(res) {
                console.log('获取用户信息success',res);
            },
            fail:function (res) {
                console.log('获取用户信息fail',res);
            },
            complete:function(res){
                console.log('获取用户信息complete',res);
            }
        })
    },

    //获取地理位置
    getLocationFun:function () {
        wx.getLocation({
            success: function(res) {
                console.log('获取地理位置success',res);
            },
            fail:function (res) {
                console.log('获取地理位置fail',res);
            },
            complete:function(res){
                console.log('获取地理位置complete',res);
            }
        })
    },

    //选择地理位置
    chooseLocationFun:function () {
        wx.chooseLocation({
            success: function(res) {
                console.log('选择地理位置success',res);
            },
            fail:function (res) {
                console.log('选择地理位置fail',res);
            },
            complete:function(res){
                console.log('选择地理位置complete',res);
            }
        })
    },

    //通讯地址
    chooseAddressFun:function () {
        wx.chooseAddress({
            success: function(res) {
                console.log('通讯地址success',res);
            },
            fail:function (res) {
                console.log('通讯地址fail',res);
            },
            complete:function(res){
                console.log('通讯地址complete',res);
            }
        })
    },

    //发票抬头
    chooseInvoiceTitleFun:function () {
        wx.chooseInvoiceTitle({
            success: function(res) {
                console.log('发票抬头success',res);
            },
            fail:function (res) {
                console.log('发票抬头fail',res);
            },
            complete:function(res){
                console.log('发票抬头complete',res);
            }
        })
    },

    //微信运动步数
    getWeRunDataFun:function () {
        wx.getWeRunData({
            success: function(res) {
                console.log('微信运动步数success',res);
            },
            fail:function (res) {
                console.log('微信运动步数fail',res);
            },
            complete:function(res){
                console.log('微信运动步数complete',res);
            }
        })
    },

    //录音功能
    startRecordFun:function () {
        wx.startRecord({
            success: function(res) {
                console.log('录音功能success',res);
            },
            fail:function (res) {
                console.log('录音功能fail',res);
            },
            complete:function(res){
                console.log('录音功能complete',res);
            }
        })
    },

    //保存到相册(图片)
    saveImageToPhotosAlbumFun:function () {
        wx.saveImageToPhotosAlbum({
            filePath: 'http://pic1.58cdn.com.cn/nowater/wxacode/n_v23d1a07a5418348d5af4a84db0aec552c.jpg',
            success: function(res) {
                console.log('保存到相册(图片)success',res);
            },
            fail:function (res) {
                console.log('保存到相册(图片)fail',res);
            },
            complete:function(res){
                console.log('保存到相册(图片)complete',res);
            }
        })
    },

    //保存到相册(视频)
    saveVideoToPhotosAlbumFun:function () {
        wx.saveVideoToPhotosAlbum({
            success: function(res) {
                console.log('保存到相册(视频)success',res);
            },
            fail:function (res) {
                console.log('保存到相册(视频)fail',res);
            },
            complete:function(res){
                console.log('保存到相册(视频)complete',res);
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