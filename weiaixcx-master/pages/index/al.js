//index.js
//获取应用实例
var common = require("../../utils/util.js");
var app = getApp();
const imgurl = app.globalData.imgUrl;

Page({
	data: {
		imgurl: imgurl,
		array: [{
			mode: 'scaleToFill',
			text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
		}],
		list_: [],//案例列表
		page: 1,//当前页
		last_page: 1,//总页数
	},
	onLoad: function () {
		this.getList()
	},
	// 案例列表
	getList: function () {
		var that = this
		common.httpG('anli/index', {}, function (data) {

			if (data.code == 0) {
				that.setData({
					list_: data.data.data,
					last_page: data.data.last_page
				})
			}
		})
	},
	onReachBottom: function () {

		// common.nextPage(api,param,callback);
		var that = this
		var page = this.data.page;
		var last_page = this.data.last_page;
		var list_ = this.data.list_;
		if (page >= last_page) {
			return;
		}
		//拉取下一页
		common.httpG('anli/index', {
			page: ++page,
		}, function (data) {
			if (data.code == 0) {
				that.setData({
					list_: list_.concat(data.data.data),
					page: data.data.current_page
				})
			}
		})
	}
})
