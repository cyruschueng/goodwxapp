import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import urls from '../urls';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        config: null
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
        const params = { name: 'config', cid: this.data.cid };
        requestUtil.get(urls.config.load, params, data => {
            const { config } = data;

            this.setData({ config: config });
        });
    },

    /**
     * 返回上一页
     */
    onBackTap: function () {
        wx.navigateBack({
            delta: 1,
        });
    }

});