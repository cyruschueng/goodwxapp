import config from "./utils/config";
import util from "./utils/util";
const u_id = config.u_id;
App({
  onLaunch: function ( ops ) {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    var that = this;
    util.userLogin(function(result){
      that.globalData.testinfo = that.globalData.testinfo+"\n"+"userLogin";
    });
    wx.authorize({
      scope:"scope.userInfo",
      success:res=>{
        that.globalData.testinfo = that.globalData.testinfo+"\n"+"authorize ok" /*debug*/;
        wx.getUserInfo({
          withCredentials :true,
          success: res => {
          if (ops != null && ops.scene == 1044)  {
            wx.getShareInfo({
                shareTicket:ops.shareTicket,
                success:(res)=>{
                  util.encrypt(res,(result)=>{
                    this.globalData.testinfo = this.globalData.testinfo+"\n"+"Init encrypt";
                    util.getGroup(result,r=>{
                      this.globalData.testinfo = this.globalData.testinfo+"\n"+"Init getGroup"+r.gid;
                    });
                  });
                }
              });
            }
            util.encrypt(res,function(r){
              that.globalData.testinfo = that.globalData.testinfo+"\n"+"encrypt"/*debug*/;
              util.getInit(r,(re)=>{
                that.globalData.testinfo = that.globalData.testinfo+"\n"+"getInit"/*debug*/;
                that.globalData.uid = re.data.uid;
                that.globalData.config = re.data.config;
              });
            });
            this.globalData.testinfo = this.globalData.testinfo+"\n"+"进入getUserInfo"/*debug*/;
            this.globalData.rawData = res.rawData;
            this.globalData.userInfo = res.userInfo;
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res);
            }
          },
          fail: err=>{
          }
        });
      }
    });
  },
  globalData: {
    userInfo: null,
    rawData:null,
    uid:null,
    config:{},
    UserInfo:{},
    shareTicket:null,
    testinfo:""
  }
})
