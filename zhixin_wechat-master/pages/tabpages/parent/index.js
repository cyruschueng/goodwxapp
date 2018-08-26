//index.js

import DateTimeUtils from '../../../utils/DateTimeUtils'
import StorageUtils from '../../../utils/StorageUtils'

import pageUtils from 'pageUtils'

// 获取应用实例
const app = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
       
        // 首页Tab
        indexTabData: [
            {
                type: "course",
                name: "课程",
                data: [],
                selected: true
            },
            {
                type: "notice",
                name: "布告栏",
                data: [],
                selected: false
            },
            {
                type: "homework",
                name: "作业查收",
                data: [],
                selected: false
            }
        ],
        currentTabIdx: 0,

        // 课程页面的Tab
        courseTabData: [
            {
                type: "all_course",
                name: "所有课程",
                selected: true,
                display: true
            },
            {
                type: "everyday_lesson",
                name: "每日课程",
                selected: false,
                display: true
            },
            {
                type: "add_new",
                name: "创建",
                selected: true,
                display: false
            }
        ],
        selectedCourseIdx: 0,

        // 以下是控制每日课程的显示
        showWeekView: true,

        today: '',
        todayMonth: '',
        todayYear: '',
        selectedDate: '',
        selectedWeek: '',
        currentYear: '',
        currentMonth: '',
        currentDate: '',

        // 保存当月的日期
        dateList: [],

        // 日历滑动
        calendars: [1, 2, 3],
        lastCalendarId: 0,
        duration: 1000,

        // 布告栏数据
        currentNoticeSet: [],

    },

    /**
     * 主页
     * 响应切换主Tab事件
     * @param e
     */
    onSwitchIndexTab: function (e) {
        let currentTabIdx = e.currentTarget.dataset.current;
        let indexTabData = this.data.indexTabData;

        for (let idx = 0; idx < indexTabData.length; idx++) {
            indexTabData[idx].selected = (idx === currentTabIdx);
        }

        this.setData({
            indexTabData: indexTabData,
            currentTabIdx: currentTabIdx
        });
    },

    /**
     * 课程页面Tab
     * 响应课程Tab下各个子Tab的点击
     * @param e
     */
    onSelectCourseTabItem: function (e) {
        console.log("selected:", e.currentTarget.id);
        let courseTabData = this.data.courseTabData;
        for (let item of courseTabData) {
            if (item.type === "add_new") {
                // 当显示创建的时候，始终高亮创建选项
                item.selected = true;
            } else {
                item.selected = item.type === e.currentTarget.id;
            }
        }

        switch (e.currentTarget.id) {
            case "all_course":
                app.tempData.currentCourseSubTab = "all_course";
                break;
            case "everyday_lesson":
                app.tempData.currentCourseSubTab = "everyday_lesson";
                break;
            case "add_new":
                app.tempData.currentCourseSubTab = "all_course";
                pageUtils.createNewCourse(this);
                break;
            default:
                break;
        }

        this.setData({
            courseTabData: courseTabData
        });
    },

    /**
     * 课程页面Tab
     * 响应创建新课程
     * @param e
     */
    onCreatedNewCourse: function (e) {
        pageUtils.createNewCourse(this);
    },

    /**
     * 课程页面Tab
     * 响应课程Tab中选择课程，带入课程的索引，跳转课程修改页面
     * @param e
     */
    onSelectCourse: function (e) {
        console.log(e);
        let url = '../../normalpages/modify_course/modify_course' + "?courseId=" + e.currentTarget.id;

        wx.navigateTo({
            url: url,
        });
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
     *
     * 课程页面Tab，每日课程子Tab页面
     * 响应选择当天的课，带入课程的索引和修改的日期，跳转课程修改页面
     * @param e
     */
    onSelectLesson: function (e) {
        console.log("Selected course:", e.currentTarget.id);

        let url = '../../normalpages/modify_course/modify_course' +
            "?courseId=" + e.currentTarget.id + "&" +
            "date=" + this.data.selectedDate;

        wx.navigateTo({
            url: url,
        });
    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日历上选中日期
     * @param e
     */
    onSelectDateItem: function (e) {
        pageUtils.selectDate(this, e);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日期选择器，跳转到选择的月份
     * @param e
     */
    onSelectMonthYear: function (e) {
        let toDate = DateTimeUtils.getDateFromString(e.detail.value, "-");
        pageUtils.handleMonth(this, "selected", toDate);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应到本月按钮
     */
    onToThisMonth: function () {
        let toDate = new Date();
        pageUtils.handleMonth(this, "selected", toDate);

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日历头部点击，重新显示日历
     * @param e
     */
    onCalendarHead: function (e) {
        this.setData({
            showWeekView: false
        });

    },

    /**
     * 课程页面Tab，每日课程子Tab页面
     * 响应日历上下滑动
     */
    onChangeVerticalSwiper: function (e) {
        let current = parseInt(e.detail.current);
        let lastCalenderId = this.data.lastCalendarId;

        let isNextMonth = false;

        // 判断是左滑还是右划，左滑表示上个月
        switch (lastCalenderId) {
            case 0:
                if (current === 1)
                    isNextMonth = true;
                else if (current === 2)
                    isNextMonth = false;
                break;
            case 1:
                if (current === 0)
                    isNextMonth = false;
                else if (current === 2)
                    isNextMonth = true;
                break;
            case 2:
                if (current === 0)
                    isNextMonth = true;
                else if (current === 1)
                    isNextMonth = false;
                break;
            default:
                console.log("what the fuck!!!!!");
                break;
        }

        if (isNextMonth) {
            pageUtils.handleMonth(this, "next");
        } else {
            pageUtils.handleMonth(this, "last");
        }

        this.setData({
            lastCalendarId: current
        });
    },

    /**
     * 布告栏页面Tab
     * 响应创建新通知
     * @param e
     */
    onCreatedNewNotice: function (e) {
        pageUtils.createNewNotice(this);
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.bottom_tabBar.changeTab();
        // withShareTicket 为 true 时，表示允许转发时是否携带 shareTicket。
        // shareTicket 是获取转发目标群信息的票据，只有拥有 shareTicket 才能拿到群信息，用户每次转发都会生成对应唯一的shareTicket 。
        wx.showShareMenu({
            withShareTicket: true
        });

        // 判断场景值，1044 为转发场景，包含shareTicket 参数
        if (options.scene === 1044) {
            wx.getShareInfo({
                shareTicket: opt.shareTicket,
                success: function (res) {
                    let encryptedData = res.encryptedData;
                    let iv = res.iv;
                    console.log("student page, getShareInfo:", res);
                }
            });
        }

        console.log("student page onLoad, options:", options);

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

        let userInfoLocal = StorageUtils.loadUserInfo();
        app.currentAuth = userInfoLocal.currentAuth;
        let roleName = "";

        switch (userInfoLocal.currentAuth) {
            case "teacher":
                roleName = "老师";
                break;
            case "parent":
                roleName = "家长";
                break;
            case "student":
                roleName = "学生";
                break;
            default:
                break;
        }

        pageUtils.initTabData(this, userInfoLocal.currentAuth);

        let indexPageTitle = roleName + '首页';
        wx.setNavigationBarTitle({
            title: indexPageTitle,
        });

        // 判断是否需要显示新建课程
        let courseTabData = this.data.courseTabData;
        if (userInfoLocal.teacherCourseSet.length > 0) {

            // 其他页面跳转回来时，当前显示哪一个次级Tab
            if (app.tempData.currentCourseSubTab === "all_course") {
                courseTabData[0].selected = true;
                courseTabData[1].selected = false;
            } else if (app.tempData.currentCourseSubTab === "everyday_lesson") {
                courseTabData[0].selected = false;
                courseTabData[1].selected = true;
            }
            courseTabData[2].display = true;

        }

        this.setData({
            userInfo: userInfoLocal,
            userInfoLocal: userInfoLocal,
            courseTabData: courseTabData,
            hasUserInfo: true
        });

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

        let baseUrl = "/pages/normalpages/modify_course/modify_course";

        // // 稍等半秒，等获取courseIdx
        // setTimeout(function () {
        if (options.from === 'button') {
            // 来自页面内转发按钮
            console.log("options.target:", options.target);
            let courseIdx = options.target.id;
            shareMsg.title = userInfo.nickName + "分享的" + userInfo.teacherCourseSet[courseIdx].name;
            shareMsg.path = baseUrl + "?courseIdx=" + courseIdx;
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

        // }, 1000);

    }

})
