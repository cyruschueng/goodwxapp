// pages/normalpages/course/view/browse/browse.js
// 查看课程页面，浏览已经加入的课程

import CoursePageUtils from '../../../../../utils/CoursePageUtils'


const pageUtils = new CoursePageUtils.CoursePageUtils(false);

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // pageData: {},
        options: {},
        title: ""
    },

    onChangeStudentSet: function (e) {
        console.log("go to change");

        wx.navigateTo({
            url: '../student_set/student_set',
        });
    },

    onOpenLocation: function () {
        // console.log("location:", this.data.pageData.currentCourse.location);
        // let latitude = this.data.pageData.currentCourse.location.latitude;
        // let longitude = this.data.pageData.currentCourse.location.longitude;
        //
        // if (latitude !== "" && longitude !== "") {
        //     wx.openLocation({
        //         latitude: latitude,
        //         longitude: longitude
        //     });
        // } else {
        //     // TODO 解析地址
        //     // 暂时处理成弹窗
        // }

        pageUtils.openLocation();

    },

    onDeliverHomework: function () {
        wx.navigateTo({
            url: '../../../homework/student/deliver/deliver'
        });
    },

    onSwitchTab: function (e) {
        let currentTabIdx = e.currentTarget.dataset.current;
        pageUtils.switchTab(currentTabIdx);
    },

    onSelectRecurringDay: function (e) {
        let dayIndex = parseInt(e.currentTarget.id);
        pageUtils.selectRecurringDay(dayIndex);

    },

    onSetRecurringRules: function (e) {
        let showRecurringRule = !this.data.showRecurringRule;

        this.setData({
            showRecurringRule: showRecurringRule
        });

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.options = options;
        this.route = "modify";
        pageUtils.pageView = this;

        pageUtils.initTabData();
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
        // 初始化页面
        pageUtils.initPageCourse(this);
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