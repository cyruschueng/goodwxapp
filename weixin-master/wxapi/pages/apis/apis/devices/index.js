/**
 * API -- Device
 * 
 * 设备信息
 */

const TIP = require('./device')
const bluetooth = require('./bluetooth')
const vibrate = require('./vibrate')
const screen = require('./screen')
const network = require('./network')
const accelerometer = require('./accelerometer')
const compass = require('./compass')
const qrcode = require('./qrcode')
const clipboard = require('./clipboard')
const beacon = require('./beacon')
const nfc = require('./nfc')

module.exports = {
  getSysInfo(opts, sync) {
    const _opts = {
      success(res) {
        const _res = {
          brand: 'String, 1.5.0, 手机品牌',
          model: 'String, 手机型号',
          pixelRatio: '设备像素比',
          screenWidth: 'Number, 1.1.0, 屏幕宽度',
          screenHeight: 'Number, 1.1.0, 屏幕高度',
          windowWidth: 'Number, 可使用窗口宽度',
          windowHeight: 'Number, 可使用窗口高度',
          language: '微信设置的语言',
          version: '微信版本号',
          system: '操作系统版本',
          platform: '客户端平台',
          fontSizeSetting: 'v1.5.0, 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px',
          SDKVersion: 'v1.1.0, 客户端基础库版本'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    if (typeof sync === 'undefined' || !sync) {
      wx.getSystemInfo(opts || _opts)
      return true
    }

    try {
      const res = wx.getSystemInfoSync()
      console.log('/device/getSystemInfo/sync', res.model, res.pixelRatio, res.windowHeight, res.windowWidth)
      return res
    } catch (error) {
      console.log('/device/getSystemInfo/sync/error', error)
    }

    return false
  },

  canIUse(names) {
    const type = obj => Object.prototype.toString
      .call(obj)
      .split(' ')[1]
      .replace(/]/, '')
      .toLowerCase()

    const _type = type(names)

    if (_type === 'string') {
      return {
        [names]: wx.canIUse(names)
      }
    } else if (_type === 'array') {
      const cans = {}
      names.map(name => {
        cans[name] = wx.canIUse(name)
      })
      return cans
    } else if (_type === 'object') {
      for (let key in names) {
        if (names.hasOwnProperty(key)) {
          names[key] = wx.canIUse(key)
        }
        return names
      }
    } else {
      return false
    }
  },

  // 手机振动
  vibrate,

  // 屏幕
  screen,

  // 网络
  network,

  // 加速度计
  accelerometer,

  // 罗盘
  compass,

  // 电话
  phone,

  // 二维码
  qrcode,

  // 剪贴板
  clipboard,

  // 蓝牙设备
  bluebooth,

  // 信标
  beacon,

  // 近距离无线通信技术
  nfc,

  // 无线网络
  wifi
}