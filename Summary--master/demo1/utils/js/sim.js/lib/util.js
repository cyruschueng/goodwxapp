function SimpleJssdk() {
    this.formatDate = function (d, fmt) { //author: meizz
        var o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            "S": d.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    this.delHtmlTag = function (str) {
        str = str.replace(/(<br>)/g, "\n");
        str = str.replace(/(<\/p>)/g, "\n");
        return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
    };
}
let util = new SimpleJssdk();

module.exports = {
    formatDate: util.formatDate,
    delHtmlTag: util.delHtmlTag,
}