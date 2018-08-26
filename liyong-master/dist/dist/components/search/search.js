import { debounce } from '../../utils'

Component({
  properties: {
    placeholder: {
      type: String,
      value: '请输入搜索内容'
    },
  },

  data: {
    value: ''
  },

  methods: {
    input: debounce(
      function (event) {
        const { value } = event.detail
        this.setData({ value })
        this.triggerEvent('updateQuery', value)
      },
      500
    ),

    clear () {
      this.triggerEvent('clearQuery')
      this.setData({ value: '' })
    }
  },


})
