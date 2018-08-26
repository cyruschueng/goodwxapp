import { COUPON } from '../../constants'

Component({
  properties: {
    coupon: {
      type: Object,
      value: {}
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  data: {
    COUPON
  }
})
