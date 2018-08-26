// pages/normalpages/user/select_role/select_role.js
import StorageUtils from "../../../../utils/StorageUtils";

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        roleSet: [
            {name: "teacher", value: "老师", description: "我以老师的身份进入，一同管理该课程。"},
            {name: "student", value: "学生", description: "我以学生的身份进入，为我自己加入该课程。"},
            {name: "parent", value: "家长", description: "我以家长的身份进入，为我的宝贝加入该课程。"}
        ],
        currentRole: ""
    },

    onSelectRole: function (e) {
        console.log(e.detail.value);
        let currentRole = e.detail.value;
        app.joinCourse.currentRole = currentRole;
        this.setData({
            currentRole: currentRole
        });
    },

    onNext: function () {
        // 根据选择的身份，如果是老师
        let userInfo = StorageUtils.loadUserInfo();
        let url = app.bottom_tabBar.changeTabByRole(app.joinCourse.currentRole);
        console.log("url", url);

        switch (this.data.currentRole) {
            case "teacher":
                userInfo.teacherCourseSet.push(app.joinCourse.course);
                StorageUtils.saveUserInfo(userInfo);
                wx.redirectTo({
                    url: url
                });
                break;
            case "student":
                userInfo.studentCourseSet.push(app.joinCourse.course);
                StorageUtils.saveUserInfo(userInfo);
                wx.redirectTo({
                    url: url
                });
                break;
            case "parent":
                wx.navigateTo({
                    url: '../../user/child/admin/admin',
                });
                break;
            default:
                break;
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = StorageUtils.loadUserInfo();

        this.setData({
            userInfo: userInfo
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