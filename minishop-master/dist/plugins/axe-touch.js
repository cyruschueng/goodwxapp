import Touch from './touch'
export default {
  onLoad () {
    this.$touch = new Touch()
    this.$touch.on('touch:start', e => this.emit('touch:start', e))
    this.$touch.on('touch:move', e => this.emit('touch:move', e))
    this.$touch.on('touch:end', e => this.emit('touch:end', e))
    this.$touch.on('touch:cancel', e => this.emit('touch:cancel', e))
    this.emit('touch:load')
  },

  onUnload () {
    this.$touch.destroy()
    this.$touch = null
  },

  ontouchstart (e) {
    this.$touch.touchStart(e)
  },

  ontouchmove (e) {
    this.$touch.touchMove(e)
  },

  ontouchend (e) {
    this.$touch.touchEnd(e)
  },

  ontouchcancel (e) {
    this.$touch.touchCancel(e)
  },

  ontransitionend (e) {
    this.emit('touch:transitionend', e)
  },

  onPageScroll () {
    if (this._touchTimeId) {
      clearTimeout(this._touchTimeId)
    }
    this.$touch.pause('touch:start touch:move touch:end touch:cancel')
    this._touchTimeId = setTimeout(() => {
      this.$touch.resume('touch:start touch:move touch:end touch:cancel')
    }, 1000 / 60)
  }
}
