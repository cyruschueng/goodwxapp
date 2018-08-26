var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    url:app.globalData.IP,
    keyword:'#',
    key:[],
    open:true,
    search:0
  },
  open: function(){
    this.setData({open:true})
  },
  sosa: function(e){
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/search.do',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userid: app.globalData.ID,
        sid: app.globalData.sid,
        like: e.currentTarget.dataset.keys
      }, success: function (res) {
        if (res.data.length == 0) {
          that.setData({ shopList: res.data,search: 2, open: false, keysd: e.currentTarget.dataset.keys })
        }else{
          var tempDiscount = 1;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].sales = 0;
            for (var j = 0; j < res.data[i].myclasses.length; j++) {
              for (var k = 0; k < res.data[i].myclasses[j].ps.length; k++) {
                res.data[i].sales += res.data[i].myclasses[j].ps[k].sales;
                if (res.data[i].myclasses[j].ps[k].discount < tempDiscount) {
                  tempDiscount = res.data[i].myclasses[j].ps[k].discount;
                }
              }
            }
            res.data[i].minDiscount = (tempDiscount * 10 + '').substring(0, (tempDiscount * 10 + '').indexOf('.') + 2);
          }
          that.setData({ shopList: res.data, open: false, keysd: e.currentTarget.dataset.keys ,search:1})
        }
        
      }
    })
  },
  storeMenu: function (e) {
    var status = this.data.shopList[e.currentTarget.dataset.in].status
    if (status == 'off') {
      wx.navigateTo({
        url: '/pages/menu/item/storeMenu/storeMenu?id=' + e.currentTarget.id + '&rt=1',
      })

    } else {
      wx.navigateTo({
        url: '/pages/menu/item/storeMenu/storeMenu?id=' + e.currentTarget.id,
      })
    }


  }, 
  dosearch: function(e){
    this.setData({ open: false })
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/search.do',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        
        userid: app.globalData.ID,
        sid: app.globalData.sid,
        like: that.data.keyword
      }, success: function (res) {
        if(res.data.length == 0){
          that.setData({search:2})
        }else{
          var tempDiscount = 1;
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].sales = 0;
            for (var j = 0; j < res.data[i].myclasses.length; j++) {
              for (var k = 0; k < res.data[i].myclasses[j].ps.length; k++) {
                res.data[i].sales += res.data[i].myclasses[j].ps[k].sales;
                if (res.data[i].myclasses[j].ps[k].discount < tempDiscount) {
                  tempDiscount = res.data[i].myclasses[j].ps[k].discount;
                }
              }
            }
            res.data[i].minDiscount = tempDiscount * 10;
          }

          
    

          that.setData({ shopList: res.data,search:1 })
        }
        
      }
    })
  },
  search:function(e){
    var like = e.detail.value;
    if(like != ''){
      this.setData({ keyword: e.detail.value });
      var that = this;
      wx.request({
        url: app.globalData.IP + 'wx/searchfind.do',
        method:'post',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          like: e.detail.value
        },
        success: function (res) {
          that.setData({ key: res.data })
        }
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.run("进入搜索界面");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

})