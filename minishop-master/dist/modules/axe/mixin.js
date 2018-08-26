import { mergeOptions } from './options'
import { nextTick } from './utils'
export function initMixin (Axe) {
  Axe.options = {}
  Axe.mixin = function (options) {
    mergeOptions(this.options, options)
    return this
  }
}

export function buildinMixin (Axe) {
  // 内置一些混合，添加_active，_ready，_active属性
  Axe.mixin({
    onLoad () {
      const axe = this
      Object.defineProperty(axe, 'data', {
        get () {
          return axe.$cxt.data
        }
      })
    },

    // app和page中
    onShow () {
      this._active = true
    },

    // app中
    onLaunch () {
      this._ready = true
    },

    // page中
    onReady () {
      this._ready = true
      nextTick(() => {
        var key = this.route
        if (typeof this.name === 'string') {
          key = this.name
        }
        this.$bus.emit('axe:page:' + key + ':ready', this)
      })
    },

    // app和page中
    onHide () {
      this._active = false
    },

    onUnload () {
      // 重新初始化页面信息
      this._ready = false
      this._active = false
      // 事件初始化
      this._events = {}
    }
  })
}
