// pages/distribution/distribution.js
Page({
  data:{
    share_phone:'',
    share_name:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  sub:function(){
    var that = this;
    that.setData({
      show: '0',
      show1: '0',
      bprder: '',
      border1: ''
    })
    //表单验证
    console.log(that.data.share_phone)
    var regPhone = /^1(3|4|5|7|8)\d{9}$/;
    if (!regPhone.test(that.data.share_phone)) {
      that.setData({
        show: '1',
        border: '1px solid #ff0100',
      })
    } else if (that.data.share_name==''){
      that.setData({
        show1:'1',
        border1:'1px solod #ff0100'
      })
    }else {
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/common/adduser',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { is_dis: '1', openid: getApp().globalData.openid, share_name: that.data.share_name, share_phone: that.data.share_phone },
        success: res => {
          if (res.data.share_name && res.data.share_phone) {
            wx.showToast({
              title: '绑定成功',
              duration: 2000,
              success: function () {
                that.setData({
                  show:'0',
                  border:'1px silid #dedede'
                })
                getApp().globalData.is_distribution = '1';
                getApp().globalData.sharename = that.data.share_name;
                getApp().globalData.sharephone = that.data.share_phone;
                wx.navigateBack({

                })
              }
            })
          }
        }
      })
    }

  },
  getName:function(e){
    this.setData({
      share_name:e.detail.value
    })
  },
  getNum:function(e){
    this.setData({
      share_phone:e.detail.value
    })
  }
})