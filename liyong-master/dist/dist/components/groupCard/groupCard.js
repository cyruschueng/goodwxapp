Component({
  properties: {
    current: {
      type: Boolean,
      value: false
    },
    canCancel: {
      type: Boolean,
      value: false
    },
    canClaim: {
      type: Boolean,
      value: false
    },
    claimedBySelf: {
      type: Boolean,
      value: false
    },
    claimed : {
      type: Boolean,
      value: false
    },
    promoting: {
      type: Boolean,
      value: false
    },
    limited: {
      type: Boolean,
      value: false
    },
    expire: {
      type: Boolean,
      value: false
    },
    canPromote: {
      type: Boolean,
      value: false
    },
    canShare: {
      type: Boolean,
      value: false
    },

    id: {
      type: String,
      value: ''
    },
    openGId: {
      type: String,
      value: ''
    },
    remark: {
      type: String,
      value: ''
    },
    author: {
      type: String,
      value: ''
    },
    avatars: {
      type: Array,
      value: []
    },
    memberTotal: {
      type: Number,
      value: 0
    },
    expireDate: {
      type: String,
      value: ''
    },

    appealStatus: {
      type: String
    },
    appealResult: {
      type: String
    },
    appealDatetime: {
      type: String
    }
  },
  methods: {
    appeal (event) {
      this.triggerEvent('tapAppeal')
    },

    claim () {
      this.triggerEvent('tapClaim')
    },

    cancel () {
      this.triggerEvent('tapCancel')
    },

    promote () {
      this.triggerEvent('tapPromote')
    },

    cancelPromote () {
      this.triggerEvent('tapCancelPromote')
    },

    share () {
      this.triggerEvent('tapShare')
    },

    update () {
      this.triggerEvent('tapUpdate')
    }
  }
})
