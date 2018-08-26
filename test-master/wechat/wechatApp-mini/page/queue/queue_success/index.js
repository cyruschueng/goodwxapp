var app = getApp()
Page({

  data: {
    myNumber: '', //我的号码
    waitingCount: '',  //等待人数
    estimatedTime: '', // 预计时间
    currentNumber: '', //当前数字
    id:''
  },

  onLoad: function (options) {

    if (options.id){
      this.getQueue(options.id)
    }
  
  },

  onShow: function () {
    this.getQueue()
  },

  // 获取当前取号参数
  getQueue(id) {
    var subdata = {}

    if(id){
      subdata.id = id
    }

    app.commonAjax('/miniapp/cat/queue/getQueueInfo', ['shopId', 'memberId'], subdata, (res) => {

      if (res.data.code == 0) {

        if (res.data.data.id) {
          this.setData({
            myNumber: res.data.data.myNumber,
            id: res.data.data.id,
            waitingCount: res.data.data.waitingCount,
            estimatedTime: res.data.data.estimatedTime,
            currentNumber: res.data.data.currentNumber
          })
        }else{
          wx.switchTab({
            url: "/page/index/index"
          })
        }

        

      }

    }, app.globalData, 'post')
  },

  // 取消当前排队
  cancelQueue() {
    app.commonAjax('/miniapp/cat/queue/cancel', ['shopId','memberId'], {'id':this.data.id}, (res) => {

      if (res.data.code == 0) {
        wx.switchTab({
          url: "/page/index/index",
          success:()=>{
            console.log(getCurrentPages())
          }
        })

      }

    }, app.globalData, 'post')
  },

  //弹出确定取消窗口
  cancel(){
    wx.showModal({
      title: '温馨提示',
      content: '用户每天最多取消3次排队，是否确定取消本次排号',
      success: (res) => {
        if (res.confirm) {
          this.cancelQueue()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

})