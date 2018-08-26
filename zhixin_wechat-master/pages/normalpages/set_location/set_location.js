// pages/normalpages/set_location/set_location.js

import DataStructure from '../../../datamodel/DataStructure'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [],
        userLocation: {},
        selectedLocation: {}
    },

    /**
     * 根据用户信息初始化
     */
    initLocation: function () {
        let userLocation = new DataStructure.Location();
        let selectedLocation = new DataStructure.Location();
        let host = this;
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                console.log(res);
                userLocation.latitude = res.latitude;
                userLocation.longitude = res.longitude;

                selectedLocation.latitude = res.latitude;
                selectedLocation.longitude = res.longitude;

                console.log(userLocation);

                host.setData({
                    userLocation: userLocation,
                    selectedLocation: selectedLocation
                });
            },
        });
    },

    /**
     * 响应选择位置
     */
    onChooseLocation: function () {
        let host = this;

        wx.chooseLocation({
            success: function (res) {
                console.log(res);
                let selectedLocation = new DataStructure.Location();
                selectedLocation.latitude = res.latitude;
                selectedLocation.longitude = res.longitude;
                selectedLocation.address = res.address;
                selectedLocation.name = res.name;
                let markers = host.data.markers;

                let marker = {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    callout: {
                        content: res.name
                    },
                    label: res.name
                }

                markers.push(marker);

                console.log("markers",markers);

                host.setData({
                    markers: markers,
                    selectedLocation: selectedLocation
                });
            }
        });
    },


    onMarkertap: function (e) {
        console.log(e);

    },

    /**
     * 响应重置地图函数
     */
    onResetLocation: function () {
        let selectedLocation = app.Util.deepClone(this.data.userLocation);
        this.setData({
            selectedLocation: selectedLocation
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initLocation();
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