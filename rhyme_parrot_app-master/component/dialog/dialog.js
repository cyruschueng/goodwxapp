Component({
  properties: {
    title: {
      type: String
    }, 
    show: {
      type: String
    }
  },
  data: {
  },
  methods: {
    close: function(){
      let me = this
      setTimeout(function(){
        me.setData({
          show: false
        })
      },500)
    }
  }
})