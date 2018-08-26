var common = require("../../utils/util.js")
var app = getApp()
Page({
    data: {
        tabs: ["热门推荐","排行榜"],
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
        },
        habit:{
          info:{},
          isJoin:false
        },
        ranks:{
          top3:[],
          top:[]
        },
        canShare: wx.canIUse('button.open-type.share')
    },
    onLoad: function (options) {
        var that = this;
        this.setData({
          habitId: options.habitid
        })
        wx.showShareMenu({
          withShareTicket: true
        })
        this.initTab();
        this.getRank();
        
        app.checkSessionId(function () {
          that.getdetail();
          that.getHabitInfo();
        })
        
    },
    onShareAppMessage:function(res){
        return{
            title:'我的'+this.data.habit.info.title+'习惯是这样养成的',
            path:'/pages/detail/detail?habitid='+this.data.habitId,
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
         this.setData({
             sliderOffset: e.currentTarget.offsetLeft,
             activeIndex: e.currentTarget.id
         });
     },
     getdetail:function(){
        var that=this;
        var sessionid= wx.getStorageSync("sessionId");
        var startIndex=this.data.paging.startIndex;
        var endIndex=this.data.paging.endIndex;
        var pageIndex=this.data.paging.pageIndex;
        var host=app.globalData.host;
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: host+"/api/habit/detail/habitid",
            method: 'POST',
            data:JSON.stringify({
              habitid:this.data.habitId,
              startindex:startIndex,
              endindex:endIndex,
              sessionid:sessionid
            }),
            success: function(res) {
                console.log("sodlddllddddddddddd");
                console.log(res);
                if(res.data.success==true){
                  that.setData({
                      'items.infos':that.updateSourse(res.data.list),
                      'paging.pageTotal':res.data.total,
                      'paging.busy':false,
                      'paging.pageIndex':(pageIndex+1)
                  });
                }else if(res.data.success==false && res.data.sourse=="session"){
                  app.checkSessionId(function () {
                    that.getdetail();
                    that.getHabitInfo();
                  })
                }
            },
            complete:function(){
                wx.hideToast()
            }
        })
    },
    updateLike:function(e){
      var that=this;
      var sessionid= wx.getStorageSync("sessionId");
      var index= e.currentTarget.dataset.index;
      var detailid=e.currentTarget.dataset.detailid;
      var host=app.globalData.host;
      var list= this.data.items.infos[index].like.list;
      var existLike=common.findArryIndex(list,app.globalData.userInfo.avatarUrl);
      if(existLike==-1){
        this.addLike(index);
      }else{
        this.removeLike(index);
      }
      wx.request({
        url: host+"/api/like/"+this.data.habitId+"/"+detailid+"/"+sessionid,
        method: 'POST',
        success: function(res) {
          if(res.data.success==false && res.data.sourse=="session"){
            app.checkSessionId(function () {
              that.getdetail();
              that.getHabitInfo();
            })
          }
        },
        complete:function(){
          
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
  addComment:function(e){
      if(e.detail.value=="") return;
      console.log("addcomment");
      console.log(e);
      var that=this;
      var index=this.data.comment.index;
      var host=app.globalData.host;
      var sessionId= wx.getStorageSync("sessionId");
      
      wx.request({
        url: host+"/api/comment/add",
        method: 'POST',
        data:JSON.stringify({
          comment:e.detail.value,
          detailid:this.data.comment.detailId,
          sessionid:sessionId,
          habitid:this.data.habitId
        }),
        success: function(res) {
          console.log(res);
          if(res.data.succcess==true){
              var m= that.data.items.infos[index].comment;
              m.push({id:res.data.id,name:res.data.nickName,message:res.data.comment});
              that.setData({
              ['items.infos['+index+'].comment']:m
          });
          }else if(res.data.success==false && res.data.sourse=="session"){
            app.checkSessionId(function () {
              that.getdetail();
              that.getHabitInfo();
            })
          }
        }
    })
  },
  addReply:function(e){
      console.log(e)
      if(e.detail.value=="") return;
      var that=this;
      var host=app.globalData.host;
      var index=this.data.reply.index;
      var sessionId= wx.getStorageSync("sessionId");
      wx.request({
        url: host+"/api/comment/reply",
        method: 'POST',
        data:JSON.stringify({
          comment:e.detail.value,
          commentid:this.data.reply.commentId,
          detailid:this.data.reply.detailId,
          sessionid:sessionId,
          habitid:this.data.habitId
        }),
        success: function(res) {
          if(res.data.success==true){
            var m= that.data.items.infos[index].comment;
            m.push({id:res.data.id,name:res.data.nickName,message:res.data.comment});
            that.setData({
              ['items.infos['+index+'].comment']:m
            });
          }else if(res.data.success==false && res.data.sourse=="session"){
            app.checkSessionId(function () {
              that.getdetail();
              that.getHabitInfo();
            })
          }
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
    getHabitInfo:function(){
      var that=this;
      var sessionid= wx.getStorageSync("sessionId");
      var host=app.globalData.host;
      var data=JSON.stringify({
        sessionid:sessionid,
        habitid:this.data.habitId
      });
      wx.request({
        url: host+'/api/habit/info',
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log(res);
          if(res.data.success==true){
            that.setData({
              habit:{
                info:res.data.info,
                isJoin:res.data.isJoin
              },
            });
            wx.setNavigationBarTitle({
              title: res.data.info.title,
              success: function(res) {
                // success
              }
            }) 
          }else if(res.data.success==false && res.data.sourse=="session"){
            app.checkSessionId(function () {
              that.getdetail();
              that.getHabitInfo();
            })
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    },
    
    getRank:function(){
      var habitId=this.data.habitId;
      var host=app.globalData.host;
      var that=this;
      wx.request({
        url: host+'/api/habit/rank/'+habitId,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log("rank");
          console.log(res);
          if(res.data.success==true){
            that.setData({
              ranks:{
                top3:res.data.list.top3||[],
                top:res.data.list.top||[]
              }
            })
          }else{
            that.setData({
              ranks:{
                top3:[],
                top:[]
              }
            })
          }
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    },
    group:function(){
      var shareTicket = wx.getStorageSync("shareTicket");
      var sessionId= wx.getStorageSync('sessionId');

      if (shareTicket) {
        wx.getShareInfo({
          shareTicket: shareTicket,
          success: function (res) {
            console.log("getShareInfo" + JSON.stringify(res));
            console.log("encrptedData:" + res.encryptedData);
            console.log("iv:" + res.iv);
            wx.request({
              url: 'http://161s5g6007.51mypc.cn/api/habit/group/groupid',
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              data: JSON.stringify({
                encryptedData: res.encryptedData,
                iv: res.iv,
                sessionid: sessionId
              }),
              success: function (res) {
                console.log("groupId");
                console.log(res);
                if(res.data.success==true){

                } else if (res.data.success == false && res.data.sourse == "session"){
                  app.clearSession();
                  that.checkSession(function () {
                    that.group();
                  });
                }
              },
              fail: function () {
                // fail
              },
              complete: function () {
                // complete
              }
            })
          }
        })
      }
    }
 });