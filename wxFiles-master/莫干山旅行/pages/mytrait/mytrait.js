var event = require('../../utils/event.js')
var comm = require('../../utils/common.js'); 
//获取应用实例
var app = getApp()
Page({
  data: {
    remind:'加载中',
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    mytrait:[],
    reached:[],

   
  },
  onLoad: function (option) {
    var that = this;
    var current=0
    if(option.current){
      current = parseInt(option.current)
    }
    this.getTrait()
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          currentTab: current
        });
      }
    });
    wx.setNavigationBarTitle({
      title: '我的行程'
    })

    event.on('isCollectChanged', that, function (id) {
      var mytrait = that.data.mytrait
      for (var i in mytrait) {
        if (id === mytrait[i].id) {
          mytrait.splice(i, 1)
          break
        }
      }
      that.setData({
        mytrait: mytrait
      })
    })
  },

  onUnload: function () {
    event.remove('isCollectChanged', this);
  },


  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  }, 
  
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  skip:function(e){
    var id=parseInt(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../live/food/merchants/merchants?appid='+app._appid+'&id='+id,
    })
  },

  delete:function(e){
    var that=this
    var id=parseInt(e.target.id)
    var mytrait=this.data.mytrait
    wx.showModal({
      content: '您确定要将此景点移除您的行程吗？',
      success:function(res){
        if (res.confirm){
          for (var i in mytrait) {
            if (id === mytrait[i].id) {
              mytrait.splice(i, 1)
              break
            }
          }
          that.setData({
            mytrait: mytrait
          })

          //通知后台删除
          wx.request({
            url: app._server+'/schedule/mark',
            method: 'POST',
            data: {
              ukey: app.cache.userdata,
              appid: 'banfu123',
              status: 2,
              schedule_id: id,
            },
            success: function (res) {
              if (res.data.success) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })

              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'success',
                  duration: 2000
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '删除失败',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
     
      }
    })
  },

  getTrait:function(){
    var that=this
    
    function reachedRender(info){
      console.log(info)
      var reached=info
      that.setData({
        reached: reached
      })
    }

    var loadsum=0
    loadsum++
    wx.request({
      url: app._server+'/schedule/arrivedlist', 
      data: {
        ukey: app.cache.userdata,
        appid: 'banfu123',
      },
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            reachedRender(info)
          }
        }
      },
      complete: function () {
        loadsum--
        if(!loadsum){
          that.setData({
            remind:''
          })
        }
      }
    })

    function mytraitRender(info){
      console.log(info)
      var mytrait=info
      that.setData({
        mytrait:info
      })
    }

    loadsum++
    wx.request({
      url: app._server+'/schedule/list',
      method: 'POST',
      data: {
        ukey:app.cache.userdata,
        appid:'banfu123',
      },
      success: function (res) {
        console.log("list: ")
        console.log(res)
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            mytraitRender(info)
          }
        }
      },
      complete: function () {
        loadsum--
        if (!loadsum) {
          that.setData({
            remind: ''
          })
        }
      }
    })
  },

  //图片加载错误处理
  errImg: function (ev) {
    var that = this;
    comm.errImgFun(ev, that);
  }, 
})
