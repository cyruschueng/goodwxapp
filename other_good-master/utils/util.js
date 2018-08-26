import _ from 'underscore';
import listener from 'listener';
import _Promise from 'bluebird';
import requestUtil from 'requestUtil';
import {
    duoguan_host_api_url as API_HOST,
    duoguan_user_info_post_url as API_USER_INFO_SAVE_URL,
} from "data";

/**
 * @param {Function} fun 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
 */
function Promise(fun, options) {
    options = options || {};
    return new _Promise((resolve, reject) => {
        if (typeof fun !== 'function') {
            reject();
        }
        options.success = resolve;
        options.fail = reject;
        fun(options);
    });
}

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

/**
 * 格式化日期
 */
function format(time, fmt) {
    time = time instanceof Date ? time : new Date(time);
    var o = {
        "M+": time.getMonth() + 1,                 //月份 
        "d+": time.getDate(),                    //日 
        "h+": time.getHours(),                   //小时 
        "m+": time.getMinutes(),                 //分 
        "s+": time.getSeconds(),                 //秒 
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
        "S": time.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 格式化日期 - （人性化）(附加时间)
 * @param {Number|Date} time
 * @return {string}
 */
function formatSmartTime(time) {
    time = time instanceof Date ? time.getTime() : time;
    var diffTime = new Date().getTime() - time + 20000;

    //今天凌晨时间戳
    const toDayTime = new Date().setHours(0, 0, 0);
    //昨天凌晨时间戳
    const yesterDayTime = toDayTime - 86400000;
    //明天凌晨时间戳
    const tomorrowTime = toDayTime + 86400000;
    //前天凌晨时间戳
    const beforeYesterdayTime = yesterDayTime - 86400000;
    //后天凌晨时间戳
    const afterTomorrowTime = tomorrowTime + 86400000;

    if (diffTime < 0) {
        diffTime = Math.abs(diffTime);
        //大于一分钟
        if (diffTime < 60000) return "一会儿";
        //大于一分钟小于一小时
        if (diffTime >= 60000 && diffTime < 3600000) return parseInt(diffTime / 60000) + "分钟后";
        //今天
        if (time < tomorrowTime) return "今天" + format(time, "hh:mm");
        //明天
        if (time < afterTomorrowTime) return "明天" + format(time, "hh:mm");
        //后天
        if (time < afterTomorrowTime + 86400000) return "后天" + format(time, "hh:mm");
    } else {
        //小于一分钟
        if (diffTime < 60000) return "刚刚";
        //大于一分钟小于一小时
        if (diffTime >= 60000 && diffTime < 3600000) return parseInt(diffTime / 60000) + "分钟前";
        //今天
        if (time > toDayTime) return "今天" + format(time, "hh:mm");
        //昨天
        if (time > yesterDayTime) return "昨天" + format(time, "hh:mm");
        //前天
        if (time > beforeYesterdayTime) return "前天" + format(time, "hh:mm");
    }
    //月份/日 大于今年开始时间
    const toYearTime = new Date();
    toYearTime.setMonth(0, 0);
    toYearTime.setHours(0, 0, 0, 0);
    const toYearTime2 = new Date(time);
    toYearTime2.setMonth(0, 0);
    toYearTime2.setHours(0, 0, 0, 0);
    if (toYearTime.getTime() == toYearTime2.getTime())
        return format(time, "M月d日 hh:mm");
    return format(time, "yyyy年M月d日 hh:mm");
}

/**
 * 调用支付界面
 * @param {string} payInfo
 * @param {callback} callback
 */
function payment(payInfo, callback) {
    console.log("must pay param:", { notify_url: "业务处理回调地址错误！", total_amount: "总金额" });
    const payKey = 'pay_' + new Date().getTime();
    const getPayInfoHandler = function () {
        listener.removeEventListener('pay.get_payinfo_' + payKey, getPayInfoHandler);

        //触发设置信息接口
        listener.fireEventListener('pay.payinfo_' + payKey, [payInfo]);
        console.log('pay.payinfo_' + payKey, "fireEvented");
        const getPaymentResultHandler = function (res) {
            listener.removeEventListener('pay.result_' + payKey, getPaymentResultHandler);
            if (callback) {
                setTimeout(function () {
                    callback.call(null, res);
                }, 500);
            }
        };
        listener.addEventListener('pay.result_' + payKey, getPaymentResultHandler);

    };
    listener.addEventListener('pay.get_payinfo_' + payKey, getPayInfoHandler);
    console.log("waiting set get_payinfo");

    wx.navigateTo({
        url: '/pages/user/mcard/pay?key=' + payKey,
        fail: function () {
            listener.removeEventListener('pay.get_payinfo_' + payKey, getPayInfoHandler);
            wx.showModal({
                content: '无法调用余额界面，请尝试关闭一些界面！',
                showCancel: false,
            });
        },
    });
}

/**
 * 获取用户信息
 * @param {Function} callback
 */
function getUserInfo(callback) {
    wx.getUserInfo({
        // lang: 'zh_CN',
        success: (res) => {
            console.log(res.userInfo);
            callback.call(null, res.userInfo);
        },
        fail: (res) => {
            console.error(res);
            const getUserInfo = function (info) {
                listener.removeEventListener('user.get_info', getUserInfo);
                if (info) callback.call(null, info);
            };
            listener.addEventListener('user.get_info', getUserInfo);
            wx.navigateTo({
                url: '/pages/user/tips-info/index',
            });
        }
    });
}

/**
 * 同步微信信息
 * @param {Function} callback 同步微信用户信息{成功}时调用
 */
function syncWechatInfo(callback) {
    //获取授权的用户信息
    getUserInfo((info) => {
        //保存用户信息
        requestUtil.post(API_USER_INFO_SAVE_URL, {
            nickname: info.nickName, headimgurl: info.avatarUrl, sex: info.gender,
            city: info.city, province: info.province,
            country: info.country, language: info.language,
        }, (data) => {
            wx.showToast({
                title: '同步成功！',
                icon: 'success',
                duration: 2000
            });
            callback && callback.call(null, data, info);
        });
    });
}

/**
 * 尝试同步微信信息
 * @param {Function} [callback] 同步或获取微信用户信息{成功}时调用
 */
function trySyncWechatInfo(callback) {
    //检查是否授权过
    wx.getSetting({
        success: (res) => {
            if (res.authSetting['scope.userInfo']) {
                if (callback) {
                    wx.getUserInfo({
                        success: () => {
                            callback.call(null, res.userInfo);
                        }
                    });
                }
                return;
            } else {
                //同步微信信息
                syncWechatInfo((userInfo, wechatUserInfo) => {
                    if (callback) callback.call(null, wechatUserInfo);
                });
            }
        }
    });
}

/**
 * 使用优惠券
 * @param {Object} options 配置参数
 * options={
 *  page:Page,
 *  onFilter:function(){},
 *  onSelect:function(){},
 *  params:{},
 *  coupon_id:Number,
 *  name:String,
 * }
 */
function useCoupon(options) {
    options = _.extend({
        onFilter: function () { },
        params: {},
        coupon_id: 0,
        name: "coupon",
    }, options);

    const info = options.page.data[options.name] || {};
    info.isShow = true;
    info.data = [];
    info.name = options.name;

    const saveData = {};
    saveData[options.name] = info;
    options.page.setData(saveData);

    var coupon = null;
    options.page["on" + options.name + "ComfirnTap"] = () => {
        const saveData = {};
        info.isShow = false;
        saveData[options.name] = info;
        options.page.setData(saveData);

        options.onSelect(coupon);
    };

    options.page["on" + options.name + "Change"] = (e) => {
        const value = e.detail.value;
        coupon = value == -1 ? null : info.data[value];
    };

    requestUtil.get(API_HOST + "/index.php?s=/addon/Card/CardApi/getMyCoupons.html", _.extend({ available: 1, _r: 100 }, options.params), (data) => {
        _(data).map((item) => {
            item.use_start_date = format(item.use_start_time * 1000, "yyyy-MM-dd");
            item.use_end_date = format(item.use_end_time * 1000, "yyyy-MM-dd");
            item.is_active = item.id == options.coupon_id;
            return item;
        });

        if (options.onFilter) {
            for (var i = 0; i < data.length; i++) {
                if (options.onFilter(data[i]) === false) {
                    data.splice(i, 1);
                    i--;
                }
            }
        }

        info.data = data;

        const saveData = {};
        saveData[options.name] = info;
        options.page.setData(saveData);
    });
}

/**
 * 领取优惠券
 * @param {Object} pageObj 当前页面实例
 * @param {String} name 配置名称
 * @param {Object} params 当前页面实例
 */
function goCoupon(pageObj, name, params) {
    name = name || "coupon";
    const info = pageObj.data[name] || {};

    info.isShow = true;
    info.data = [];
    info.name = name;

    const saveData = {};
    saveData[name] = info;
    pageObj.setData(saveData);

    pageObj["on" + name + "ComfirnTap"] = () => {
        const saveData = {};
        info.isShow = false;
        saveData[name] = info;
        pageObj.setData(saveData);
    };

    //去领取
    pageObj["on" + name + "Go"] = (e) => {
        const dataset = e.currentTarget.dataset, index = dataset.index;
        const coupon = info.data[index];

        //领取
        requestUtil.get(API_HOST + "/index.php?s=/addon/Card/CardApi/goCoupon.html", { id: coupon.id }, (data) => {
            wx.showToast({ title: '领取成功！', icon: 'success', });
        });
    };

    requestUtil.get(API_HOST + "/index.php?s=/addon/Card/CardApi/getCoupons.html", { available: 1, _r: 100 }, (data) => {
        _(data).map((item) => {
            item.go_start_time = format(item.go_start_time * 1000, "yyyy-MM-dd");
            item.go_end_time = format(item.go_end_time * 1000, "yyyy-MM-dd");
            item.style = item.type == 0 ? 'daijin' : 'zhekou';
            if (item.full_available > 0) item.style = 'manjian';
            return item;
        });

        info.data = data;

        const saveData = {};
        saveData[name] = info;
        pageObj.setData(saveData);
    });
}

/**
 * 随机安全获取qqmapsdk
 */
var QQMAP_KEY_LIST = [
    'YX2BZ-KIACS-NZRO4-6CXHO-EHZ3Z-OCB6U',
    'AGIBZ-ZVRK4-RFIUB-XLQ3X-UIXPF-K5FS7',
    'V7BBZ-WXT6J-PQMF4-FFQZB-NVDCH-LKFUY',
    'EWUBZ-BTZ33-GMW3I-3FYII-XIKM2-DXBAM',
    'YDUBZ-ZHGC5-D65I6-QKTDH-PBM6E-SGF2M',
];
/**
 * 安全获取MapSdk
 */
function getMapSdk() {
    const QQMapWX = require('qqmap-wx-jssdk.min.js');// 引入SDK核心类
    if (Math.floor(Math.random() * 3) === 2) {  //打乱数组
        QQMAP_KEY_LIST = _.shuffle(QQMAP_KEY_LIST);
    }
    var index = Math.floor(Math.random() * (QQMAP_KEY_LIST.length - 1));
    return new QQMapWX({ key: QQMAP_KEY_LIST[index] });// 实例化API核心类
}

module.exports = {
    format, formatTime, formatSmartTime,
    payment, getUserInfo, Promise,
    syncWechatInfo, trySyncWechatInfo,
    useCoupon, goCoupon,
    getMapSdk
}
