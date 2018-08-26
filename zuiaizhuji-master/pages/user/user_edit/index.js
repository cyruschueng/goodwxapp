var app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import {
    duoguan_host_api_url as API_URL,
    duoguan_user_info_post_url as API_USER_INFO_SAVE_URL,
    duoguan_user_info_url as API_USER_INFO_URL
} from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';

Page({
    data: {
        userInfo: {}
    },

    /**
     * 页面加载完成
     */
    onLoad: function () {
        this.onPullDownRefresh();
    },

    /**
     * 保存用户信息
     */
    formSubmit: function (e) {
        if (requestUtil.isLoading(this.submitId)) return;

        //保存用户信息
        this.submitId = requestUtil.post(API_USER_INFO_SAVE_URL, e.detail.value, (data) => {
            wx.showToast({
                title: '资料更新成功',
                icon: 'success',
                duration: 2000
            });
        });
    },

    //下拉刷新
    onPullDownRefresh: function () {
        //加载用户信息
        requestUtil.get(API_USER_INFO_URL, {}, (data) => {
            this.setData({ userInfo: data });
        }, this, { completeAfter: wx.stopPullDownRefresh });
    }
})