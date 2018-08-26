var app = getApp();
var common = require("../../utils/util.js");
var wxRequest = require("../../utils/wxRequest.js");
var wxApi = require("../../utils/wxApi.js");
Page({
    data:{
        array: [],
        index:0,
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        habitId:0,
        items:{
            infos:[],
            showComment:false,
            showReply:false
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
        }
    },
    onLoad:function(){
        var that=this;
        app.ready(function(){
          that.getdetail();
          that.loadHabit();
        })
    },
    onShow: function () {
      var refresh = this.data.refresh;
      console.log(refresh);
      if (refresh == false) {
        this.setData({
          refresh: true
        })
      } else {
        app.checkSessionId(function () {
          that.init();
        }, function () {
          that.errorHandle();
        });
      }
    },
    bindPickerChange: function(e) {
        console.log(e);
        this.setData({
            index: e.detail.value
        })
        var habitId=this.data.array[this.data.index].habitId;
        this.setData({
          habitId:habitId,
          'items.infos':[]
        })
        this.getdetail();
    },
    getdetail:function(){
        var that=this;
        var pageIndex = this.data.paging.pageIndex;
        var url = app.globalData.host + "/api/habit/detail/my"
        if (this.data.habitId != 0) url = app.globalData.host + "/api/habit/detail/my/habitid"
        
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
      if (res.data.succcess == true) {
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
    loadHabit:function(){
        var that=this;
        var url = app.globalData.host +'/api/habit/my/list';
        var data = JSON.stringify({
          sessionid: wx.getStorageSync("sessionId")
        });
        wxRequest.postRequest(url,data).then(res=>{
          if (res.data.success == true) {
            var item = {
              finish: 0,
              id: 0,
              habitId: 0,
              imgurl: '',
              title: '所有的'
            }
            res.data.list.unshift(item);
            that.setData({
              array: res.data.list
            })
          }else if (res.data.success == false && res.data.sourse == "session") {
            that.errorHandle();
          }
        })
    },
    showToast: function () {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
    },
    errorHandle: function () {
      wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/my/my', 'opentype': 'switchTab' });
    }
})
