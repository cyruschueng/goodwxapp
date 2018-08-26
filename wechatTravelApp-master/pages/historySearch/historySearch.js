const app = getApp()

Page({
  data: {
    historyList: [],
    have: 'have',
    none: ''
  },
	onShow: function () {
		var that = this;
		let [publicPath, bookId] = [app.globalData.publicPath, app.globalData.accountbookId];
		// 向后台发起请求
		wx.request({
			url: publicPath + '/api/v1/histories/account_book/' + bookId,
			method: 'GET',
			header: {
				'content-type': 'application/json'
			}, 
			success: res => {
				console.log(res.data)
				// 把账单数据取出来
				let bills = res.data
				let historyList = [], historyPer = {}
				for (let i = 0; i < bills.length; i ++) {
					historyPer = {}
					historyPer.done = bills[i].operation
					historyPer.sort = that.cateToSort(bills[i].category)
					historyPer.price = bills[i].sum / 100
					historyPer.operatorId = bills[i].operatorId
					// 拿到用户头像和姓名
					historyPer.imageUrl = that.findUser(bills[i].operatorId, 1)
					historyPer.name = that.findUser(bills[i].operatorId, 2)
					historyList.unshift(historyPer)
					console.log(historyPer, bills[i].id)
				}
				that.setData({
					historyList: historyList
				})
				// 判断当前页面是否有数据需要渲染
				console.log(that.data.historyList)
				if (that.data.historyList.length == 0 || !that.data.historyList) {
					that.setData({
						none: '',
						have: 'have'
					})
				} else {
					that.setData({
						none: 'none',
						have: ''
					})
				}
			},
			fail: res => {
				console.log("failed", res)
			}
		})
	},
	findUser: function (num, funcnum) {
		for (let j = 0; j < app.globalData.users.length; j ++) {
			if (num == app.globalData.users[j].id && funcnum == 1) {
				return app.globalData.users[j].avatarUrl
			} else if (num == app.globalData.users[j].id && funcnum == 2) {
				return app.globalData.users[j].nickName
			}
		}
	},
	cateToSort: function (cate) {
		if (!cate) {
			cate = "餐饮"
		}
		return cate
	}
})