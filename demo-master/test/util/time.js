


if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        }
    }
}


var timeago = function(dateTimeStamp) {
    let timetamp = dateTimeStamp.replace(/\-/g, "/")
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let now = new Date().getTime()
    let diffValue = now - (parseInt(Date.parse(new Date(timetamp))))
    if (diffValue < 0) {
        // alert('结束日期不能小于开始日期！')
    }
    let date = new Date(timetamp)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    let H = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    //小于10的在前面补0
    if (M < 10) {
        M = '0' + M;
    }
    if (D < 10) {
        D = '0' + D;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    let result
    if (hourC >= 24) {
        result = M + '月' + D + '日'
    } else if (hourC >= 1 && hourC < 24) {
        result = parseInt(hourC) + '个小时前'
    } else if (minC >= 1 && hourC < 1) {
        result = parseInt(minC) + '分钟前'
    } else if (minC < 1) {
        result = '刚刚'
    }
    console.log(monthC, weekC, dayC, hourC, minC)
    return result
}


/* 格式化日期 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,  // 月份
        "d+": this.getDate(),		// 日
        "h+": this.getHours(),		// 小时
        "m+": this.getMinutes(),	// 分
        "s+": this.getSeconds(),	// 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


/**
 * 时间戳转化为日期（用于消息列表）
 * @return {string} 转化后的日期
 */
var transTime = (function () {
    var getDayPoint = function (time) {
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);
        time.setHours(0);
        var today = time.getTime();
        time.setMonth(1);
        time.setDate(1);
        var yearDay = time.getTime();
        return [today, yearDay];
    }
    return function (time) {
        var check = getDayPoint(new Date());
        if (time >= check[0]) {
            return dateFormat(time, "HH:mm")
        } else if (time < check[0] && time >= check[1]) {
            return dateFormat(time, "MM-dd HH:mm")
        } else {
            return dateFormat(time, "yyyy-MM-dd HH:mm")
        }
    }
})();
/**
 * 时间戳转化为日期(用于左边会话面板)
 * @return {string} 转化后的日期
 */
var transTime2 = (function () {
    var getDayPoint = function (time) {
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);
        time.setHours(0);
        var today = time.getTime();
        time.setMonth(1);
        time.setDate(1);
        var yearDay = time.getTime();
        return [today, yearDay];
    }
    return function (time) {
        var check = getDayPoint(new Date());
        if (time >= check[0]) {
            return dateFormat(time, "HH:mm")
        } else if (time >= check[0] - 60 * 1000 * 60 * 24) {
            return "昨天";
        } else if (time >= (check[0] - 2 * 60 * 1000 * 60 * 24)) {
            return "前天";
        } else if (time >= (check[0] - 7 * 60 * 1000 * 60 * 24)) {
            return "星期" + dateFormat(time, "w");
        } else if (time >= check[1]) {
            return dateFormat(time, "MM-dd")
        } else {
            return dateFormat(time, "yyyy-MM-dd")
        }
    }
})();


/**
 * 日期格式化
 * @return string
 */
var dateFormat = (function () {
    var _map = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g },
        _12cc = ['上午', '下午'],
        _12ec = ['A.M.', 'P.M.'],
        _week = ['日', '一', '二', '三', '四', '五', '六'],
        _cmon = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        _emon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var _fmtnmb = function (_number) {
        _number = parseInt(_number) || 0;
        return (_number < 10 ? '0' : '') + _number;
    };
    var _fmtclc = function (_hour) {
        return _hour < 12 ? 0 : 1;
    };
    return function (_time, _format, _12time) {
        if (!_time || !_format)
            return '';
        _time = new Date(_time);
        _map.yyyy = _time.getFullYear();
        _map.yy = ('' + _map.yyyy).substr(2);
        _map.M = _time.getMonth() + 1;
        _map.MM = _fmtnmb(_map.M);
        _map.eM = _emon[_map.M - 1];
        _map.cM = _cmon[_map.M - 1];
        _map.d = _time.getDate();
        _map.dd = _fmtnmb(_map.d);
        _map.H = _time.getHours();
        _map.HH = _fmtnmb(_map.H);
        _map.m = _time.getMinutes();
        _map.mm = _fmtnmb(_map.m);
        _map.s = _time.getSeconds();
        _map.ss = _fmtnmb(_map.s);
        _map.ms = _time.getMilliseconds();
        _map.w = _week[_time.getDay()];
        var _cc = _fmtclc(_map.H);
        _map.ct = _12cc[_cc];
        _map.et = _12ec[_cc];
        if (!!_12time) {
            _map.H = _map.H % 12;
        }
        return _$encode(_map, _format);
    };
})();



//计算时间差
function GetTimeDiff(startTime, resTime) {
    console.info(resTime);
    var time1 = startTime.replace(/-/g, "/");
    var date1 = new Date(time1); //开始时间;

    if (resTime != '') {
        var time2 = resTime.replace(/-/g, "/");
        var date2 = new Date(time2); //结束时间(回复时间)
    } else {
        var date2 = new Date();  //结束时间(当前时间)
    }
    var timeDi = date2.getTime() - date1.getTime();  //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(timeDi / (24 * 3600 * 1000));

    //计算出小时数
    var leave1 = timeDi % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (days > 0) {
        var dayStr = days + "天";
    } else {
        var dayStr = '';
    }
    var timeStr = dayStr + hours + "小时" + minutes + "分钟";
    return timeStr;
}


function compareTime(startTime, endTime) {
    var start = startTime.replace(/:/g, '');
    var end = endTime.replace(/:/g, '');
    if (parseInt(start) >= parseInt(end)) {
        return true
    }
    return false
}

function compareDate(startDate, endDate) {
    var start = startDate.replace(/-/g, '');
    var end = endDate.replace(/-/g, '');
    console.log(start);
    console.log(end);
    if (parseInt(start) > parseInt(end)) {
        return true
    }
    return false
}

function compareDateTime(startDateTime, endDateTime) {
    var start = startDateTime.replace(/-/g, "/");
    var end = endDateTime.replace(/-/g, "/");
    var time1 = new Date(start).getTime(); //开始时间;
    var time2 = new Date(end).getTime(); //结束时间;
    console.log(time1);
    console.log(time2);
    if (time1 - time2 > 0) {
        return true
    }
    return false
}



        console.log(formDate('tenWeekDate'));

        function formDate(date) {
            var setDate = '';
            var curDate = new Date();
            switch (date) {
                case 'pastDate': // 昨天
                    setDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
                    break;
                case 'fontDate': // 前天
                    setDate = new Date(curDate.getTime() - 24 * 2 * 60 * 60 * 1000);
                    break;
                case 'sevenDayDate': // 最近7天
                    setDate = new Date(curDate.getTime() - 24 * 7 * 60 * 60 * 1000);
                    break;
                case 'thirtyDayDate': // 最近30天
                    setDate = new Date(curDate.getTime() - 24 * 30 * 60 * 60 * 1000);
                    break;
                case 'sixtyDayDate': // 最近六个月
                    setDate = new Date(curDate.getTime() - 24 * 180 * 60 * 60 * 1000);
                    break;
                case 'tenWeekDate': // 最近10周
                    setDate = new Date(curDate.getTime() - 24 * 70 * 60 * 60 * 1000);
                    break;
                default: // 今天，curDate
                    setDate = curDate;
                    break;
            }

            var y = setDate.getFullYear();
            var m = setDate.getMonth() + 1;
            var d = setDate.getDate();

            var str = y + '' + (m < 10 ? ('0' + m) : m) + (d < 10 ? ('0' + d) : d) + '000000';

            return str;
        }


        /**
         *获取几个月前的输入日期
         *{param:DateTime} date 输入日期(YYYY-MM-DD)
         *{param:number } monthNum 月数
         */
        console.log('6各月之前',GetPreMonthDay('2018-01-03',9)); 
        function GetPreMonthDay(date, monthNum) {
            var dateArr = date.split('-');
            var year = dateArr[0]; //获取当前日期的年份
            var month = dateArr[1]; //获取当前日期的月份
            var day = dateArr[2]; //获取当前日期的日
            console.log(year,month,day);
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中月的天数

            var year2 = year;
            var month2 = parseInt(month) - monthNum;
            if (month2 <= 0) {
                year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : parseInt(month2) / 12);
                month2 = 12 - (Math.abs(month2) % 12);
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }
            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        }


              let setTime = Date.parse('2017-12-12 13:43:42'.replace(/-/gi, "/")) / 1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,

        date = new Date(setTime * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();

      //小于10的在前面补0
      if (M < 10) {
        M = '0' + M;
      }
      if (D < 10) {
        D = '0' + D;
      }
      if (H < 10) {
        H = '0' + H;
      }
      if (m < 10) {
        m = '0' + m;
      }
      if (s < 10) {
        s = '0' + s;
      }

      d = timeNow - setTime;

      d_days = parseInt(d / (60 * 60 * 24));
      d_hours = parseInt(d / (60 * 60));
      d_minutes = parseInt(d / 60);
      d_seconds = parseInt(d);

      var result;
      if (d_minutes <= 1) {
        result =  '刚刚';
      } else if (d_hours < 1 && d_minutes > 1) {
        result =  d_minutes + '分钟前';
      } else if (d_hours >= 1 && d_hours < 24) {
        result =  d_hours + '小时前'
      } else if (d_hours > 1 && d_hours < 24) {
        result =  M + '月' + D + '日';
      }
      return result;