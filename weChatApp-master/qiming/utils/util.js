
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function urlSafe(str) {
    return str.replace(/[+\/]/g, function (m0) {
        return m0 === '+' ? '-' : '_'
    })
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function showTips(msg) {
    var time = arguments[1] ? arguments[1] : 2000;
    wx.showToast({
        image:'/styles/info_icon.png',
        title: msg,
        duration: time
    });
}

function getDataRange() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    return [(year - 10) + "-" + month + "-" + day, year + "-" + month + "-" + day];
}

module.exports = {
    urlSafe: urlSafe,
    showTips: showTips,
    isEmptyObject: isEmptyObject,
    formatTime: formatTime,
    getDataRange: getDataRange
}
