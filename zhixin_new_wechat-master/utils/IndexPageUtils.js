/**
 * index 页面具体的业务逻辑处理功能，所有的数据在这里更新
 */
import Models from '../datamodel/Models'
import StorageUtils from "./StorageUtils";
import DateTimeUtils from "./DateTimeUtils";
import SyncUtils from "./SyncUtils"

const app = getApp();

class IndexPageUtils {
    constructor() {
        this.data = makePageData();
    }

    update(self) {
        let userInfo = StorageUtils.loadUserInfo();
        if (userInfo.id !== -1) {
            this.data.loadFinished = true;
        }

        self.setData({
            pageData: this.data
        });
    }

    setData(obj) {
        for (let data_item in this.data) {
            for (let obj_item in obj) {
                if (data_item === obj_item) {
                    this.data[data_item] = obj[obj_item];
                    console.log(data_item, this.data[data_item]);
                }
            }
        }
    }

    /**
     * 初始化页面
     * @param role
     */
    initPageData(role) {

        // 1、初始化页面一级Tab
        this.data.currentAuth = role;
        this.data.userInfo = StorageUtils.loadUserInfo();

        // 2、根据角色，初始化课程Tab的内容
        // 2.1、判断是否需要显示新建课程
        if (role !== "teacher") {
            this.data.indexTabData[1].name = "通知";
            this.data.indexTabData[2].name = "作业回复";
            this.data.courseTabData[0].name = "加入的课程";
            this.data.currentCourseSet = this.data.userInfo.studentCourseSet;
        } else {
            this.data.currentCourseSet = this.data.userInfo.teacherCourseSet;
            if (this.data.userInfo.teacherCourseSet.length > 0) {
                // 其他页面跳转回来时，当前显示哪一个次级Tab
                if (app.tempData.currentCourseSubTab === "all_course") {
                    this.data.courseTabData[0].selected = true;
                    this.data.courseTabData[1].selected = false;
                } else if (app.tempData.currentCourseSubTab === "everyday_lesson") {
                    this.data.courseTabData[0].selected = false;
                    this.data.courseTabData[1].selected = true;
                }
                // 当有课程的时候，始终显示创建
                this.data.courseTabData[2].display = true;

            }
        }

        // 2.2、初始化周历和月历
        let today = new Date();
        this.data.today = today;
        this.data.currentYear = today.getFullYear();
        this.data.currentMonth = today.getMonth() + 1;
        this.data.currentDate = today.getDate();


        this.data.selectedMonth = DateTimeUtils.getMonthDateList(this.data.currentYear, this.data.currentMonth, this.data.currentCourseSet);

        // console.log(this.data.selectedDate);

        // 根据今天日期，选中周和课程
        this.data.selectedDateCourse = [];
        for (let week of this.data.selectedMonth) {
            for (let day of week) {
                if (day.value === DateTimeUtils.formatDateToString(today)) {
                    this.data.selectedWeek = week;
                    this.data.selectedDate = day;
                    for (let id of day.courseIdArray) {
                        this.data.selectedDateCourse.push({idx: id - 1, course: this.data.currentCourseSet[id - 1]});
                    }
                    break;
                }
            }
        }

        // 3、初始化页面通知
        // 4、初始化页面作业
    }

    /**
     * 执行一级Tab的跳转
     * @param self
     * @param currentTabIdx
     */
    switchIndexTab(self, currentTabIdx) {
        for (let idx = 0; idx < this.data.indexTabData.length; idx++) {
            this.data.indexTabData[idx].selected = (idx === currentTabIdx);
        }

        this.update(self);
    }

    /**
     * 执行课程Tab的跳转
     * @param self
     * @param tabId
     */
    switchCourseTab(self, tabId) {
        for (let item of this.data.courseTabData) {
            if (item.type === "add_new") {
                // 当显示创建的时候，始终高亮创建选项
                item.selected = true;
            } else {
                item.selected = item.type === tabId;
            }
        }

        switch (tabId) {
            case "all_course":
                app.tempData.currentCourseSubTab = "all_course";
                break;
            case "everyday_lesson":
                app.tempData.currentCourseSubTab = "everyday_lesson";
                break;
            case "add_new":
                app.tempData.currentCourseSubTab = "all_course";
                this.createNewCourse();
                break;
            default:
                break;
        }

        this.update(self);
    }

    /**
     * 执行创建新课
     */
    createNewCourse() {
        wx.navigateTo({
            url: '../../normalpages/course/create/create',
        });
    }

    selectCourse(courseId) {
        if (this.data.currentAuth === "teacher") {
            let url = '../../normalpages/course/modify/modify' + "?courseId=" + courseId;

            wx.navigateTo({
                url: url,
            });
        } else {
            console.log("view Course");
            let url = '../../normalpages/course/view/browse/browse' + "?route=view" + "&courseId=" + courseId;

            wx.navigateTo({
                url: url,
            });
        }
    }

    selectLesson(courseId) {
        console.log(this.data.currentAuth);
        let url;
        if (this.data.currentAuth === "teacher") {
            url = '../../normalpages/course/modify/modify' +
                "?courseId=" + courseId +
                "&date=" + this.data.selectedDate.value;

        } else {
            console.log("view Lesson");
            url = '../../normalpages/course/view/browse/browse' +
                "?courseId=" + courseId +
                "&date=" + this.data.selectedDate.value;

        }

        wx.navigateTo({
            url: url,
        });

    }

    createNewNotice() {
        wx.navigateTo({
            url: '../../normalpages/notice/create/create',
        });
    }

    /**
     * 日历控制的核心函数
     * @param self
     * @param selectedDate
     */
    selectDate(self, selectedDate) {

        this.data.selectedDate = selectedDate;

        this.data.showWeekView = true;

        // 根据选中日期，选中周
        for (let week of this.data.selectedMonth) {
            for (let day of week) {
                if (day.value === selectedDate.value) {
                    this.data.selectedWeek = week;
                    break;
                }
            }
        }

        // 读取每个课程，如果这个课程包含了当前选中日期，则显示
        // 这里需要使用重组后Course
        let userInfo = StorageUtils.loadUserInfo();

        // console.log(selectedDate);

        this.data.selectedDateCourse = [];

        for (let id of selectedDate.courseIdArray) {
            this.data.selectedDateCourse.push({idx: id - 1, course: this.data.currentCourseSet[id - 1]});
        }

        console.log("Selected Date's CourseSet: ", selectedDate.value, this.data.selectedDateCourse);

        this.update(self);
    }

    /**
     * 执行日历滑动
     * @param self
     * @param current
     */
    swiperCalendar(self, current) {

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
            this.handleMonth(self, "next");
        } else {
            this.handleMonth(self, "last");
        }

        this.data.lastCalendarId = current;

    }

    /**
     * 移动月的操作，整月移动
     * @param self
     * @param direction
     * @param toDate
     */
    handleMonth(self, direction, toDate) {

        this.data.showWeekView = false;

        switch (direction) {
            case "next":
                this.data.currentYear = this.data.currentMonth + 1 === 13 ? this.data.currentYear + 1 : this.data.currentYear;
                this.data.currentMonth = this.data.currentMonth + 1 === 13 ? 1 : this.data.currentMonth + 1;
                this.data.currentDate = 1;
                break;
            case "last":
                this.data.currentYear = this.data.currentMonth - 1 ? this.data.currentYear : this.data.currentYear - 1;
                this.data.currentMonth = this.data.currentMonth - 1 ? this.data.currentMonth - 1 : 12;
                this.data.currentDate = 1;
                break;
            case "selected":
                this.data.currentYear = toDate.getFullYear();
                this.data.currentMonth = toDate.getMonth() + 1;
                this.data.currentDate = toDate.getDate();
                break;
            default:
                break;
        }

        console.log("go to: ", this.data.currentYear, "年", this.data.currentMonth, "月", this.data.currentDate, "日");

        let userInfo = StorageUtils.loadUserInfo();

        this.data.selectedMonth = DateTimeUtils.getMonthDateList(this.data.currentYear, this.data.currentMonth, userInfo.teacherCourseSet);


        this.update(self);

    }
}

/**
 * 初始化页面数据
 * @returns {{userInfo: {}, currentAuth: string, canIUse: *, indexTabData: *[], currentTabIdx: number, courseTabData: *[], currentCourseSet: Array, showWeekView: boolean, today: string, todayMonth: string, todayYear: string, currentYear: string, currentMonth: string, currentDate: string, selectedDate: string, selectedWeek: Array, selectedMonth: Array, selectedDateCourse: Array, calendars: number[], lastCalendarId: number, duration: number, currentNoticeSet: Array, currentHomeworkSet: Array}}
 */
function makePageData() {
    let pageData = {
        // 数据加载开关
        loadFinished: false,

        userInfo: {},
        currentAuth: "",  // （当前角色，字符串，可选，默认：空）
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
                name: "已有的课程",
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

        // 当前页面显示的课程数据
        currentCourseSet: [],


        // 以下是控制每日课程的显示
        showWeekView: true,
        // 今天日期
        today: '',
        todayMonth: '',
        todayYear: '',

        // 当前选中的年月日
        currentYear: '',
        currentMonth: '',
        currentDate: '',

        // 保存当月的日期
        selectedDate: {},
        selectedWeek: [],
        selectedMonth: [],

        selectedDateCourse: [],
        // 日历滑动
        calendars: [1, 2, 3],
        lastCalendarId: 0,
        duration: 1000,

        // 当前页面显示的布告栏数据
        currentNoticeSet: [],

        // 当前页面显示的作业数据
        currentHomeworkSet: []
    };

    // console.log(pageData);

    return pageData;
}


module.exports = {
    IndexPageUtils: IndexPageUtils
};