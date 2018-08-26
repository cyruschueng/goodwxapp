const app = getApp()
Page({
  data: {
		iconUrl: '../../images/picture_upload.png',
		prevIconUrl: '../../images/picture_upload.png',
    show0: 'show0',
		codeInfo: '上传二维码',
    upload: false,
		changeImg: false,
		infoShow: 0
  },
	onLoad: function (options) {
		let that = this;
		if(options) {
			let that = this;
			app.globalData.options = options;
			let beingRemindedOfQrcode = function () {that.beingRemindedOfQrcode(options)};
			app.login(beingRemindedOfQrcode);
		} else {
			that.beingRemindedOfQrcode();
		}
	},
	beingRemindedOfQrcode: function(options) {
		let id = app.globalData.id;
		let that = this;
		const sessionData = wx.getStorageSync('session');
		wx.request({
			url: app.globalData.publicPath + '/api/v1/users/' + id + '/',
			method: 'GET',
			header: {
				'3rd-session': sessionData,
			},
			success: res => {
				wx.hideLoading();
				console.log(res);
				if (!res.data.qrCode) {
					if (!that.data.qrCode ==='../../images/picture_upload') {
						that.setData({
							codeInfo: '修改二维码',
							changeImg: false,
							upload: true
						});
					} else {
						that.setData({
							codeInfo: '上传二维码',
							changeImg: false,
							upload: false
						})
					}
				} else {
					that.setData({
						iconUrl: res.data.qrCode,
						prevIconUrl: res.data.qrCode,
						codeInfo: '修改二维码',
						changeImg: false,
						upload: false
					});
				}
			},
		});
	},
  changeInfo: function () {
		var _this = this;
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
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				console.log(res);
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths[0];
				wx.uploadFile({
					url: app.globalData.publicPath + "/api/v1/images/qrcodes/",
					filePath: tempFilePaths,
					name: 'qrcode',
					header: {
						"Content-Type": "multipart/form-data",
					},
					formData: {
						'qrcode': tempFilePaths
					},
					success: res => {
						console.log(res);
						that.setData({
							iconUrl: app.globalData.publicPath + '/' + JSON.parse(res.data).path,
							codeInfo: '修改二维码',
							changeImg: true,
							upload: false,
						});
					}});
			}
		})
	},
	uploadImage: function (url) {
		let that = this
		wx.request({
			url: app.globalData.publicPath + '/api/v1/users/',
			method: 'PUT',
			header: {
				'content-type': 'application/json',
				'3rd-session': wx.getStorageSync('session')
			},
			data: {
				qrCode: url,
			},
			success: res => {
				console.log('上传成功！');
				that.setData({
					codeInfo: '修改二维码',
					upload: true,
					infoShow: 0,
					changeImg: true
				});
				wx.showToast({
					title: '上传成功',
					success: res => {
						if(app.globalData.options) {
							let sessionData = wx.getStorageSync('session');
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
													url: '../../pages/accountDetail/accountDetail?accountBookId=' + app.globalData.options.accountbookId,
												});
											}, 1000);
									}
								}
							});
						} else {
							setTimeout(function () {
								wx.navigateBack({
									delta: 1
								});
							}, 1500);
						}
					}
				});
			}
		});
},
previewQrCode: function() {
	let that = this;
	wx.previewImage({
		urls: [that.data.iconUrl],
	});
},
	codeConfirm: function () {
		let that = this;
		if (that.data.iconUrl !== '../../images/picture_upload.png' && that.data.iconUrl !== that.data.prevIconUrl) {
			console.log('不是原图,开始上传！');
			that.uploadImage(that.data.iconUrl);
		} 
		else if(that.data.iconUrl === '../../images/picture_upload.png') {
			wx.showModal({
				title: '提示',
				content: '还未上传二维码!',
				showCancel: false,
				confirmText: "好的",
				confirmColor: "rgb(57, 166, 255)",
			});
		}
		else {
			wx.showModal({
				title: '提示',
				content: '并未修改二维码!',
				showCancel: false,
				confirmText: "好的",
				confirmColor: "rgb(57, 166, 255)",
				success: res => {
					
				}
			});
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
	}
})