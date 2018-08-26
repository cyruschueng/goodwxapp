var _function = require('../../../utils/functionData');
var app = getApp()
//选项卡
Page({
  data: {
      cateList:[]
    },
    //显示隐藏
    isShow_bind:function(e){
      var that = this
      var datas = that.data.cateList
      for(var i=0;i<datas.length;i++){
          if(datas[i].id == e.currentTarget.id){
              var isShow = (datas[i].isshow == true)?false:true;
              datas[i].isshow = isShow
          }
      }
      that.setData({
          cateList:datas,
      })
    },
    onShow:function(){
      var that = this
      //请求板块列表
      _function.getBbsCategory(that.initBbsCateData,this)
    },
    initBbsCateData:function(data){
      var that = this
      that.setData({
          cateList:data.info,
      })
    },
    //跳转板块
    forumlist_bind:function(e){
      wx.navigateTo({
        url: '../forumlist/forumlist?wid='+e.currentTarget.id+'&cname='+e.currentTarget.dataset.name
      })
    },
    //下拉刷新
    onPullDownRefresh:function(){
      var that = this
      _function.getBbsCategory(that.initBbsCateData,this)
      setTimeout(()=>{
        wx.stopPullDownRefresh()
      },1000)
    },
})