
const config = require('../config.js');

 /**
  * 格式化时间戳
  */
function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }
  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
/**
 * 秒转分钟type =1 04:30 else 2分12秒
 */
function formatSeconds(value,type) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            }
    }
    if(type==1) {
      if(theTime < 10) {
        var result = "0"+parseInt(theTime);
      }else{
        var result = parseInt(theTime);
      }
      if(theTime1 < 10) {
        result = "0"+parseInt(theTime1)+":"+result;
      }else{
        result = parseInt(theTime1)+":"+result;
      }
      if(theTime2 != 0){
        if(theTime2 < 10) {
          result = "0"+parseInt(theTime2)+":"+result;
        }else{
          result = parseInt(theTime2)+":"+result;
        }
      }
      


    }else{
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
        }
    }
        
    return result;
}
/**
 * 倒序对象
 */
function sortObj(obj) {
        var arr = [];
        for (var i in obj) {
            arr.push([obj[i],i]);
        };
        arr.reverse();
        var len = arr.length;
        var obj = {};
        for (var i = 0; i < len; i++) {
            obj[arr[i][1]] = arr[i][0];
        }
        return obj;
}

/**
 * 格式化时间戳 2017年02月14日
 */ 
function getTime( timestamp ) {
    var time = arguments[ 0 ] || 0;
    var t, y, m, d, h, i, s;
    t = time ? new Date( time * 1000 ) : new Date();
    y = t.getFullYear();    // 年
    m = t.getMonth() + 1;   // 月
    d = t.getDate();        // 日

    h = t.getHours();       // 时
    i = t.getMinutes();     // 分
    s = t.getSeconds();     // 秒

    // return [ y, m, d ].map( formatNumber ).join('/') + ' ' + [ h, i, s ].map( formatNumber ).join(':');
    var date =  [ y, m, d ].map( formatNumber );
    return date[0] + '年' + date[1] + '月' + date[2] + '日';
}



/**
 * 数组去重
 */
function arrUnique(arr) {
  var res = [];
  var json = {};
  for(var i = 0; i < arr.length; i++){
    if(!json[arr[i]]){
    res.push(arr[i]);
    json[arr[i]] = 1;
  }
 }
 return res;
}
/**
 * 删除数组的键值、键
 */
function arrRemove(arr,obj){ 

  for(var i =0;i <arr.length;i++){ 
    var temp = arr[i]; 
    if(!isNaN(obj)){ 
      temp=i; 
    } 
    if(temp == obj){ 
      for(var j = i;j <arr.length;j++){ 
        arr[j]=arr[j+1]; 
      } 
      arr.length = arr.length-1; 
    } 
  } 
  return arr;

} 

/**
 * ajax发送数据请求
 */
function Ajax( url = '',data = {}, fn, method = "GET", header = {}){
  wx.request({
    url: config.API_HOST + url,
    method : method ? method : 'GET',
    data: data,
    header: header ? header : {"Content-Type":"application/json"},
    success: function( res ) {
        fn( res );
    }
  });
}



module.exports = {
  formatTime: formatTime,
  formatSeconds: formatSeconds,
  getTime: getTime,
  Ajax: Ajax,
  arrUnique: arrUnique,
  arrRemove: arrRemove,
  sortObj: sortObj
}
