//app.js
import config from './utils/config';
import wxService from './utils/wxService';
import * as t from './utils/loginKey';
import REPORT_LOG from './enums/REPORT_LOG';
import lk from './utils/loginKey';

let shareObj = {};
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;

App({
	onLaunch: function (e) {
		//调用API从本地缓存中获取数据1
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		const me = this;
		// lk.queryLoginKey().then((k) => { debugger; console.log(k)})
		wx.setStorageSync('logs', logs);
	},
	onShow: function (e) {
	    setTimeout(function () {
	      	const scene = e.scene;
	      	shareObj.scene = scene;
	      	if (scene === 1044) {
	        	t.getGroupOpenGid(e.shareTicket).then(function (data) {
	          		shareObj.openGid = data;
	          		t.requestLog('mini_launch', scene.toString(), {
	            		openGid: data
	          		});
	        	});
	      	} else {
	        	if (e.referrerInfo) {
	          		shareObj.appId = e.referrerInfo.appId;
	          		t.requestLog('mini_launch', scene.toString(), {
	            		appId: e.referrerInfo.appId
	          		});
	        	} else {
	          	t.requestLog('mini_launch', scene ? scene.toString() : '');
	        }
	      }
	    }, 1000);
		wx.setStorageSync('SHARETICKET', e.shareTicket || '');
	},
	getUserInfo: function(cb) {
		var that = this;
		if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo);
		}
		else {
			//调用登录接口
			wx.login({
				success: function () {
					wx.getUserInfo({
						success: function (res) {
							that.globalData.userInfo = res.userInfo;
							typeof cb == "function" && cb(that.globalData.userInfo);
						}
					});
				}
			});
		}
	},
	globalData: {
		userInfo: null,
		shareObj,
		shareShow: null
	}
})
