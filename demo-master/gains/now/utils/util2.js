import md5 from 'js-md5'
export default {
  install(Vue, options) {
    Vue.prototype.createToken = function(routname) {
      return 'sl' + md5.hex(routname + this.gettime()) + 'mgfm'
    }
    Vue.prototype.gettime = function() {
      let time = Date.parse(new Date())
      return (time = time / 1000)
    }
    Vue.prototype.imgLogo = function(item) {
      return Vue.prototype.HOST + "/getImg?sid=" + item;
    }
    Vue.prototype.timeago = function(dateTimeStamp) {
      let timetamp = dateTimeStamp.replace(/\-/g, "/")
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let month = day * 30
      let now = new Date().getTime()
      let diffValue = now - (parseInt(Date.parse(new Date(timetamp))))
      if (diffValue < 0) {
        // alert('结束日期不能小于开始日期！')
      }
      let date = new Date(timetamp)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let H = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      //小于10的在前面补0
      if (M < 10) {
        M = '0' + M;
      }
      if (D < 10) {
        D = '0' + D;
      }
      if (H < 10) {
        H = '0' + H;
      }
      if (m < 10) {
        m = '0' + m;
      }
      if (s < 10) {
        s = '0' + s;
      }
      let monthC = diffValue / month
      let weekC = diffValue / (7 * day)
      let dayC = diffValue / day
      let hourC = diffValue / hour
      let minC = diffValue / minute
      let result
      if (hourC >= 24) {
        result = M + '月' + D + '日'
      } else if (hourC >= 1 && hourC < 24) {
        result = parseInt(hourC) + '个小时前'
      } else if (minC >= 1 && hourC < 1) {
        result = parseInt(minC) + '分钟前'
      } else if ( minC < 1) {
        result = '刚刚'
      }      
      console.log(monthC, weekC, dayC, hourC, minC)
      return result
    }
    Vue.prototype.setPaddingBottom = function() {
      if (!this.$route.meta.ishideplay) {
        let oClass = document.getElementsByClassName("set-padding-bottom");
        oClass[0].style.paddingBottom = "60px";
      }
    }
  }
}
