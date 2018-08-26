// pages/normalpages/course/student_set/student_set.js
// 学生列表

import StorageUtils from '../../../../utils/StorageUtils'


Page({

    /**
     * 页面的初始数据
     */
    data: {},

    onChecked: function (e) {
        console.log("onChecked:", e.currentTarget.id, e.detail.value);
    },

    onCreateHomework: function (e) {
        console.log("onCreateHomework:", e.currentTarget.id);
        wx.navigateTo({
            url: '/pages/normalpages/homework/teacher/admin/admin' + "?route=create"
        });
    },

    onPerformance: function (e) {
        console.log("onPerformance:", e.currentTarget.id);
        wx.navigateTo({
            url: '/pages/normalpages/performance/review/review' + "?route=create"
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = StorageUtils.loadUserInfo();

        // 加载所有的学生，并且同步状态
        // 以下数据只为界面测试
        let studentSet = [
            {
                id: 0,
                nickName: "小鼠",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 1,
                nickName: "小牛",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 2,
                nickName: "小虎",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 3,
                nickName: "小兔",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 4,
                nickName: "小龙",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 5,
                nickName: "小蛇",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 6,
                nickName: "小马",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 7,
                nickName: "小羊",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 8,
                nickName: "小猴",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 9,
                nickName: "小鸡",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 10,
                nickName: "小狗",
                avatarUrl: '../../../image/friend_64px.png'
            },
            {
                id: 11,
                nickName: "小猪",
                avatarUrl: '../../../image/friend_64px.png'
            },
        ];

        userInfo.studentSet = studentSet;

        this.setData({
            userInfo: userInfo
        });

        console.log("student_set page, userInfo", this.data.userInfo);
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