Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    merchType: {
      type: Object,
      value: {}
    },
    quantity: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    subscribe () {
      this.triggerEvent('subscribe')
    }
  }
})
