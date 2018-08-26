import { apiRequest } from './net';
// 获取歌词
function getlyric(id, cb) {
  apiRequest({
    url: '/lyric',
    data: {
      id: id
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      // success

      if (!res.data.lrc.lyric) return false;

      let lyric = res.data.lrc.lyric;
      let timearr = lyric.split('[');
      let obj = {};
      let lyricArr = [];
      // seek 为键  歌词为value
      timearr.forEach((item) => {




        
        // 拆分数组 时间和歌词分离组成数组
        let key = parseInt(item.split(']')[0].split(':')[0]) * 60 + parseInt(item.split(']')[0].split(':')[1]);
        let val = item.split(']')[1];

        obj[key] = val;
      })
      for (let key in obj) {
        // obj[key] = obj[key].split('\n')[0]
        lyricArr.push(obj[key]);
      }
      // console.log(obj);
      // console.log(lyricArr);
      cb && cb(obj, lyricArr);
    },
    fail: function (res) {
      // fail
    }
  })
}

function formatSeconds(s) {
  let t,
    min,
    sec;
  if (s > -1) {
    sec = s % 60;    
    min = Math.floor(s / 60) % 60;

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
  }

  t = min + ":" + sec;
  
  return t
}
function formatTime(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}-${minute < 10 ? '0' + minute : minute}-${second < 10 ? '0' + second : second}`
}
module.exports = {
  getlyric,
  formatSeconds,
  formatTime
}