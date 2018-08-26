const app = getApp();
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
Page({
    data: {
        cate_one_data: [],
        this_cate_id:0,
        glo_is_load: true
    },
    swiper_top_bind: function (e) {
        var that = this;
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    goods_search_bind: function (e) {
        var s_key = e.detail.value;
        wx.navigateTo({
            url: '../malllist/malllist?keywords=' + s_key
        });
    },
    mall_list_bind: function (e) {
        wx.navigateTo({
            url: '../malllist/malllist?cid=' + e.currentTarget.id
        })
    },
    onLoad: function (options) {
        var that = this;
        requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getCateList', {}, (info) => {
            that.setData({ cate_one_data: info, glo_is_load: false })
        });
    },
    cate_item_bind:function(e){
        var that = this;
        var cate_id = e.currentTarget.id;
        var seid = e.target.dataset.cid;
        that.setData({ this_cate_id: cate_id, classifyViewed: seid});
    }
})