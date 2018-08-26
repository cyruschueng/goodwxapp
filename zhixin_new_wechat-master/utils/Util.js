/**
 * 工具类包，提供以下功能：
 * 1、日期之间的转换，日期和字符串的转换
 *
 */
const _ = require('./underscore.modified');

/**
 * 格式化输出数字，固定位数
 * @param n，位数
 */
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude);
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2);
    latitude = latitude.toFixed(2);

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

/**
 * 深度克隆
 * @param obj
 * @returns {*}
 */
function deepClone(obj) {


    let clone = obj.constructor === Array ? [] : {};

    // 递归
    for (let item in obj) {
        if (obj.hasOwnProperty(item) && obj[item]) {
            clone[item] = typeof obj[item] === "object" ? deepClone(obj[item]) : obj[item];
        }
    }

    return clone;
}

function isEqual(a, b) {
    return _.isEqual(a, b);
}

function showModal(title, content) {
    wx.showModal({
        title: title,
        content: content,
    });
}

/**
 * 删除数据中的空值（字符串，空数组，空对象），以方便put方法的使用
 * @param obj
 */
function removeNoValueItems(obj) {
    let copy = deepClone(obj);
    console.log("copy:", copy);

    console.log("null:", typeof null);
    for (let item in copy) {
        // 先要判断是否为null
        if (isEmptyObject(copy[item])) {
            console.log("empty obj, delete:", item);
            delete copy[item];
        }
    }
    return copy;
}

/**
 * 判断一个对象是否为空
 * @param obj
 * @returns {boolean}
 */
function isEmptyObject(obj) {
    if (typeof obj === "number") {
        return false;
    } else if (typeof obj === "string") {
        return obj === "";
    } else if (typeof obj === "object") {
        for (let key in obj) {
            return false;//返回false，不为空对象
        }
    }

    return true;//返回true，为空对象
}

module.exports = {
    formatLocation: formatLocation,
    formatNumber: formatNumber,
    deepClone: deepClone,
    isEqual: isEqual,
    showModal: showModal,
    removeNoValueItems: removeNoValueItems
};
