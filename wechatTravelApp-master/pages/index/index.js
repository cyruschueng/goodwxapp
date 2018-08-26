//index.js
//获取应用实例
const app = getApp();
Page({
	data: {
		hasUserInfo: false,
		nickName: '',
		avatarUrl: '',
		gender: 0,
		id: 0
	},
	onLoad: function () {
		let that = this;
		app.login(that.judgeWhichPage);
	},
	judgeWhichPage: function () {
		let that = this;
		let sessionData = wx.getStorageSync('session');
		if(sessionData) {
			wx.request({
				url: app.globalData.publicPath + '/api/v1/account_books/',
				method: 'GET',
				header: {
					'3rd-session': sessionData,
				},
				success: res => {
					// 获取当前账本参与者信息
					if (!res.data || res.data.length === 0) {
							setTimeout(function () {
								wx.redirectTo({
									url: '../../pages/newAccount/newAccount',
								});
							}, 1000);
					} else {
						console.log(res.data[res.data.length - 1].id);
						app.globalData.accountbookId =res.data[res.data.length - 1].id
							setTimeout(function () {
								wx.redirectTo({
									url: '../../pages/accountDetail/accountDetail',
								});
							}, 1000);
					}
				}
			});
		}
	},
});