import PopupManager from './PopupManager'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selfShow: this.show
    }
  },
  mounted () { // 弹窗被挂载时打开overlay
    if (this.selfShow && this.overlay) {
      PopupManager.open(this)
    }
  },
  beforeDestroy () { // 弹窗被销毁前关闭overlay
    PopupManager.close(this)
  },
  watch: {
    show (val) {
      this.selfShow = val
    },
    selfShow (val) {
      this.$emit('update:show', val)
      if (val && this.overlay) {
        PopupManager.open(this)
      } else {
        PopupManager.close(this)
      }
    }
  }
}
