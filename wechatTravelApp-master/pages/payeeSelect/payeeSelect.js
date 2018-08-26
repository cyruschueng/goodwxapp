const app = getApp();
Page({
	data: {
		title: {
			location: '',
			time: ''
		},
		payees: [
		],
		index: -1,
	},
	onShow: function () {
		var pages = getCurrentPages();
		var prevPage = pages[pages.length - 3]
		var lastPage = pages[pages.length - 2]
		let payeesArr = this.getUsers(app.globalData.users)
		this.setData({
			title: {
				location: prevPage.data.title.location,
				time: prevPage.data.title.time
			},
			payees: payeesArr,
			index: lastPage.data.host.hostIndex
		})
		this.checkedFunc(lastPage.data.host.hostIndex)
	},
	getUsers: function (data) {
		if (!data || data.length == 0) {
			return [{
				userImage: app.globalData.avatarUrl,
				userName: app.globalData.nickName,
				userId: app.globalData.id,
				checkUrl: '../../images/member_no.png',
				checkBool: false,
			}]
		} else {
			var dataArr = [];
			for (let i = 0; i < app.globalData.users.length; i++) {
				let dataPer = {};
				dataPer.userImage = app.globalData.users[i].avatarUrl;
				dataPer.userName = app.globalData.users[i].nickName;
				dataPer.userId = app.globalData.users[i].id;
				dataPer.checkUrl = '../../images/member_no.png';
				dataPer.checkBool = false;
				dataArr.push(dataPer);
			}
			console.log('付款人：', dataArr)
			return dataArr;
		}
	},
	checkStatus: function (e) {
		var i = e.currentTarget.dataset.index
		console.log(i)
		this.setData({
			index: i
		})
		this.checkedFunc(i)
	},
	// 这里是只能选择一个，所以最后index值要么不会变化，为-1，要么就一定会有一个值
	submitPayeeForm: function () {
		var pages = getCurrentPages()
		var prevPage = pages[pages.length - 2]
		if (this.data.index < 0) {
			wx.showModal({
				title: '提示',
				content: '您还未选择付款人！', 
				confirmText: '我知道了',
				confirmColor: '#39a6ff',
				showCancel: false
			})
		} else {
			let that = this,
			hostUrl = that.data.payees[this.data.index].userImage,
			hostId = that.data.payees[that.data.index].userId;
			prevPage.setData({
				host: {
					hostUrl: hostUrl,
					hostId: hostId,
					hostIndex: that.data.index
				}
			})
			console.log(prevPage.data.host)
			setTimeout(function () {
				wx.navigateBack({
					delta: 1
				})
			}, 200)
		}
},
	checkedFunc: function (i) {
		let that = this
		for (var j = 0; j < that.data.payees.length; j++) {
			if (j == i) {
				that.data.payees[j].checkUrl = '../../images/member_yes.png'
				this.data.payees[j].checkBool = true
				that.setData({
					payees: that.data.payees
				})
			} else {
				that.data.payees[j].checkUrl = '../../images/member_no.png'
				that.data.payees[j].checkBool = false
				that.setData({
					payees: that.data.payees
				})
			}
		}
	},
	onShareAppMessage: function (res) {
		let that = this;
		if (res.from === 'button') {
			console.log(app.globalData.accountbookId);
			return {
				title: app.globalData.nickName + '邀请你加入账本' + that.data.title.location + '(' + that.data.title.time + ')',
				path: 'pages/addToAccount/addToAccount?accountbookId=' + app.globalData.accountbookId + '&fromUserId=' + app.globalData.id,
				imageUrl: '../../images/share_homepage.jpg',
			}
		}
	}
})
