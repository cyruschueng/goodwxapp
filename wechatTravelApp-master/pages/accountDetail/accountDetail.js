const app = getApp();
Page({
	data: {
		currentTab: 0,
		swiperHeight: 0,
		title: {
			location: '',
			time: '',
			users: [],
		},
		textNone: 'textNone',
		summoney: '00.00',
		sort: {
			selected1: 'selected1',
			selected2: ''
		},
		detailShow1: [],
		detailShow2: [],
		noneArray: ['暂无公账记录', '暂无私账记录'],
		billNone: 'billNone',
		onlyBillsDisplay: '',
		onlyBillsHeader: 'onlyBillsHeader',
		noneContent: '暂无私账记录',
		imageSelect: [
			'../../images/sort_select/food_yes.png',
			'../../images/sort_select/bus_yes.png',
			'../../images/sort_select/hotel_yes.png',
			'../../images/sort_select/shopping_yes.png',
			'../../images/sort_select/ticket_yes.png',
			'../../images/sort_select/play_yes.png',
			'../../images/sort_select/other_yes.png'
		],
		imageList: ['餐饮', '交通', '住宿', '购物', '订票', '娱乐', '其他'],
		show0: 'show0',
		show1: 'show1',
		show2: 'show2',
		shareButton: 0,
		share: {
			backNone: 'backNone',
			areaNone: 'areaNone',
			hurryNone: 'hurryNone',
			payNone:'payNone',
			imageUrl: app.globalData.avatarUrl,
			summary: '',
			totalMoney: '',
			everyMoney: '',
			codeUrl: app.globalData.avatarUrl
		},
	},
	onLoad(options) {
		if(!!options.accountbookId ) {
			app.globalData.accountbookId = options.accountbookId;
		}
	},
	onShow: function () {
		wx.showShareMenu({
			withShareTicket: true
		});
		this.updateLocalData();
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
	setDetailList: function (data) {
		let detailShow1 = [],
				detailShow2 = [],
				that = this;
		for (let i = 0; i < data.publicBills.length; i++) {
			let detailPer = {};
			if (data.publicBills[i] == {}) {
				continue;
			}
			console.log(data.publicBills[i]);
			detailPer.imageUrl = that.getImageUrl(data.publicBills[i].category);
			detailPer.sort = that.getSummary(data.publicBills[i].summary);
			detailPer.price = that.checkSum(data.publicBills[i].sum);
			detailPer.id = data.publicBills[i].id;
			detailPer.participantsNum = that.checkParticipants(data.publicBills[i].participants);
			detailPer.pricePer = (detailPer.price / detailPer.participantsNum).toFixed(2);
			detailPer.time = that.getTime(data.publicBills[i].time);
			detailPer.userImage = that.getUserImage(data.publicBills[i].payerId);
			detailPer.visible = that.getVisible(data.publicBills[i]);
			detailPer.beforeRound = that.getBefore(data.publicBills[i].isSettled);
			detailShow1.unshift(detailPer);
		}
		for (let i = 0; i < data.privateBills.length; i++) {
			let detailPer = {};
			if (data.privateBills[i] == {} || !data.privateBills[i].category) {
				continue;
			}
			detailPer.imageUrl = that.getImageUrl(data.privateBills[i].category);
			detailPer.sort = that.getSummary(data.privateBills[i].summary);
			detailPer.id = data.privateBills[i].id;
			detailPer.price = that.checkSum(data.privateBills[i].sum);
			detailPer.time = that.getTime(data.privateBills[i].time);
			detailShow2.unshift(detailPer);
		}
		if(detailShow1.length === 0) {
			that.setData({
				detailShow1: detailShow1,
				detailShow2: detailShow2,
				swiperHeight: 160,
			});
		}
		else {
			that.setData({
				detailShow1: detailShow1,
				detailShow2: detailShow2,
				swiperHeight: detailShow1.length * 130,
			});	
		}
	},
	getVisible: function (data) {
		console.log(app.globalData.id, data.payerId);
		if (app.globalData.id === data.payerId) {
			if (data.isSettled) {
				return 1;
			} else {
				return 0;
			}
		} else {
			if(data.isSettled) {
				return 2;
			} else {
				return 3;
			}
		}
	},
	getSummary: function (str) {
		if (str.length > 5) {
			return str.substring(0, 5) + '...';
		} else {
			return str;
		}
	},
	getBefore: function (bool) {
		if (bool) {
			return 'beforeNone';
		} else {
			return '';
		}
	},
	// 把花费统一显示格式
	checkSum: function (sum) {
		let sum1 = sum / 100;
		return sum1.toFixed(2);
	},
	getUserImage: function (num) {
		if (app.globalData.id === num) {
			return app.globalData.avatarUrl;
		}
		else {
			for (let user of app.globalData.users) {
				if (user.id === num) {
					console.log( user.avatarUrl);
					return user.avatarUrl;
				}
			}
		}
	},
	checkParticipants: function (par) {
		if (!par) {
			return 1;
		} else {
			return par.length;
		}
	},
	// 每笔账单的图标
	getImageUrl: function (cate) {
		var that = this
		for (let i = 0; i < that.data.imageList.length; i++) {
			if (cate == that.data.imageList[i]) {
				return that.data.imageSelect[i];
			}
		}
	},
	// 显示时间
	getTime: function (time) {
		let time1 = new Date(time)
		let now = new Date()
		switch (now.getFullYear() - time1.getFullYear()) {
			case 0:
				if (now.getMonth() - time1.getMonth() == 0 && now.getDate() - time1.getDate() == 0) {
					return '今天';
				} else if (now.getMonth() - time1.getMonth() == 0 && now.getDate() - time1.getDate() == 1) {
					return '昨天';
				} else {
					let month = time1.getMonth() + 1;
					let date = time1.getDate();
					let time2 = month + '-' + date;
					return time2;
				}
			default:
				let year = time1.getFullYear()
				let month = time1.getMonth() + 1
				let date = time1.getDate()
				let time2 = year + '-' + month + '-' + date
				return time2
		}
	},
	// 得到我的总花费
	getSummoney: function (data) {
		let sum = 0
		let length1 = data.privateBills.length
		let length2 = data.publicBills.length
		let length3 = 0
		for (let i = 0; i < length1; i++) {
			if (!data.privateBills[i].sum) {
				data.privateBills[i].sum = 0
			}
			sum += data.privateBills[i].sum
		}
		for (let i = 0; i < length2; i++) {
			if (!data.publicBills[i].sum) {
				data.publicBills[i].sum = 0
			}
			if (!data.publicBills[i].participants) {
				length3 = 1
			} else {
				length3 = data.publicBills[i].participants.length
			}
			sum += data.publicBills[i].sum / length3
		}
		sum = this.checkSum(sum)
		return sum
	},
	onShareAppMessage: function (res) {
		let that = this;
		// 邀请他人加入账本
		if (res.from === 'button' && this.data.shareButton == 0) {
			console.log(app.globalData.accountbookId);
			return {
				title: app.globalData.nickName + '邀请你加入账本' + this.data.title.location + '(' + this.data.title.time + ')',
				path: '/pages/addToAccount/addToAccount?accountbookId=' + app.globalData.accountbookId + '&fromUserId=' + app.globalData.id,
				imageUrl: '../../images/share_homepage.jpg',
				success: function(res) {
					var shareTickets = res.shareTickets;
					if (shareTickets.length == 0) {
						return false;
					}
					wx.getShareInfo({
						shareTicket: shareTickets[0],
						success: function(res){
							console.log(res);
							var encryptedData = res.encryptedData;
							var iv = res.iv;
						}
					})
				},
				fail: function(res) {
					console.log(res);
				}
			}
		} else if (res.from === 'button' && this.data.shareButton == 1) {
			console.log('remind');
			// 提醒别人添加自己的二维码
			return {
				title: app.globalData.nickName + '提醒你添加自己的二维码',
				path: '/pages/codeUpload/codeUpload?fromUserId=' + app.globalData.id,
				imageUrl: '../../images/share_homepage.jpg',
			};
		} else {
			// 催促别人加入账本
			return {
				title: app.globalData.nickName + '请你进入账本' + this.data.title.location + '(' + this.data.title.time + ')',
				path: 'pages/accountDetail/accountDetail?accountbookId=' + app.globalData.accountbookId,
				imageUrl: '../../images/share_homepage.jpg',
			};
		}
	},
	onPullDownRefresh: function () {
		console.log("下拉刷新");
		wx.showNavigationBarLoading();
		this.updateLocalData();
	},
	updateLocalData: function() {
		var that = this;
		const sessionData = wx.getStorageSync('session');
		// 获取已经参加该账本的小伙伴
		wx.request({
			url: app.globalData.publicPath + '/api/v1/account_books/' + app.globalData.accountbookId + '/',
			method: 'GET',
			header: {
				'3rd-session': sessionData,
			},
			success: res => {
				wx.hideNavigationBarLoading() //完成停止加载
				wx.stopPullDownRefresh() //停止下拉刷新
				wx.hideLoading();//停止加载
				// 得到我的总花费
				console.log(that === this);
				let sum = this.getSummoney(res.data);
				let participants = res.data.participants.map(participant => {
					let tempParticipant = participant;
					tempParticipant.avatarUrl = app.globalData.publicPath + '/' + participant.avatarUrl;
					return tempParticipant;
				});
				console.log(participants);
				console.log(res.data);
				// 得到公账和私账的清单
				app.globalData.users = participants;
				this.setDetailList(res.data);
				// 初始显示公账详情
				this.publicBill();
				// 获取当前账本参与者信息
				this.setData({
					title: {
						location: res.data.destination,
						time: that.getTimeFull(res.data.time),
						users: participants,
					},
					summoney: sum
				});
				if (that.data.title.users.length > 1) {
					that.setData({
						textNone: 'textNone',
					});
				} else {
					that.setData({
						textNone: '',
					});
				}
			},
			fail: function() {
				wx.showToast({
					title: "服务错误",
					icon: "none",
				});
			}
		});
	},
	// 添加成员
	addUser: function () {
		this.setData({
			shareButton: 0,
		});
	},
	//remind分享
	remindQrCode: function () {
		this.setData({
			show2: 'show2',
			shareButton: 1,
		});
	},
	//催账分享
	hurryShare: function (e) {
		let that = this;
		this.setData({
			shareButton: 2,
			'share.backNone': '',
			'share.areaNone': '',
			'share.hurryNone': '',
		});
		const sessionData = wx.getStorageSync('session');
		wx.request({
			url: app.globalData.publicPath + '/api/v1/bills/public/' + e.target.dataset.id +'/',
			method: 'GET',
			success: res => {
				let data = res.data;
				let payer = data.participants.filter((participant) => {return participant.id === data.payerId});
				that.setData({
					'share.totalMoney': parseFloat(data.sum / 100).toFixed(2),
					'share.everyMoney':parseFloat(data.sum / 100 / data.participants.length).toFixed(2),
					'share.summary': data.summary,
					'share.imageUrl': app.globalData.publicPath + '/' + payer[0].avatarUrl,
					'share.codeUrl': payer[0].qrCode,
				});
				that.drawHurryCanvas();
			},
		});
	},
	// info显示与隐藏
	showModal: function () {
		this.setData({
			show0: '',
		});
	},
	hideModal: function () {
		this.setData({
			show0: 'show0',
		});
	},
	showRemind: function() {
		this.setData({
			shareButton: 1,
			show2: '',
		});
	},
	hideRemind: function() {
		this.setData({
			shaareButton: 0,
			show2: 'show2',
		});
	},
	// 显示菜单
	showMenu: function () {
		this.setData({
			show1: ''
		})
	},
	// 隐藏菜单
	hideMenu: function () {
		this.setData({
			show1: 'show1'
		});
	},
	changeBill: function(e) {
		console.log(e)
		wx.navigateTo({
			url: '../newDetail/newDetail?detailId=' + e.currentTarget.dataset.id + "&checked=" + e.currentTarget.dataset.checked,
		});
	},
	addAccount: function () {
		wx.navigateTo({
			url: '../newDetail/newDetail'
		});
	},
	//滑动切换
	swiperTab: function(e) {
		let that = this;
    if(that.data["detailShow" + (e.detail.current + 1)].length === 0) {
			that.setData({
				billNone: '',
				currentTab: e.detail.current ,
				noneContent: e.detail.current  === 1 ? "暂无私帐记录" : "暂无公帐记录",
				swiperHeight: 160,
			});
		}
		else {
			console.log("hell7")
			that.setData({
				billNone: 'billNone',
				currentTab: e.detail.current ,
				swiperHeight: that.data["detailShow" + (e.detail.current  + 1)].length * 130,
			});	
		}
	},
	//点击切换
	clickTab: function(e) {
		var that = this;
		if(that.data["detailShow" + (e.currentTarget.dataset.current + 1)].length === 0) {
			that.setData({
				billNone: '',
				currentTab: e.currentTarget.dataset.current,
				noneContent: e.currentTarget.dataset.current === 1 ? "暂无私帐记录" : "暂无公帐记录",
				swiperHeight: 160,
			});
		}
		else {
			console.log("hell7")
			that.setData({
				billNone: 'billNone',
				currentTab: e.currentTarget.dataset.current,
				swiperHeight: that.data["detailShow" + (e.currentTarget.dataset.current + 1)].length * 130,
			});	
		}
	},
	// 公账样式设置
	publicBill: function () {
		let that = this;
		if (that.data.detailShow1.length) {
			that.setData({
				billNone: 'billNone',
				billHave: ['', 'billHave']
			})
		} else {
			that.setData({
				billNone: '',
				billHave: ['billHave', 'billHave'],
				noneContent: that.data.noneArray[0]
			})
		}
	},
	// 私账样式设计
	privateBill: function () {
		let that = this
		if (that.data.detailShow2.length) {
			that.setData({
				billNone: 'billNone',
				billHave: ['billHave', '']
			})
		} else {
			that.setData({
				billNone: '',
				billHave: ['billHave', 'billHave'],
				noneContent: that.data.noneArray[1]
			})
		}
	},
	closeMenu: function () {
		let that = this
		setTimeout(function () {
			that.setData({
				show1: 'show1'
			})
		}, 500)
	},
	noHurry: function (e) {
		let that = this
		let visibleChange = 'detailShow1[' + e.currentTarget.dataset.listid + '].visible'
		console.log(e.currentTarget.dataset.listid, visibleChange);
		let session = wx.getStorageSync('session')
		wx.request({
			url: app.globalData.publicPath + '/api/v1/bills/public/' + e.currentTarget.dataset.id + '/',
			method: 'PUT',
			data: {
				isSettled: false
			},
			header: {
				'3rd-session': session
			},
			success: res => {
				that.setData({
					[visibleChange]: 0
				});
			}
		})
	},
	chooseHurry: function (e) {
		let that = this;
		wx.showActionSheet({
			itemList: ['分享给朋友', '款项已结清'],
			itemColor: "#000000",
			success: function (res) {
				if (!res.cancel) {
					if (res.tapIndex == 0) {
						// 展示要分享出去的卡片
						wx.request({
							url: app.globalData.publicPath + '/api/v1/users/' + app.globalData.id + '/',
							method: 'GET',
							success: res => {
								if (!res.data.qrCode) {
									wx.showModal({
										title: '提示',
										content: '抱歉，你还未上传收款码，快去上传吧！',
										confirmText: '去上传',
										confirmColor: '#39a6ff',
										success: res => {
											if (res.cancel) {
												that.drawHurryCanvas();
											} else {
												wx.navigateTo({
													url: '../codeUpload/codeUpload',
												});
											}
										}
									});
								} else {
									that.hurryShare(e);
								}
							}
						})
					} else if (res.tapIndex == 1) {
						let visibleChange = 'detailShow1[' + e.currentTarget.dataset.listid + '].visible';
						console.log(e.currentTarget.dataset.listid, visibleChange);
						let session = wx.getStorageSync('session')
						wx.request({
							url: app.globalData.publicPath + '/api/v1/bills/public/' + e.currentTarget.dataset.id + '/',
							method: 'PUT',
							data: {
								isSettled: true
							},
							header: {
								'3rd-session': session
							},
							success: res => {
								wx.showToast({
									title: '已结清',
								});
								that.setData({
									[visibleChange]: 1
								});
								console.log(res);
							}
						})
					}
				}
			}
		});
	},
	showCard: function (e) {
		let that = this;
		const sessionData = wx.getStorageSync('session');
		wx.request({
			url: app.globalData.publicPath + '/api/v1/bills/public/' + e.target.dataset.id +'/',
			method: 'GET',
			success: res => {
				let data = res.data;
				let payer = data.participants.filter((participant) => {return participant.id === data.payerId});
				console.log(payer);
				if(!payer[0].qrCode) {
					that.showRemind();
				}
				else {
					that.setData({
						'share.backNone': '',
						'share.areaNone': '',
						'share.payNone': '',
						'share.totalMoney': parseFloat(data.sum / 100).toFixed(2),
						'share.everyMoney':parseFloat(data.sum / 100 / data.participants.length).toFixed(2),
						'share.summary': data.summary,
						'share.imageUrl': app.globalData.publicPath + '/' + payer[0].avatarUrl,
						'share.codeUrl': payer[0].qrCode,
					});
					that.drawPayCanvas();
				}
			},
		});
	},
	closeCard: function () {
		this.setData({
			'share.backNone': 'backNone',
			'share.areaNone': 'areaNone',
			'share.hurryNone': 'hurryNone',
		})
	},
	preventDefult: function(){
		
	},
	drawHurryCanvas: function () {
		var that = this;
		var payInfo = this.data.share;
		console.log(payInfo);
		var ctx = wx.createCanvasContext("hurryCanvas");
		this.drawHeaderInfo(ctx, payInfo.summary, payInfo.totalMoney, payInfo.everyMoney);
		this.drawBottomInfo(ctx, 'hurry');
		ctx.save();
		this.drawUserAvatar(ctx, payInfo.imageUrl)
			.then(function() {
				ctx.restore();
				that.drawQrcodeImage(ctx, payInfo.codeUrl, function() {
					ctx.restore();
					that.drawLogoInfo(ctx);
					ctx.draw();
				});
			});
	},
	drawPayCanvas: function () {
		var that = this;
		var payInfo = this.data.share;
		console.log(payInfo);
		var ctx = wx.createCanvasContext("payCanvas");
		this.drawHeaderInfo(ctx, payInfo.summary, payInfo.totalMoney, payInfo.everyMoney);
		this.drawBottomInfo(ctx, 'pay');
		ctx.save();
		this.drawUserAvatar(ctx, payInfo.imageUrl)
			.then(function() {
				ctx.restore();
				that.drawQrcodeImage(ctx, payInfo.codeUrl, function() {
					ctx.restore();
					that.drawLogoInfo(ctx);
					ctx.draw();
				});
			});
	},
	drawUserAvatar: (ctx, userAvatar) => {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		return new Promise((resolve, reject) => {
			wx.downloadFile({
				url: userAvatar,
				success: res => {
					ctx.arc(80 * everyRpx, 70 * everyRpx, 50 * everyRpx, 0, 2 * Math.PI);
					ctx.clip();
					ctx.drawImage(res.tempFilePath, 30 * everyRpx, 20 * everyRpx, 100 * everyRpx, 100 * everyRpx);
					resolve("success");
				}
			});
			// ctx.arc(80 * everyRpx, 70 * everyRpx, 50 * everyRpx, 0, 2 * Math.PI);
			// ctx.clip();
			// ctx.drawImage(userAvatar, 30 * everyRpx, 20 * everyRpx, 100 * everyRpx, 100 * everyRpx);
			// resolve("success");
		})
	},
	drawHeaderInfo: (ctx, catogery, totalMoney, everyMoney) => {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		let info1 = catogery + " 共" + totalMoney + "元";
		let info2 = "向TA支付 " + everyMoney + "元";
		ctx.setFillStyle('rgb(227, 227, 227)');
		ctx.rect(0, 0, 500 * everyRpx, 680 * everyRpx);
		ctx.fill();
		ctx.setFontSize(32 * everyRpx);
		ctx.setFillStyle('rgb(95, 95, 95)');
		ctx.setTextAlign('left');
		ctx.fillText(info1, 154 * everyRpx, 55 * everyRpx);
		ctx.fillText(info2, 154 * everyRpx, 105 * everyRpx);
		ctx.beginPath();
		ctx.setStrokeStyle('rgb(247, 247 ,247)');
		ctx.moveTo(0, 130 * everyRpx);
		ctx.lineTo(500 * everyRpx, 130 * everyRpx);
		ctx.stroke();
		ctx.closePath();
	},
	drawQrcodeImage: (ctx, qrcodeImage, func) => {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		return new Promise((resolve, reject) => {
			wx.downloadFile({
				url: qrcodeImage,
				success: res => {
					ctx.drawImage(res.tempFilePath, 105 * everyRpx, 150 * everyRpx, 290 * everyRpx, 350 * everyRpx);
					func();
					resolve("draw qrcode");
				}
			});
		});
		// ctx.drawImage(qrcodeImage, 105 * everyRpx, 150 * everyRpx, 290 * everyRpx, 350 * everyRpx);
	},
	drawBottomInfo: (ctx, type) => {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		ctx.setFontSize(32 * everyRpx);
		ctx.setFillStyle('rgb(95, 95, 95)');
		ctx.setTextAlign('center');
		if(type === "hurry") {
			ctx.fillText("快来向我付款吧", 250 * everyRpx, 540 * everyRpx);
		} 
		else if(type === "pay") {
			ctx.fillText("保存图片向TA付款吧", 250 * everyRpx, 540 * everyRpx);
		}
		ctx.setFontSize(24 * everyRpx);
		ctx.setTextAlign('right');
		ctx.setFillStyle('rgb(160, 160, 160)');
		ctx.fillText('账本信息来自', 375 * everyRpx, 600 * everyRpx);
		ctx.setTextAlign('right');
		ctx.fillText('同游账本', 375 * everyRpx, 634 * everyRpx);
	},
	drawLogoInfo: ctx => {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		ctx.drawImage('../../images/icon.png', 380 * everyRpx, 566 * everyRpx, 90 * everyRpx, 90 * everyRpx);
	},
	previewImage: event => {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		let canvasId = event.currentTarget.dataset.id;
		wx.canvasToTempFilePath({
			canvasId,
			quality: 1,
			fileType: 'jpg',
			success: res => {
				console.log(res.tempFilePath);
				wx.previewImage({
					urls: [res.tempFilePath],
				});
			},
		});
		console.log(event);
	},
	savePayImage: function() {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		let canvasId = "payCanvas";
		wx.canvasToTempFilePath({
			canvasId,
			quality: 1,
			x: 0,
			y: 0,
			fileType: 'jpg',
			success: function (res) {
				console.log(res.tempFilePath);
				wx.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: function (res) {
						wx.showToast({
							title: '保存成功',
						})
					},
					fail: function (res) {
						wx.showModal({
							title: '提示',
							content: '保存失败，请重新尝试保存！',
							confirmText: '我知道了',
							confirmColor: '#39a6ff',
							showCancel: false
						})
					}
				});
			},
		});
		console.log(event);
	},
	closeShare: function () {
		this.setData({
			'share.backNone': 'backNone',
			'share.areaNone': 'areaNone',
			'share.hurryNone': 'hurryNone',
			'share.payNone':'payNone',
			'share.imageUrl': '',
			'share.totalMoney': '',
			'share.summary': '',
			'share.codeUrl': '',
		});
	}
});