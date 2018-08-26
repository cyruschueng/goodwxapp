import Event from '../event/index'
import { callHook } from './utils'
import {
  bindOptions,
  mergeOptions,
  pickOptions
} from './options'

let uid = 1
class Axe extends Event {
  constructor (options = {}, run) {
    super()
    // 上下文代指自己,主要给Event使用
    this._cxt = this
    // 是否是Page
    this._isPage = run === Page
    this._uid = uid++
    // 在app中执行了onLaunch，在page中执行了onReady
    this._ready = false
    // 在page中执行了onShow:_active=true, onHide:_active = false
    this._active = false

    let finalOptions = {}
    mergeOptions(finalOptions, Axe.options)
    mergeOptions(finalOptions, options)

    const wxOptions = bindOptions(this, finalOptions)

    let keys = Object.keys(this)
    callHook('Init', this)
    // 调用onInit钩子函数时，可能会在axe对象上绑定属性，需要同步到wxOptions上
    pickOptions(this, keys, wxOptions)
    run(wxOptions)
  }

  // 代理setData
  setData (data) {
    if (this.$cxt && this.$cxt.setData) {
      this.$cxt.setData(data)
      this.emit('axe:updated', data)
    } else if (process.env.NODE_ENV !== 'production') {
      console.log('[axe][setData]setData需要在onLoad后才可以使用')
    }
  }

  // 代理route
  get route () {
    if (this.$cxt) {
      return this.$cxt.route
    }
  }
}

export default Axe
