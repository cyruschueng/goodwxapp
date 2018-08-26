const app = getApp();
Page({
  data: {
		accountBookId: 0,
    userInfo: {},
		userArr: [
			{
				openId: "",
				avatarUrl: '',
				id: 0,
				nickName: 'Tony'
			}
		],
    accountInfo: {place: '上海', date: '2017-11-20'},
    codeInfo: '../../images/more_info.png',
    uploadIcon: '../../images/picture_upload.png',
    codeTitle: '上传你的收款二维码便于小伙伴支付哦',
    upload: false,
    show0: 'show0',
  },
	onLoad: function(options) {
		let that = this;
		let beingAdded = function () { that.beingAdded(options) }
		app.login(beingAdded);
	},
	beingAdded: function(options) {
		let that = this;
		const accountbookId = options.accountbookId,
					fromUserId = parseInt(options.fromUserId);
		if(app.globalData.qrCode) {
			that.setData({
				uploadIcon: app.globalData.qrCode,
			});
		}
		console.log(accountbookId, fromUserId);
		let fromUser = {};
		app.globalData.accountbookId =accountbookId;
		let sessionData = wx.getStorageSync('session');
		wx.request({
			url: app.globalData.publicPath + '/api/v1/account_books/' + accountbookId + '/',
			method: 'GET',
			header: {
				'3rd-session': sessionData,
			},
			success: res => {
				let data = res.data;
				let avatarDealtUsers = [];
				for(let participant of data.participants) {
					if(participant.id === app.globalData.id) {
						console.log(participant.id, app.globalData.id)
						wx.reLaunch({
							url: '../../pages/accountDetail/accountDetail?accountbookId=' + accountbookId,
						});
						return true;
					}
					if(participant.id === fromUserId) {
						fromUser = participant;
					}
					let avatarDealtUser = participant;
					avatarDealtUser.avatarUrl = app.globalData.publicPath + '/' + participant.avatarUrl;
					avatarDealtUsers.unshift(avatarDealtUser);
				}
				wx.hideLoading();
				that.setData({
					accountBookId: accountbookId,
					userInfo: {
						avatarUrl: fromUser.avatarUrl,
						nickName: fromUser.nickName,
					},
					accountInfo: {
						place: data.destination,
						date: that.getTimeFull(data.time),
					},
					userArr: avatarDealtUsers,
				});
			},	
		})
	},
	getTimeFull: function (time) {
		let date = new Date(time);
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		if (month < 10) {
			month = '0' + month
		}
		let day = date.getDate()
		if (day < 10) {
			day = '0' + day
		}
		if (year != 'NaN' || month != 'NaN' || day != 'NaN') {
			return year + '-' + month + '-' + day
		} else {
			return ''
		}
	},
  showModal: function () {
    this.setData({
      show0: ''
    })
  },
  hideModal: function () {
    this.setData({
      show0: 'show0'
    })
  },
  changeInfo: function () {
		var _this = this
		wx.showActionSheet({
			itemList: ['从相册中选择', '拍照'],
			itemColor: "#000000",
			success: function (res) {
				if (!res.cancel) {
					if (res.tapIndex == 0) {
						_this.chooseWxImage('album')
					} else if (res.tapIndex == 1) {
						_this.chooseWxImage('camera')
					}
				}
			}
		})
	},
	chooseWxImage: function (type) {
		var that = this
		wx.chooseImage({
			count: 1, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths
				console.log(tempFilePaths[0])
				that.setData({
					codeTitle: '点击二维码更改',
					upload: true,
					uploadIcon: tempFilePaths[0]
				})
			}
		})
	},
	addToAccountBook: function () {
		var that = this;
		const sessionData = wx.getStorageSync('session');
		wx.request({
			url: app.globalData.publicPath + '/api/v1/users/account_book/' + that.data.accountBookId + '/',
			method: 'POST',
			header: {
				'3rd-session': sessionData,
			},
			success: res => {
				console.log(res);
				wx.showToast({
					title: '加入成功',
  				icon: 'success',
  				duration: 1000,
				});
				setTimeout(function () {
					wx.redirectTo({
						url: '../../pages/accountDetail/accountDetail',
					});
				}, 1000);
			}
		});
	},
});