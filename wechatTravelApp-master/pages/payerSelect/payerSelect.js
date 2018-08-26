const app = getApp()

Page({
	data: {
		title: {
			location: '',
			time: ''
		},
		payers: [],
		index: [],
		payersId: [],
	},
	onShow: function () {
		var pages = getCurrentPages()
		var prevPage = pages[pages.length - 3];
		var lastPage = pages[pages.length - 2];
		let payersArr = this.getUsers(lastPage.data.guest.guestId);
		this.setData({
			title: {
				location: prevPage.data.title.location,
				time: prevPage.data.title.time
			},
			payers: payersArr,
		})
	},
	getUsers: function (data) {
		console.log(data);
		if (!data || data.length == 0) {
			return [{
				userImage: app.globalData.avatarUrl,
				userName: app.globalData.nickName,
				userId: app.globalData.id,
				checkUrl: '../../images/member_yes.png',
				checkBool: true
			}]
		} else {
			var dataArr = [];
			for (let i = 0; i < app.globalData.users.length; i ++) {
				let dataPer = {};
				dataPer.userImage = app.globalData.users[i].avatarUrl;
				dataPer.userName = app.globalData.users[i].nickName;
				dataPer.userId = app.globalData.users[i].id;
				dataPer.checkUrl = '../../images/member_no.png';
				dataPer.checkBool = false;
				for(let j = 0; j < data.length; j++) {
					if(dataPer.userId === data[j].id) {
						dataPer.checkBool = true;
						dataPer.checkUrl = '../../images/member_yes.png';
						break;
					}
				}
				dataArr.push(dataPer);
			}
			console.log(dataArr);
			return dataArr;
		}
	},
	checkStatus: function (e) {
		var i = e.currentTarget.dataset.index
		console.log(i)
		if (this.data.payers[i].checkBool) {
			this.data.payers[i].checkUrl = '../../images/member_no.png'
			this.data.payers[i].checkBool = false
			this.setData({
				payers: this.data.payers
			})
		} else {
			this.data.payers[i].checkUrl = '../../images/member_yes.png'
			this.data.payers[i].checkBool = true
			this.setData({
				payers: this.data.payers
			})
		}
	},
	// 这里可以进行反选，所以最后会出现全部清空的状况
	payerChoose: function () {
		var pages = getCurrentPages()
		var prevPage = pages[pages.length - 2]
		let that = this
		let guestObjectArr = [], indexArr = [], idArr = []
		for (let j = 0; j < that.data.payers.length; j++) {
			let guestObject = {};
			if (that.data.payers[j].checkBool) {
				guestObject.imageUrl = that.data.payers[j].userImage;
				guestObject.userName = that.data.payers[j].userName;
				guestObject.userId = that.data.payers[j].userId;
				guestObjectArr.push(guestObject);
				idArr.push({"id": guestObject.userId});
				indexArr.push(j);
			}
		}
		console.log(guestObjectArr, indexArr, idArr)
		if (!indexArr || indexArr.length == 0) {
			wx.showModal({
				title: '提示',
				content: '您还未选择参与人！', 
				confirmText: '我知道了',
				confirmColor: '#39a6ff',
				showCancel: false
			})
		} else {
			prevPage.setData({
				guest: {
					guestInfo: guestObjectArr,
					guestId: idArr
				}
			})
			console.log(prevPage.data.guest)
			setTimeout(function () {
				wx.navigateBack({
					delta: 1
				})
			}, 200)
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
