/**
 * API -- beacon
 * 
 * 信标
 * 
 * >= 1.2.0
 * 
 * 错误码：
 * 
 * Code   desc
 * 0      正常
 * 11000  系统或设备不支持
 * 11001  蓝牙服务不可用
 * 11002  位置服务不可用
 * 11003  已经开始搜索
 */

const TIP = require('../uis/tip')

module.exports = {
  search(opts) {
    const _opts = {
      uuids: 'StringArray, required，iBeacon设备广播的uuids',
      success(res) {
        const _res = {
          errMsg: 'String, 调用结果'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.startBeaconDiscovery) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.startBeaconDiscovery(opts)
  },

  stop(opts) {
    const _opts = {
      success(res) {
        const _res = {
          errMsg: 'String, 调用结果'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.stopBeaconDiscovery) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.stopBeaconDiscovery(opts)
  },

  // 获取所有搜索到的iBeacon设备
  getBeacons(opts) {
    const _opts = {
      success(res) {
        const _res = {
          // ObjectArray，iBeacon设备列表
          beacons: [{
            uuid: 'String, iBeacon设备广播的uuid',
            major: 'String, iBeacon设备的主id',
            minor: 'String, iBeacon设备的次id',
            proximity: 'Number, 设备距离的枚举值',
            accuracy: 'Number, iBeacon设备的距离',
            rssi: 'Number, 设备的信号强度'
          }],
          errMsg: 'String, 调用结果'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.getBeacons) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.getBeacons(opts)
  },

  on: {
    beaconUpdate(callback) {
      const _callback = res => {
        const _res = {
          // 当前搜寻到的所有iBeacon设备列表
          beacons: [{
            uuid: 'String, iBeacon设备广播的uuid',
            major: 'String, iBeacon设备的主id',
            minor: 'String, iBeacon设备的次id',
            proximity: 'Number, 设备距离的枚举值',
            accuracy: 'Number, iBeacon设备的距离',
            rssi: 'Number, 设备的信号强度'
          }]
        }
      }

      if (!wx.onBeaconUpdate) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onBeaconUpdate(opts)
    },

    // 监听 iBeacon 服务的状态变化
    serviceChange(callback) {
      const _callback = res => {
        const _res = {
          available: 'Boolean, 服务目前是否可用',
          discovering: 'Boolean, 目前是否处于搜索状态'
        }
      }

      if (!wx.onBeaconServiceChange) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onBeaconServiceChange(opts)
    }
  }


}