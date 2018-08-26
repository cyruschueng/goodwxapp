/**
 * API -- Tip
 * 
 * 微信提示模块
 * 
 * Bug & Tip
 * 
 * 1. bug: Andriod6.3.30, wx.showModal的返回的confirm一直为true
 * 2. tip: wx.showActionSheet 点击取消或蒙层时，回调fail，errMsg为“showActionSheet:fail cancel”
 * 3. tip: wx.showLoading 和 wx.showToast 同时只能显示一个，但wx.hideToast/wx.hideLoading，也应当配对使用
 * 4. tip: iOS wx.showModal点击蒙层不会关闭模态弹窗，所以尽量避免使用“取消”分支去实现业务逻辑
 */

module.exports = {
  message: {
    low_version: {
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试'
    }
  },

  // 模态框
  modal: {
    show(opts) {
      const _opts = {
        title: '提示',
        content: '无提示内容',
        showCancel: 'Boolean',
        cancelText: 'String, 取消按钮的文字，默认：“取消”，最多4个字符',
        cancelColor: 'HexColor, 取消按钮的文字颜色，默认：#000000',
        confirmText: 'String, 确定按钮的文字，默认为：“确定”，最多4个字符',
        confirmColor: 'HexColor, 确定按钮的文字颜色，默认为：#3CC51F',
        success(res) {
          const _res = {
            confirm: 'Boolean, 为true时，表示用户点击了确定按钮',
            cancel: 'Boolean, 为true时，表示用户点击了取消（用于Andriod系统区分点击蒙层关闭还是点击取消按钮关闭）'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      const _type = opts.type
      let msg = opts || _opts
      if (typeof _type !== 'undefined' && this.message.hasOwnProperty(_type)) {
        msg = this.message[_type]
      }

      wx.showModel(msg)
    },

    hide() { }
  },

  // 消息提示框
  toast: {
    show(opts) {
      const _opts = {
        title: 'String, required, 提示内容',
        /**
         * success: 成功图标，此时title文本最多显示7个汉字长度，默认值
         * loading: 显示加载图标，title最多7个汉字长度
         * none: 不显示图标，title文本最多可显示两行
         */
        icon: 'String, 图标，有效值：success, loading, none',
        image: 'String, 自定义图片的本地路径，image优先级高于icon',
        duration: 'Number, 提示的延时时间(ms, 默认：1500)',
        mask: 'Boolean, 是否显示透明蒙层，防止触摸穿透，默认：false',
        success(res) {},
        fail(res) {},
        complete(res) {}
      }
    },

    hide(opts) {
      wx.hideToast()
    }
  },
  
  /**
   * 加载提示框，show之后必须主动调用hide才能关闭
   * 
   * >= 1.1.0
   */
  loading: {
    show(opts) {
      const _opts = {
        title: 'String, required',
        mask: 'Boolean, 是否显示透明蒙层，防止触摸穿透，默认：false',
        success(res) {},
        fail(res) {},
        complete(res) {}
      }

      if (!wx.showLoading) {
        console.warn('/uis/tip/loading/showLoading', '该版本不支持')
        return false
      }

      wx.showLoading(opts)
    },

    // 隐藏加载提示框
    hide(opts) {
      if (wx.hideLoading) {
        console.warn('/uis/tip/loading/hideLoading', '该版本不支持')
        return false
      }

      wx.hideLoading()
    }
  },

  // 操作菜单
  actionSheet: {
    show(opts) {
      const _opts = {
        itemList: 'String Array, required, 按钮的文字数组，数组长度最大为6个',
        itemColor: 'HexColor，按钮文字颜色，默认：#000000',
        success(res) {
          const _res = {
            tapIndex: 'Number, 用户点击的按钮，从上到下的顺序，从0开始'
          }
        },
        fail(res) {},
        complete(res) {}
      }
    }
  }
}