// reportOrder.js

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hint_text:'请输入异议详情(100字以内)',
    reportValue:'',
    status:0,
    id:0,
    reportUser:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //举报
      if(options.status==6){
        wx.setNavigationBarTitle({
          title: '举报',
        })
        this.setData({
          hint_text: '请输入举报详情(100字以内)',
          status:6,
          id:options.id,
          reportUser:options.reportUser
        })
      }else if (options.status == 7) {
        wx.setNavigationBarTitle({
          title: '异议',
        })
        this.setData({
          hint_text: '请输入异议详情(100字以内)',
          status: 7,
          id: options.id,
          reportUser: options.reportUser
        })
      }
  },
  confirmInput:function(e){
    this.setData({
      reportValue:e.detail.value
    })
  },
  submitReport:function(){
    var that=this
    var report=this.data.reportValue
    if(!report){
      wx.showToast({
        title: '意见为空',
        icon:'loading',
        duration:1000
      })
    }else{
      wx.request({
        url: app.globalData.serverUrl +'objectionOrReport.als',
        data:{
          status:that.data.status,
          id:that.data.id,
          reportUser:that.data.reportUser,
          reportReason:report
        },
        success:function(res){
          if(res.data.status==0){
            wx.showModal({
              title: '提示',
              content: '操作成功',
              showCancel:false,
              confirmColor:'#f4c600',
              success:function(res){
                if(res.confirm){
                  wx.navigateBack({
                    delta:2
                  })
                }
              }
            })
          }
        },
        fail:function(){
          wx.showToast({
            title: '出错了',
            icon:'loading',
            duration:1000
          })
        }
      })
    }
  }
})