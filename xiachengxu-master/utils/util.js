function getDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

function getTime(date) {
  var hour = date.getHours();
  var minute = date.getMinutes();
  return [hour, minute].map(formatNumber).join(':');
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDateByMill(mill) {
  var date = new Date(mill);
  return getDate(date);
}

function getTimeByMill(mill) {
  var date = new Date(mill);
  return getTime(date);
}

function savePicToAlbum(tempFilePath) {
  let that = this;
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                wx.showToast({
                  title: '保存成功'
                });
              },
              fail(res) {
                wx.showToast({
                  title: '保存失败'
                });
              }
            })
          },
          fail() {
            // 用户拒绝授权,打开设置页面
            wx.openSetting({

            });
          }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
            });
          },
          fail(res) {
            console.log(res);
            wx.showToast({
              title: '保存失败',
            });
          }
        })
      }
    },
    fail(res) {
      console.log(res);
    }
  })
}

/**
 * 传入this对象，变量名称，一共剩余的毫秒数
 */
function countDown(that, paramName, totalMill) {
  /**
   * 当传入的时间为负数或等于0时结束循环调用
   */
  if (totalMill <= 0) {
    clearTimeout(time);
    that.setData({
      [paramName]: 0
    });
    return;
  }
  var time = setTimeout(() => {
    totalMill -= 1000;
    var time = dateFormat(totalMill);
    that.setData({
      [paramName]: time
    });
    countDown(that, paramName, totalMill);
  }, 1000);
}

function dateFormat(mill) {
  var hour = addPrefix(Math.floor(mill / 3600000));
  var minute = addPrefix(Math.floor((mill - hour * 3600000) / 60000));
  var second = addPrefix(Math.floor((mill - hour * 3600000 - minute * 60000) / 1000));
  return `${hour}:${minute}:${second}`;
}

function addPrefix(time) {
  return time < 10 ? `0${time}` : time;
}

function diffTime(startDate, endDate) {
  var diff = endDate.getTime() - startDate.getTime();//时间差的毫秒数  

  //计算出相差天数  
  var days = Math.floor(diff / (24 * 3600 * 1000));

  //计算出小时数  
  var leave1 = diff % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数  
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数  
  var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数  
  var minutes = Math.floor(leave2 / (60 * 1000));

  //计算相差秒数  
  var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数  
  var seconds = Math.round(leave3 / 1000);

  var returnStr = "刚刚";
  if (minutes > 0) {
    returnStr = minutes + "分钟前";
  }
  if (hours > 0) {
    returnStr = hours + "小时前";
  }
  if (days > 0) {
    returnStr = days + "天前";
  }
  return returnStr;
}

module.exports = {
  getDate,
  getTime,
  savePicToAlbum,
  countDown,
  getDateByMill,
  getTimeByMill,
  diffTime
}