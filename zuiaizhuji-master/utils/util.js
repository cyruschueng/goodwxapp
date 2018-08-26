import _ from './underscore.js';
import _Promise from './bluebird.js';
import QQMapWX from './qqmap-wx-jssdk.min.js'; // 引入SDK核心类
import core from './dg';
import listener from './listener';
import requestUtil from './requestUtil';
import { duoguan_host_api_url as API_HOST, duoguan_user_info_post_url as API_USER_INFO_SAVE_URL, } from "./data";

/**
 * 格式化数字
 * @param {String} n
 * @return {string}
 */
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
}

export default class util {

	/**
	 * @param {Function} fun 接口
	 * @param {Object} options 接口参数
	 * @returns {Promise} Promise对象
	 */
    static Promise(fun, options) {
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

	/**
	 * 格式化日期
	 * @param {Date,Number} date
	 * @return {string}
	 */
    static formatTime(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }

	/**
	 * 格式化日期
	 * @param {Number} time
	 * @param {String} fmt
	 * @return {String}
	 */
    static format(time, fmt) {
        time = time instanceof Date ? time : new Date(time);
        const o = {
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
        for (const k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

	/**
	 * 格式化日期 - （人性化）(附加时间)
	 * @param {Number,Date} time
	 * @return {string}
	 */
    static formatSmartTime(time) {
        time = time instanceof Date ? time.getTime() : time;
        let diffTime = new Date().getTime() - time + 20000;

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
            if (diffTime >= 60000 && diffTime < 3600000) return Math.floor(diffTime / 60000) + "分钟后";
            //今天
            if (time < tomorrowTime) return "今天" + util.format(time, "hh:mm");
            //明天
            if (time < afterTomorrowTime) return "明天" + util.format(time, "hh:mm");
            //后天
            if (time < afterTomorrowTime + 86400000) return "后天" + util.format(time, "hh:mm");
        } else {
            //小于一分钟
            if (diffTime < 60000) return "刚刚";
            //大于一分钟小于一小时
            if (diffTime >= 60000 && diffTime < 3600000) return Math.floor(diffTime / 60000) + "分钟前";
            //今天
            if (time > toDayTime) return "今天" + util.format(time, "hh:mm");
            //昨天
            if (time > yesterDayTime) return "昨天" + util.format(time, "hh:mm");
            //前天
            if (time > beforeYesterdayTime) return "前天" + util.format(time, "hh:mm");
        }
        //月份/日 大于今年开始时间
        const toYearTime = new Date();
        toYearTime.setMonth(0, 0);
        toYearTime.setHours(0, 0, 0, 0);
        const toYearTime2 = new Date(time);
        toYearTime2.setMonth(0, 0);
        toYearTime2.setHours(0, 0, 0, 0);
        if (toYearTime.getTime() === toYearTime2.getTime())
            return util.format(time, "M月d日 hh:mm");
        return util.format(time, "yyyy年M月d日 hh:mm");
    }

	/**
	 * 格式化数字
	 * @param {Number} callback
	 */
    static formatSmartNumber(num) {
        const suffixs = ['万', '亿', '兆'];
        let suffix = '';
        if (num >= 10000) {
            for (let i = 0; i < suffixs.length; i++) {
                suffix = suffixs[i];
                num /= 10000;
                if (num < 10000) break;
            }
        }
        return util.formatFloat(num) + suffix;
    }

	/**
	 * 格式化浮点数
	 * @param {Number} callback
	 */
    static formatFloat(num, dotNum) {
        dotNum = dotNum || 2;
        if ("string" !== typeof num) num += "";

        let index = num.lastIndexOf('.');
        if (index !== -1) {
            return num.substring(0, index + dotNum + 1);
        } else {
            return num;
        }
    }

	/**
	 * 获取用户信息
	 * @param {Function} callback
	 */
    static getUserInfo(callback) {
        core.getUserInfo({
            // lang: 'zh_CN',
            success: (res) => {
                callback.call(null, core.os.isWechat() ? res.userInfo : res);
            },
            fail: (res) => {
                console.error(res);
                if (core.os.isWechat()) {
                    const getUserInfo = function (info) {
                        listener.removeEventListener('user.get_info', getUserInfo);
                        if (info) callback.call(null, info);
                    };
                    listener.addEventListener('user.get_info', getUserInfo);
                    core.navigateTo({
                        url: '/pages/user/tips-info/index',
                    });
                }
            }
        });
    }

	/**
	 * 同步当前用户信息
	 * @param {Function} callback 同步微信用户信息{成功}时调用
	 */
    static syncUserInfo(callback) {
        util.getUserInfo((info) => {
            requestUtil.post(API_USER_INFO_SAVE_URL, {
                nickname: info.nickName,
                headimgurl: info.avatarUrl || info.avatar,
                sex: info.gender,
                city: info.city, province: info.province,
                country: info.country, language: info.language,
            }, (data) => {
                callback && callback.call(null, data, info);
            });
        });
    }

	/**
	 * 兼容老版本
	 * @type {util.syncUserInfo}
	 */
    static syncWechatInfo = util.syncUserInfo;

	/**
	 * 尝试同步当前用户信息
	 * @param {Function} [callback] 同步或获取微信用户信息{成功}时调用
	 */
    static trySyncUserInfo(callback) {
        if (core.os.isWechat()) {
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        if (callback) {
                            wx.getUserInfo({
                                success: (res) => callback.call(null, res.userInfo)
                            });
                        }
                    } else {
                        util.syncUserInfo((userInfo, osUserInfo) => {
                            if (callback) callback.call(null, osUserInfo);
                        });
                    }
                }
            });
        } else {
            if (!core.getStorageSync('is_sync_userinfo')) {
                util.syncUserInfo((userInfo, osUserInfo) => {
                    core.setStorageSync('is_sync_userinfo');
                    if (callback) callback.call(null, osUserInfo);
                });
            } else {
                if (callback) callback.call(null, osUserInfo);
            }
        }
    }

	/**
	 * 兼容老版本
	 * @type {util.trySyncUserInfo}
	 */
    static trySyncWechatInfo = util.trySyncUserInfo;


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
    static useCoupon(options) {
        options = _.extend({
            onFilter: function () {
            },
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

        let coupon = null;
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

        requestUtil.get(API_HOST + "/index.php?s=/addon/Card/CardApi/getMyCoupons.html", _.extend({
            available: 1,
            _r: 100
        }, options.params), (data) => {
            _(data).map((item) => {
                item.use_start_date = util.format(item.use_start_time * 1000, "yyyy-MM-dd");
                item.use_end_date = util.format(item.use_end_time * 1000, "yyyy-MM-dd");
                item.is_active = item.id == options.coupon_id;
                return item;
            });

            if (options.onFilter) {
                for (let i = 0; i < data.length; i++) {
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
    static goCoupon(pageObj, name, params) {
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
            requestUtil.get(API_HOST + "/index.php?s=/addon/Card/CardApi/goCoupon.html", _.extend({ id: coupon.id }, params), (data) => {
                core.showToast({ title: '领取成功！', icon: 'success', });
            });
        };

        requestUtil.get(API_HOST + "/index.php?s=/addon/Card/CardApi/getCoupons.html", {
            available: 1,
            _r: 100
        }, (data) => {
            _(data).map((item) => {
                item.go_start_time = util.format(item.go_start_time * 1000, "yyyy-MM-dd");
                item.go_end_time = util.format(item.go_end_time * 1000, "yyyy-MM-dd");
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
	 * 调用支付界面
	 * @param {string} payInfo
	 * @param {callback} callback
	 */
    static payment(payInfo, callback) {
        console.log("must pay param:", { notify_url: "业务处理回调地址错误！", total_amount: "总金额" });
        const payKey = 'pay_' + new Date().getTime();
        const getPayInfoHandler = () => {
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

        core.navigateTo({
            url: '/pages/user/mcard/pay?key=' + payKey,
            fail: function () {
                listener.removeEventListener('pay.get_payinfo_' + payKey, getPayInfoHandler);
                core.alert('无法调用余额界面，请尝试关闭一些界面！');
            },
        });
    }

	/**
	 * 随机安全获取qqmapsdk
	 */
    static qqMapKeys = [
        'YX2BZ-KIACS-NZRO4-6CXHO-EHZ3Z-OCB6U',
        'AGIBZ-ZVRK4-RFIUB-XLQ3X-UIXPF-K5FS7',
        'V7BBZ-WXT6J-PQMF4-FFQZB-NVDCH-LKFUY',
        'EWUBZ-BTZ33-GMW3I-3FYII-XIKM2-DXBAM',
        'YDUBZ-ZHGC5-D65I6-QKTDH-PBM6E-SGF2M',
    ];

	/**
	 * 安全获取MapSdk
	 */
    static getMapSdk() {
        let primaryKey = '2X5BZ-MNHKP-UC2D5-VJQZM-7NNXV-VIB6G',
            key = '';
        if (Math.floor(Math.random() * 3) === 2) {
            if (Math.floor(Math.random() * 3) === 2) {  //打乱数组
                util.qqMapKeys = _.shuffle(util.qqMapKeys);
            }
            const index = Math.floor(Math.random() * (util.qqMapKeys.length - 1));
            key = util.qqMapKeys[index];
        } else {
            key = primaryKey;
        }

        return new QQMapWX({ key: key });// 实例化API核心类
    }

    /**
     * 选择平台内部用户地址
     */
    static chooseAddress(callback) {
        if (callback) {
            core.navigateTo({ url: '/pages/user/address/index?isCallback=1' });
            listener.addEventListener('address.choose.confirm', (res) => {
                callback.call(null, res);
            });
        } else {
            console.log('undefined chooseAddress callback function');
        }
    }

    /**
     * 获取平台内部的用户的默认地址
     */
    static getDefaultAddress(callback) {
        if (callback) {
            let request = requestUtil;
            let baseUrl = API_HOST + "/index.php/addon/DuoguanUser";

            let requestUrl = baseUrl + '/AddressApi/getDefaultAddress';
            let requestUrlData = {};
            request.get(requestUrl, requestUrlData, (info) => {
                callback.call(null, info);
            }, this, {
                    isShowLoading: false,
                });
        } else {
            console.log('undefined get_default_address callback function');
        }
    }

};

if (typeof (module) !== 'undefined') module.exports = util;