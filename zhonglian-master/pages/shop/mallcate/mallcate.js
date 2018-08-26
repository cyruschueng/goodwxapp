const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data:{
        cate_list:[],
        glo_is_load:true
    },
    onLoad:function(){
      var that = this
      //商品分类
      _function.getShopCategory(that.initShopCateData,this)
    },
    initShopCateData:function(data){
    var that = this
      that.setData({
          cate_list:data.info,
          glo_is_load:false
      })
    },
    //跳转分类
    index_item_bind:function(e){
      wx.navigateTo({
        url: '../malllist/malllist?cid='+e.currentTarget.id+'&cname='+e.currentTarget.dataset.name
      })
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      _function.getShopCategory(that.initShopCateData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
})