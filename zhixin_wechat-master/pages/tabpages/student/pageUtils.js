/**
 * index 页面具体的业务逻辑处理功能
 */
import DataStructure from '../../../datamodel/DataStructure'
import StorageUtils from "../../../utils/StorageUtils";
import DateTimeUtils from "../../../utils/DateTimeUtils";

/**
 * 初始化页面一级Tab
 * @param self
 * @param role
 */
function initTabData(self, role) {

    let indexTabData = self.data.indexTabData;

    if (role !== "teacher") {
        indexTabData[1].name = "通知";
        indexTabData[2].name = "作业回复";
    }

    let userInfo = StorageUtils.loadUserInfo();

    // 初始化周历和月历
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    let selectedDate = DateTimeUtils.formatDateToString(today);
    let selectedWeek = [];

    let dateList = DateTimeUtils.getMonthDateList(currentYear, currentMonth, userInfo.teacherCourseSet);

    self.setData({
        today: today,
        currentYear: currentYear,
        currentMonth: currentMonth,
        currentDate: currentDate,
        selectedWeek: selectedWeek,
        dateList: dateList,
        selectedDate: selectedDate,
        indexTabData: indexTabData
    });
}

/**
 * 初始化页面课程
 * @param self
 */
function initPageCourse(self) {

}

/**
 * 初始化页面通知
 * @param self
 */
function initPageNotice(self) {

}

/**
 * 初始化页面作业
 * @param self
 */
function initPageHomework(self) {

}

function createNewCourse(self) {
    wx.navigateTo({
        url: '../../normalpages/create/create',
    });
}

function createNewNotice(self) {
    wx.navigateTo({
        url: '../../normalpages/create/create',
    });
}

/**
 * 日历控制的核心函数
 * @param self
 * @param e
 */
function selectDate(self, e) {
    console.log(e.currentTarget.dataset.date);

    let selectedDate = e.currentTarget.dataset.date;
    let selectedWeek = [];

    // 根据选中日期，选中周
    for (let week of self.data.dateList) {
        for (let day of week) {
            if (day.value === selectedDate.value) {
                selectedWeek = week;
                break;
            }
        }
    }

    let selectedDateCourse = [];

    // 读取每个课程，如果这个课程包含了当前选中日期，则显示
    // 这里需要使用重组后Course

    let userInfo = StorageUtils.loadUserInfo();

    for (let id of selectedDate.courseIdArray) {
        selectedDateCourse.push({ idx: id - 1, course: userInfo.teacherCourseSet[id - 1] });
    }

    console.log("Selected Date's CourseSet: ", selectedDate.value, selectedDateCourse);

    self.setData({
        selectedDateCourse: selectedDateCourse,
        selectedDate: selectedDate.value,
        selectedWeek: selectedWeek,
        showWeekView: true
    });

}

/**
 * 移动月的操作，整月移动
 * @param self
 * @param direction
 * @param toDate
 */
function handleMonth(self, direction, toDate) {

    let currentYear = '';
    let currentMonth = '';
    let currentDate = '';

    switch (direction) {
        case "next":
            currentYear = self.data.currentMonth + 1 === 13 ? self.data.currentYear + 1 : self.data.currentYear;
            currentMonth = self.data.currentMonth + 1 === 13 ? 1 : self.data.currentMonth + 1;
            currentDate = 1;
            break;
        case "last":
            currentYear = self.data.currentMonth - 1 ? self.data.currentYear : self.data.currentYear - 1;
            currentMonth = self.data.currentMonth - 1 ? self.data.currentMonth - 1 : 12;
            currentDate = 1;
            break;
        case "selected":
            currentYear = toDate.getFullYear();
            currentMonth = toDate.getMonth() + 1;
            currentDate = toDate.getDate();
            break;
        default:
            break;
    }

    console.log("go to: ", currentYear, "年", currentMonth, "月", currentDate, "日");

    let userInfo = StorageUtils.loadUserInfo();

    let dateList = DateTimeUtils.getMonthDateList(currentYear, currentMonth, userInfo.teacherCourseSet);

    self.setData({
        currentYear: currentYear,
        currentMonth: currentMonth,
        currentDate: currentDate,
        showWeekView: false,
        dateList: dateList,
        // selectedDate: DateTimeUtils.formatDateToString(new Date())
    });

}

module.exports = {
    initTabData: initTabData,
    initPageCourse: initPageCourse,
    initPageHomework: initPageHomework,
    initPageNotice: initPageNotice,
    selectDate: selectDate,
    handleMonth: handleMonth,
    createNewCourse: createNewCourse,
    createNewNotice: createNewNotice
}