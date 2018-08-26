

var ccFile = require('../../../utils/calendar-converter.js')
var calendarConverter = new ccFile.CalendarConverter();
var app = getApp();

//月份天数表
var DAY_OF_MONTH = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

//判断当前年是否闰年
var isLeapYear = function(year){
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
        return 1
    else
        return 0
};

//获取当月有多少天
var getDayCount = function(year, month){
    return DAY_OF_MONTH[isLeapYear(year)][month];
};

//获取当前索引下是几号
var getDay = function(index) {
    return index - curDayOffset;
};

//获取两个时间戳之间间隔的天数
var getOffDays = function(startDate, endDate) {  
    //得到时间戳相减 得到以毫秒为单位的差  
    var mmSec = (endDate.getTime() - startDate.getTime());
    //单位转换为天并返回 
    return (mmSec / 3600000 / 24); 
};  

var pageData = {
    dateData: {
        date: "",                //当前日期字符串
        arrIsShow: [],           //是否显示此日期
        arrDays: [],             //关于几号的信息
        arrInfoEx: [],           //农历节假日等扩展信息
        arrInfoExShow: [],       //处理后用于显示的扩展信息
    },

    //选择一天时显示的信息
    detailData: {
        curDay: "",         //detail中显示的日信息
        curInfo1: "",
        curInfo2: "",
    }
}

//获取此月第一天相对视图显示的偏移
var getOffset = function()
{
    var offset = new Date(curYear, curMonth, 1).getDay();
    offset = offset == 0 ? 6 : offset - 1; //注意这个转换，Date对象的getDay函数返回返回值是 0（周日） 到 6（周六） 
    return offset;
}

//设置当前详细信息的索引，前台的详细信息会被更新
var refreshDetailData = function(index){
    var curEx = pageData.dateData.arrInfoEx[index];
    if (!curEx)
        return;
    curDay = curEx.sDay;
    pageData.detailData.curDay = curEx.sDay;
    pageData.detailData.curInfo1 = "农历" + curEx.lunarMonth + "月" + curEx.lunarDay + " " + curEx.lunarFestival;
    pageData.detailData.curInfo2 = curEx.cYear+curEx.lunarYear + "年 " + curEx.cMonth + "月 " + curEx.cDay + "日";
}
//刷新全部数据
var refreshPageData = function(year, month, day){
    curMonth = month;
    curYear = year;
    curDay = day;

    pageData.dateData.date = curYear + '年'+ (curMonth + 1) + '月';

    var offset = getOffset();
    var offset2 = getDayCount(curYear, curMonth) + offset;
    for (var i = 0; i < 42; ++i)
    {
        pageData.dateData.arrIsShow[i] = i < offset || i >= offset2 ? false : true;
        if (!pageData.dateData.arrIsShow[i])
            continue;
        pageData.dateData.arrDays[i] = i - offset + 1;
        var d = new Date(year, month, i - offset + 1);
        var dEx = calendarConverter.solar2lunar(d);
        pageData.dateData.arrInfoEx[i] = dEx;
        if ("" != dEx.lunarFestival)
        {
            pageData.dateData.arrInfoExShow[i] = dEx.lunarFestival;
        }
        else if ("初一" === dEx.lunarDay)
        {
            pageData.dateData.arrInfoExShow[i] = dEx.lunarMonth + "月";
        }
        else
        {
            pageData.dateData.arrInfoExShow[i] = dEx.lunarDay;
        }
    }

    refreshDetailData(offset + day - 1);
    
};



var curDate = new Date();
var curMonth = curDate.getMonth();
var curYear = curDate.getFullYear();
var curDay = curDate.getDate();
refreshPageData(curYear, curMonth, curDay);

Page({
    data: pageData,
    onLoad: function() {
    },
    onShow: function() {
    },

    goToday: function(e){
        curDate = new Date();
        curMonth = curDate.getMonth();
        curYear = curDate.getFullYear();
        curDay = curDate.getDate();
        refreshPageData(curYear, curMonth, curDay);
        this.setData({
            dateData: pageData.dateData,
            detailData: pageData.detailData
        })
    },

    goLastMonth: function(e){
        if (0 == curMonth)
        {
            curMonth = 11;
            --curYear
        }
        else
        {
            --curMonth;
        }
        refreshPageData(curYear, curMonth, 1);
        this.setData({
            dateData: pageData.dateData,
            detailData: pageData.detailData,
        })
    },

    goNextMonth: function(e){
        if (11 == curMonth)
        {
            curMonth = 0;
            ++curYear
        }
        else
        {
            ++curMonth;
        }
        refreshPageData(curYear, curMonth, 1);
        this.setData({
            dateData: pageData.dateData,
            detailData: pageData.detailData
        })
    },
    //选中
    selectDay: function(e){
        refreshDetailData(e.currentTarget.dataset.dayIndex);
        this.setData({
            detailData: pageData.detailData,
        })
    },
    // 跳转日历
    bindDateChange: function(e){
        var arr = e.detail.value.split("-");
        refreshPageData(+arr[0], arr[1]-1, +arr[2]);
        this.setData({
            dateData: pageData.dateData,
            detailData: pageData.detailData
        })
    },

    onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '【日历查询】', // 分享标题
      desc: '', // 分享描述
      path: '/pages/tool/date/date' // 分享路径
    }
  }

});