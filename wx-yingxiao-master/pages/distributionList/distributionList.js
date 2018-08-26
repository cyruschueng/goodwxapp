// pages/distributionList/distributionList.js
Page({
  data: {

  },
  onLoad: function (options) {
    var that = this;
    if(getApp().globalData.sharephone==null){
      that.setData({
        unbind:'1'
      })
    }else{
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/user/getShareGoods',
        data: { user_id: getApp().globalData.userid },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          var detail = res.data;
          if (detail.length == 0) {
            that.setData({
              isNull: '1'
            })
          } else {
            that.setData({
              detail: res.data
            })
          }
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/common/getuser',
            data: { user_id: getApp().globalData.userid },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: 'POST',
            success: function (res1) {
              var sum = res1.data.share_money;
              that.setData({
                sum: sum
              })
              if (Number(sum) < 1) {
                that.setData({
                  bg: '#999',
                  getMoney: 'none',
                })
              } else {
                that.setData({
                  bg: '#38adff',
                  getMoney: 'getmoney'
                })
              }
            },
          })
        },
      })
    }
  },
  onShow:function(){
    var that = this;
    if (getApp().globalData.sharephone==null) {
      that.setData({
        unbind: '1'
      })
    } else {
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/user/getShareGoods',
        data: { user_id: getApp().globalData.userid },
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          var detail = res.data;
          if (detail.length == 0) {
            that.setData({
              isNull: '1'
            })
          } else {
            that.setData({
              detail: res.data
            })
          }
          wx.request({
            url: 'https://xcx.bjletusq.com/index.php/home/common/getuser',
            data: { user_id: getApp().globalData.userid },
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            method: 'POST',
            success: function (res1) {
              var sum = res1.data.share_money;
              that.setData({
                sum: sum
              })
              if (Number(sum) < 1) {
                that.setData({
                  bg: '#999',
                  getMoney: 'none',
                })
              } else {
                that.setData({
                  bg: '#38adff',
                  getMoney: 'getmoney'
                })
              }
            },
          })
        },

      })
    }    
  },
  none:function(){
    wx.showToast({
      title: '大于1元可提现',
      image:'/pages/source/images/info.png'
    })
  },
  getmoney:function(){
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/withDrawals',
      data: { user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        /*
        1:成功
        2:失败
        */
        if(res.data.code=='1'){
          wx.showToast({
            title: '提现成功',
            sum:'0.00',
          })
        }else{
          wx.showToast({
            title: res.data.message,
          })
        }
      },
    })     
  },
  bindphone:function(){
    wx.navigateTo({
      url: '/pages/distribution/distribution',
    })
  }
})