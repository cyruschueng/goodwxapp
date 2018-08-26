// pages/service/service.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    right: {
      type: String,
      value: '0',
    },
    bottom:{
      type: String,
      value: '10',
    },
    content:{
      type: String,
      value: '看这里～，有你想要的'
    },
    width:{
      type: String,
      value: '200',
    },
    image:{
      type: String,
      value: 'http://avatars.maiyizhi.cn/5a40964193.jpg'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cusomterSerive: function () {
      console.log(123)
    }
  }
})
