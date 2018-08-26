// pages/components/boss-footer/boss-footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    textColor: {
      type: String
    },
    textColorMessage: {
      type: String
    },
    textColorMy: {
      type: String
    },
    workPath: {
      type: String
    },
    messagePath: {
      type: String
    },
    myPath: {
      type: String
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
    toRecruit: function() {
      wx.redirectTo({
        url: '../index/index'
      })
    },
    toMessage: function() {
      wx.redirectTo({
        url: '../message/message'
      })
    },
    toMy: function() {
      wx.redirectTo({
        url: '../my/my'
      })
    }
  }
})
