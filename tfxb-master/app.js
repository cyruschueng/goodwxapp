var config = require('./config');
var common = require('./asset/js/common.js');
var Server = config.service;
App({
	onLaunch: function () {
        getShareInfo();
	},
	onShow: function () {
	},
	onHide: function () {
	},
	globalData: {
        userreg: false,
        sharetips: "来挑战，我奉陪！",
        formIdArr: []
	}
});
// 礼品派发倒计时
function getShareInfo() {
    var inData = { key: "shareInfo" };
    wx.request({
        url: Server.getMsgInfoUrl,
        data: inData,
        success: function (res) {
            wx.hideLoading();
            var jsonData = res.data['data'];
            // 设置分享提示语
            if ((typeof (jsonData['value']) != 'undefined') && (jsonData['value'].length > 0)) {
                getApp().globalData.sharetips = jsonData['value'];
            }
        },
        fail: function (err) {
            wx.hideLoading();
            console.log(err);
        }
    })
}