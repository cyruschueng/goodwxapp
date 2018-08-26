// balance.js

var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    orders:[],
    balance:'',
    hasMore:true,
    load_more_text:'加载中..',
    show_more_hidden:true,
    no_data_hidden:true
  },

  onLoad:function(options){
    wx.showLoading({
      title: '加载中..',
    })
    this.getBalanceInfo()
  },
  
  //获得余额数据
  getBalanceInfo:function(){
    var that=this
    wx.request({
      url: app.globalData.serverUrl + 'getMoneyInfo.als',
      data:{token:wx.getStorageSync('token'),pageIndex:that.data.pageIndex},
      success:function(res){
        wx.hideLoading()
        if(res.data.status==0){
          //有数据
          if(res.data.moneyDetail.length>0){
            if(that.data.orders.length==0){
              that.setData({
                balance: res.data.money,
                orders:res.data.moneyDetail,
                show_more_hidden:true
              })
            }else{
              var orderList=[]
              orderList=that.data.orders.concat(res.data.moneyDetail)
              that.setData({
                balance: res.data.money,
                orders:orderList,
                show_more_hidden:true
              })
            }
          }
          //第一次就没数据
          else if(that.data.pageIndex==1 && res.data.moneyDetail.length==0){
            that.setData({
              balance:res.data.money,
              hasMore:false,
              no_data_hidden:false
            })
          }
          //后续没数据
          else if(res.data.moneyDetail.length==0){
              that.setData({
                hasMore:false,
                show_more_hidden:false,
                load_more_text:'没有数据了..'
              })
          }
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
        wx.showToast({
          title: '出错了',
          icon:'loading',
          duration:1000
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasMore){
      this.setData({
        load_more_text:'加载中..',
        show_more_hidden:false,
        pageIndex:++this.data.pageIndex
      })
      this.getBalanceInfo()
    }
  },
  pullMoney:function(){
    if(this.data.balance==0){
      wx.showModal({
        title: '提示',
        content: '您目前没有余额,无需提现',
        showCancel:false,
        confirmColor:'#f4c600',
        success:function(res){
          
        }
      })
    } else if (this.data.balance < 10){
      wx.showModal({
        title: '提示',
        content: '余额满10元就可以提现咯,加油~~~',
        showCancel: false,
        confirmColor: '#f4c600',
        success: function (res) {

        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '确认提现吗',
        confirmColor:'#f4c600',
        success:function(res){
          if(res.confirm){
            wx.showLoading({
              title: '请稍候..',
            })
            var that = this
            wx.request({
              url: app.globalData.serverUrl + 'applyWithdraw.als',
              data: { token: wx.getStorageSync('token') },
              success: function (res) {
                wx.hideLoading()
                if (res.data.status == 0) {
                  wx.showModal({
                    title: '提示',
                    content: '提现申请成功,请耐心等待后台打款.',
                    showCancel: false,
                    confirmColor: '#f4c600',
                    success:function(res){

                    }
                  })
                  that.setData({
                    pageIndex: 1,
                    orders: [],
                    balance: '0.00',
                    hasMore: true,
                    load_more_text: '加载中..',
                    show_more_hidden: true,
                    no_data_hidden: true
                  })
                  that.getBalanceInfo()
                }
                //用户未绑定账号信息
                else if (res.data.status == -2) {
                  wx.navigateTo({
                    url: '/pages/bindAccount/bindAccount',
                  })
                } else {
                  wx.showToast({
                    title: '出错了',
                    icon: 'loading',
                    duration: 1000
                  })
                }
              },
              fail: function () {
                wx.hideLoading()
                wx.showModal({
                  title: '提示',
                  content: '网络不太顺畅,请稍后再试',
                  showCancel: false,
                  confirmColor: '#f4c600',
                  success:function(res){

                  }
                })
              }
            })
          }
        }
      })
     
    }

  }
})