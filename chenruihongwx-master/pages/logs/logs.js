//logs.js
const app = getApp()
var mark=true
var mark2=true
Page({
  data: {
    tops:-140,
    display_tong:"static",
    display_yong:"none",
    aboutustop:-280,
    display_about: "static",
    display_us: "none",
  },
  setbytongyong:function(){
    clearInterval(timer)
    var timer =setInterval(function(){
      if(mark){
        this.setData({
          display_tong: "none",
          display_yong: "static"
        })
        if (this.data.tops == 0) {
          mark=!mark
          clearInterval(timer)
        } else {
          var num = this.data.tops + 10
          var num2 = this.data.aboutustop+10
          this.setData({
            tops: num,
            aboutustop:num2
          })
        }
      }else{
        this.setData({
          display_tong: "static",
          display_yong: "none"
        })
        if (this.data.tops == -140) {
          mark = !mark
          clearInterval(timer)
        } else {
          var num = this.data.tops - 10
          var num2 = this.data.aboutustop - 10
          this.setData({
            tops: num,
            aboutustop:num2
          })
        }
      }
      
    }.bind(this),5)
  },
  aboutusset:function(){
    clearInterval(timers)
    var ago = this.data.aboutustop
    console.log(ago)
    var timers = setInterval(function () {
      if (mark2) {
        this.setData({
          display_about: "none",
          display_us: "static"
        })
        if (this.data.aboutustop == ago+140) {
          mark2 = !mark2
          clearInterval(timers)
        } else {
          var num = this.data.aboutustop + 10
          this.setData({
            aboutustop: num
          })
        }
      } else {
        this.setData({
          display_about: "static",
          display_us: "none"
        })
        if (this.data.aboutustop == ago-140) {
          mark2 = !mark2
          clearInterval(timers)
        } else {
          var num = this.data.aboutustop - 10
          this.setData({
            aboutustop: num
          })
        }
      }

    }.bind(this),5)
  }
})
