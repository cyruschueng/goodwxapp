import config from './config.js';
import wxService from './wxService.js';
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n
}
const util = {
	formatTime: function (date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return [year, month, day].map( formatNumber ).join('/') + ' ' + [hour, minute, second].map( formatNumber ).join(':');
	},
	sendHabo: function (data) {
		wx.request({
            url: config.PATHS.HABO,
            method: 'GET',
            data: data,
            fail: function (err) {
                wx.showModal({
                    title: '提示',
                    content: err,
                });
            }
        });
	},
	/**
	 * 全角转半角
	 */
	toSBC: function (target) {
        var result = '';
        var len = target.length;
        for (var i = 0; i < len; i++) {
            var cCode = target.charCodeAt(i);
            // 全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
            // 处理空格
            // cCode = (cCode === 0x03000) ? 0x0020 : cCode;
            // cCode = (cCode === 0x0020) ? '' : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    },
    /**
     * 分享path
     */
    generateSharePath: function (skipUrl) {
        var path = '/pages/loading/index';
        if (skipUrl) {
            path += '?skipUrl=' + encodeURIComponent(skipUrl);
        }
        return path;
    },
    /**
     * 邀请好友分享公用参数
     */
    inviteFriendShareObj: function () {
        var randomNum = Math.floor(Math.random() * 4);
        var profile = wx.getStorageSync('PROFILE');
        var pkServer = wx.getStorageSync('PK_SERVER');
        if (!pkServer) {
            wx.showModal({
                content: '获取服务器地址有误，请重新打开',
                showCancel: false,
                success: () => {
                    wx.navigateBack();
                }
            });
        }
        var title = profile.nickName + config.INVITE_TEXT_ARR[randomNum];
        var userId = profile.userId;
        var skipUrl = '/packagePK/pk/index?rateType=invite&userId=' + userId + '&pkServer=' + encodeURIComponent(pkServer);
        var path = util.generateSharePath(skipUrl);
        var imgArray = config.SHARE_IMGS.concat(['https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c65f97195.png']);
        var imageUrl = util.getShareImgUrl(imgArray);
        return {
            title: title,
            path: path,
            imageUrl: imageUrl
        }
    },
    /**
     * 获取分享图片url
     */
    getShareImgUrl: function (imgArray) {
        var imgArray = imgArray || config.SHARE_IMGS.concat(['https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c65f02d4d.png']);
        var randomNum = Math.floor(Math.random() * 6);
        return imgArray[randomNum];
    },
    /**
     * 获取奖励信息 shareType 分享类型 pk,friendPK,groupRank
     */
    getShareMoney: function (shareType, cxt) {
        wxService({
            url: serverHost + PATHS.SHARE_MONEY,
            data: {
                shareType
            },
            success: function (backendData) {
                var shareMoney = backendData;
                var extraShareInfo = '';
                if (shareMoney) {
                    extraShareInfo = '分享到微信群，可获得' + shareMoney + '两银子';
                }
                cxt.setData({
                    shareMoney: shareMoney,
                    extraShareInfo: extraShareInfo
                });
            }
        });
    },
    /**
     * 分享奖励
     */
    getShareAward: function (shareType, callback) {
        wxService({
            url: serverHost + PATHS.SHARE,
            data: {
                shareType
            },
            success: function (backendData) {
                var curShareMoney = backendData.shareMoney;
                var totalMoney = backendData.totalMoney;
                if (curShareMoney) {
                    wx.showModal({
                        title: '分享奖励',
                        content: '银子奖励 ＋' + curShareMoney + '兩',
                        showCancel: false
                    });
                    if (callback && typeof callback === 'function') {
                        callback(totalMoney);
                    }
                }
            }
        });
    },
    /**
     * 播放背景音乐
     */
    bgMusicManager: (function () {
        // const bgManager = wx.getBackgroundAudioManager();
        var play = function (url) {
            // bgManager.src = url;
            // bgManager.title = 'BGM';
            // bgManager.play();
            wx.playBackgroundAudio({
                dataUrl: url,
                title: 'BGM'
            });
        };
        var stop = function () {
            // bgManager.stop();
            wx.stopBackgroundAudio();
        };
        return {
            play: play,
            stop: stop
        }
    })(),
    /**
     * 播放音乐
     */
    audioManager: (function () {
        const innerAudioContext = wx.createInnerAudioContext();
        var play = function (url) {
            innerAudioContext.src = url;
            innerAudioContext.play();
        };
        var stop = function () {
            innerAudioContext.stop();
        };
        return {
            play: play,
            stop: stop
        }
    })(),
    //根据机型判断使用那种链接
    getBgMusics: (function () {
        var sysInfo = wx.getSystemInfoSync();
        var bgMusics = config.TENCENT_BG_MUSICS;
        if (sysInfo.model.indexOf('iPhone') > -1) {
            bgMusics = config.OSS_BG_MUSICS;
        }
        return bgMusics;
    })(),
    /**
     * 判断是否是安卓
    */
    isAndroid: function () {
        var flag = true;
        var sysInfo = wx.getSystemInfoSync();
        if (sysInfo.model.indexOf('iPhone') > -1) {
            flag = false;
        }
        return flag;
    },
    /**
     * 判断是否是htc
    */
    isHTC: function () {
        var flag = false;
        var sysInfo = wx.getSystemInfoSync();
        if (sysInfo.model.indexOf('HTC') > -1) {
            flag = true;
        }
        return flag;
    },

};

export default util;
