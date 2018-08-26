var app = getApp();
Page({

  data: {
    waitingCount:null,  //等待人数
    estimatedTime: null, // 预计时间
    currentNumber: null, //当前数字
    active_index:null //当前选中的index
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '请选择就餐人数',
    })
  },

  onShow: function () {
    this.getQueue()
  },

  //切换选中的index
  change_active_index(e){
    this.setData({
      active_index: e.currentTarget.dataset.index
    })    
  },

  // 获取当前取号参数
  getQueue(){
    app.commonAjax('/miniapp/cat/queue/getQueueInfo', ['shopId','memberId'], {}, (res) => {

      if (res.data.code == 0) {

        this.setData({
          waitingCount: res.data.data.waitingCount,
          estimatedTime: res.data.data.estimatedTime,
          currentNumber: res.data.data.currentNumber
        })


        if (res.data.data.id){
          wx.redirectTo({
            url: "/page/queue/queue_success/index"
          })
        }

      }else{
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },

  // 提交取号信息
  queue_sub_ok(formId){



    app.commonAjax('/miniapp/cat/queue/createQueue', ['shopId', 'memberId', 'username','appid','openid'], { 'bookQueuePerson': this.data.active_index + 1, 'formId': formId}, (res) => {

      if (res.data.code == 0) {
        wx.redirectTo({
          url: "/page/queue/queue_success/index"
        })
      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },

  // 确定取号
  queue_sub(e){

    console.log(e.detail.formId)

    if (this.data.active_index === null){
      wx.showToast({
        title: '请选则就餐人数',
        image: '/image/i/x.png',
        duration: 2000
      })
    }else{

      this.queue_sub_ok(e.detail.formId)
      
    }
  }

})