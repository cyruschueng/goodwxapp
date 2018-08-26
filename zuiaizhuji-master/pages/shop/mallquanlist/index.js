// mallcart.js
const _function = require('../../../utils/functionData');
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
const app = getApp();
Page({
    data:{
        quan_list:[],
        glo_is_load:true
    },
    onLoad:function(){
      var that = this;
      // _function.getShopUserQuanlist(wx.getStorageSync("utoken"),-1,that.initgetShopUserQuanlistData,that);
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getUserQuanlist.html',
        { qtype: -1 },
        (data) => {
          that.initgetShopUserQuanlistData(data)
        }, this, { isShowLoading: false });
    },
    initgetShopUserQuanlistData:function(data){
      var that = this;
      that.setData({
          quan_list:data,
          glo_is_load:false
      });
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      // _function.getShopUserQuanlist(wx.getStorageSync("utoken"),-1,that.initgetShopUserQuanlistData,that);
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getUserQuanlist.html',
        { qtype: -1 },
        (data) => {
          that.initgetShopUserQuanlistData(data)
        }, this, { isShowLoading: false });
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
})