// utils/modal/modal.js

let that;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { 
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached: function () {
    that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          animationShowHeight : res.windowHeight
        });
      }
    })  ;
  },

  /**
 * 弹出框蒙层截断touchmove事件
 */
  preventTouchMove: function () {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function () {
      // 显示遮罩层  
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(that.data.animationShowHeight).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    hide: function () {
      // 隐藏遮罩层  
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation;
      animation.translateY(that.data.animationShowHeight).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
    }
  }
})
