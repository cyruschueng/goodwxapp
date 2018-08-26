// pages/campPic/index.js
const app = getApp()

var util = require('../../utils/util.js')
var width;
var height;
var originalImgs;
Page({

        /**
         * 页面的初始数据
         */
        data: {
                size: 0,
                height:null,
                width:null,
                campPicInitial :[],
                campPic: []
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                width = app.globalData.width;
                height = app.globalData.height;
                console.error(options.imgs)
                var Imgs = util.spiltStr(options.imgs);
                originalImgs = util.spiltStr(options.imgs);

                var ImgLists = [];
                for (var i = 0; i < Imgs.length; i++) {
                        var obj=new Object;
                        obj.OriginalImg = Imgs[i];
                        Imgs[i] = Imgs[i] + "_" + parseInt(width/2) + "X" + parseInt(width / 4) + ".jpg";
                        console.error(Imgs[i])
                        obj.Img = Imgs[i];
                        ImgLists.push(obj);
                }
          
                this.setData({
                        size: Imgs.length,
                        height: width / 4,
                        width: width / 2,
                        campPicInitial: util.spiltStr(options.imgs),
                        campPic: ImgLists
                })


        },
        //预览图片
        previewImage: function (e) {
                var that = this;
                var ssrc = e.currentTarget.dataset.ssrc; 
                console.log("2--" +ssrc)
                var imageList = that.data.campPic;
                wx.previewImage({
                        current: ssrc,
                        urls: originalImgs,
                        fail: function () {
                        },
                        complete: function () {
                        },
                });
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