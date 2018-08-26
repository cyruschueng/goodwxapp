import ElementUI from 'element-ui'
export default {
  // 验证手机号
  phone (value) {
    if ((/^1[34578]\d{9}$/.test(value))) {
      return true
    } else {
      ElementUI.Message.error('请输入正确的手机号')
      return false
    }
  },
  text(value,message) {
    let valu = value.replace(/([\u4e00-\u9fa5]+?)/g, 'aa')
    if ((/^[\w\W]{1,20}$/.test(valu))) {
      return true
    } else {
      ElementUI.Message.error(message)
      return false
    }
  },
  text10(value, message) {
    let valu = value.replace(/([\u4e00-\u9fa5]+?)/g, 'aa')
    if ((/^[\w\W]{1,10}$/.test(valu)) && valu) {
      return true
    } else {
      ElementUI.Message.error(message)
      return false
    }
  },
  // 验证英文或者数字
  vari(value, message) {
    if ((/^[A-Za-z0-9]{4,40}$/.test(value)) || (/^[0-9]*$/.test(value))) {
      return true
    } else {
      ElementUI.Message.error(message + '格式为英文加数字！')
      return false
    }
  },
  // price
  price(value) {
    if ((/^\d+(|(.[0-9]{1,2}))?$/.test(value)) && value) {
      return true
    } else {
      ElementUI.Message.error('价格格式有误！')
      return false
    }
  },
  /* price1(value) {
    if ((/^\d+(.[0-9]{1,2})?$/.test(value))) {
      return true
    } else {
      ElementUI.Message.error('价格格式有误！')
      return false
    }
  }, */
  // 验证电话
 /* phonea (value) {
    if ((/^\d+(.[0-9]{1,2})?$/.test(value))) {
      return true
    } else {
      ElementUI.Message.error('aaaaa！')
      return false
    }
  }, */
  // 验证是否为空
  req(value,message) {
    if (value) {
      return true
    } else {
      ElementUI.Message.error(message)
      return false
    }
  },
  // 批量验证
  // let Obj = {}
  // Obj['所属门店,req'] = this.activEditDeskRoom.shopId
  // Obj['包厢名称,req'] = this.activEditDeskRoom.name
  // Obj['茶位费,req'] = this.activEditDeskRoom.teaPrice
  // Obj['服务费,req'] = this.activEditDeskRoom.servicePrice
  // Obj['最低消费,req'] = this.activEditDeskRoom.minimumCharge
  // if(this.$_ver.reqJson(Obj)) {}
  reqJson(obj) {
    console.log(obj)
    for (const key in obj) {
      let keyArr = key.split(',')
      if (keyArr[1] === 'req') {
        if (!obj[key] || obj[key] === undefined || obj[key] === 'undefined') {
          ElementUI.Message.error(keyArr[0] + '参数有误！')
          return false
        }
      } else if (keyArr[1] === 'phone') {
        if (!(/^1[34578]\d{9}$/.test(obj[key]))) {
          ElementUI.Message.error(keyArr[0] + '格式错误！')
          return false
        }
      } else if (keyArr[1] === 'price') {
        if (!(/^\d+(|(.[0-9]{1,2}))?$/.test(obj[key]) && obj[key] && obj[key] !== 0)) {
          ElementUI.Message.error(keyArr[0] + '金额错误！')
          return false
        }
      }
    }
    return true
  }
}
