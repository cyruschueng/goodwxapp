

// 获取全局应用程序实例对象
const app = getApp();
import http from '../../js/request'

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    userAvatar: '',
    challengeChance: 0,
    userList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let that = this;
    console.log(app.globalData.userInfo);
    if (Object.keys(app.globalData.userInfo).length) {
      console.log('已经有用户信息');
      that.freshUserInfo();
    } else {
      console.log('登录...')
      wx.login({
        success: (res) => {
          console.log(res);
          wx.getStorage({
            key: 'openId',
            success: (cb) => {
              console.log("上传openid")
              http.post('User', {openid: cb.data}).then((res) => {
                console.log(res);
                app.globalData.userInfo.photourl = res.challenger.photourl;
                app.globalData.userInfo.challengeNumber = res.challenger.remainnumber;
                app.globalData.userInfo.postreward = res.challenger.postreward;
                that.freshUserInfo();
              })
            },
            fail: (cb) => {
              console.log("请求code")
              http.post('Code', {code: res.code}).then((callback) => {
                console.log(callback);
                let openId = JSON.parse(callback.res).openid;
                app.globalData.userInfo.openId = openId;
                wx.setStorage({
                  key: 'openId',
                  data: openId
                });
                wx.setStorage({
                  key: 'userData',
                  data: callback.res
                })
                this.getuserinfo(openId);
              })
            }
          })
        }
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    let userList = [];
    http.get('Main').then((res) =>{
      //console.log(res);
      for (let i = 0; i < res.challengers.length; i++) {
        userList.push(res.challengers[i]);
      }
      this.setData({userList: userList})
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },
  
  
  


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },
  onShareAppMessage(res) {
    return {
      title: '答对10道题，抢9999元红包',
      success: (res) => {
        let that = this;
        console.log(res)
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: (cb) => {
            //console.log(cb);
            wx.getStorage({
              key: 'userData',
              success: (res) => {
                console.log(res)
                let session_key = JSON.parse(res.data).session_key;
                let openId = JSON.parse(res.data).openid;
                http.post('User', {
                  session_key: session_key,
                  openid: openId,
                  encryptedData: cb.encryptedData,
                  iv: cb.iv,
                }).then((cb) => {
                  that.shareToast(cb);
                })
              }
            })
            
          },
          fail: () => {
            console.log('获取分享信息失败')
          }
        })
      },
      fail: (res) => {
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: '取消转发',
            icon: 'none',
            duration: 2000
          })
        } else if (res.errMsg == 'shareAppMessage:fail') {
          wx.showToast({
            title: '转发失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
  },

  getuserinfo(openId) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.getUserInfo({
      success: (res) => {
        wx.hideLoading();
        console.log("成功获取用户信息: ", res);
        let data = {
          openid: openId,
          photourl: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        };
        http.post('User', data).then((res) => {
          console.log(res);
          app.globalData.userInfo.photourl = res.challenger.photourl;
          app.globalData.userInfo.challengeNumber = res.challenger.remainnumber;
          app.globalData.userInfo.postreward = res.challenger.postreward;
          that.freshUserInfo();
        })
      },
      fail: () => {
        wx.hideLoading();
        that.getauth();
      }
    })
  },
  getauth() {
    let that = this;
    wx.showModal({
      title: '获取信息失败',
      content:'请允许授权以便为您提供给服务',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              that.getuserinfo();
            },
            fail: (res) => {
              that.getauth();
            }
          })
        } else if (res.cancel) {
          that.getauth();
        }
      }
    })
  },
  freshUserInfo() {
    this.setData({userAvatar: app.globalData.userInfo.photourl});
    this.setData({challengeChance: app.globalData.userInfo.challengeNumber});
  },
  shareToast(data) {
    console.log('data: ', data)
    let chNum = data.challenger.remainnumber;
    console.log('chNum: ', chNum)
    console.log('numInglobalData: ', app.globalData.userInfo.challengeNumber)
    if (chNum == app.globalData.userInfo.challengeNumber) {
      //分享到相同的群
      wx.showToast({
        title: '请分享到不同的群，获得挑战次数',
        icon: 'none',
        duration: 3000
      })
    }
    if (chNum > app.globalData.userInfo.challengeNumber) {
      wx.showToast({
        title: '挑战次数+1',
        icon: 'none',
        duration: 2000
      })
      app.globalData.userInfo.challengeNumber = chNum;
      this.freshUserInfo();
    }
  },

  //以下为自定义点击事件
  
  
  startExam() {
    console.log(app.globalData.userInfo.challengeNumber)
    if (app.globalData.userInfo.challengeNumber > 0) {
      wx.showModal({
        title: '开始答题，消耗一次挑战次数',
        success: (res) => {
          if (res.confirm) {
            // 开始答题
            app.globalData.userInfo.challengeNumber--;
            http.post('User', {
              openid: app.globalData.userInfo.openId,
              remainnumber: app.globalData.userInfo.challengeNumber
            }).then(() => {
              wx.redirectTo({
                url: '../dati/dati'
              })
            })
          } else if (res.cancel) {
            // 取消答题
            return
          }
        }
      })
    }
  },
  toDaTing() {
    wx.switchTab({
      url: '../page1/page1'
    })
  }
  
})

