import './utils/wx-pro'
App({
	onLaunch(res) {
		wx.login({
			success: function (res) {
				if (res.code) {
					wx.getSetting({
						success(res) {
							console.log(res);
							if (!res.authSetting['scope.userInfo']) {
								console.log("去询问")
								wx.authorize({
									scope: 'scope.userInfo',
									success() {
										console.log('454545')
										// 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
										wx.getUserInfo({
											success(res1) {
												console.log('res1', res1)
											},
											fail() {
												console.log('fale')
											}
										})
									},
									fail() {
										console.log("fail")
										wx.openSetting({
											success() {
												console.log("openSetting success")
											}
										})
									},
									complete() {
										console.log("complete")
									}
								})
							} else {
								wx.getUserInfo({
									success(res1) {
										console.log('res1', res1)
									},
									fail() {
										console.log('fale')
									}
								})
							}
						}
					})
					//发起网络请求
					console.log('res', res);
					// wx.getUserInfo({
					// 	success(res1) {
					// 		console.log('res1', res1)
					// 	},
					// 	fail() {
					// 		console.log('fale')
					// 	}
					// })
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		});
	},
	// getUserInfo(cb) {
	// 	if (this.globalData.userInfo) {
	// 		typeof cb === 'function' && cb(this.globalData.userInfo);
	// 	} else {
	// 		// 调用登录接口
	// 		wx.login({
	// 			success: () => {
	// 				wx.getUserInfo({
	// 					success: (res) => {
	// 						console.log(23, res.userInfo)
	// 						this.globalData.userInfo = res.userInfo;
	// 						typeof cb === 'function' && cb(this.globalData.userInfo);
	// 					}
	// 				});
	// 			}
	// 		});
	// 	}
	// },
	globalData: {
		userInfo: null,
	},
});
