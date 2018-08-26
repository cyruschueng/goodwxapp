/**
 * API -- device wifi
 * 
 * 无线网络
 * 
 * >= 1.6.0
 * 
 * 连接指定wifi接口调用时序：
 * 
 * 1. Andriod:  startWifi -> connectWifi -> onWifiConnected
 * 2. iOS(>= 11): startWifi -> connectWifi -> onWifiConnected
 * 
 * 连周边wifi接口调用时序：
 * 
 * 1. Andriod: startWifi -> getWifiList -> onGetWifiList -> connectWifi -> onWifiConnected
 * 2. iOS(>= 11.0(!11.1)): startWifi -> getWifiList -> onGetWifiList -> setWifiList -> onWifiConnected
 * 
 * TIP:
 *  1. wifi接口暂不可用 wx.canIUse 判断
 *  2. Andriod6.0+，在没有打开定位开关的时候会导致设备不能正常获取周边的wifi信息
 * 
 * errcode: 
 * 
 * Code     Desc
 * 0        ok
 * 12000    未先调用start接口
 * 12001    当前系统不支持相关能力
 * 12002    wifi密码错误
 * 12003    连接超时
 * 12004    重复连接wifi
 * 12005    Andriod特有，未打开wifi开关
 * 12006    Andriod特有，未打开gps定位
 * 12007    用户拒绝授权链接WiFi
 * 12008    无效SSID
 * 12009    系统运营商配置拒绝连接WiFi
 * 12011    应用在后台无法配置WiFi
 */

const TIP = require('../uis/tip')

module.exports = {
  /**
   * 初始化wifi模块
   */
  start(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.startWifi) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.startWifi(opts)
  },

  /**
   * 关闭wifi模块
   */
  stop(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.stopWifi) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.stopWifi(opts)
  },

  /**
   * 连接wifi.若已知wifi信息，可以直接利用该接口连接，仅Andriod和iOS 11+支持
   */
  connect(opts) {
    const _opts = {
      SSID: 'String, required, wifi设备ssid',
      BSSID: 'String, required, wifi设备bssid',
      password: 'String, wifi设备密码',
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.connectWifi) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.connectWifi(opts)
  },

  /**
   * 请求获取wifi列表，在onGetWifiList注册的回调中返回wifiList数据。iOS将跳转到系统的wifi界面，Andriod不会跳转。
   * 
   * iOS11.0及iOS11.1因系统问题，改方法失效，iOS11.2中已修复
   */
  getList(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.getWifiList) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.getWifiList(opts)
  },

  /**
   * iOS特有接口，在 onGetWifiList 回调后，利用接口设置 wifiList 中的AP相关信息
   * 
   * TIP:
   *  1. 该接口只能在 onGetWifiList 回调之后才能调用
   *  2. 此时客户端会挂起，等待小程序设置wifi信息，请务必尽快调用该接口，若无数据请传入一个空数组
   *  3. 有可能随着周边的wifi列表的刷新，单个流程内收到的多次带有存在重复的WiFi列表的回调
   * 
   * 使用实例：
   * 
   * this.on.getList(res => {
   *    // 监听回调返回了数据情况下
   *   if (res.wifiList.length) {
   *      wx.setWifiList({
   *         wifiList: [{
   *          SSID: res.wifiList[0].SSID,
   *          BSSID: res.wifiList[0].BSSID,
   *          password: '123456'
   *        }]
   *      })
   *  } else {
   *    // 没有返回数据情况下，要传入个空数组
   *    wx.setWifiList({wifiList: []})  
   *  }
   * })
   */
  setList(opts) {
    const _opts = {
      // Array, required, 提供预设的wifi信息列表
      wifiList: [{
        SSID: 'String',
        BSSID: 'String',
        password: 'String'
      }],
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.setWifiList) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.setWifiList(opts)
  },

  presetList(opts) { },

  /**
   * 获取已连接中的wifi信息
   */
  getConnected(opts) { 
    const _opts = {
      success(res) {
        const _res = {
          wifi: {
            SSID: 'String',
            BSSID: 'String',
            secure: 'Boolean',
            signalStrength: 'Number'
          }
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.getConnectedWifi) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.getConnectedWifi(opts)
  },

  on: {
    /**
     * 监听在获取到wifi列表数据时的事件，在回调中将返回wifilist
     */
    getList(callback) {
      const _callback = res => {
        const _res = {
          wifiList: [{
            SSID: 'String',
            BSSID: 'String',
            secure: 'Boolean, WiFi是否安全',
            signalStrength: 'Number, WiFi信号强度'
          }]
        }
      }

      if (!wx.onGetWifiList) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onGetWifiList(res => {
        if (callback) {
          callback(res)
        }
      })
    },

    /**
     * 监听连接上wifi的事件
     */
    connected(callback) { 
      const _callback = {
        wifi: {
          SSID: 'String',
          BSSID: 'String',
          secure: 'Boolean，是否安全',
          signalStrength: 'Number, 信号强度'
        }
      }

      if (!wx.onWifiConnected) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onWifiConnected(res => {
        if (callback) {
          callback(res)
        }
      })
    },

    evaluate(callback) { }
  }
}

