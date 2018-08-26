var app = getApp();
Page({
  data: {
    values:'0.00',
    numbers: [{ act: false, txt: 10 }, { act: false, txt: 20 }, { act: false, txt: 50 }, { act: false, txt: 100 }, { act: false, txt: 200 }, { act: false, txt: 500 }]
  },
  submit: function(e){
    var value = this.data.values + '';
    if (value.indexOf('.') != -1){
      wx.showToast({
        title: '请选择充值金额',
        image: '/images/60.png',
        duration: 1000
      })
    } else if (this.data.values > 1000){
      wx.showToast({
        title: '充值金额上限1000',
        image: '/images/60.png',
        duration: 1000
      })
    } else if (app.globalData.sid ==0) {
      wx.showToast({
        title: '请先选择学校',
        image: '/images/60.png',
        duration: 1000
      })
    }
    else if(this.data.values != null){
      var that = this
      wx.request({
        url: app.globalData.IP + 'wx/bell.do',
        data:{
          userid:app.globalData.ID,
          money:that.data.values,
          sid:app.globalData.sid
        },
        success: function(res){
          wx.requestPayment({
            timeStamp: res.data.time,
            nonceStr: res.data.nonceStr,
            package: 'prepay_id=' + res.data.prepay_id,
            signType: 'MD5',
            paySign: res.data.paySign,
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '支付成功',
                duration:800
              })
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/payment/payment',
                })
              },800)
            },
            fail: function () {
             
            }
          })
        }
      })
    }else{
      wx.showToast({
        title: '充值金额不能为0',
        image:'/images/60.png',
        duration:1000
      })
    }
  },
  getInput: function(e){
    this.setData({
      values:e.detail.value
    })
  },
  getPay:function(e){
    var fee = e.currentTarget.dataset.index;
    var list = this.data.numbers;
    if (list[fee].act == true){
      list[fee].act = false;
      this.setData({ values: '0.00' })
    }else{
      for(var i=0;i<list.length;i++){
        list[i].act = false;
      }
      list[fee].act = true;
      this.setData({values:list[fee].txt})
    }
   this.setData({numbers:list})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getWindow(this)
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
    app.run("进入充值界面");
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

})