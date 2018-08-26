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

const random = (min = 0, max = 1) => {
    return ~~(Math.random() * (max - 1 - min)) + min;

}

// 字母范围
const words = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';


/**
 * 生成包含 指定字符的26 个字母
 */
const randomKeyboard = (word) => {


    // const s = random(0, words.length / 2);
    // const str =  word + words.slice(s, s + words.length / 2-word.length);
    return words.slice(0, 26).split('').sort(() => {
        return Math.random() > 0.5
    }).join("");
}

module.exports = {
    formatTime,
    randomKeyboard,
    random
}
function request(url, data, cb) {
  　　wx.request({
           url: 'https://www.tongke.cn/xdf' + url,
    　　　　data: data,
    　　　　method: 'GET',
    　　　　header: { 'content-type': 'application/x-www-form-urlencoded' },
    　　　　success: function (res) {
      　　　　　　return typeof cb == "function" && cb(res)
    　　　　},
    　　　　fail: function () {
      　　　　return typeof cb == "function" && cb(false)
    　　　　}
  　　})
}
module.exports.request = request;