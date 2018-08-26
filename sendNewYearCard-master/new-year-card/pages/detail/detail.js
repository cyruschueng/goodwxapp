Page({
  data: {
    hiddenInput:true,
    inputTxt:'',
    chunlianLIn: false,
    chunlianRIn: false,
    textIn: false,
    btnIn: false,
    blessingText:'岁月可以褪去记忆，却褪不去我们一路留下的欢声笑语。祝你新春快乐，岁岁安怡!',
    originText: '岁月可以褪去记忆，却褪不去我们一路留下的欢声笑语。祝你新春快乐，岁岁安怡!',
  },
  onLoad:function(){
   
  },
  onReady: function () {
    this.delayAmt();
  },
  onShareAppMessage(res){
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Star-Y',
      path: '/page/user?id=123',
      imageUrl: '',
      success: function (res) {
        // 转发成功
        console.log(res)
        wx.showShareMenu({
          //要求小程序返回群聊ID等信息,群聊中打开才可以获取到 shareTickets 返回值
          //再在app.js中调用wx.getShareInfo()获取转发详细信息
          withShareTicket: true
        })
      },
      fail: function (res) {
        // 转发失败
        console.log(1)
      }
    }
  },
  changeText:function(e){
    this.setData({
      blessingText: e.detail.value
    })
  },
  showEdit:function(){
    var show = this.data.hiddenInput;
    if (show){
      this.setData({
        hiddenInput: false
      })
    }else{
      this.setData({
        hiddenInput: true
      })
    }
  },
  hideReback:function(){
    this.setData({
      hiddenInput: true,
      blessingText: this.data.originText,
      inputTxt: ''
    })
  },
  confirm:function () {
    this.setData({
      hiddenInput: true,
      inputTxt: ''
    })
  },
  delayAmt:function(){
    var that = this;
    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        that.setData({
          chunlianLIn: true, 
          chunlianRIn: true
        })
        if (that.data.chunlianLIn === true) {
          resolve('success');
        } else {
          reject('failure');
        }
      }, 300)
    });
    promise.then(function (value) {
      // success
      setTimeout(function () {
        that.setData({
          textIn: true
        })
      }, 800)
    }, function (value) {
      // failure
      console.log(value)
    })
    .then(function (value) {
      // success
      setTimeout(function () {
        that.setData({
          btnIn: true
        })
      }, 1000)
    }, function (value) {
      // failure
      console.log(value)
    });
    return this;
  },

})
