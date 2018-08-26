// api.js
const $ = (name) => require(`${name}.js`)[name];
const helper = $('helper');
const deft = $('deft');

function wxlog(name, param) {
	if (param) {
		console.log(`wx: ${name} ${JSON.stringify(param)}`);
	} else {
		console.log(`wx: ${name}`);
	}
}

function promisify(fn, name, param) {
	wxlog(name, param);

	return helper.promisify(fn, param);
}

const api = {
	sence: {
		found: 1001, 				// 发现栏小程序主入口
		topSearch: 1005, 			// 顶部搜索框的搜索结果页
		foundSearch: 1006,			// 发现栏小程序主入口搜索框的搜索结果页
		peerChatMpCard: 1007,		// 单人聊天会话中的小程序消息卡片
		groupChatMpCard: 1008,		// 群聊会话中的小程序消息卡片
		/*
		scanQR: 1011,				// 扫描二维码
		pictureQR: 1012,			// 长按图片识别二维码
		*/
		topChat: 1022,				// 聊天顶部置顶小程序入口
		shareTicket: 1044,			// 带 shareTicket 的小程序消息卡片
		scanMpQR: 1047,				// 扫描小程序码
		pictureMpQR: 1048, 			// 长按图片识别小程序码
		albemMpQR: 1049,			// 手机相册选取小程序码
		scanScanResult: 1053,		// 搜一搜的结果页
		wxTop: 1089,				// 微信聊天主界面下拉
	},

	alert: (content) => api.showModal({ title: "alert", content }),

	getStorageSync: (k) => {
		let action = "wx: get storage";

		try {
			let v = wx.getStorageSync(k);

			console.log(`${action} k:${k} v:${JSON.stringify(v)}`);

			return v;
		} catch (e) {
			console.error(`${action} k:${k} error:${e}`);

			return {};
		}
	},

	setStorageSync: (k, v) => {
		let action = "wx: set storage";

		try {
			wx.setStorageSync(k, v);

			console.log(`${action} k:${k} v:${JSON.stringify(v)}`);
		} catch (e) {
			console.error(`${action} k:${k} v:${JSON.stringify(v)} error:${e}`);
		}

		return v;
	},

	removeStorageSync: (k) => {
		let action = "wx: remove storage";

		try {
			wx.removeStorageSync(k);

			console.log(`${action} k:${k}`);
		} catch (e) {
			console.error(`${action} k:${k} error:${e}`);
		}
	},

	clearStorageSync: () => {
		let action = "wx: clear storage";

		try {
			wx.clearStorageSync();

			console.log(action);
		} catch (e) {
			console.error(`${action} error:${e}`);
		}
	},

	request: (param = { url, method, data }) => promisify(wx.request, "request", param),

	login: (timeout = deft.timeout) => promisify(wx.login, "login", { timeout }),

	checkSession: () => promisify(wx.checkSession, "checkSession"),

	authorize: (scope) => promisify(wx.authorize, "authorize", { scope }),

	getUserInfo: () => promisify(wx.getUserInfo, "getUserInfo", {
		lang: deft.lang.zhCN,
		timeout: deft.timeout,
	}),

	getUserInfoEx: (app) => api.getUserInfo().then(v => {
		Object.assign(app.userInfo, v.userInfo);

		console.log(`getUserInfoEx=${JSON.stringify(app.userInfo)}`);
	}),

	requestPayment: ({ timeStamp, nonceStr, prepay_id, signType = "MD5", paySign }) =>
		promisify(wx.requestPayment, "requestPayment", {
			timeStamp,
			nonceStr,
			package: `prepay_id=${prepay_id}`,
			signType,
			paySign,
		}),

	getShareInfo: (shareTicket, timeout = deft.timeout) =>
		promisify(wx.getShareInfo, "getShareInfo", { shareTicket, timeout }),

	showLoadingEx: (title, ms = 2000) => {
		wxlog("showLoading", { title, ms });

		wx.showLoading({
			title,
			mask: true,
			success: v => setTimeout(() => wx.hideLoading(), ms),
			fail: e => wx.hideLoading(),
		})
	},

	hideLoadingEx: () => {
		wxlog("hideLoading");

		// wx.hideLoading();
	},

	showModal: (title, content) => promisify(wx.showModal, "showModal", { title, content }),

	navigateTo: (url) => promisify(wx.navigateTo, "navigateTo", { url }),

	navigateToEx: (name, param = {}) => api.navigateTo(helper.url(name, param)),

	redirectTo: (url) => promisify(wx.redirectTo, "redirectTo", { url }),

	redirectToEx: (name, param = {}) => api.redirectTo(helper.url(name, param)),

	switchTab: (url) => promisify(wx.switchTab, "switchTab", { url }),

	reLaunch: (url) => promisify(wx.reLaunch, "reLaunch", { url }),
};

module.exports = {
	api: api,
};
