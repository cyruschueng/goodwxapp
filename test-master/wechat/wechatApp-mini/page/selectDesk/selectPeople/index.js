var app = getApp();
Page({

  data: {
    deskId:'',
    deskNo:'',
    active_index:null //当前选中的index
  },

  onLoad: function (options) {


    var deskId = ''
    if (options.scene) {
      deskId = options.scene
    } else if (options.deskId) {
      deskId = options.deskId ? options.deskId : ''
    }

    this.setData({
      deskId: deskId,
      deskNo: options.deskNo ? options.deskNo : ''
    })


    if (!this.data.deskId) {
      wx.redirectTo({
        url: '/page/index/index',
      })
    }

    wx.setNavigationBarTitle({
      title: '请选择就餐人数',
    })
  },

  onShow() {
    this.selectByDeskId()
  },

  selectByDeskId () {

    app.commonAjax('/miniapp/cat/table/selectByDeskId', [], { deskId: this.data.deskId}, (res) => {

      if (res.data.code == 0) {

        if (!res.data.data) {
          wx.showToast({
            title: '没有此桌号！',
            image: '/image/i/x.png',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.switchTab({
                  url: '/page/index/index',
                })
              },1500)
            } 
          })
          return
        }
        this.setData({
          deskNo: res.data.data.deskNo
        })
        if (res.data.data.useNum != 0) {
          this.setData({
            active_index: res.data.data.useNum
          })
        }
      }

    }, app.globalData, 'post')
    
  },

  //切换选中的index
  change_active_index(e){
    this.setData({
      active_index: e.currentTarget.dataset.index
    })    
  },

  takeoutpay(){

    if (this.data.active_index === null){
      wx.showToast({
        title: '请选择就餐人数',
        image: '/image/i/x.png',
        duration: 2000
      })
    }else{
      app.commonAjax('/miniapp/cat/table/memberLock', [], { id: this.data.deskId, useNum: this.data.active_index }, (res) => {

        if (res.data.code == 0) {

          app.commonAjax('/miniapp/cat/table/getUnCheckData', ['shopId','memberId'], {}, (res) => {
            
            console.log(res.data.data)

            if (res.data.data.length>0) {
              wx.redirectTo({
                url: "/page/takeoutpay/cart/submit/index?deskId=" + this.data.deskId + '&checkOrder=' + true + '&usenum=' + this.data.active_index + '&deskNo=' + this.data.deskNo
              })

            }else {
              wx.redirectTo({
                url: '/page/takeoutpay/index?deskId=' + this.data.deskId,
              })
            }

          }, app.globalData, 'post')

          // wx.redirectTo({
          //   url: '/page/takeoutpay/index?deskId=' + this.data.deskId,
          // })


        }

      }, app.globalData, 'post')
    }

    

    
  }

  


})