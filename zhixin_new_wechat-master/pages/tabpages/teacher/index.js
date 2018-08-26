//index.js

import DateTimeUtils from '../../../utils/DateTimeUtils'
import StorageUtils from '../../../utils/StorageUtils'

import IndexPageUtils from '../../../utils/IndexPageUtils'

// 获取应用实例
const app = getApp();

const pageUtils = new IndexPageUtils.IndexPageUtils();

Page({
    data: {
        pageData: {},
        bottom_tabBar: app.bottom_tabBar,
    },

    /**
     * 主页
     * 响应切换主Tab事件
     * @param e
     */
    onSwitchIndexTab: function (e) {
        // console.log(e);
        let currentTabIdx = e.currentTarget.dataset.current;

        pageUtils.switchIndexTab(this, currentTabIdx);
    },

    /**
     * 课程页面Tab
     * 响应课程Tab下各个子Tab的点击
     * @param e
     */
    onSelectCourseTabItem: function (e) {
        console.log("selected:", e.currentTarget.id);
        let tabId = e.currentTarget.id;

        pageUtils.switchCourseTab(this, tabId);
    },

    /**
     * 课程页面Tab
     * 响应创建新课程
     * @param e
     */
    onCreatedNewCourse: function (e) {
        pageUtils.createNewCourse();
    },

    /**
     * 课程页面Tab
     * 响应课程Tab中选择课程，带入课程的索引，跳转课程修改页面
     * @param e
     */
    onSelectCourse: function (e) {

        let courseId = e.currentTarget.id;

        pageUtils.selectCourse(courseId);
    },

    /**
     * 课程页面Tab
     * 响应转发课程
     * @param e
     */
    onForwardCourse: function (e) {
        this.setData({
            selectedCourseIdx: parseInt(e.currentTarget.id)
        });
        console.log("onForwardCourse, selectedCourseIdx:", parseInt(e.currentTarget.id));

    },

    /**
     * 课程页面Tab
     * 响应邀请其他老师共同管理
     * @param e
     */
    onInviteTeacher: function (e) {
        console.log("onInviteTeacher, e:", e);
        this.setData({
            selectedCourseIdx: parseInt(e.currentTarget.id)
        });
        console.log("onForwardCourse, selectedCourseIdx:", parseInt(e.currentTarget.id));
    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日历上选中日期
     * @param e
     */
    onSelectDateItem: function (e) {
        console.log(e.currentTarget.dataset.date);
        let selectedDate = e.currentTarget.dataset.date;

        pageUtils.selectDate(this, selectedDate);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日期选择器，跳转到选择的月份
     * @param e
     */
    onSelectMonthYear: function (e) {
        let toDate = DateTimeUtils.getDateFromString(e.detail.value, "-");
        console.log("toDate", toDate);
        pageUtils.handleMonth(this, "selected", toDate);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应到本月按钮
     */
    onShowMonth: function () {
        let toDate = new Date();
        pageUtils.handleMonth(this, "selected", toDate);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应选择当天的课，带入课程的索引和修改的日期，跳转课程修改页面
     * @param e
     */
    onSelectLesson: function (e) {
        console.log("Selected course:", e.currentTarget.id);

        let courseId = e.currentTarget.id;
        pageUtils.selectLesson(courseId);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日历头部点击，重新显示日历
     * @param e
     */
    onCalendarHead: function (e) {
        let pageData = this.data.pageData;
        pageData.showWeekView = false;

        this.setData({
            pageData: pageData
        });

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日历上下滑动
     */
    onSwiperCalendar: function (e) {
        let current = parseInt(e.detail.current);
        pageUtils.swiperCalendar(this, current);
    },

    /**
     * 布告栏页面Tab
     * 响应创建新通知
     * @param e
     */
    onCreatedNewNotice: function (e) {
        console.log("create new notice");
        pageUtils.createNewNotice(this);
        // wx.chooseLocation({
        //         success: function (res) {
        //             console.log(res);
        //         }
        //     }
        // );
    },

    /**
     * 作业查收Tab
     * 响应评价某堂课
     */
    onReviewLesson: function (e) {
        wx.navigateTo({
            url: '../../normalpages/review_performance/review_performance' + '?model=lesson',
        });
    },

    /**
     * 暂时放在这里
     * 响应评价某次作业
     */
    onReviewHomework: function (e) {
        wx.navigateTo({
            url: '../../normalpages/review_performance/review_performance' + '?model=homework',
        });
    },

    onTest: function () {
        // 用来测试view页
        let url = '../../normalpages/course/view/join/join' + "?courseId=" + 1;

        wx.navigateTo({
            url: url,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("teacher page onLoad, options:", options);

        // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
        // withShareTicket 为 true 时，表示允许转发时是否携带 shareTicket。
        app.bottom_tabBar.changeTab();
        wx.showShareMenu({
            withShareTicket: true
        });

        // // 判断场景值，1044 为转发场景，包含shareTicket 参数
        if (options.scene === 1044) {
            wx.getShareInfo({
                shareTicket: opt.shareTicket,
                success: function (res) {
                    let encryptedData = res.encryptedData;
                    let iv = res.iv;
                    console.log("teacher page, getShareInfo:", res);
                }
            });
        }

        this.setData({
            bottom_tabBar: app.bottom_tabBar,
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
        pageUtils.initPageData("teacher");
        pageUtils.update(this);

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
    onShareAppMessage: function (options) {
        console.log("start share, options:", options);

        let shareMsg = {
            title: "",
            path: ""
        };

        let userInfo = StorageUtils.loadUserInfo();

        let baseUrl = "/pages/normalpages/course/view/join/join";

        if (options.from === 'button') {
            // 来自页面内转发按钮
            console.log("options.target:", options.target);
            let courseIdx = options.target.id;
            shareMsg.title = userInfo.nickName + "分享的" + userInfo.teacherCourseSet[courseIdx].name;
            shareMsg.path = baseUrl +
                "?shareBy=" + userInfo.nickName +
                "&courseName=" + userInfo.teacherCourseSet[courseIdx].name +
                "&courseId=" + userInfo.teacherCourseSet[courseIdx].id;
        } else {
            shareMsg.title = userInfo.nickName + "分享的知新小程序";
            shareMsg.path = baseUrl;
        }

        console.log("shareMsg:", shareMsg);

        // 自定义的转发字段
        return {
            title: shareMsg.title,
            path: shareMsg.path,
            success: function (res) {
                let shareTickets = res.shareTickets;
                if (shareTickets.length === 0) {
                    return false;
                }
                console.log("share success, shareTickets:", shareTickets);

                wx.showShareMenu({
                    withShareTicket: true
                });

                wx.getShareInfo({
                    shareTicket: shareTickets[0],
                    success: function (res) {
                        let encryptedData = res.encryptedData;
                        let iv = res.iv;
                        console.log("getShareInfo success, res:", res);
                    },
                    fail: function (res) {
                        // 转发失败
                        console.log("getShareInfo failed, res:,", res);
                    }
                });
            },
            fail: function (res) {
                // 转发失败
                console.log("share failed, res:", res);
            }
        }

    }

})
