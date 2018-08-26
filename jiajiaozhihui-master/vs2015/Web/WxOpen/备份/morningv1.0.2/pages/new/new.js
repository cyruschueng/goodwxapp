var common = require("../../utils/util.js")
var wxApi = require("../../utils/wxApi.js");
var wxRequest = require("../../utils/wxRequest.js");

var app = getApp()
Page({
    data: {
        tabs: ["推荐","关注","查找"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        habitId:0,
        items:{
            infos:[],
            showComment:false,
            showReply:false
        },
        swiperImages:{
            imgUrls:[]
        },
        paging:{
            startIndex:1,
            endIndex:10,
            pageTotal:0,
            pageIndex:0,
            step:10,
            end:false,
            busy:false
        },
        refresh:false,
        userInfo:{},
        
        
        comment:{
            detailId:0,
            index:0,
        },
        reply:{
            detailId:0,
            index:0,
            commentId:0,
            nickName:"" 
        },
        formatDate:function(date){
          return common.formatDate(date)
        }
    },
    onLoad: function (options) {
        var that=this;
        app.ready(function(){
          that.getdetail();
        })
        that.initTab();
        this.setData({
            'swiperImages.imgUrls':[
                '/pages/image/a.jpg',
                '/pages/image/b.jpg',
                '/pages/image/c.jpg'
            ]
        });
        app.getUserInfo(function (userInfo) {
          that.setData({
            userInfo: userInfo
          })
        })
    },
    onShareAppMessage:function(res){
        return{
            title:'自定义转发标题',
            path:'/pages/news/news',
            success:function(res){
                console.log(res);
            },fail:function(res){
                console.log(res);
            }
        }
    },
    initTab:function(){
        var that=this;
        var sliderWidth=100;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: (res.windowWidth / that.data.tabs.length) * that.data.activeIndex
                });
            }
        });
    },      
    tabClick: function (e) {
        console.log(e);
         var index=e.currentTarget.id;
         console.log("index="+index);
         if(index=="2"){
             wx.navigateTo({
                 url:'/pages/habits/habits'
             })
         }
         this.setData({
             sliderOffset: e.currentTarget.offsetLeft,
             activeIndex: e.currentTarget.id
         });
     },
     getdetail:function(f){
        var that = this;
        var pageIndex = this.data.paging.pageIndex;
        var url = app.globalData.host + "/api/habit/detail/all";
        var data = JSON.stringify({
          habitid: this.data.habitId,
          startindex: this.data.paging.startIndex,
          endindex: this.data.paging.endIndex,
          sessionid: wx.getStorageSync("sessionId")
        });
        this.showToast();
        wxRequest.postRequest(url, data).then(res => {
          if (res.data.success == true) {
            that.setData({
              'items.infos': that.updateSourse(res.data.list),
              'paging.pageTotal': res.data.total,
              'paging.busy': false,
              'paging.pageIndex': (pageIndex + 1)
            });
          } else if (res.data.success == false && res.data.sourse == "session") {
            that.errorHandle();
          }
        }).finally(function (res) {
          wx.hideToast()
        });
    },
     updateLike: function (e) {
       var that = this;
       var index = e.currentTarget.dataset.index;
       var existLike = common.findArryIndex(this.data.items.infos[index].like.list, app.globalData.userInfo.avatarUrl);
       if (existLike == -1) {
         this.addLike(index);
       } else {
         this.removeLike(index);
       }
       var url = app.globalData.host + '/api/like/' + this.data.habitId + '/' + e.currentTarget.dataset.detailid + '/' + wx.getStorageSync("sessionId");
       wxRequest.postRequest(url, null).then(res => {
         if (res.data.success == false && res.data.sourse == "session") {
           that.errorHandle();
         }
       })
  },
  addLike:function(index){
    var headImgUrl=app.globalData.userInfo.avatarUrl;
    var m=this.data.items.infos[index].like.list;
    m.push(headImgUrl)
    this.setData({
      ['items.infos['+index+'].like.list']:m,
      ['items.infos['+index+'].like.isLike']:true,
    })
  },
  removeLike:function(index){
    var m= this.data.items.infos[index].like.list;
    var headImgUrl=app.globalData.userInfo.avatarUrl;
    common.removeByValue(m,headImgUrl);
    this.setData({
      ['items.infos['+index+'].like.list']:m,
      ['items.infos['+index+'].like.isLike']:false,
    })
  },
  showComment:function(e){
    console.log(e);
    if(this.data.items.showComment==false){
      this.setData({
        'items.showComment':true,
        comment:{
          detailId:e.currentTarget.dataset.detailid,
          index:e.currentTarget.dataset.index
        }
      })
    }else{
      this.setData({
        'items.showComment':false,
        comment:{
          detailId:0,
          index:0
        }
      })
    }
  },
  showReply:function(e){
    console.log(e);
    if(this.data.items.showReply==false){
      this.setData({
        'items.showReply':true,
        reply:{
          detailId:e.currentTarget.dataset.detailid,
          commentId:e.currentTarget.dataset.commentid,
          nickName:e.currentTarget.dataset.nickname,
          index:e.currentTarget.dataset.index
        }
      })
    }else{
      this.setData({
        'items.showReply':false,
        reply:{
          detailId:0,
          commentId:0,
          nickName:"",
          index:0
        }
      })
    }
  },
  hideComment:function(){
    this.setData({
      'items.showComment':false
    })
  },
  hideReply:function(e){
    var host=app.globalData.host;
    this.setData({
      'items.showReply':false
    })
  },

  addComment: function (e) {
    console.log("add comment bindblur");
    console.log(e);
    if (e.detail.value == "") return;
    var that = this;
    var index = this.data.comment.index;

    var url = app.globalData.host + '/api/comment/add';
    var data = JSON.stringify({
      comment: e.detail.value,
      detailid: this.data.comment.detailId,
      sessionid: wx.getStorageSync("sessionId"),
      habitid: this.data.habitId
    });
    wxRequest.postRequest(url, data).then(res => {
      console.log("add comment");
      console.log(res);
      if (res.data.success == true) {
        var m = that.data.items.infos[index].comment;
        m.push({ id: res.data.id, name: res.data.nickName, message: res.data.comment });
        that.setData({
          ['items.infos[' + index + '].comment']: m
        });
      } else if (res.data.success == false && res.data.sourse == "session") {
        that.errorHandle();
      }
    });
  },
  addReply: function (e) {
    if (e.detail.value == "") return;
    var that = this;
    var index = this.data.reply.index;
    var url = app.globalData.host + '/api/comment/reply';
    var data = JSON.stringify({
      comment: e.detail.value,
      commentid: this.data.reply.commentId,
      detailid: this.data.reply.detailId,
      sessionid: wx.getStorageSync("sessionId"),
      habitid: this.data.habitId
    });
    wxRequest.postRequest(url, data).then(res => {
      if (res.data.success == true) {
        var m = that.data.items.infos[index].comment;
        m.push({ id: res.data.id, name: res.data.nickName, message: res.data.comment });
        that.setData({
          ['items.infos[' + index + '].comment']: m
        });
      } else if (res.data.success == false && res.data.sourse == "session") {
        that.errorHandle();
      }
    })
  },
  onShow:function(){
        var refresh=this.data.refresh;
        console.log(refresh);
        if(refresh==false){
            this.setData({
                refresh:true
            })
        }else{
            this.getdetail();
            this.setData({
                sliderOffset:0,
                activeIndex:0
            });
        }
    },
    //*生新生成成查询查询范下限
    startindex:function (){
      var pageIndex=this.data.paging.pageIndex;
      var step=this.data.paging.step;
      var c=(pageIndex*step)+1;
      return c;
    },
    //*生新生成成查询查询范上限
    endIndex:function (){
      var pageIndex=this.data.paging.pageIndex;
      var step=this.data.paging.step;
      var c=(pageIndex+1)*step;
      return c;
    },
    //上拉更新数据源
    updateSourse:function(newList){
      var list=this.data.items.infos;
      list.push.apply(list,newList);
      return list;
    },
    //下拉刷新
    onPullDownRefresh:function(){
      console.log("onPullDownRefresh");
      var busy= this.data.paging.busy;
      if(this.data.paging.busy==false){
        this.setData({
          'paging.startIndex':1,
          'paging.endIndex':10,
          'paging.busy':true,
          'items.infos':[]
        })
        this.getdetail();
      }
    },
    //上拉加载
    onReachBottom:function(){
      console.log("onReachBottom");
      var busy= this.data.paging.busy;
      console.log(busy);
      if(this.data.paging.busy==false){
        var total=this.data.paging.pageTotal;
        console.log("total:"+total);
        var currEndIndex=(this.data.paging.pageIndex+1)*this.data.paging.step;
        console.log("currEndIndex:"+currEndIndex);
        if(currEndIndex>total) return;
        var startIndex=this.startindex();
        var endIndex=this.endIndex();
        this.setData({
          'paging.busy':true,
          'paging.startIndex':startIndex,
          'paging.endIndex':endIndex
        })
        this.getdetail();
      }
    },
    showToast: function () {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
    },
    errorHandle: function () {
      wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/new/new', 'opentype': 'switchTab' });
    }
 });