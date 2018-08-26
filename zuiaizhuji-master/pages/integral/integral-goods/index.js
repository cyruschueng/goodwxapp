// pages/integral-goods/index.js
import Page2 from '../page2.js';
import { duoguan_host_api_url as API_URL } from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';

Page2({

	/**
	 * 页面的初始数据
	 */
    data: {
        id: 0,//商品id
        hasExchange: false,//是否可以兑换
    },

	/**
	 * 生命周期函数--监听页面加载
	 */
    onLoad: function (options) {
        if (!options.id) {
            wx.showModal({ content: '参数错误！', showCancel: false, });
            return;
        }

        if (wx.hideShareMenu) wx.hideShareMenu();

        this.data.id = options.id;
        this.startPullDownRefresh();
    },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
    onPullDownRefresh: function () {
        console.log('onPullDownRefresh ...');
        requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanIntegral/Api/getGoodsDetail.html", { id: this.data.id }, (data) => {
            data.end_time_text = util.format(data.end_time * 1000, 'yyyy-MM-dd');
            this.setData(data);
            console.log(data);
            if (wx.showShareMenu) wx.showShareMenu();
            requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
                const hasExchange = !data.is_end_time && (parseFloat(info.score) >= parseFloat(data.sale_price));
                this.setData({ hasExchange: hasExchange });
            });
        }, this, { completeAfter: wx.stopPullDownRefresh });
        console.log('onPullDownRefresh 。。。');
    },

	/**
	 * 兑换商品
	 */
    onExchangeSubmit: function (e) {
        const isCancel = e.detail.target.dataset.type == 'cancel';
        requestUtil.pushFormId(e.detail.formId);
        if (!isCancel) {
            requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanIntegral/Api/exchangeGoods.html", { id: this.data.id }, (info) => {
                this.setData({ exchange: info, isShowExchangeDialog: false });
            });
        } else {
            this.setData({ isShowExchangeDialog: false });
        }
    },

	/**
	 * 用户点击右上角分享
	 */
    onShareAppMessage: function () {
        return {
            title: this.data.title,
            path: 'pages/integral/integral-goods/index?id=' + this.data.id
        };
    }
});