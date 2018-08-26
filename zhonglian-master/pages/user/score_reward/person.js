// pages/user/score_reward/person.js
const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
	choiceChecked: false,
    /**
     * 页面的初始数据
     */
	data: {
		checkIds: []
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		this.deptId = options.dept_id;
		this.onPullDownRefresh();
	},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
	onPullDownRefresh: function () {
		requestUtil.get(urls.ranking.departmentUsers, { dept_id: this.deptId }, (data, res) => {
			this.setData({ data, is_manager: res.is_manager, is_admin: res.is_admin, is_root: res.is_root });
		}, { completeAfter: wx.stopPullDownRefresh });
	},

    /**
     * 页面上拉触底事件的处理函数
     */
	onReachBottom: function () {

	},

    /**
     * 勾选被改变
     */
	onSelectChange: function (e) {
		this.setData({ checkIds: e.detail.value });
	},

    /**
     * 全选
     */
	onToggleChecked: function () {
		this.choiceChecked = !this.choiceChecked;
		var checkIds = [];
		_(this.data.data).map((item) => {
			item.checked = this.choiceChecked;
			if (this.choiceChecked) {
				checkIds.push(item.uid);
			}
		});
		this.setData({ data: this.data.data, checkIds: checkIds });
	},

    /**
    * 跳转页面
    */
	onNavigateTap: function (e) {
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	},

    /**
     * 奖励积分
     */
	onRewardTap: function (e) {
		var url = null;
		if (e.currentTarget.dataset.type == 0) {
			url = 'reward?type=0&dept_id=' + this.deptId;
		} else {
			url = 'reward?uids=' + this.data.checkIds.join(',');
		}
		wx.navigateTo({ url: url });
	}

})