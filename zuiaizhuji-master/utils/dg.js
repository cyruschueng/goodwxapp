import _ from './underscore.js';

let OSName = typeof (wx) === 'undefined' ? 'alipay' : 'wechat';
const IS_WEIXIN = OSName === "wechat";
const IS_ALIPAY = OSName === "alipay";

export default class core {

	/**
	 * 当前系统信息
	 * @type {{isWechat: (function(): boolean), isAlipay: (function(): boolean), name: (function(): string)}}
	 */
    static os = {
		/**
		 * 是否是微信小程序
		 * @return {boolean}
		 */
        isWechat() {
            return IS_WEIXIN;
        },

		/**
		 * 是否是支付宝小程序
		 * @return {boolean}
		 */
        isAlipay() {
            return IS_ALIPAY;
        },

		/**
		 * 当前操作系统名称
		 * @return {string}
		 */
        name() {
            return OSName;
        }
    };

	/**
	 * 基本请求器
	 * @param {Object} options
	 * @type {Function}
	 */
    static request = core.os.isWechat() ? wx.request : my.httpRequest;

	/**
	 * 上传文件
	 * @param {Object} options
	 * @type {Function}
	 */
    static uploadFile(options) {
        options.fileName = options.name;
        options.fileType = options.fileType || "image";
        return core.os.isWechat() ? wx.uploadFile(options) : my.uploadFile(options);
    };

	/**
	 * 下载文件
	 * @param {Object} options
	 * @type {Function}
	 */
    static downloadFile = core.os.isWechat() ? wx.downloadFile : my.downloadFile;

	/**
	 * 跳转新页面
	 * @param {Object} options
	 * @type {Function}
	 */
    static navigateTo = core.os.isWechat() ? wx.navigateTo : my.navigateTo;

	/**
	 * 替换当前页面
	 * @param {Object} options
	 * @type {Function}
	 */
    static redirectTo = core.os.isWechat() ? wx.redirectTo : my.redirectTo;

	/**
	 * 关闭当前页面
	 * @param {Object} options
	 * @type {Function}
	 */
    static navigateBack = core.os.isWechat() ? wx.navigateBack : my.navigateBack;

	/**
	 * 跳转switch页面
	 * @param {Object} options
	 * @type {Function}
	 */
    static switchTab = core.os.isWechat() ? wx.switchTab : my.switchTab;

	/**
	 * 获取系统信息
	 * @param {Object} options
	 * @type {Function}
	 */
    static getSystemInfo = core.os.isWechat() ? wx.getSystemInfo : my.getSystemInfo;

	/**
	 * 获取系统信息-同步
	 * @type {Function}
	 */
    static getSystemInfoSync = core.os.isWechat() ? wx.getSystemInfoSync : my.getSystemInfoSync;

	/**
	 * 授权登录
	 * @param {Object} options
	 * @type {Function}
	 */
    static authLogin = core.os.isWechat() ? wx.login : my.getAuthCode;

	/**
	 * 获取用户信息
	 * @param {Object} options
	 * @type {Function}
	 */
    static getUserInfo = core.os.isWechat() ? wx.getUserInfo : my.getAuthUserInfo;

	/**
	 * 获取用户地理位置信息
	 * @param {Object} options
	 * @type {Function}
	 */
    static getLocation = core.os.isWechat() ? wx.getLocation : my.getLocation;

	/**
	 * 打开地图选择位置
	 * @param {Object} options
	 * @type {Function}
	 */
    static chooseLocation = core.os.isWechat() ? wx.chooseLocation : my.chooseLocation || function () {
        console.warn("支付宝不支持地图位置选择");
    };

	/**
	 * 打开用户地理位置信息
	 * @param {Object} options
	 * @type {Function}
	 */
    static openLocation = core.os.isWechat() ? wx.openLocation : my.openLocation;

	/**
	 * 判断是否支持此api
	 * @type {Function}
	 */
    static canIUse = core.os.isWechat() ? wx.canIUse : my.canIUse;

	/**
	 * 拨打电话
	 * @param {Object} options
	 * @type {Function}
	 */
    static makePhoneCall = core.os.isWechat() ? wx.makePhoneCall : function (options) {
        my.makePhoneCall({ number: options.phoneNumber });
    };

	/**
	 * 显示分享按钮
	 * @type {Function}
	 */
    static showShareMenu = core.os.isWechat() ? wx.showShareMenu : my.showShareMenu || function () {
        console.warn("支付宝不支持显示分享按钮~");
    };

	/**
	 * 隐藏分享按钮
	 * @type {Function}
	 */
    static hideShareMenu = core.os.isWechat() ? wx.hideShareMenu : my.hideShareMenu || function () {
        console.warn("支付宝不支持隐藏分享按钮~");
    };

	/**
	 * 停止下拉刷新
	 * @type {Function}
	 */
    static stopPullDownRefresh = core.os.isWechat() ? wx.stopPullDownRefresh : my.stopPullDownRefresh;

	/**
	 * 将页面滚动到目标位置
	 * @param {Object} options
	 * @type {Function}
	 */
    static pageScrollTo = core.os.isWechat() ? wx.pageScrollTo : my.pageScrollTo;


	/** *******************************************
	 *  数据存取
	 * *******************************************/

	/**
	 * 获取本地存储数据
	 * @param {Object} options
	 * @type {Function}
	 */
    static getStorage = core.os.isWechat() ? wx.getStorage : my.getStorage;

	/**
	 * 获取本地存储数据-同步
	 * @param {string} name
	 * @type {Function}
	 * @return {any}
	 */
    static getStorageSync = core.os.isWechat() ? wx.getStorageSync : function (name) {
        return my.getStorageSync({ key: name }).data;
    };

	/**
	 * 保存本地存储库数据
	 * @param {Object} options
	 * @type {Function}
	 */
    static setStorage = core.os.isWechat() ? wx.setStorage : my.setStorage;

	/**
	 * 保存本地存储库数据-同步
	 * @param {string} name
	 * @param value
	 * @type {Function}
	 */
    static setStorageSync = core.os.isWechat() ? wx.setStorageSync : function (name, value) {
        my.setStorageSync({ key: name, data: value });
    };

	/**
	 * 删除缓存数据
	 * @param {Object} options
	 * @type {Function}
	 */
    static removeStorage = core.os.isWechat() ? wx.removeStorage : my.removeStorage;


	/**
	 * 删除缓存数据-同步
	 * @param {string} name
	 * @param value
	 * @type {Function}
	 */
    static removeStorageSync = core.os.isWechat() ? wx.removeStorageSync : function (name) {
        my.removeStorageSync({ key: name });
    };

	/**
	 * 清除本地数据缓存
	 * @param {Object} options
	 * @type {Function}
	 */
    static clearStorage = core.os.isWechat() ? wx.clearStorage : my.clearStorage;

	/**
	 * 清除本地数据缓存-同步
	 * @param {string} name
	 * @param value
	 * @type {Function}
	 */
    static clearStorageSync = core.os.isWechat() ? wx.clearStorageSync : my.clearStorageSync;

	/**
	 * 异步获取当前storage的相关信息
	 * @param {string} name
	 * @param value
	 * @type {Function}
	 */
    static getStorageInfo = core.os.isWechat() ? wx.getStorageInfo : my.getStorageInfo;

	/**
	 * 异步获取当前storage的相关信息-同步
	 * @param {string} name
	 * @param value
	 * @type {Function}
	 * @return {Object}
	 */
    static getStorageInfoSync = core.os.isWechat() ? wx.getStorageInfoSync : my.getStorageInfoSync;

	/** *******************************************
	 *  页面交互
	 * *******************************************/

	/**
	 * 警告框
	 * @param {string} content
	 * @param {Function} [callback]
	 * @param {string} [title]
	 */
    static alert(content, callback, title = '提示') {
        const options = _.extend({
            title: title,
            content: content,
            showCancel: false,
            success: callback
        });
        core.os.isWechat() ? wx.showModal(options) : my.alert(options);
    }

	/**
	 * 确认框
	 * @param {string} content
	 * @param {Function} [callback]
	 * @param {string} [title]
	 */
    static confirm(content, callback, title = '提示') {
        const options = _.extend({
            title: title,
            content: content,
            success: callback
        });
        core.os.isWechat() ? wx.showModal(options) : my.confirm(options);
    }

	/**
	 * 显示提示条
	 * @param {Object} options
	 */
    static showToast = function (options = {}) {
        options.content = options.title;
        core.os.isWechat() ? wx.showToast(options) : my.showToast(options);
    };

	/**
	 * 隐藏提示条
	 * @type {Function}
	 */
    static hideToast = core.os.isWechat() ? wx.hideToast : my.hideToast;

	/**
	 * 显示加载条
	 * @param {string} [content]
	 */
    static showLoading(content = '') {
        if (core.os.isWechat()) {
            if (wx.showLoading) {
                wx.showLoading({ title: content });
            } else {
                wx.showToast({ title: content, icon: 'loading', duration: 10000 });
            }
        } else {
            my.showLoading({ content: content });
        }
    }

	/**
	 * 隐藏加载条
	 * @type {Function}
	 */
    static hideLoading = core.os.isWechat() ? wx.hideLoading || wx.hideToast : my.hideLoading;

	/**
	 * 设置导航条标题
	 */
    static setNavigationBarTitle = core.os.isWechat() ? wx.setNavigationBarTitle : my.setNavigationBar;

	/**
	 * 设置导航条颜色
	 */
    static setNavigationBarColor = core.os.isWechat() ? wx.setNavigationBarColor : my.setNavigationBar;

	/**
	 * 显示导航栏loading
	 * @type {Function}
	 */
    static showNavigationBarLoading = core.os.isWechat() ? wx.showNavigationBarLoading : my.showNavigationBarLoading;

	/**
	 * 隐藏导航栏loading
	 * @type {Function}
	 */
    static hideNavigationBarLoading = core.os.isWechat() ? wx.hideNavigationBarLoading : my.hideNavigationBarLoading;

	/** *******************************************
	 *  多媒体
	 * *******************************************/

	/**
	 * 选择图片
	 * @param {Object} options
	 * @type {Function}
	 */
    static chooseImage = core.os.isWechat() ? wx.chooseImage : my.chooseImage;

	/**
	 * 预览图片
	 * @param {Object} options
	 * @type {Function}
	 */
    static previewImage = core.os.isWechat() ? wx.previewImage : my.previewImage;

	/**
	 * 保存图片
	 * @param {Object} options
	 * @type {Function}
	 */
    static saveImage = core.os.isWechat() ? wx.saveImage : my.saveImage;

	/**
	 * 获取图片信息
	 * @param {Object} options
	 * @type {Function}
	 */
    static getImageInfo = core.os.isWechat() ? wx.getImageInfo : my.getImageInfo || function () {
        console.warn("支付宝不支持 getImageInfo 方法");
    };

	/**
	 * 选择地址
	 * @param {Object} options
	 * @type {Function}
	 */
    static chooseAddress = core.os.isWechat() ? wx.chooseAddress : my.chooseAddress || function () {
        console.warn("支付宝不支持选择地址");
    };
}

if (typeof (module) !== 'undefined') module.exports = core;