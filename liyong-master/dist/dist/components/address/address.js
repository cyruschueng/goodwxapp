Component({
  properties: {
    isDefault: {
      type: Boolean,
      value: false
    },
    address: {
      type: Object,
      value: {}
    },
    tagMap: {
      type: Object,
      value: {}
    },
    isSelect: {
      type: Boolean,
      value: false
    },
    isLimit: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    edit () {
      this.triggerEvent('edit')
    },
    remove () {
      this.triggerEvent('remove')
    },
    setDefault () {
      this.triggerEvent('setDefault')
    }
  }
})
