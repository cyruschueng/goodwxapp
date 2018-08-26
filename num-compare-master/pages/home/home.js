var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: '',
    animationData: {},
    restChance: 1,
    rankLists: ''
  },
  onShow() {
  },
  onLoad(){
    /***显示当前页面的转发按钮 */
    wx.showShareMenu({
      withShareTicket: true
    })
    /* 初始化 */
    if (app.globalData.unionid && app.globalData.unionid != '') {
      this.updateUserInfo(app.globalData.unionid)
      this.gameChance(app.globalData.unionid);
      console.log('加载完成')
    }else{
      app.requestCallback = result => {
        this.updateUserInfo(result)
        this.gameChance(result);
      }
    }
  },
  /**配置游戏结束分享次数 */
  gameChance(unionid){
    api.gameTime({
      unionid: unionid
    }, result=> { 
      wx.setStorage({
        key: 'gameChance',
        data: result.data
      })
      wx.setStorage({
        key: 'gameChanceCount',
        data: result.data
      })
    })
  },
  /*更新用户信息*/
  updateUserInfo(unionid){
    api.updateUserInfo({
        unionid: unionid,
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        gender: app.globalData.userInfo.gender,
        city: app.globalData.userInfo.city,
        province: app.globalData.userInfo.province
      }, result => {
        this.getUserInfo();
        // this.getRank();
      })
  },
  /*获取用户信息*/
  getUserInfo(){
    api.userInfo({
      unionid: app.globalData.unionid
    }, result => {
      this.setData({
        userInfo: result.data
      })
    })
  },
  /*获取排行榜*/
  getRank(){
    api.rank({
      unionid: app.globalData.unionid
    }, result => {
      this.setData({
        rankLists: result.data.rank
      })
      console.log(result)
    })
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  showDialog() {
    this.dialog.showDialog();
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },
  startGame(){
    console.log('点击了')
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    api.isPlayGameDay({
      unionid: app.globalData.unionid
    }, result => {
      wx.hideLoading()
      console.log(result.data)

      if(result.data){
        wx.navigateTo({
          url: "/pages/ready/ready"
        })
      }else{
        this.showDialog()
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '[' + app.globalData.userInfo.nickName + '@我]一年级加减法，来虐一下？',
      path: '/pages/home/home',
      success: function (res) {
        /*如果是个人*/
        if (res.shareTickets === undefined) {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '对不起，分享给群才能获得更多挑战机会',
            success: function(res) {
              console.log(res);
            }
          })
        } else {
          // 转发成功
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: function (result) {
              
              api.submitShare({
                unionid: app.globalData.unionid,
                encryptedData: result.encryptedData,
                iv: result.iv
              }, res => {
                let content = ''
                switch(res.data){
                  case -1:
                    content = '今天的分享次数已经用完了'
                  break;
                  case 1:
                    content = '分享成功'
                  break;
                  case -2:
                    content = '当前群已经分享过了'
                  break;
                  default:
                    content = '分享失败'
                  break;
                }

                wx.showModal({
                  title: '',
                  showCancel: false,
                  content: content,
                  success: function () {
                    if (res.data == 1){
                      wx.navigateTo({
                        url: "/pages/ready/ready"
                      })
                    }
                  }
                })
              })
              console.log('群内转发')
            }
          })
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败')
      }
    }
  }
})
