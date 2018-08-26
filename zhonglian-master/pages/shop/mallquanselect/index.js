const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data:{
        quan_list:[],
        glo_is_load:true
    },
    set_quan_bind:function(e){
        var qid = e.currentTarget.id;
        wx.redirectTo({
            url: '../mallsure/mallsure?quan_id='+qid
        });
    },
    onLoad:function(){
      var that = this;
      _function.getShopUserQuanlist(wx.getStorageSync("utoken"),0,that.initgetShopUserQuanlistData,that);
    },
    initgetShopUserQuanlistData:function(data){
      var that = this;
      if(data.code == 2){
            wx.showToast({
                title: '登陆中',
                icon: 'loading',
                duration: 10000,
                success:function(){
                    app.getNewToken(function(token){
                        _function.getShopUserQuanlist(wx.getStorageSync("utoken"),0,that.initgetShopUserQuanlistData,that);
                    })
                }
            })
            return false;
      }
      that.setData({
          quan_list:data.info,
          glo_is_load:false
      });
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      _function.getShopUserQuanlist(wx.getStorageSync("utoken"),0,that.initgetShopUserQuanlistData,that);
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
})