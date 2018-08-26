/**
 * API -- device NFC
 * 
 * NFC: Near Field Communication缩写，即近距离无线通讯技术
 * 
 * 暂仅支持 HCE(基于主机的卡模拟)模式，即将安卓手机模拟成实体智能卡
 * 
 * 适用机型：支持NFC功能，切系统版本为 Andriod5.0+
 * 
 * 适用卡范围：符合ISO 14443-4标准的CPU卡
 * 
 * >= 1.7.0
 * 
 * errcode:
 * 
 * code     desc
 * 0        ok
 * 13000    当前设备不支持NFC
 * 13001    当前设备支持NFC，但系统NFC开关未开启
 * 13002    当前设备支持NFC，但不支持HCE
 * 13003    AID列表参数格式错误
 * 13004    未设置微信为默认NFC支付应用
 * 13005    返回的指令不合法
 * 13006    注册AID失败
 */

const TIP = require('../uis/tip')

module.exports = {
  hce: {
    on: {
      /**
       * 监听NFC设备的消息回调，并在回调中处理，返回参数中 messageType 表示消息类型，值如下：
       * 
       * 1. 消息为HCE Apdu Command 类型，小程序需对此指令进行处理，并调用 sendHCEMessage接口返回处理指令
       * 2. 消息为设备离场事件
       */
      message(callback) {
        const _callback = res => {
          const _res = {
            messageType: 'Number, 消息类型，值如上',
            data: 'ArrayBuffer, 客户端收到NFC设备的指令，此参数当且仅当 messageType = 1 时有效',
            reason: 'Number, 此参数当且仅当 messageType = 2 时有效'
          }
        }
      }
    },

    // 发送NFC消息，仅在安卓系统下有效
    send(opts) {
      const _opts = {
        data: 'ArrayBuffer, required, 二进制数据',
        success(res) {
          const _res = {
            errMsg: 'String, 错误信息',
            errCode: 'Number, 错误码'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.sendHCEMessage) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.sendHCEMessage(opts)
    },
    // 关闭NFC模块
    stop(opts) {
      const _opts = {
        success(res) {
          const _res = {
            errMsg: 'String, 错误信息',
            errCode: 'Number, 错误码'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.stopHCE) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.stopHCE(opts)
    },
    // 初始化NFC模块
    start(opts) {
      const _opts = {
        // Array, required, 需要注册到系统的AID列表，每个AID为String类型
        aid_list: [],
        success(res) {
          const _res = {
            errMsg: 'String, 错误信息',
            errCode: 'Number, 错误码'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.startHCE) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.startHCE(opts)
    },
    // 判断当前设备是否支持HCE能力
    getState(opts) {
      const _opts = {
        success(res) {
          const _res = {
            errMsg: 'String, 错误信息',
            errCode: 'Number, 错误码'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.getHCEState) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.getHCEState(opts)
    }
  }
}