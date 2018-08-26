Component({
  properties: {
    card: {
      type: Object,
      value: null
    },
    disabled: {
      type: Boolean,
      value: false
    },
    selected: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    gotoRecordList () {
      this.triggerEvent('gotoRecordList')
    }
  }
})
