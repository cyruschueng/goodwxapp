//app.js
App({
	data: {
		deviceInfo: {},
	},
	globalData: {
		nickName: '',
		avatarUrl: '',
		gender: 0,
		id: 0,
		publicPath: 'https://account.hustonline.net',
		accountbookId: 0,
		users: [],
	},
	onLaunch: function () {
		let logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
	},
	//用户登录
	login: function (callback) {
		let that = this;
		wx.login({
			success: res => {
				if(res.code) {
					console.log(res.code);
					that.getUserInfo(res.code, callback);
				} else {
					console.log('no code');
					wx.showModal({
						title: "提示",
						content: '获取用户登录态失败!' + res.errMsg,
						content: '您点击了拒绝授权, 将无法正常显示个人信息, 点击确定重新获权。',
					})
				}
			}
		});
		wx.showLoading({
			title: 'loading...'
		});
	},
	//获取用户
	getUserInfo: function (code, callback) {
		let that = this;
		wx.getUserInfo({
			withCredentials: true,
			success: res => {
				console.log("authorized")
				that.getDetail(code, res, callback);
			},
			fail: res => {
				wx.showModal({
					title: '警告',
					content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
					confirmColor: '#39a6ff',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							wx.openSetting({
								success: (res) => {
									if (res.authSetting["scope.userInfo"]) { ////如果用户重新同意了授权登录
										wx.getUserInfo({
											success: function (res) {
												console.log('authorized');
												that.getDtail(code, res, callback);
											}
										});
									}
								}
							});
						}
					},
				});
			},
		})
	},
	//获取用户详细信息
	getDetail: function(code, res, callback) {
		let that = this;
		//存入信息到全局变量
		const userInfo = res.userInfo;
		this.globalData.nickName = userInfo.nickName;
		this.globalData.avatarUrl = this.globalData.publicPath + '/' + userInfo.avatarUrl;
		this.globalData.gender = userInfo.gender; //性别 0：未知、1：男、2：女
		this.data.deviceInfo = wx.getSystemInfoSync();
		this.data.deviceInfo.everyRpx = this.data.deviceInfo.windowWidth / 750;
		//获取用户的登录密钥
		let iv = res.iv;
		let signature = res.signature;
		let encryptedData = res.encryptedData;

		//post请求获取用户信息
		wx.request({
			url: that.globalData.publicPath + '/api/v1/users/',
			method: 'POST',
			data: {
				"code": code,
			},
			success: function (data) {
				wx.setStorageSync('session', data.data.session);
				var sessionData = wx.getStorageSync('session');
				// put请求
				wx.request({
					url: that.globalData.publicPath + '/api/v1/users/',
					method: 'PUT',
					header: {
						'3rd-session': sessionData,
					},
					data: {
						'iv': iv,
						'signature': signature,
						'encryptedData': encryptedData,
					},
					success: res => {
						console.log('putRes:', res);
						that.globalData.nickName = res.data.nickName;
						that.globalData.avatarUrl = that.globalData.publicPath + '/' + res.data.avatarUrl;
						that.globalData.gender = res.data.gender;
						that.globalData.id = res.data.id;
						that.globalData.qrCode = res.data.qrCode;
						callback();
					}
				});
			},
		});
	},
});