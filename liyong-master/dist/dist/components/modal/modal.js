Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    flash: {
      type: Boolean,
      value: false
    },
    closeIcon: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    close () {
      this.triggerEvent('close')
    },
    tapCloseIcon () {
      this.triggerEvent('closeIcon')
    }
  }
})
