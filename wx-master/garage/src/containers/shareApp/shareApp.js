//logs.js
var util = require('../../../utils/util.js')
Page({
	data: {

	},
	onLoad: function(options) {
		var app = getApp(),
			appId = "",
			envVersion = app.globalData.appInfo.envVersion;
		if(envVersion == "release" || envVersion == "trial") {
			appId = app.globalData.appInfo.prdCustomerAppid;
		} else if(envVersion == "develop") {
			appId = app.globalData.appInfo.stgCustomerAppid;
		}

		var that = this;
		var id = options.id;
		wx.navigateToMiniProgram({
			appId: appId,
			path: 'src/containers/orderDetail/orderDetail?id=' + id,
			extraData: {
				foo: 'bar'
			},
			envVersion: envVersion,
			success(res) {
				// 打开成功
			}
		})
	}
})