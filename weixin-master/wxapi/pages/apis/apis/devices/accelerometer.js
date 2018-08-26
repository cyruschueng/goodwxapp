/**
  * 加速度计
  * 
  * 1. 先 on.accelerometerChange(cb)
  * 2. start(opts) 开始监听
  * 3. stop(opts) 停止监听
  */

const TIP = require('../uis/tip')

module.exports = {

  stop(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.stopAccelerometer) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.stopAccelerometer(opts)
    return true
  },

  // 开始监听加速度数据
  start(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.startAccelerometer) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.startAccelerometer(opts)
    return true
  },

  on: {
    // 加速度变化事件
    accelerometerChange(callback) {
      const _callback = res => {
        const _res = {
          x: 'Number, X轴',
          y: 'Number, Y轴',
          z: 'Number, Z轴'
        }
      }

      if (!wx.onAccelerometerChange) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onAccelerometerChange(res => {
        if (callback) {
          callback(res)
        }
      })
    }
  }
}