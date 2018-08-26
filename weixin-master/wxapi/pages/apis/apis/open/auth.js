/**
 * API -- 授权接口
 * 
 * 1.2.0
 * 
 * 1. wx.authorize
 * 
 * 权限scope:
 *  1. scope.userInfo, wx.getUserInfo, 用户信息
 *  2. scope.userLocation, wx.getLocation/chooseLocation, 地理位置
 *  3. scope.address, wx.chooseAddress, 通讯地址
 *  4. scope.invoiceTitle, wx.chooseInvoiceTitle, 发票抬头
 *  5. scope.werun, wx.getWeRunData, 微信运动步数
 *  6. scope.record, wx.startRecord, 录音功能
 *  7. scope.writePhotosAlbum, wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum, 保存到相册
 *  8. scope.camera, 摄像头
 */

module.exports = {
  authorize(opts) {
    const _opts = {
      scope: 'String, required, 需要获取权限的scope',
      success(res) {
        const _res = {
          errMsg: ''
        }
      },
      fail() {},
      complete() {}
    }
  },

  isSupportSoter(opts) {
    const _opts = {
      success(res) {
        const _res = {
          // 有效值：'fingerPring: 指纹识别', 'facial: 人脸识别，暂未支持', 'speech: 声纹识别，暂未支持'
          supportMode: 'StringArray, 该设备支持的可被SOTER识别的生物识别方式',
          errMsg: 'String'
        }
      }
    }
  },

  startSoter(opts) {
    const _opts = {
      requestAuthModes: 'StringArray, required, 请求使用的可接受的生物认证方式',
      challenge: 'String, required, 挑战因子。',
      authContent: 'String, 验证描述，即识别过程中显示在界面上的对话框提示内容',
      success(res) {
        const _res = {
          errCode: 'Number, 错误码',
          authMode: 'String',
          resultJSON: 'String, 在设备安全区域(TEE)内获得的本机安全信息，以及本次认证信息',
          resultJSONSignature: 'String',
          errMsg: 'String'
        }
      },
      fail() {},
      complete() {}
    }
  },

  isSoterEnrolled(opts) {
    const _otps = {
      checkAuthMode: 'String',
      success(res) {
        const _res = {
          isEnrolled: 'Boolean',
          errMsg: 'String'
        }
      },
      fail() {},
      complete() {}
    }
  }
}