/**
 * 初始化页面数据
 */
import DateTimeUtils from "../../../../utils/DateTimeUtils";
import StorageUtils from "../../../../utils/StorageUtils";

const app = getApp();

function initTabData(self, options) {
    console.log(options);
    // 根据页面传来的参数来决定优先激活哪个Tab
    let currentTabIdx = self.data.currentTabIdx;
    let tabData = self.data.tabData;

    // 从本地读取数据，用来初始化页面显示课程
    let userInfo = StorageUtils.loadUserInfo();
    let currentCourseIdx = parseInt(options.courseId);

    // 当前页面要用的课程
    if (currentCourseIdx >= 0 && currentCourseIdx <= userInfo.teacherCourseSet.length - 1) {
        let currentCourse = userInfo.teacherCourseSet[currentCourseIdx];

        if (typeof options.date === "undefined") {
            currentTabIdx = 0;
            tabData[0].selected = true;
            tabData[1].selected = false;

        } else {
            currentTabIdx = 1;
            tabData[0].selected = false;
            tabData[1].selected = true;

        }

        let weekVisual = self.data.weekVisual;

        for (let item of weekVisual) {
            item.selected = currentCourse.recurringRule.includes(item.name);

        }

        console.log("currentCourseIdx:", currentCourseIdx);
        console.log("currentCourse:", currentCourse);

        self.setData({
            userInfo: userInfo,
            currentCourse: currentCourse,
            currentCourseIdx: currentCourseIdx,
            tabData: tabData,
            currentTabIdx: currentTabIdx,
            options: options,
            weekVisual: weekVisual
        });

    } else {
        console.log("Error tab options, options:", options);
    }


}

function initPageCourse(self) {
    console.log("Course Page onShow call");

    // 如果是由次级页面跳转回来，则不需要重新加载数据
    let courseItems = self.data.courseItems;

    if (!self.data.fromHide) {
        let currentCourse = self.data.currentCourse;

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

        self.setData({
            courseItems: courseItems,
            timeList: timeList,
        });
    } else {
        if (app.tempData.recurringRule.constructor === Array) {
            if (app.tempData.recurringRule.length > 0) {
                courseItems.recurringRule.value = "每周" + app.tempData.recurringRule.map(DateTimeUtils.transEnDate2ChShortDate).join("、");
            }
        }
        self.setData({
            courseItems: courseItems,
        });
    }

}

/**
 * 第一次进入该页面时，根据本地数据初始化
 * @param options
 */
function loadCourse(self, options) {
    let currentCourse = {};    // 当前页面要用的课程

    // 从本地读取数据，用来初始化页面显示课程
    let userInfo = StorageUtils.loadUserInfo();

    // 修改已有新课程
    // 解析课程id
    console.log(options);
    let currentCourseIdx = parseInt(options.model.split("_")[1]);

    if (currentCourseIdx >= 0 && currentCourseIdx <= userInfo.teacherCourseSet.length - 1) {
        // 直接提取
        currentCourse = userInfo.teacherCourseSet[currentCourseIdx];
    } else {
        console.log("wrong model!");
        return;
    }

    let weekVisual = self.data.weekVisual;

    for (let item of weekVisual) {
        item.selected = currentCourse.recurringRule.includes(item.name);

    }

    console.log("currentCourseIdx:", currentCourseIdx);
    console.log("currentCourse:", currentCourse);

    self.setData({
        userInfo: userInfo,
        currentCourse: currentCourse,
        currentCourseIdx: currentCourseIdx,
        weekVisual: weekVisual
    });
}

module.exports = {
    initTabData: initTabData,
    initPageCourse: initPageCourse,
    loadCourse: loadCourse,
}