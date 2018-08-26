//index.js
var network = require("../../utils/util.js")
import {index_newsList} from '../../url.js'
//获取应用实例
var app = getApp()
Page({
  data: {
    loading: true,
    curpage: 0,
    categoryData: [
      {
        category: "01",
        name: '推荐'
      },
      {
        category: "02",
        name: '视频'
      },
      {
        category: "03",
        name: '热点'
      }
    ],
    detaildata:[],
    listData:[],
    isSkip:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
    network.requestLoading(index_newsList,'','正在加载数据',function(res){
      console.log(res)
      that.setData({
        listData: res.data,
        detaildata:res.data[0]
      })
    },function(){
      wx.showToast({
        title:'加载数据失败',
      })
    }),
    //getshareInfo
    wx.getShareInfo()
  },
  //tab切换
  navClick(e){
    this.setData({
      loading:false
    })
    var that = this
    var idx = e.target.id;
    var listData = this.data.listData;
    if (idx == 1 || idx == "1"){
      this.data.isSkip = false;
    }else{
      this.data.isSkip = true;
    }
    var categoryLength = this.data.categoryData.length;
    for (var i = 0; i < categoryLength; i++){
      if(i == e.target.id){
        that.setData({
          curpage:e.target.id,
          detaildata: listData[idx]
        });
        break;
      }
    }
    setTimeout(function(){
      that.setData({
        loading: true
      })
    },500);
    
  },
  //查看文章详情
  onTapArticle(e){
    if (this.data.isSkip){
      var articleId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../detail/detail?id=' + articleId 
      })
    }
  }

  
  
})
