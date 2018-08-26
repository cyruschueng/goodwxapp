/**
 * API -- device phone
 * 
 * 电话
 */

const TIP = require('../uis/tip')

const contactTpl = {
  photoFilePath: 'String, 头像本地文件路径',
  nickName: 'String, 昵称',
  lastName: 'String, 姓氏',
  middleName: 'String, 中间名',
  firstName: 'String, required, 名字',
  remark: 'String, 备注',
  mobilePhoneNumber: 'String, 手机号',
  weChatNumber: 'String, 微信号',
  addressCountry: 'String, 联系地址国家',
  addressState: 'String, 联系地址省份',
  addressCity: 'String, 联系地址城市',
  addressStreet: 'String, 联系地址接到',
  addressPostalCode: 'String, 联系地址邮政编码',
  organization: 'String, 公司',
  title: 'String, 职位',
  workFaxNumber: 'String, 工作传真',
  workPhoneNumber: 'String, 工作电话',
  hostNumber: 'String, 公司电话',
  email: 'String, 电子邮件',
  url: 'String, 网站',
  workAddressCountry: 'String, 工作地址国家',
  workAddressState: 'String, 工作地址省份',
  workAddressCity: 'String, 工作地址城市',
  workAddressStreet: 'String, 工作地址街道',
  workAddressPostalCode: 'String, 工作地址邮政编码',
  homeFaxNumber: 'String, 住宅传真',
  homePhoneNumber: 'String, 住宅电话',
  homeAddressCountry: 'String, 住宅地址国家',
  homeAddressState: 'String, 住宅地址省份',
  homeAddressCity: 'String, 住宅地址城市',
  homeAddressStreet: 'String, 住宅地址街道',
  homeAddressPostalCode: 'String, 住宅地址邮政编码'
}

module.exports = {
  call(opts) {
    const _opts = {
      phoneNumber: 'String, required, 需要拨打的电话号码',
      success(res) { },
      fail(res) { },
      complete(res) { }
    }
  },

  contact: {
    add(opts) {
      const _opts = {
        ...contactTpl,
        success(res) {},
        fail(res) { },
        complete(res) { }
      }

      if (!wx.addPhoneContact) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.addPhoneContact(opts)
    }
  }
}