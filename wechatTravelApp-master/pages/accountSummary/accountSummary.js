var wxCharts = require('../../libs/wxcharts-min.js');
const app = getApp();

Page({
	data: {
		user: {
			name: '',
			location: ''
		},
		summoney: 0,
		detail: [],
		series: [0, 0, 0, 0, 0, 0, 0],
		seriesSum: 10,
		shareShow: false,
		canvasShow: true,
		seriesArr: [],
		seriesInfo: [
			{title: '餐饮', color: 'rgb(116, 184, 251)'}, 
			{title: '交通', color: 'rgb(247, 114, 117)'}, 
			{title: '住宿', color: 'rgb(246, 157, 99)'}, 
			{title: '购物', color: 'rgb(171, 190, 246)'}, 
			{title: '订票', color: 'rgb(121, 205, 182)'}, 
			{title: '娱乐', color: 'rgb(214, 178, 51)'}, 
			{title: '其他', color: 'rgb(174, 213, 129)'}
		]
	},
	onShow: function () {
		let that = this, session = wx.getStorageSync('session');
		wx.request({
			url: app.globalData.publicPath + '/api/v1/account_books/' + app.globalData.accountbookId + '/summary/',
			method: 'GET',
			header: {
				'3rd-session': session
			},
			success: res => {
				console.log(res.data);
				let series = [res.data.餐饮, res.data.交通, res.data.住宿, res.data.购物, res.data.订票, res.data.娱乐, res.data.其他];
				let seriesSum = res.data.餐饮 + res.data.交通 + res.data.住宿 + res.data.购物 + res.data.订票 + res.data.娱乐 + res.data.其他;
				let seriesArr = [], seriesPer = {};
				if (seriesSum == 0) {
					for (let i = 0; i < series.length; i++) {
						seriesPer = {};
						seriesPer = {
							variety: that.data.seriesInfo[i].title,
							color: that.data.seriesInfo[i].color,
							data: 1,
							format: function () {
								return that.data.seriesInfo[i].title
							}
						}
						seriesArr.unshift(seriesPer);
					}
					console.log(seriesArr)
				} else {
					for (let i = 0; i < series.length; i ++) {
						if (series[i] != 0) {
							seriesPer = {}
							seriesPer = {
								name: that.data.seriesInfo[i].title,
								color: that.data.seriesInfo[i].color,
								data: series[i],
								format: function () {
									return that.data.seriesInfo[i].title + ' ' + (series[i] * 100 / seriesSum).toFixed(2) + '%'
								}
							}
							seriesArr.unshift(seriesPer);
						}
					}
				}
				that.setData({
					series: series,
					seriesSum: seriesSum,
					seriesArr: seriesArr
				})
				that.ringChart()
			},
			fail: res => {
				console.log(res)
			}
		});
		wx.request({
			url: app.globalData.publicPath + '/api/v1/account_books/' + app.globalData.accountbookId + '/',
			method: 'GET',
			header: {
				'3rd-session': session
			},
			success: res => {
				console.log(res.data);
				that.getData(res.data);
			},
			fail: res => {
				console.log(res);
			}
		})
	},
	getData: function (data) {
		let detail = [], that = this, sum = 0;
		if (data.publicBills.length != 0) {
			for (let publicBill of data.publicBills) {
				let bill = {};
				if(detail[publicBill.category] == undefined) {
					bill.imageUrl = that.getVariety(publicBill.category);
					bill.variety = publicBill.category;
					bill.summoney = (publicBill.sum / 100).toFixed(2);
					bill.money = (publicBill.sum / (publicBill.participants.length * 100)).toFixed(2);
					sum += publicBill.sum / publicBill.participants.length;
					detail[publicBill.category] = bill;
				}
				else {
					sum += publicBill.sum / publicBill.participants.length;
					detail[publicBill.category].summoney = (parseFloat(detail[publicBill.category].summoney) + (publicBill.sum / 100)).toFixed(2);
					console.log(detail[publicBill.category].money, typeof detail[publicBill.category].money);
					detail[publicBill.category].money = (parseFloat(detail[publicBill.category].money) + (publicBill.sum / 100 / publicBill.participants.length)).toFixed(2);
				}
			}
		}
		if (data.privateBills.length != 0) {
			for (let privateBill of data.privateBills) {
				let bill = {};
				if(detail[privateBill.category] == undefined) {
					bill.imageUrl = that.getVariety(privateBill.category);
					bill.variety = privateBill.category;
					bill.summoney = (privateBill.sum / 100).toFixed(2);
					bill.money = (privateBill.sum / 100).toFixed(2);
					sum += parseInt(privateBill.sum);
					detail[privateBill.category] = bill;
				} else {
					sum += parseInt(privateBill.sum);
					detail[privateBill.category].summoney = (parseFloat(detail[privateBill.category].summoney) + (privateBill.sum / 100)).toFixed(2);
					console.log(detail[privateBill.category].money, typeof detail[privateBill.category].money);
					detail[privateBill.category].money = (parseFloat(detail[privateBill.category].money) + (privateBill.sum / 100)).toFixed(2);
				}
			}
		}
		let tempDetail = [];
		for(let key in detail) {
			console.log(key);
			tempDetail.unshift(detail[key]);
		}
		that.setData({
			user: {
				name: app.globalData.nickName,
				location: data.destination
			},
			detail: tempDetail,
			summoney: (sum / 100).toFixed(2),
		});
	},
	getPar: function (par) {
		if (!par) {
			return 1
		} else {
			return par.length;
		}
	},
	getVariety: function (str) {
		switch(str) {
			case '餐饮': return '../../images/sort_select/food_yes.png'
			case '交通': return '../../images/sort_select/bus_yes.png'
			case '住宿': return	'../../images/sort_select/hotel_yes.png'
			case '购物': return	'../../images/sort_select/shopping_yes.png'
			case '订票': return	'../../images/sort_select/ticket_yes.png'
			case '娱乐': return	'../../images/sort_select/play_yes.png'
			case '其他': return	'../../images/sort_select/other_yes.png'
		}
	},
	ringChart: function () {
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		let that = this
		new wxCharts({
			animation: true,
			canvasId: 'ringCanvas',
			type: 'ring',
			extra: {
				// ring曲线的宽度
				ringWidth: 35,
				pie: {
					// ring绘制的起始点
					offsetAngle: -30,
				}
			},
			series: that.data.seriesArr,
			legend: false,
			width: 375,
			height: 310,
			padding: 100
		})
	},
	outputImage: function () {
		let that = this;
		var everyRpx = parseFloat(app.data.deviceInfo.everyRpx);
		console.log('start screenshot')
		this.setData({
			shareShow: true,
			canvasShow: false
		})
		wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			canvasId: 'ringCanvas',
			success: function (res) {
				// console.log(res.tempFilePath)
				var posArr = that.getPosition()
				console.log(posArr)
				var ctx = wx.createCanvasContext()
				ctx.beginPath()
				ctx.setStrokeStyle('rgb(225, 225, 225)')
				ctx.moveTo(0, 280)
				ctx.lineTo(355, 280)
				ctx.stroke()
				ctx.closePath()
				ctx.beginPath()
				ctx.setStrokeStyle('rgb(57, 166, 255)')
				ctx.setLineWidth(3)
				ctx.setLineCap('round')
				ctx.moveTo(15, 293)
				ctx.lineTo(15, 315)
				ctx.stroke()
				ctx.closePath()
				// 让canvas里面的文字居中
				ctx.setFontSize(18)
				ctx.setTextAlign('left')
				ctx.setFillStyle('rgb(57, 166, 255)')
				ctx.fillText(that.data.user.name, posArr[0], 35)
				ctx.setFillStyle('rgb(160, 160, 160)')
				ctx.fillText('的', posArr[1], 35)
				ctx.setFillStyle('rgb(57, 166, 255)')
				ctx.fillText(that.data.user.location, posArr[2], 35)
				ctx.setFillStyle('rgb(160, 160, 160)')
				ctx.fillText('之行', posArr[3], 35)

				ctx.setTextAlign('left')
				ctx.setFillStyle('rgb(125, 125, 125)')
				ctx.fillText('总消费', 20, 310)
				ctx.setTextAlign('right')
				ctx.fillText((that.data.seriesSum/100).toFixed(2) + '元', 335, 310)
				ctx.setTextAlign('center');
				ctx.drawImage(res.tempFilePath, 0, 20, 350, 285)
				ctx.drawImage('../../images/share_qrcode.jpg', 280, 325, 55, 55)
				ctx.setFontSize(16)
				ctx.setTextAlign('right')
				ctx.setFillStyle('rgb(160, 160, 160)')
				ctx.fillText('账本信息来自', 275, 352)
				ctx.setTextAlign('right')
				ctx.fillText('同游账本', 275, 375)
				wx.drawCanvas({
					canvasId: 'secondCanvas',
					actions: ctx.getActions()
				})
			}
		})
	},
	getPosition: function () {
		let that = this
		let length = that.getLength(that.data.user.location + that.data.user.name + '的之行'), nameLength = that.getLength(that.data.user.name), placeLength = that.getLength(that.data.user.location)
		if (length % 2 == 0) {
			let lengthHalf = length / 2, beginPos = 175 - lengthHalf * 9 - 9
			let secondPos = beginPos + nameLength * 9 + 3, thirdPos = secondPos + 18 + 3, lastPos = thirdPos + placeLength * 9 + 3
			return [beginPos, secondPos, thirdPos, lastPos]
		} else {
			let lengthHalf = (length - 1) / 2, beginPos = 175 - (lengthHalf + 1) * 9 - 9
			let secondPos = beginPos + nameLength * 9 + 3, thirdPos = secondPos + 18 + 3, lastPos = thirdPos + placeLength * 9 + 3
			return [beginPos, secondPos, thirdPos, lastPos]
		}
	},
	getLength: function (str) {
		var realLength = 0, len = str.length, charCode = -1
		for (var i = 0; i < len; i ++) {
			charCode = str.charCodeAt(i)
			if (charCode >= 0 && charCode <= 128) realLength += 1
			else realLength += 2
		}
		return realLength
	},
	savecard: function () {
		wx.getSystemInfo({
			success: sysRes => {
				wx.canvasToTempFilePath({
					x: 0,
					y: 0,
					canvasId: 'secondCanvas',
					fileType: 'jpg',
					quality: 1,
					width	: sysRes.windowWidth,
					height: sysRes.windowHeight,
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
					}
				})
			},
		});
	},
	closeCanvas: function () {
		this.setData({
			shareShow: false,
			canvasShow: true
		})
		this.ringChart();
	},
	preventDefauld: function() {
		
	}
})

