// pages/biometrics/biometrics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

    /**
     * 获取本机支持的 SOTER 生物认证方式
     */
    checkIsSupportSoterAuthentication:function () {
        wx.checkIsSupportSoterAuthentication({
            success(res) {
                // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
                // res.supportMode = ['fingerPrint'] 只支持指纹识别
                // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
                console.log(res);
            }
        })
    },

    /**
     * 开始 SOTER 生物认证
     */
    startSoterAuthentication: function(){
        wx.startSoterAuthentication({
            requestAuthModes: ['fingerPrint'],
            challenge: '123456',
            authContent: '请用指纹解锁',
            success(res) {
              console.log(res);
            }
        })
    },

    /**
     * 获取设备内是否录入如指纹等生物信息的接口
     */
    checkIsSoterEnrolledInDevice: function(){
        wx.checkIsSoterEnrolledInDevice({
            checkAuthMode: 'fingerPrint',
            success(res) {
                console.log(res.isEnrolled)
            }
        })
    }

})