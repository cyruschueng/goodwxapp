// pages/user/info/modifyPwd.js

const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

function showMsg(content, callback) {
	wx.showModal({
		content: content,
		showCancel: false,
		success: callback
	});
}

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
		//加载用户信息
		requestUtil.get(urls.member.info, {}, (info) => {
			console.log(info);
			this.setData({ info });
		});
	},

	/**
	 * 提交数据
	 */
	onSubmit: function (e) {
		if (requestUtil.isLoading(this.submitRQId)) return;
		const values = e.detail.value;
		values.form_id = e.detail.formId;
		values.uid = this.data.info.uc_uid;

		if (values.oldpw == '') {
			showMsg('原密码不为空！'); return;
		}
		if (values.newpw == '') {
			showMsg('新密码不为空！'); return;
		}
		if (values.renewpw == '') {
			showMsg('确认密码不为空！'); return;
		}
		if (values.renewpw != values.newpw) {
			showMsg('两次密码不一致！'); return;
		}

		this.submitRQId = requestUtil.get(urls.member.modifyPwd, values, () => {
			showMsg("修改成功！", wx.navigateBack);
		});
	},
});