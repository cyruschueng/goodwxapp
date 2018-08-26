// pages/index/index.js
const m_name = "index";
const app = getApp();

const $ = (name) => require(`../../utils/${name}.js`)[name];
const pg = $("pg");
const mp = $("mp");
const api = $("api");

function load(page, options) {
	console.log(`${m_name} onload options:${JSON.stringify(options)}`);

	mp.start(app, app.login.shareTicket);
}

Page({
	name: m_name,
	data: {
		name: `Hello ${app.userInfo.nickName}`,
	},

	onLoad: function (options) {
		load(this, options);
	},

	onShow: function () {
		this.setData({
			motto: `Hello ${app.userInfo.nickName}`,
		});
	},

	clickShare: function (ev) {
		console.log(`share with ${this.route}`);
	},
	
	clickClear: function(ev) {
		api.clearStorageSync();
	},

	onShareAppMessage: function (options) {
		return pg.share(this, options);
	},
})
