// app.js

const api = require('utils/api.js').api;
const db = require('utils/db.js').db;
const mp = require('utils/mp.js').mp;
const mq = require('utils/mq.js').mq;

/*
const updateManager = wx.getUpdateManager();

updateManager.onCheckForUpdate(v => console.log(`hasUpdate=${v.hasUpdate}`))

updateManager.onUpdateReady(function () {
	console.log(`update ready, apply update`);

	updateManager.applyUpdate();
})

updateManager.onUpdateFailed(function () {
	// 新的版本下载失败
})
*/

function load(app, options) {
	let names = [
		"group",
		"guide",
		"index",
		"list",
		"manage",
		"notice",
		"vote",
	];

	console.log(`app launch options=${JSON.stringify(options)}`);

	names.map(v => app.mq.addTopic(v));

	api.getUserInfoEx(app);

	// load user
	// todo: load group
	db.user.load(app.user);

	wx.showShareMenu({
		withShareTicket: true
	});
}

function show(app, options) {
	app.options = options;

	if (1044 == app.options.scene) {
		let login = app.login;

		login.shareTicket = options.shareTicket;
		login.query = options.query;
	}

	console.log(`app show options=${JSON.stringify(options)}`);
}

App({
	onLaunch: function (options) {
		load(this, options);
	},

	onShow: function (options) {
		show(this, options);
	},

	user: {},
	groups: {},
	userInfo: {
		nickName: "SB",
	},

	login: {},
	options: {},

	mq: new mq(),
	__i_m_app__: true,
});
