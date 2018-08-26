var app = getApp()
Page({
  data: {
    miniIndex: {},
    phone:0,
    id:1,
    index:0,
    yzm:'',
    oldphone:0,
    show:0,
    num:120
  },
  onLoad: function (option) {

      this.setData({
        id: option.id,
        phone: option.phone,
        oldphone: option.phone
      })

      this.setData({
        id: app.globalData.memberId
      })
    
  },

  inputyzm:function(e){
    this.setData({
      yzm: e.detail.value
    })
  },

  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  //获取验证码
  getyzm:function(){
    var that = this;
    var subdata = { phone: '' };
    subdata.phone = this.data.phone;
    if (this.data.phone == this.data.oldphone){
      wx.showToast({
        title: '您未修改手机号',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }else if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))){
      that.setData({
        show: 1
      })
      that.numchange()
      console.log(subdata)

      app.commonAjax('cat/messagecenter/modifymemberinfo', [], subdata, function (res) {},app)
      
    }else{
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }
    
  },

  //计数
  numchange:function(){
    var that = this;
    var timer;
    timer = setInterval(function(){
      that.setData({
        num: --that.data.num
      })
    },1000)

    if (that.data.num<=0){
      clearInterval(timer)
    }
  },

  //保存
  save: function () {
    var that = this;
    var subdata = { id: '', phone: 'phone', verifyCode: 'verifyCode' };
    subdata.id = this.data.id;
    subdata.phone = this.data.phone;
    subdata.verifyCode = this.data.yzm;

    app.commonAjax('cat/messagecenter/verifyphone', [], subdata, function (res) { 
      if (res.data.code >= 0) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '修改失败',
          image: '/image/i/x.png',
          duration: 2000
        })
      }
    }, app)

  },
})