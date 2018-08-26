var app = getApp()
Page({
  data: {
    innerHeight: 0,
    innerWidth: 0,
    isLogin:false,
    ty:-1,
    li:[],
    list:[],
    limit:8,
    pageIndex:1,
    isScroll:false
  },
  dofocus: function (e) {
    this.setData({
      ty:e.currentTarget.dataset.ty
    })
  },
  doblur: function (e) {
    this.setData({
      ty:-1
    })
  },
  submit: function (e) {
    if(e.detail.value.username == 'admin'){
      if (e.detail.value.password == 'admin123'){
        this.setData({
          isLogin: true,
          isScroll:true
        })
      }else{
        wx.showToast({
          title: '密码不正确',
          image: '/img/60.png',
          duration: 800
        })
      }
    }else{
      wx.showToast({
        title: '用户名错误或不存在',
        image:'/img/60.png',
        duration:800
      })
    }
  },
  inputSearch: function (e) {
    var that = this
    if (e.detail.value != '') {
      wx.request({
        url: app.url + 'TmeMessage/select',
        data: {
          limit: 8,
          pageIndex: 1,
          searchname: e.detail.value
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res)
          that.setData({
            list: res.data.rows,
            keyword: e.detail.value
          })
        }
      })
    } else {
      this.setData({
        list: that.data.li,
        pageIndex:1
      })
    }

  },
  onLoad: function (options) {
    var that = this
    app.load(that)
    wx.request({
      url: app.url + 'WxOrderPay/proqselect?ids=1',
      method: 'post',
      data:{
        
      },
      success: function(res){
        console.log(res)
      }
    })

    wx.request({
      url: app.url + 'ShowIndexPro/MsgSelect',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        SalesFalg: 0,
        integralFlag: 0,
        limit: that.data.limit,
        pageIndex: 1
      },
      success: function (res) {
        that.setData({
          opq: 1
        })
        console.log(res)
        that.setData({
          list: res.data,
          li:res.data
        })
      }
    })
  },
  onReachBottom: function (e) {
    var that = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 800
    })
      var page = that.data.pageIndex + 1
      that.setData({
        pageIndex: page
      })
      wx.request({
        url: app.url + 'ShowIndexPro/MsgSelect',
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          SalesFalg: 0,
          integralFlag: 0,
          limit: that.data.limit,
          pageIndex: page
        },
        success: function (res) {
          console.log(res)
          var li = that.data.list
          if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              li.push(res.data[i])
            }
          }
          that.setData({
            list: li
          })
        }
      })
    
  },

  onPullDownRefresh: function () {
    var that = this
   
      that.setData({
        pageIndex: 1
      })
      wx.request({
        url: app.url + 'ShowIndexPro/MsgSelect',
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          SalesFalg: 0,
          integralFlag: 0,
          limit: that.data.limit,
          pageIndex: 1
        },
        success: function (res) {
          wx.stopPullDownRefresh()
          console.log(res)
          that.setData({
            list: res.data
          })
        }
      })
    
  }
})