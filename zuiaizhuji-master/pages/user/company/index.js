// pages/user/company/index.js
import requestUtil from '../../../utils/requestUtil';
import wxParse from '../../../wxParse/wxParse.js'
import {
	duoguan_host_api_url as API_URL
} from "../../../utils/data";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.onPullDownRefresh();
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanUser/Api/getCompany.html", {}, (res) => {
			res.isLoaded = true;
			this.setData(res);
			wxParse.wxParse('content', 'html', res.content, this) // 处理富文本
		}, this, { completeAfter: wx.stopPullDownRefresh });
	},

	/**
	 * 拨打电话
	 */
	onCallPhoneTap: function () {
		wx.makePhoneCall({
			phoneNumber: this.data.tel,
		});
	},

	/**
	 * 复制信息
	 */
	onCopyTap: function (e) {
		const dataset = e.currentTarget.dataset, value = dataset.value;
		wx.setClipboardData({
			data: value,
			success: function (res) {
				wx.showToast({ title: '复制成功！' });
			}
		});
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})