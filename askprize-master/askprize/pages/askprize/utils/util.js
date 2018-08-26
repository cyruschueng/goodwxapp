const formatTime = date => {
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

// 当前时间倒计时
const downTimer = (timestamp, now) => {
    if (!now) {
        now = Date.parse(new Date()) / 1000;
    }

    if (timestamp.toString().length > 10) {
        timestamp = Date.parse(new Date(timestamp)) / 1000;
    } else {
        timestamp = Math.floor(timestamp);
    }
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var ntime = Math.floor(timestamp - now);
    if (ntime > 0) {
        day = Math.floor(ntime / 86400);
        hour = Math.floor(ntime % 86400 % 86400 / 3600);
        minute = Math.floor(ntime % 86400 % 3600 / 60);
        second = Math.floor(ntime % 86400 % 3600 % 60);
    }
    //   return { day: day, hour: hour, minute: minute, second: second, ntime: ntime};
    if (ntime >= 11) {
        return { day: day, hour: hour < 10 ? '0' + hour : '' + hour, minute: minute < 10 ? '0' + minute : '' + minute, second: second < 10 ? '0' + second : '' + second, ntime: ntime };
    } else {
        return { day: day, hour: hour, minute: minute, second: second, ntime: ntime };
    }

}


module.exports = {
    formatTime: formatTime,
    downTimer: downTimer
}
