// bindAccount.js

var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountSource:['工商银行','建设银行','交通银行','中国银行','民生银行','农业银行','招商银行','光大银行','中信银行','浦发银行','人民银行','其它'],
    selectedItem:0,
    selectedText:'选择您的开户机构',
    selectedTextClass:'hint_text',
    account:'',
    trueName:''
  },

  selectSource:function(e){
    this.setData({
      selectedItem:e.detail.value,
      selectedText:this.data.accountSource[e.detail.value],
      selectedTextClass:'main_text'
    })
  },
  getAccount:function(e){
    this.setData({
      account:e.detail.value
    })
  },

  getTrueName:function(e){
    this.setData({
      trueName:e.detail.value
    })
  },

  bindAccount:function(){
    if(this.data.selectedText=='选择您的开户机构'){
     wx.showModal({
       title: '提示',
       content: '请选择您的开户机构',
       showCancel:false,
       confirmColor:'#f4c600'
     })
    }else if(this.data.account==''){
      wx.showModal({
        title: '提示',
        content: '请输入您的机构账号',
        showCancel: false,
        confirmColor: '#f4c600'
      })
    }else if(this.data.trueName==''){
      wx.showModal({
        title: '提示',
        content: '请输入您的真实姓名',
        showCancel: false,
        confirmColor: '#f4c600'
      })
    }else{
      wx.showLoading({
        title: '提交中..',
      })
      var that=this
      wx.request({
        url: app.globalData.serverUrl +'bindAccount.als',
        data: { 
          token: wx.getStorageSync('token'), 
          accountDept: that.data.selectedText,
          account:that.data.account,
          tureName:that.data.trueName
        },
        success:function(res){
          wx.hideLoading()
          console.log(res.data)
          if(res.data.status==0){
            wx.showModal({
              title: '提示',
              content: '提交成功',
              showCancel:false,
              confirmColor:'#f4c600',
              success:function(res){
                if(res.confirm){
                  wx.navigateBack({
                    delta:1
                  })
                }
              }
            })
          }else{
            wx.showToast({
              title: '出错了',
              icon:'loading',
              duration:1000
            })
          }
        },
        fail:function(){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '网络不太顺畅,请稍后再试',
            showCancel:false,
            confirmColor:'#f4c600'
          })
        }
      })
    }
  }
})