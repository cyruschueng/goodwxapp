/**
 * 格式化输出数字，固定位数
 * @param n，位数
 */
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function transEnDate2ChLongDate(date) {

    switch (date) {
        case "Sun":
            return "周日";
        case "Mon":
            return "周一";
        case "Tue":
            return "周二";
        case "Wed":
            return "周三";
        case "Thu":
            return "周四";
        case "Fri":
            return "周五";
        case "Sat":
            return "周六";
    }

}

function transEnDate2ChShortDate(date) {

    switch (date) {
        case "Sun":
            return "日";
        case "Mon":
            return "一";
        case "Tue":
            return "二";
        case "Wed":
            return "三";
        case "Thu":
            return "四";
        case "Fri":
            return "五";
        case "Sat":
            return "六";
    }

}

function transEnDate2NumDate(date) {

    switch (date) {
        case "Sun":
            return 0;
        case "Mon":
            return 1;
        case "Tue":
            return 2;
        case "Wed":
            return 3;
        case "Thu":
            return 4;
        case "Fri":
            return 5;
        case "Sat":
            return 6;
    }

}

function transNumDate2ChLongDate(date) {

    switch (date) {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
    }

}

function transNumDate2ChShortDate(date) {
    switch (date) {
        case 0:
            return "日";
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
    }

}

function transNumDate2EnDate(date) {

    switch (date) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tue";
        case 3:
            return "Wed";
        case 4:
            return "Thu";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
    }

}

function formatTime(time) {
    if (typeof time !== 'number' || time < 0) {
        return time;
    }

    let hour = parseInt(time / 3600);
    time = time % 3600;
    let minute = parseInt(time / 60);
    time = time % 60;
    let second = time;

    return ([hour, minute, second]).map(function (n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    }).join(':');
}

/**
 * 将日期和时间转为指定格式，例如：2017-08-30 15:30:25
 * 参数：date，日期类（Date）
 */
function formatTimeToString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 将日期转为指定格式，例如：2017-01-01, 2017-08-30
 * 参数：date，日期类（Date）
 */
function formatDateToString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return [year, month, day].map(formatNumber).join('-');
}

/**
 * 给定年月日，取得当前时间
 * 参数year：年
 * 参数month：月，自然月
 * 参数day：当月第day日
 */
function getDateFromNumbers(year, month, day) {
    return new Date(Date.UTC(year, month - 1, day));
}

/**
 * 将字符串日期转换为日期类，得到对应的日期对象
 * 参数date：字符串表示的日期，比如 '2016-9-01'或者'2016/9/01'
 * 参数splicer：字符串中的分隔符
 */
function getDateFromString(date, splicer) {
    let year = date.split(splicer)[0];
    let month = date.split(splicer)[1];
    let day = date.split(splicer)[2];

    return new Date(Date.UTC(year, month - 1, day));
}

/**
 * 格式化输出日期字符串，输出格式为：2017-08-30
 * 参数year：年
 * 参数month：月，自然月
 * 参数day：当月第day日
 */
function formatStringDate(year, month, day) {
    return [year, month, day].map(formatNumber).join('-');
}

/**
 * 检查当前选择日期与今天的关系
 * 过期，则返回：-1
 * 今天，则返回：0
 * 将来，则返回：1
 */
function dateDirection(selectedDate) {
    let direction = -1;

    let distance = datesDistance(selectedDate, formatDateToString(new Date()));
    if (distance > 0) {
        direction = -1;
    } else if (distance === 0) {
        direction = 0;
    } else {
        direction = 1;
    }

    return direction;
}

/**
 * 检查当前选择日期与今天的关系
 * 返回end时间到start的天数，正数表示end时间靠后，反之亦然
 */
function datesDistance(start, end) {
    let distance;

    let startTime = getDateFromString(start, '-').getTime() / (3600 * 24 * 1000);
    let endTime = getDateFromString(end, '-').getTime() / (3600 * 24 * 1000);

    distance = endTime - startTime;

    return distance;
}

/**
 *
 * @param startDay
 * @param isNext
 * @param dayCount
 */
function getMovedDate(startDay, isNext, dayCount) {
    let selectedDayTimeMills;
    let movedDayTimeMills;

    // 判断参数时间类型
    if (typeof startDay === "string") {
        selectedDayTimeMills = getDateFromString(startDay, '-').getTime();
    } else {
        selectedDayTimeMills = startDay.getTime();
    }

    //时间改变一天，直接加上、或减去一天的毫秒数
    if (isNext) {
        movedDayTimeMills = selectedDayTimeMills + 3600 * 24 * 1000 * dayCount;
    } else {
        movedDayTimeMills = selectedDayTimeMills - 3600 * 24 * 1000 * dayCount;
    }
    let movedDayDate = new Date();
    movedDayDate.setTime(movedDayTimeMills);
    // console.log("move to ", movedDayDate + ".............");

    // 根据输入返回
    if (typeof startDay === "string") {
        return formatDateToString(movedDayDate);
    } else {
        return movedDayDate;
    }

}

/**
 *
 * @param startDate
 * @param checkDate
 * @param endDate
 */
function checkDate(startDate, checkDate, endDate) {

    let startDateTimeMills = getDateFromString(startDate, '-').getTime();
    let checkDateTimeMills = getDateFromString(checkDate, '-').getTime();
    let endDateTimeMills = getDateFromString(endDate, '-').getTime();

    // console.log(startDate,checkDate,endDate);
    // console.log(startDateTimeMills,checkDateTimeMills,endDateTimeMills);

    return startDateTimeMills <= checkDateTimeMills && checkDateTimeMills <= endDateTimeMills;
}

/**
 * 最核心的函数
 * 1、获取每月的显示列表
 * 2、搜索、标记日期状态
 */
function getMonthDateList(year, month, courseSet) {
    let week;
    // 如果是闰年，则2月有29天
    let monthDaysCountArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) {
        console.log(parseInt(year) % 4, "and ", parseInt(year) % 100);
        monthDaysCountArr[1] = 29;
    }

    //第几个月；下标从0开始，实际月份需要加1
    let dateList = [];
    dateList[0] = [];

    //第几个星期
    let weekIndex = 0;
    let firstDayOfWeek = new Date(Date.UTC(year, month - 1, 1)).getDay();
    let hasDoneFirstWeek = false;
    // console.log(firstDayOfWeek);
    let lastYear = month - 1 > 0 ? year : year - 1;
    let lastMonth = month - 1 > 0 ? month - 1 : 12;
    let nextYear = month + 1 === 13 ? year + 1 : year;
    let nextMonth = month + 1 === 13 ? 1 : month + 1;
    for (let idx = 0; idx < monthDaysCountArr[month - 1]; idx++) {
        week = new Date(Date.UTC(year, month - 1, idx + 1)).getDay();
        // 补齐每个月前面的日子，计算上个月的尾巴
        if (firstDayOfWeek === 0 && !hasDoneFirstWeek) {
            for (let idx = 0; idx < 7; idx++) {
                let date = monthDaysCountArr[lastMonth - 1] + idx - 6;
                dateList[weekIndex].push({
                    value: formatStringDate(lastYear, lastMonth, date),
                    date: date,
                    week: idx,
                    selected: false,
                    hasCourse: false,
                    courseIdArray: [],
                    courseIdString: '',
                    inThisMonth: false
                });
            }
            weekIndex++;
            dateList[weekIndex] = [];
            hasDoneFirstWeek = true;

        } else if (!hasDoneFirstWeek) {
            for (let blank = 0; blank < firstDayOfWeek; blank++) {
                let date = monthDaysCountArr[lastMonth - 1] + blank + 1 - firstDayOfWeek;
                dateList[weekIndex].push({
                    value: formatStringDate(lastYear, lastMonth, date),
                    date: date,
                    week: week + blank - firstDayOfWeek,
                    selected: false,
                    hasCourse: false,
                    courseIdArray: [],
                    courseIdString: '',
                    inThisMonth: false
                });
            }
            hasDoneFirstWeek = true;
        }

        // 每个月的日子
        dateList[weekIndex].push({
            value: formatStringDate(year, month, (idx + 1)),
            date: idx + 1,
            week: week,
            selected: false,
            hasCourse: false,
            courseIdArray: [],
            courseIdString: '',
            inThisMonth: true
        });


        if (week === 6) {
            weekIndex++;
            dateList[weekIndex] = [];
        }

        // 补齐每个月最后面的日子，计算下个月的头
        if (idx === monthDaysCountArr[month - 1] - 1) {
            let rest = 7 - dateList[weekIndex].length;
            for (let i = 0; i < rest; i++) {
                dateList[weekIndex].push({
                    value: formatStringDate(nextYear, nextMonth, (i + 1)),
                    date: i + 1,
                    week: week + i + 1 <= 6 ? week + i + 1 : i,
                    selected: false,
                    hasCourse: false,
                    courseIdArray: [],
                    courseIdString: '',
                    inThisMonth: false
                });
            }

            if (weekIndex !== 5) {
                weekIndex = 5;
                dateList[weekIndex] = [];
                for (let i = 0; i < 7; i++) {
                    dateList[weekIndex].push({
                        value: formatStringDate(nextYear, nextMonth, (rest + i + 1)),
                        date: rest + i + 1,
                        week: i,
                        selected: false,
                        hasCourse: false,
                        courseIdArray: [],
                        courseIdString: '',
                        inThisMonth: false
                    });
                }
            }
        }
    }

    // 准备有课程日期的标注数据
    // console.log(courseSet);
    let courseIdx = 0;
    for (let course of courseSet) {
        courseIdx++;
        for (let week = 0; week < dateList.length; week++) {
            for (let day = 0; day < dateList[week].length; day++) {
                // 先判断这天是否在周期内
                if (checkDate(course.startDate, dateList[week][day].value, course.endDate)) {

                    if (course.recurringRule.includes(transNumDate2EnDate(dateList[week][day].week))) {
                        // console.log(dateList[week][day].week, transNumDate2EnDate(dateList[week][day].week));
                        dateList[week][day].hasCourse = true;
                        dateList[week][day].courseIdArray.push(courseIdx);
                    }

                    dateList[week][day].courseIdString = dateList[week][day].courseIdArray.join("、");
                }
            }
        }
    }

    // 打印检验
    // console.log("log begins here~~~~~~~~~~~~~~~~~~~~~");
    // for (let week = 0; week < dateList.length; week++) {
    //     for (let day = 0; day < dateList[week].length; day++) {
    //         console.log("dateList[", week, "][", day, "], is: ", dateList[week][day].value
    //             , ", ", dateList[week][day].date
    //             , ", ", dateList[week][day].week
    //             , ", selected", dateList[week][day].selected
    //             , ", hasCourse", dateList[week][day].hasCourse
    //             , ", courseIdString", dateList[week][day].courseIdString.toString()
    //             , ", inThisMonth", dateList[week][day].inThisMonth);
    //     }
    // }

    return dateList;
}

/**
 * 最核心的函数
 * 1、获取每周的显示列表
 * 2、搜索、标记日期状态
 */
function getWeekDateList(year, month, courseSet) {
    let week;
    // 如果是闰年，则2月有29天
    let monthDaysCountArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) {
        console.log(parseInt(year) % 4, "and ", parseInt(year) % 100);
        monthDaysCountArr[1] = 29;
    }

    //第几个月；下标从0开始，实际月份需要加1
    let dateList = [];
    dateList[0] = [];

    //第几个星期
    let weekIndex = 0;
    let firstDayOfWeek = new Date(Date.UTC(year, month - 1, 1)).getDay();
    let hasDoneFirstWeek = false;
    // console.log(firstDayOfWeek);
    let lastYear = month - 1 > 0 ? year : year - 1;
    let lastMonth = month - 1 > 0 ? month - 1 : 12;
    let nextYear = month + 1 === 13 ? year + 1 : year;
    let nextMonth = month + 1 === 13 ? 1 : month + 1;
    for (let idx = 0; idx < monthDaysCountArr[month - 1]; idx++) {
        week = new Date(Date.UTC(year, month - 1, idx + 1)).getDay();
        // 补齐每个月前面的日子，计算上个月的尾巴
        if (firstDayOfWeek === 0 && !hasDoneFirstWeek) {
            for (let idx = 0; idx < 7; idx++) {
                let date = monthDaysCountArr[lastMonth - 1] + idx - 6;
                dateList[weekIndex].push({
                    value: formatStringDate(lastYear, lastMonth, date),
                    date: date,
                    week: idx,
                    selected: false,
                    hasCourse: false,
                    courseIdArray: [],
                    courseIdString: '',
                    inThisMonth: false
                });
            }
            weekIndex++;
            dateList[weekIndex] = [];
            hasDoneFirstWeek = true;

        } else if (!hasDoneFirstWeek) {
            for (let blank = 0; blank < firstDayOfWeek; blank++) {
                let date = monthDaysCountArr[lastMonth - 1] + blank + 1 - firstDayOfWeek;
                dateList[weekIndex].push({
                    value: formatStringDate(lastYear, lastMonth, date),
                    date: date,
                    week: week + blank - firstDayOfWeek,
                    selected: false,
                    hasCourse: false,
                    courseIdArray: [],
                    courseIdString: '',
                    inThisMonth: false
                });
            }
            hasDoneFirstWeek = true;
        }

        // 每个月的日子
        dateList[weekIndex].push({
            value: formatStringDate(year, month, (idx + 1)),
            date: idx + 1,
            week: week,
            selected: false,
            hasCourse: false,
            courseIdArray: [],
            courseIdString: '',
            inThisMonth: true
        });


        if (week === 6) {
            weekIndex++;
            dateList[weekIndex] = [];
        }

        // 补齐每个月最后面的日子，计算下个月的头
        if (idx === monthDaysCountArr[month - 1] - 1) {
            let rest = 7 - dateList[weekIndex].length;
            for (let i = 0; i < rest; i++) {
                dateList[weekIndex].push({
                    value: formatStringDate(nextYear, nextMonth, (i + 1)),
                    date: i + 1,
                    week: week + i + 1 <= 6 ? week + i + 1 : i,
                    selected: false,
                    hasCourse: false,
                    courseIdArray: [],
                    courseIdString: '',
                    inThisMonth: false
                });
            }

            if (weekIndex !== 5) {
                weekIndex = 5;
                dateList[weekIndex] = [];
                for (let i = 0; i < 7; i++) {
                    dateList[weekIndex].push({
                        value: formatStringDate(nextYear, nextMonth, (rest + i + 1)),
                        date: rest + i + 1,
                        week: i,
                        selected: false,
                        hasCourse: false,
                        courseIdArray: [],
                        courseIdString: '',
                        inThisMonth: false
                    });
                }
            }
        }
    }

    // 准备有课程日期的标注数据
    // console.log(courseSet);
    let courseIdx = 0;
    for (let course of courseSet) {
        courseIdx++;
        for (let week = 0; week < dateList.length; week++) {
            for (let day = 0; day < dateList[week].length; day++) {
                // 先判断这天是否在周期内
                if (checkDate(course.startDate, dateList[week][day].value, course.endDate)) {

                    if (course.recurringRule.includes(transNumDate2EnDate(dateList[week][day].week))) {
                        // console.log(dateList[week][day].week, transNumDate2EnDate(dateList[week][day].week));
                        dateList[week][day].hasCourse = true;
                        dateList[week][day].courseIdArray.push(courseIdx);
                    }

                    dateList[week][day].courseIdString = dateList[week][day].courseIdArray.join("、");
                }
            }
        }
    }

    // 打印检验
    // console.log("log begins here~~~~~~~~~~~~~~~~~~~~~");
    // for (let week = 0; week < dateList.length; week++) {
    //     for (let day = 0; day < dateList[week].length; day++) {
    //         console.log("dateList[", week, "][", day, "], is: ", dateList[week][day].value
    //             , ", ", dateList[week][day].date
    //             , ", ", dateList[week][day].week
    //             , ", selected", dateList[week][day].selected
    //             , ", hasCourse", dateList[week][day].hasCourse
    //             , ", courseIdString", dateList[week][day].courseIdString.toString()
    //             , ", inThisMonth", dateList[week][day].inThisMonth);
    //     }
    // }

    return dateList;
}


module.exports = {
    formatNumber: formatNumber,
    formatTime: formatTime,
    transEnDate2ChLongDate: transEnDate2ChLongDate,
    transEnDate2ChShortDate: transEnDate2ChShortDate,
    transNumDate2ChLongDate: transNumDate2ChLongDate,
    transNumDate2ChShortDate: transNumDate2ChShortDate,
    formatTimeToString: formatTimeToString,
    formatDateToString: formatDateToString,
    getDateFromString: getDateFromString,
    formatStringDate: formatStringDate,
    dateDirection: dateDirection,
    datesDistance: datesDistance,
    getMovedDate: getMovedDate,
    checkDate: checkDate,
    getMonthDateList: getMonthDateList,
    getWeekDateList: getWeekDateList
};