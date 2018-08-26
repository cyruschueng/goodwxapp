// pages/normalpages/user/child_admin/child_admin.js
import StorageUtils from '../../../../../utils/StorageUtils'
import SyncUtils from '../../../../../utils/SyncUtils'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedChildrenId: []
    },

    onAddChild: function () {
        wx.navigateTo({
            url: '../info/info' + '?route=register' + '&role=student',
        });
    },

    onSelectChild: function (e) {
        console.log(e);
        let selectedChildrenId = [];
        for (let item of e.detail.value) {
            selectedChildrenId.push(parseInt(item));
        }
        this.setData({
            selectedChildrenId: selectedChildrenId,
            selectedChild: selectedChildrenId.length > 0
        });

        console.log(this.data.selectedChildrenId);
    },

    onViewChild: function (e) {
        console.log(e);
        let childIdx = parseInt(e.currentTarget.id);
        wx.navigateTo({
            url: '../info/info' + '?route=modify' + '&idx=' + childIdx,
        });
    },

    onJoin: function () {
        let selectedChildrenId = this.data.selectedChildrenId;

        for (let child of selectedChildrenId) {
            // TODO 这里要同步加入课程的学生
            console.log(child);
            let child_UserInfo = StorageUtils.loadUserInfo(child);
            child_UserInfo.studentCourseSet.push({id: app.joinCourse.course.id});
            StorageUtils.saveUserInfo(child_UserInfo);
            // SyncUtils.createCourseByTeacher(app.joinCourse.course, app.joinCourse.course);

        }

        console.log(app.joinCourse.currentRole);
        let url = app.bottom_tabBar.changeTabByRole(app.joinCourse.currentRole);
        console.log("url:", url);

        wx.redirectTo({
            url: url,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


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
        // 装载子女信息
        let userInfo = StorageUtils.loadUserInfo();

        let parentSet = [];

        for (let item of userInfo.parentSet) {
            let child_UserInfo = StorageUtils.loadUserInfo(item.id);
            parentSet.push(child_UserInfo);
        }

        userInfo.parentSet = parentSet;

        this.setData({
            userInfo: userInfo
        })
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