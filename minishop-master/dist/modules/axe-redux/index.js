import Axe from '../axe/index.js'
import {
  isPlainObject,
  shallowEqual
} from '../../utils/index.js'

export function provider (store) {
  // 全局mixin
  Axe.mixin({
    $store: store,
    onLoad () {
      if (!this.onStateChange && !this.mapState) return
      this.$unsubscribe = this.$store.subscribe(() => {
        var state = this.$store.getState()
        listener(this, state)
      })
    },

    // 在页面进入前台时，将可能累计结果计算一遍
    onShow () {
      if (this._ready) {
        listener(this, this.$store.getState())
      }
    },

    onReady () {
      listener(this, this.$store.getState(), true)
    },

    onUnload () {
      if (this.$unsubscribe) {
        this.$unsubscribe()
      }
    }
  })
}

function listener (axe, state, init) {
  // 如果页面隐藏了不触发
  if (!axe._active) return
  if (axe.mapState) {
    var nextState = axe.mapState(state)
    if (isPlainObject(nextState)) {
      if (init || !shallowEqual(axe.state, nextState)) {
        axe.state = nextState
        axe.setData(axe.state)
      }
    }
  }
  if (axe.onStateChange) {
    axe.onStateChange(state)
  }
}
