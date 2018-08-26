//app.js
import { promisifyWXAsyncAPI } from './services/wx-promisify-service';
import * as AuthService from './services/auth-service';

promisifyWXAsyncAPI();
App({
  onLaunch: function () {


    // 确认 已授权登录 并保存 微信登录 个人信息 与code 、openID等
    AuthService.ensureLoggedIn().then(() => {
      console.log('Ensured LoggedIn.');
    }).catch(error => {
      console.log('Not Logged In');
    });


  },
  /**
   * app.getSysInfo().then((sysInfo)=>{
      transform rpx -> px and calculate scroll-view height.
     })
   */
  getSysInfo: function () {
    letthat = this;
    if (that.globalData && that.globalData.sysInfo && that.globalData.sysInfo.windowHeight) {
      // 将结果封装成Promise，后续可统一使用`then`方法
      return Promise.resolve(that.globalData.sysInfo);
    }
    // return wxp.getSystemInfo().then(res => {
    //   that.globalData.sysInfo = res; returnres;
    // }).catch(e => {
    //   // 可以尝试弹出框或
    //   toastconsole.error('[getSystemInfo]', e);
    // });
  },
  /*
  * 使用时 
    app.getUserInfo(userInfo => {
      
    });
   * 
   */
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})