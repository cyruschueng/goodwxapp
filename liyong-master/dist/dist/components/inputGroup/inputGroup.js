Component({
  data:{
    change:"请选择",
    hideArrow:true
  },
  properties: {
    label: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value:''
    },
    select: {
      type: Array,
      value:[]
    },
    type: {
      type: String,
      value: 'text' //  ['text', 'select']
    },
    options: {
      type: Array,
      value: []
    },
    required: {
      type: Boolean,
      value: false
    },
  },
  methods:{
    // input获取信息
    blur (e) {
      const { name } = this.data
      const { value } = e.detail
      this.triggerEvent('blur', { name, value })
    },
    // picker获取信息
    selectMes (e) {
      this.setData({
        index: e.detail.value,
        change:"",
        hideArrow:false
      })
      const { name } = this.data
      const { value } = e.detail
      this.triggerEvent('picker', { name, value })
    }
  }
})
