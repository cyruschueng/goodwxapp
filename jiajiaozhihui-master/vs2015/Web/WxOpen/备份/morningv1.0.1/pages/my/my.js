var app = getApp();
var common = require("../../utils/util.js");
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
        },
        canShare: wx.canIUse('button.open-type.share')
    },
    onLoad:function(){
        var that=this;
        app.checkSessionId(function () {
          that.getdetail();
          that.loadHabit();
        })
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
        console.log(this.data.habitId);

        this.getdetail();
    },
    getdetail:function(){
        var that=this;
        var sessionid= wx.getStorageSync("sessionId");
        var startIndex=this.data.paging.startIndex;
        var endIndex=this.data.paging.endIndex;
        var pageIndex=this.data.paging.pageIndex;
        var host=app.globalData.host;
        var url=host+"/api/habit/detail/my"
        if(this.data.habitId!=0) url=host+"/api/habit/detail/my/habitid"
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: url,
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
                  app.clearSession();
                  app.getUserInfo();
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
              app.clearSession();
              app.getUserInfo();
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
          if(res.data.success==true){
            var m= that.data.items.infos[index].comment;
            m.push({id:res.data.id,name:res.data.nickName,message:res.data.comment});
            that.setData({
              ['items.infos['+index+'].comment']:m
            });
          }else if(res.data.success==false && res.data.sourse=="session"){
            app.clearSession();
            app.getUserInfo();
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
            app.clearSession();
            app.getUserInfo();
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
    loadHabit:function(){
        var that=this;
        var host=app.globalData.host;
        var sessionid= wx.getStorageSync("sessionId");
        var data=JSON.stringify({
            sessionid:sessionid
        });
        wx.request({
          url: host+'/api/habit/my/list',
          data: data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log("arry");
            console.log(res);
            if(res.data.success==true){
                var item={
                  finish:0,
                  id:0,
                  habitId:0,
                  imgurl:'',
                  title:'所有的'
                }
                res.data.list.unshift(item);
                that.setData({
                    array:res.data.list
                })
            }else if(res.data.success==false && res.data.sourse=="session"){
              app.clearSession();
              app.getUserInfo();
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})
