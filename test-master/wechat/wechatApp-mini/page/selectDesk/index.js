var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    active_tab: '0',
    sel_num: null,
    tab: [
      {
        text: '全部',
        num: '0'
      },
      {
        text: '大厅',
        num: '1'
      },
      {
        text: '包间',
        num: '2'
      }
    ]
  },

  onLoad: function (options) {

    var deskId = ''
    if (options.scene) {
      deskId = options.scene
    } else if (options.deskId) {
      deskId = options.deskId
    }

    this.setData({
      deskId: deskId,
      deskNo: options.deskNo
    })

    wx.setNavigationBarTitle({
      title: '选择就餐餐桌',
    })
  },
  selectByDeskId() {

    app.commonAjax('/miniapp/cat/table/selectByDeskId', [], { deskId: this.data.deskId }, (res) => {

      if (res.data.code == 0) {

        if (!res.data.data) {
          // wx.showToast({
          //   title: '没有此桌号！',
          //   image: '/image/i/x.png',
          //   duration: 2000,
          //   success: () => {
          //     setTimeout(() => {
          //       wx.switchTab({
          //         url: '/page/index/index',
          //       })
          //     }, 1500)
          //   }
          // })
          return
        } else {
          wx.redirectTo({
            url: '/page/selectDesk/selectPeople/index?deskId=' + res.data.data.id + '&deskNo=' + res.data.data.deskNo
          })
        }
        this.setData({
          deskNo: res.data.data.deskNo
        })
      }

    }, app.globalData, 'post')

  },
  //tab切换
  change_active_tab(e) {
    console.log(e)
    this.setData({
      active_tab: e.currentTarget.dataset.index
    })
  },

  onShow: function () {

    this.getIdleTableInfo()
    

  },

  getIdleTableInfo () {
    app.commonAjax('/miniapp/cat/table/getIdleTableInfo', ['shopId'], {}, (res) => {

      if (res.data.code == 0) {

        this.setData({
          TableInfo: res.data.data.rows
        })

      }

    }, app.globalData, 'post')
  },



  onHide: function () {

  },

  //获取二维码参数
  getQueryString(url) {
    var href = url;

    href = href.substring(href.indexOf("=") + 1, href.length);
    return href;

  },

  //扫描二维码
  scan() {
    wx.scanCode({
      success: (res) => {

        console.log('res.result')
        console.log(res)
        if (res.path.indexOf('scene') >= 0) {

          console.log(this.getQueryString(res.path))

          wx.navigateTo({
            url: '/page/takeoutpay/index?deskId=' + this.getQueryString(res.path),
          })
        } else {
          wx.showToast({
            title: '无效二维码！',
            image: '/image/i/x.png',
            duration: 2000
          })
        }
      },
      fail: () => {
        // wx.showToast({
        //   title: '未识别二维码！',
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }
    })
  },


  //选择桌子
  desk_sel(e) {

    var index = e.currentTarget.dataset.index
    this.setData({
      sel_num: index
    })

    if(e.currentTarget.dataset.flag == 0){
      

      

      wx.showModal({
        title: '选桌',
        content: '当前选中餐桌号：' + this.data.TableInfo[index].deskNo,
        success: (res) => {
          if (res.confirm) {
            wx.redirectTo({
              url: '/page/selectDesk/selectPeople/index?deskId=' + this.data.TableInfo[index].id + '&deskNo=' + this.data.TableInfo[index].deskNo,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      
      wx.redirectTo({
        url: '/page/takeoutpay/index?deskId=' + this.data.TableInfo[index].id 
      })
    }

    

  }

})