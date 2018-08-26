/*import _Promise from '../libs/_promise';*/
var app = getApp()

function formatTime(date,type) {
  date = new Date(date);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  if (type && type == 1) {
    return [year, month, day].map(formatNumber).join('.')
  }else if(type&&type==2){
    return [year, month, day].map(formatNumber).join('/')
  }else{
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDate(n) {
  return n.replace(/-/g, '.')
}

/**
 * @param {Function} fun 接口
 * @param {Object} options 接口参数
 * @returns {Promise} Promise对象
 */
/*function Promise(fun, options) {
    options = options || {};
    return new _Promise((resolve, reject) => {
        if (typeof fun !== 'function') {
            reject();
        }
        options.success = resolve;
        options.fail = reject;
        fun(options);
    });
}*/

function showSimpleToast(self,  text = "", duration = 1500) {
    self.setData({
        toast: {
            hidden: false,
            text: text
        }
    });

    setTimeout(() => {
        self.setData({
            toast: {
                hidden: true
            }
        })
    }, duration)
}

function bindViewTap(e) {
  //该方法针对快速点击多次跳转多次引起的BUG
  var time = e.timeStamp;
  //console.log(time+"---"+app.globalData.lastTapTime+"---"+Math.abs(time-app.globalData.lastTapTime))
  //设置无效点击，根据自己的需求设置，这里navigateTo切换页面到动画结束需要的时间为500毫秒左右
  if (Math.abs(time - app.globalData.lastTapTime) < 500 && app.globalData.lastTapTime != 0) {
    //app.globalData.lastTapTime = time; //这里一定更新无效点击的时间
    return false;
  }else{
    app.globalData.lastTapTime = time;
    return true;
  }
  //更新有效点击的时间
}

module.exports = {
  bindViewTap: bindViewTap,
  formatTime: formatTime,
  showSimpleToast: showSimpleToast,
  formatDate
}
