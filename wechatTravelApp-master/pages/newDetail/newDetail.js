const app = getApp()
Page({
	data: {
		detailId: 0,
		sort: {
			images: [
				{ imageUrl: '../../images/sort_select/food_yes.png', title: '餐饮', imageSpecial: 'imageSpecial'},
				{ imageUrl: '../../images/sort_select/bus_no.png', title: '交通', imageSpecial: ''},
				{ imageUrl: '../../images/sort_select/hotel_no.png', title: '住宿', imageSpecial: ''},
				{ imageUrl: '../../images/sort_select/shopping_no.png', title: '购物', imageSpecial: ''},
				{ imageUrl: '../../images/sort_select/ticket_no.png', title: '订票', imageSpecial: ''},
				{ imageUrl: '../../images/sort_select/play_no.png', title: '娱乐', imageSpecial: ''},
				{ imageUrl: '../../images/sort_select/other_no.png', title: '其他', imageSpecial: ''},
			],
			imageUnSelect: [
				'../../images/sort_select/food_no.png',
				'../../images/sort_select/bus_no.png',
				'../../images/sort_select/hotel_no.png',
				'../../images/sort_select/shopping_no.png',
				'../../images/sort_select/ticket_no.png',
				'../../images/sort_select/play_no.png',
				'../../images/sort_select/other_no.png'
			],
			imageSelect: [
				'../../images/sort_select/food_yes.png',
				'../../images/sort_select/bus_yes.png',
				'../../images/sort_select/hotel_yes.png',
				'../../images/sort_select/shopping_yes.png',
				'../../images/sort_select/ticket_yes.png',
				'../../images/sort_select/play_yes.png',
				'../../images/sort_select/other_yes.png'
			]
		},
		summaryValue: '',
		summaryPlaceHolder: '餐饮',
		menuIndex: 0,
		uploadUrl: '../../images/picture_upload.png',
		time: '',
		moneyValue: null,
		remarkValue: '',
		host: {
			hostUrl: "",
			hostId: 0,
			hostIndex: -1,
		},
		guest: {
			guestInfo: [],
			guestId: []
		},
		remarkfocus: false,
		moneyfocus: false,
		groupNone: '',
		checked: true,
		updateNone: "",
		prevData: null,
	},
	onLoad: function (options) {
		if(!options.detailId) {
			this.createNewDetail();
		}
		else {
			this.updateDetail(options.detailId, options.checked);
		}
	},
	createNewDetail: function() {
		const users = app.globalData.users;
		var guestInfo = [], guestId = [];
		for(let index = 0; index < users.length; index ++) {
			let guestObject = {};
			if(app.globalData.id === users[index].id) {
				app.globalData.hostIndex = index;
			}
			guestObject.imageUrl = users[index].avatarUrl;
			guestObject.userName = users[index].nickName;
			guestObject.userId = users[index].id;
			guestInfo.push(guestObject);
			guestId.push({id: users[index].id});
		}
		this.setData({
			updateNone: "updateNone",
			time: this.getTime(),
			host: {
				hostUrl: app.globalData.avatarUrl,
				hostId: app.globalData.id,
				hostIndex: app.globalData.hostIndex,
			},
			guest: {
				guestInfo,
				guestId,
			}
		});
		console.log(this.getTime());
	},
	updateDetail: function(detailId, checked) {
		let that = this;
		console.log(parseInt(checked));
		const users = app.globalData.users;
		var guestInfo = [], guestId = [];
		this.setData({
			detailId: detailId,
		});
		if(parseInt(checked)) {
			this.setData({
				checked: true,
			});
			wx.request({
				url: app.globalData.publicPath + '/api/v1/bills/public/'+ detailId + '/',
				method: 'GET',
				success: res => {
					console.log(res);
					let data = res.data;
					let time = that.getTime(data.time);
					let uploadUrl = data.image === "" ? "../../images/picture_upload.png" : data.image;
					let remarkValue = data.note;
					let moneyValue = parseFloat(data.sum / 100).toFixed(2);
					let guestId = [], guestInfo = [];
					let summaryValue = data.summary;
					let sort = {
						images: [],
						imageUnSelect: that.data.sort.imageUnSelect,
						imageSelect: that.data.sort.imageUnSelect,
					};
					let menuIndex = 0;
					for(let index = 0; index < data.participants.length; index ++) {
						let guestObject = {};
						if(data.payerId === data.participants[index].id) {
							app.globalData.hostIndex = index;
						}
						guestObject.imageUrl = app.globalData.publicPath + '/' + data.participants[index].avatarUrl;
						guestObject.userName = data.participants[index].nickName;
						guestObject.userId = data.participants[index].id;
						guestInfo.push(guestObject);
						guestId.push({id: data.participants[index].id});
					}
					for(let index = 0; index < that.data.sort.images.length; index ++) {
						if(data.category === that.data.sort.images[index].title) {
							console.log(index);
							menuIndex = index;
							sort.images[index] = {
								title: that.data.sort.images[index].title,
								imageUrl: that.data.sort.imageSelect[index],
								imageSpecial: "imageSpecial",
							}
						} else {
							sort.images[index] = {
								title: that.data.sort.images[index].title,
								imageUrl: that.data.sort.imageUnSelect[index],
								imageSpecial: "",
							}
						}
					}
					let temptHost = guestInfo.filter(item => {return (item.userId === data.payerId)});
					let host = {
						hostUrl: temptHost[0].imageUrl,
						hostId: temptHost[0].userId,
						hostIndex: app.globalData.hostIndex
					};
					let guest = {
						guestInfo,
						guestId
					};
					let prevData = {
						summaryValue,
						time,
						uploadUrl,
						moneyValue,
						remarkValue,
						host,
						guest,
						sort,
						menuIndex
					};
					that.setData({
						summaryValue,
						time,
						uploadUrl,
						moneyValue,
						remarkValue,
						host,
						guest,
						sort,
						menuIndex,
						prevData
					});
				}
			});
		} else {
			this.setData({
				checked: false,
			});
			wx.request({
				url: app.globalData.publicPath + '/api/v1/bills/private/'+ detailId + '/',
				method: 'GET',
				success: res => {
					let data = res.data;
					let time = that.getTime(data.time);
					let uploadUrl = data.image === "" ? "../../images/picture_upload.png" : data.image;
					let remarkValue = data.note;
					let moneyValue = parseFloat(data.sum / 100).toFixed(2);
					let summaryValue = data.summary;
					let sort = {
						images: [],
						imageUnSelect: that.data.sort.imageUnSelect,
						imageSelect: that.data.sort.imageUnSelect,
					};
					var menuIndex = 0;
					for(let index = 0; index < that.data.sort.images.length; index ++) {
						if(data.category === that.data.sort.images[index].title) {
							menuIndex = index;
							sort.images[index] = {
								title: that.data.sort.images[index].title,
								imageUrl: that.data.sort.imageSelect[index],
								imageSpecial: "imageSpecial",
							}
						} else {
							sort.images[index] = {
								title: that.data.sort.images[index].title,
								imageUrl: that.data.sort.imageUnSelect[index],
								imageSpecial: "",
							}
						}
					}
					let prevData = {
						summaryValue,
						time,
						uploadUrl,
						moneyValue,
						remarkValue,
						sort,
						menuIndex,
					};
					that.setData({
						summaryValue,
						time,
						uploadUrl,
						moneyValue,
						remarkValue,
						sort,
						menuIndex,
						prevData,
					});
				}
			})
		}
		
	},
	getTime: function (options) {
		var time = options ? new Date(options) : new Date();
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		var date = time.getDate();
		return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
	},
	getmoneyValue: function (e) {
		var moneyValue = e.detail.value;
		this.setData({
			moneyValue: moneyValue,
		});
	},
	moneyBindblur: function(e) {
		var moneyValue = e.detail.value;
		var pointIndex = moneyValue.indexOf(".");
		if(pointIndex > 0) {
			this.setData({
				moneyValue: parseFloat(moneyValue).toFixed(2),
			});
		} else {
			this.setData({
				moneyValue: moneyValue,
			});
		}
	},
	getremarkValue: function (e) {
		var remarkValue = e.detail.value;
		this.setData({
			remarkValue: remarkValue,
		});
	},
	getSummary: function (e) {
		this.setData({
			summaryValue: e.detail.value
		})
	},
	// 选择账本类型
	changeSort: function (e) {
		console.log(e.currentTarget.dataset.menuindex);
		var that = this;
		var url, special, sort = {}, index = e.currentTarget.dataset.menuindex;
		that.setData({
			menuIndex: index,
			summaryPlaceHolder: that.data.sort.images[index].title
		});
		// 账单选择类型复原
		for (var i = 0; i < 7; i++) {
			url = 'sort.images[' + i + '].imageUrl';
			special = 'sort.images[' + i + '].imageSpecial';
			sort[url] = that.data.sort.imageUnSelect[i];
			sort[special] = '';
			if (i == index) {
				console.log(i);
				sort[url] = that.data.sort.imageSelect[i];
				sort[special] = 'imageSpecial';
			}
			that.setData(sort);
		}
	},
	// 时间选择
	bindDateChange: function (e) {
		console.log(e.detail.value)
		this.setData({
			time: e.detail.value
		})
	},
	remarkFocus: function () {
		this.setData({
			remarkfocus: true
		})
	},
	moneyFocus: function () {
		this.setData({
			moneyfocus: true
		})
	},
	// 图片选择
	codeUpload: function () {
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
			sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths[0]
				that.setData({
					uploadUrl: tempFilePaths
				})
			}
		})
	},
	listenerSwitch: function (e) {
		if (e.detail.value) {
			this.setData({
				checked: true,
				groupNone: ''
			})
		} else {
			this.setData({
				checked: false,
				groupNone: 'groupNone'
			})
		}
	},
	payerChoose: function () {
		wx.navigateTo({
			url: '../payerSelect/payerSelect'
		})
	},
	payeeChoose: function () {
		wx.navigateTo({
			url: '../payeeSelect/payeeSelect'
		})
	},
	// 完成表单按钮
	finishForm: function () {
		var that = this
		if (!that.data.uploadUrl.match('../images/')) {
			wx.uploadFile({
				url: app.globalData.publicPath + "/api/v1/images/bills/",
				method: 'PUT',
				filePath: that.data.uploadUrl,
				name: 'bill',
				header: {
					"Content-Type": "multipart/form-data"
				},
				formData: {
					'bill': that.data.uploadUrl
				},
				success: res => {
					if (res.statusCode == 200 || res.statusCode == 201) {
						wx.showToast({
							title: '添加成功！',
						})
					}
					that.setData({
						uploadUrl: app.globalData.publicPath + '/' + JSON.parse(res.data).path
					})
					if (!that.data.summaryValue) {
						that.setData({
							summaryValue: that.data.summaryPlaceHolder
						})
						console.log(that.data.summaryValue)
					}
					console.log(that.data.uploadUrl)
					if (!that.data.checked) {
						console.log('这是一笔私账')
						that.requestPrivate(that.data.uploadUrl)
					} else {
						console.log('这是一笔公账')
						that.requestPublic(that.data.uploadUrl)
					}
				},
				fail: e => {
					console.log(e)
				}
			})
		} else {
			console.log('没有图片上传！')
			if (!that.data.checked) {
				that.requestPrivate('')
			} else {
				that.requestPublic('')
			}
		}
	}, 
	requestPublic: function (image) {
		let that = this;
		let check = that.checkInfo();
		if (check) {
			if(that.data.detailId === 0) {
				let checkHostInPayer = false;
				for(let payer of that.data.guest.guestId) {
					if(that.data.host.hostId === payer.id) {
						checkHostInPayer = true;
					}
				}
				if(checkHostInPayer) {
					wx.request({
						url: app.globalData.publicPath + '/api/v1/account_books/' + app.globalData.accountbookId + '/bills/public/',
						method: 'POST',
						data: {
							"category": that.data.sort.images[that.data.menuIndex].title,
							"image": image,
							"note": that.data.remarkValue,
							"participants": that.data.guest.guestId,
							"payerId": that.data.host.hostId,
							"summary": !that.data.summaryValue ? that.data.summaryPlaceHolder : that.data.summaryValue,
							"sum": that.checkSum(that.data.moneyValue),
							"time": that.data.time,
						},
						header: {
							'3rd-session': wx.getStorageSync('session')
						},
						success: res => {
							wx.showToast({
								title: '添加成功!',
							});
							setTimeout(function () {
								wx.navigateBack({
									delta: 1,
								})
							}, 1000);
						},
						fail: res => {
							wx.showToast({
								title: '服务错误, 请稍后重试',
							});
						}
					});
				} else {
					wx.showModal({
						title: "提示",
						content: '付款人不在参与人之中',
						showCancel: false,
						confirmColor: '#39a6ff',
						confirmText: '我知道了',
					});
				}
			}
			else if(that.checkChanged()) {
				wx.request({
					url: app.globalData.publicPath + '/api/v1/bills/public/' + that.data.detailId + '/',
					method: 'PUT',
					data: {
						"category": that.data.sort.images[that.data.menuIndex].title,
						"image": image,
						"note": that.data.remarkValue,
						"participants": that.data.guest.guestId,
						"payerId": that.data.host.hostId,
						"summary": !that.data.summaryValue ? that.data.summaryPlaceHolder : that.data.summaryValue,
						"sum": that.checkSum(that.data.moneyValue),
						"time": that.data.time,
					},
					header: {
						'Content-Type': 'application/json',
						'3rd-session': wx.getStorageSync('session'),
					},
					success: res => {
						console.log('success:', res)
						wx.showToast({
							title: '修改成功!',
						});
						setTimeout(function () {
							wx.navigateBack({
								delta: 1,
							})
						}, 1000);
					},
					fail: res => {
						wx.showToast({
							title: '服务错误, 请稍后重试...',
						})
					}
				});
			}
			else {
				wx.showToast({
					title: '修改成功!',
				});
				setTimeout(function () {
					wx.navigateBack({
						delta: 1,
					})
				}, 1000);
			}
		} else {
			return true;
		}
	},
	requestPrivate: function (image) {
		let that = this
		let check = that.checkInfo();
		if (check) {
			console.log(that)
			if(that.data.detailId === 0) {
				wx.request({
					url: app.globalData.publicPath + '/api/v1/account_books/' + app.globalData.accountbookId + '/bills/private/',
					method: 'POST',
					data: {
						"category": that.data.sort.images[that.data.menuIndex].title,
						"summary": !that.data.summaryValue ? that.data.summaryPlaceHolder : that.data.summaryValue,
						"image": image,
						"payerId": app.globalData.id,
						"note": that.data.remarkValue,
						"sum": that.checkSum(that.data.moneyValue),
						"time": that.data.time
					},
					header: {
						'Content-Type': 'application/json',
						'3rd-session': wx.getStorageSync('session')
					},
					success: res => {
						wx.showToast({
							title: '添加成功!',
						});
						setTimeout(function () {
							wx.navigateBack({
								delta: 1
							})
						}, 1000);
					},
					fail: res => {
						wx.showToast({
							title: '服务错误，请稍后重试...',
						});
					}
				});
			}
			else if(that.checkChanged()) {
				wx.request({
					url: app.globalData.publicPath + '/api/v1/bills/private/' + that.data.detailId + '/',
					method: 'PUT',
					data: {
						"category": that.data.sort.images[that.data.menuIndex].title,
						"summary": !that.data.summaryValue ? that.data.summaryPlaceHolder : that.data.summaryValue,
						"image": image,
						"payerId": app.globalData.id,
						"note": that.data.remarkValue,
						"sum": that.checkSum(that.data.moneyValue),
						"time": that.data.time
					},
					header: {
						'3rd-session': wx.getStorageSync('session')
					},
					success: res => {
						wx.showToast({
							title: '修改成功!',
						});
						setTimeout(function () {
							wx.navigateBack({
								delta: 1
							})
						}, 1000);
					},
					fail: res => {
						wx.showToast({
							title: '服务错误，请稍后重试...',
						});
					}
				});
			}
			else {
				wx.showToast({
					title: '修改成功!',
				});
				setTimeout(function () {
					wx.navigateBack({
						delta: 1,
					});
				}, 1000);
			}
		} else {
			return true;
		}
	},
	checkChanged: function() {
		var that = this;
		var checkChanged = false, prevData = that.data.prevData;
		checkChanged = this.deepCheckEqual(prevData, that.data);
		return checkChanged;
	},
	deepCheckEqual(obj1, obj2) {
		var that = this;
		var checkChanged = false;
		for(let key in obj1) {
			if(key === "guest") {
				for(let payerIndex = 0; payerIndex < Math.max(obj1[key].guestId.length, obj2[key].guestId.length); payerIndex++) {
					if(obj1[key].guestId[payerIndex].id !== obj2[key].guestId[payerIndex].id) {
						return true;
					}
				}
			} else {
				if( typeof obj1[key] === 'object') {
					checkChanged = that.deepCheckEqual(obj1[key], obj2[key]);
				}
				else {
					if(obj1[key] != obj2[key]) {
						console.log(key);
						checkChanged = true;
						break;
					}
				}
			}
		}
		return checkChanged;
	},
	checkInfo: function (checked) {
		if (!this.data.moneyValue) {
			wx.showModal({
				title: '提示',
				content: '您还未输入金额',
				confirmColor: '#39a6ff',
				showCancel: false,
				confirmText: '我知道了'
			});
			return 0;
		} else if (this.data.checked) {
			console.log(this.data.host, this.data.guest)
			if (this.data.host.hostIndex == -1) {
				wx.showModal({
					title: '提示',
					content: '您还未选择付款人',
					confirmColor: '#39a6ff',
					showCancel: false
				})
				return 0
			} else if (!this.data.guest.guestId || this.data.guest.guestId.length == 0) {
				wx.showModal({
					title: '提示',
					content: '您还未选择参与者',
					confirmColor: '#39a6ff',
					showCancel: false
				})
				return 0
			} else {
				return 1
			}
		} else {
			return 1
		}
	},
	checkSum: function (sum) {
		if (!sum || isNaN(sum)) {
			return 0
		} else {
			return sum * 100
		}
	},
	// 清除表单数据
	deleteForm: function () {
		let that = this;
		wx.showModal({
			title: '提示',
			content: '是否删除当前账单?',
			confirmColor: '#39a6ff',
			success: res => {
				if (res.confirm) {
					const session = wx.getStorageSync("session");
					console.log(that.data.detailId);
					if(that.data.detailId && that.data.checked) {
						wx.request({
							method: "DELETE",
							header: {
								'3rd-session': session,
							},
							url: app.globalData.publicPath + '/api/v1/bills/public/'+ that.data.detailId + '/',
							success: res => {
								wx.showToast({
									title: "删除成功",
									icon: "success",
								});
								setTimeout(function () {
									wx.navigateBack({
										delta: 1,
									})
								}, 1000);
							},
							fail: res => {
								wx.showToast({
									title: "服务错误, 请稍后重试",
								});
							},
						});
					}
					else if(that.data.detailId && !that.data.checked) {
						wx.request({
							method: "DELETE",
							header: {
								'3rd-session': session,
							},
							url: app.globalData.publicPath + '/api/v1/bills/private/' + that.data.detailId + '/',
							success: res => {
								wx.showToast({
									title: "删除成功",
									icon: "success",
								});
								setTimeout(function () {
									wx.navigateBack({
										delta: 1,
									})
								}, 1000);
							},
							fail: res => {
								wx.showToast({
									title: "服务错误, 请稍后重试",
								});
							},
						});
					}
				} else {
					return
				}
			}
		})
	},
	resetForm: function () {
		var that = this
		var url, special, sort = {}
		// 账单选择类型复原
		for (var i = 0; i < 7; i++) {
			url = 'sort.images[' + i + '].imageUrl'
			special = 'sort.images[' + i + '].imageSpecial'
			sort[url] = that.data.sort.imageUnSelect[i]
			sort[special] = ''
			if (i == 0) {
				sort[url] = '../../images/sort_select/food_yes.png'
				sort[special] = 'imageSpecial'
			}
			that.setData(sort)
		}
		that.setData({
			summaryValue: '',
			menuIndex: 0,
			uploadUrl: '../../images/picture_upload.png',
			time: this.getTime(),
			hostUrl: '',
			hostName: '',
			hostIndex: -1,
			remarkValue: '',
			moneyValue: null,
			guestInfo: [],
			remarkfocus: false,
			moneyfocus: false,
			groupNone: '',
			checked: true
		})
		console.log(this.data)
	}
})
