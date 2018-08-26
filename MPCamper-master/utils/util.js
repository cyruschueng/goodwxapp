
const formatTime = date => {
        if (!date) {
                date = new Date();
        }
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
}

function formatDistance(distance) {
        distance = +distance;
        return distance < 1000 ? Math.round(distance) + 'm' : (distance / 1000).toFixed(1) + 'km';
}
function isPhoneNumber(num) {
        return /^1[34578]\d{9}$/.test(num);
}

//字符串分割成字符串数组
function spiltStr(str) {
        var ret = [];
        var splits = str.split(',');
        for (let i = 0; i < splits.length; i++) {
                ret.push(splits[i]);
        }
        return ret;
}

//url的查询参数解析成对象
function getQueryObject(url) {
        url = url == null ? window.location.href : url;
        var search = url.substring(url.lastIndexOf("?") + 1);
        var obj = {};
        var reg = /([^?&=]+)=([^?&=]*)/g;
        // [^?&=]+表示：除了？、&、=之外的一到多个字符
        // [^?&=]*表示：除了？、&、=之外的0到多个字符（任意多个）
        search.replace(reg, function (rs, $1, $2) {
                var name = decodeURIComponent($1);
                var val = decodeURIComponent($2);
                val = String(val);
                obj[name] = val;
                return rs;

        });
        return obj;
}

function getQueryStringArgs(url) {
        url = url == null ? window.location.href : url;
        var qs = url.substring(url.lastIndexOf("?") + 1);
        var args = {};
        var items = qs.length > 0 ? qs.split('&') : [];
        var item = null;
        var name = null;
        var value = null;
        for (var i = 0; i < items.length; i++) {
                item = items[i].split("=");
                //用decodeURIComponent()分别解码name 和value（因为查询字符串应该是被编码过的）。
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                if (name.length) {
                        args[name] = value;
                }
        }
        return args;
}


//计算两个时间的相差天数
//sDate1和sDate2是yyyy-month-day格式  
function dateDifference(sDate1, sDate2) {
        var dateSpan, tempDate, iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        // dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
}
//判断是否为空
function isEmpty(value) {
        if (value == undefined || value == 'undefined' ||value == null || value == '' || value == 'null' || value == '[]' || value == '{}') {
                return true
        }
        return false
}

module.exports = {
        formatTime: formatTime,
        isPhoneNumber: isPhoneNumber,
        formatDistance: isPhoneNumber,
        spiltStr: spiltStr,
        dateDifference: dateDifference,
        isEmpty: isEmpty,
        getQueryObject:getQueryObject
}
