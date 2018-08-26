// pages/normalpages/course/view/view.js
// 加入课程页面，查看将要加入的课程

import CoursePageUtils from '../../../../../utils/CoursePageUtils'

const pageUtils = new CoursePageUtils.CoursePageUtils(false);

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        options: {},
        title: ""

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

    onSetRecurringRules: function () {
        let showRecurringRule = !this.data.showRecurringRule;

        this.setData({
            showRecurringRule: showRecurringRule
        });
    },

    onJoinCourse: function () {
        app.joinCourse.courseId = this.options.courseId;
        app.joinCourse.course = this.data.pageData.currentCourse;

        pageUtils.joinCourse(this.options.courseId);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("Course view page onLoad, options:", options);
        this.options = options;
        let title = {
            main: options.shareBy + "邀请你加入他的课程",
            sub: "课程名称：" + options.courseName
        };

        this.setData({
            title: title
        });

        this.route = "view";
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
        // pageUtils.initPageCourse();
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