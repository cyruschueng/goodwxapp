Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    merchType: {
      type: Object,
      value: {}
    }
  },

  methods: {
    add () {
      const { merchType } = this.data
      const { _select, quantity } = merchType
      if (_select < quantity && (!merchType.promotion ||
        merchType.promotion.num == 0 ||
        _select < merchType.promotion.num - merchType.merchTypeTotal)
      ) this.triggerEvent('add')
    },
    minus () {
      const { _select } = this.data.merchType
      if (_select > 0) this.triggerEvent('minus')
    }
  }
})
