// pages/normalpages/create_course/create_course.js
// 创建课程页

import DataStructure from '../../../../datamodel/DataStructure'
import StorageUtils from '../../../../utils/StorageUtils'
import DateTimeUtils from '../../../../utils/DateTimeUtils'
import Util from '../../../../utils/Util'

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentCourse: {},
        currentCourseIdx: 0,
        courseItems: {
            name: {
                // 0
                id: "name",
                name: "课程名字*",
                display: true,
                tip: "请输入",
                value: "",

            },
            location: {
                // 1
                latitude: {
                    id: "latitude",
                    name: "纬度",
                    display: true,
                    tip: "请输入或选择",
                    value: "",
                },
                longitude: {
                    id: "longitude",
                    name: "经度",
                    display: true,
                    tip: "请输入或选择",
                    value: "",
                },
                address: {
                    id: "address",
                    name: "详细地址*",
                    display: true,
                    tip: "请输入或选择",
                    value: "",
                },
                name: {
                    id: "address_name",
                    name: "上课地址*",
                    display: true,
                    tip: "请输入或选择",
                    value: "",
                },
                room: {
                    id: "room",
                    name: "教室地址*",
                    display: true,
                    tip: "请输入",
                    value: "",
                },
            },
            startDate: {
                // 3
                id: "startDate",
                name: "起止日期*",
                display: true,
                start: "",
                tip: "请选择",
                value: "请选择",
            },
            endDate: {
                // 4
                id: "endDate",
                name: "起止日期*",
                start: "",
                display: true,
                tip: "请选择",
                value: "请选择",
            },
            recurringRule: {
                // 5
                id: "recurringRule",
                name: "重复规则*",
                display: true,
                tip: "请选择",
                value: "请选择",
            },
            startTime: {
                // 6
                id: "startTime",
                name: "开始时间*",
                start: "",
                display: true,
                tip: "请选择",
                value: "请选择",
            },
            duration: {
                // 7
                id: "duration",
                name: "课程时长*",
                display: true,
                tip: "请选择",
                value: "请选择",
            },
            totalStudentNumber: {
                // 8
                id: "totalStudentNumber",
                name: "人数上限*",
                display: true,
                tip: "请输入总人数",
                value: "",
            },
            description: {
                // 9
                id: "description",
                name: "课程描述",
                display: true,
                tip: "请简要介绍一下课程",
                value: "",
            },

        },

        // 以下用于重复规则设置
        showRecurringRule: false,
        weekVisual: [
            {id: 0, value: '日', longValue: "周日", name: "Sun", selected: false},
            {id: 1, value: '一', longValue: "周一", name: "Mon", selected: false},
            {id: 2, value: '二', longValue: "周二", name: "Tue", selected: false},
            {id: 3, value: '三', longValue: "周三", name: "Wed", selected: false},
            {id: 4, value: '四', longValue: "周四", name: "Thu", selected: false},
            {id: 5, value: '五', longValue: "周五", name: "Fri", selected: false},
            {id: 6, value: '六', longValue: "周六", name: "Sat", selected: false}
        ],

        selectedDateArray: [],
        selectedDateLongValue: [],

        // 以下用于控件临时显示
        timeList: [],
        timeListIdx: 0,

        fromHide: false

    },

    /**
     * 第一次进入该页面时，根据本地数据初始化
     *
     */
    loadCourse: function () {
        let currentCourseIdx = this.data.currentCourseIdx;   // 当前页面课程的索引

        // 从本地读取数据，用来初始化页面显示课程
        let userInfo = StorageUtils.loadData(app.Settings.Storage.WeChatUser);

        // 1、根据页面进入入口，判断如何初始化，提取当前应该显示的课程

        // 当前没有课程
        let currentCourse = new DataStructure.Course();


        console.log("currentCourseIdx:", currentCourseIdx);
        console.log("currentCourse:", currentCourse);

        this.setData({
            userInfo: userInfo,
            currentCourse: currentCourse,
            currentCourseIdx: currentCourseIdx,
        });
    },

    /**
     * 初始化页面数据
     */
    initPageCourse: function () {
        console.log("Course Page onShow call");

        // 如果是由次级页面跳转回来，则不需要重新加载数据
        let courseItems = this.data.courseItems;

        if (!this.data.fromHide) {
            let currentCourse = this.data.currentCourse;

            // 2、根据课程初始化页面数据，需要分别处理上课地址和重复规律
            for (let item in currentCourse) {
                for (let displayItem in courseItems)
                    if (displayItem === item && displayItem !== "location") {
                        courseItems[displayItem].value = currentCourse[item];
                    }
            }

            // 初始化上课地址和教室
            courseItems.location.latitude.value = currentCourse.location.latitude;
            courseItems.location.longitude.value = currentCourse.location.longitude;
            courseItems.location.address.value = currentCourse.location.address;
            courseItems.location.name.value = currentCourse.location.name;
            courseItems.location.room.value = currentCourse.location.room;

            // 初始化重复规则
            app.tempData.recurringRule = currentCourse.recurringRule;
            if (app.tempData.recurringRule.constructor === Array) {
                if (app.tempData.recurringRule.length > 0) {
                    courseItems.recurringRule.value = "每周" + app.tempData.recurringRule.map(DateTimeUtils.transEnDate2ChShortDate).join("、");
                }
            }

            let timeList = [45, 50, 55, 60, 75, 90, 100, 120];

            this.setData({
                courseItems: courseItems,
                timeList: timeList,
            });
        } else {
            if (app.tempData.recurringRule.constructor === Array) {
                if (app.tempData.recurringRule.length > 0) {
                    courseItems.recurringRule.value = "每周" + app.tempData.recurringRule.map(DateTimeUtils.transEnDate2ChShortDate).join("、");
                }
            }
            this.setData({
                courseItems: courseItems,
            });
        }

    },

    onSelectRecurringDay: function (e) {
        let weekVisual = this.data.weekVisual;
        let selectedDateIdx = parseInt(e.currentTarget.id);
        let selectedDateArray = [];
        let selectedDateLongValue = [];
        let courseItems = this.data.courseItems;

        // 高亮选中日期，提取选择日期
        for (let item of weekVisual) {
            if (item.id === selectedDateIdx) {
                item.selected = !item.selected;
            }

            if (item.selected) {
                selectedDateArray.push(item.name);
                selectedDateLongValue.push(item.longValue);
            }
        }

        app.tempData.recurringRule = selectedDateArray;

        if (app.tempData.recurringRule.constructor === Array) {
            if (app.tempData.recurringRule.length > 0) {
                courseItems.recurringRule.value = "每周" + app.tempData.recurringRule.map(DateTimeUtils.transEnDate2ChShortDate).join("、");
            }
        }

        this.setData({
            weekVisual: weekVisual,
            courseItems: courseItems
        });

    },

    onSetRecurringRules: function (e) {
        let showRecurringRule = !this.data.showRecurringRule;

        this.setData({
            showRecurringRule: showRecurringRule
        });
        // wx.navigateTo({
        //     url: '../set_recurring/set_recurring',
        // });
    },

    /**
     * 响应Picker选择
     * @param e
     */
    onPickerChange: function (e) {
        console.log(e.currentTarget.id, e.detail.value);
        let courseItems = this.data.courseItems;
        let timeListIdx = this.data.timeListIdx;
        for (let item in courseItems) {
            if (item === e.currentTarget.id) {
                switch (item) {
                    case "duration":
                        courseItems[item].value = this.data.timeList[parseInt(e.detail.value)];
                        timeListIdx = parseInt(e.detail.value);
                        break;
                    case "startDate":
                        courseItems[item].value = e.detail.value;
                        break;
                    case "endDate":
                        courseItems[item].value = e.detail.value;
                        break;
                    default:
                        // console.log("default");
                        courseItems[item].value = e.detail.value;
                        break;
                }

                break;
            }
        }

        this.setData({
            timeListIdx: timeListIdx,
            courseItems: courseItems
        });
    },

    onInput: function (e) {
        // console.log(e.currentTarget.id, e.detail.value);
        let courseItems = this.data.courseItems;

        if (e.currentTarget.id === "address_name") {
            courseItems.location.name.value = e.detail.value;
        } else if (e.currentTarget.id === "room") {
            courseItems.location.room.value = e.detail.value;
        } else {
            courseItems[e.currentTarget.id].value = e.detail.value;
        }

        this.setData({
            courseItems: courseItems
        });

        // console.log(courseItems);
    },

    /**
     * 响应选择位置
     */
    onChooseLocation: function () {
        let host = this;
        let courseItems = this.data.courseItems;

        wx.chooseLocation({
            success: function (res) {
                courseItems.location.latitude.value = res.latitude;
                courseItems.location.longitude.value = res.longitude;
                courseItems.location.address.value = res.address;
                courseItems.location.name.value = res.name;

                host.setData({
                    courseItems: courseItems
                });

                console.log("Get Location:", courseItems.location);
            }
        });

    },

    /**
     * 提交表单
     */
    onFormSubmit: function (e) {
        let courseItems = this.data.courseItems;
        console.log(courseItems);

        let course = new DataStructure.Course();

        let title = "缺少必要信息";
        let content = "";

        // 1、先检查信息，直接根据courseItems来判断信息
        for (let item in courseItems) {
            console.log(item, ":", courseItems[item]);

            if (content !== "") {
                Util.showModal(title, content);
                return;
            } else {
                if (item === "location") {
                    if (courseItems.location.name.value === "") {
                        content = "请输入" + this.data.courseItems.location.name.name.split("*")[0];

                    }
                    if (courseItems.location.room.value === "") {
                        content = "请输入" + this.data.courseItems.location.room.name.split("*")[0];
                    }
                } else if (item === "duration") {
                    if (parseInt(courseItems.duration.value) <= 0) {
                        content = "课程时长不能为零";
                    }
                } else if (item !== "description") {
                    if (courseItems[item].value === "" ||
                        courseItems[item].value === "请选择" ||
                        courseItems[item].value === "请输入") {
                        content = "请输入" + courseItems[item].name.split("*")[0];

                    }
                }
            }

        }

        // 2、收集信息，有为空的即弹出信息提示用户
        for (let item in courseItems) {
            // 如果有，直接添加
            if (course.hasOwnProperty(item)) {
                if (item === "location") {
                    // 经纬度直接拷贝
                    course.location.latitude = courseItems[item].latitude.value;
                    course.location.longitude = courseItems[item].longitude.value;
                    course.location.address = courseItems[item].address.value;
                    course.location.name = courseItems[item].name.value;
                    course.location.room = courseItems[item].room.value;

                } else if (item === "recurringRule") {
                    course.recurringRule = app.tempData.recurringRule;
                } else {
                    course[item] = courseItems[item].value;
                }
            }
        }

        console.log(course);

        // 3、根据开课的时间来判断状态
        if (course.status === "") {
            course.status = "Preparing";
        }

        // 4.1、根据页面进入情况整理需要保存的UserInfo
        let userInfo = StorageUtils.loadUserInfo();

        userInfo.teacherCourseSet.push(course);


        // 4.2、保存
        StorageUtils.saveUserInfo(userInfo);

        wx.navigateBack({});
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadCourse();
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
        this.initPageCourse();


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("onHide");
        this.setData({
            fromHide: true
        });
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