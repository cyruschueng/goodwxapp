function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const assets = url => {
  /*
  let ret = url.replace(
    /sndskj\.oss-cn-beijing\.aliyuncs\.com/,
    'assets.ihelo.cn'
  )*/
  let ret = url
  if(ret.substr(0, 4) != 'http' ) ret = `https:${ret}`
  return ret
}

/*
    @purpose  对象变成url 的请求参数
    @createTime 2017-09-04 11:45
    @author miles_fk
    @PS 注意尽量不要嵌套对象
    @example
        objectToQuerystring({n:"fk",f:100}); // "?n=fk&f=100"
*/
function makePar(obj) {
  return Object.keys(obj).reduce(function (str, key, i) {
    var delimiter, val;
    var oval = obj[key];
    delimiter = (i === 0) ? '?' : '&';
    key = encodeURIComponent(key);
    if (typeof oval  == 'object' ){
      val = JSON.stringify(oval);
      val = encodeURIComponent(val);
    }else{
      val = encodeURIComponent(oval);
    }

    return [str, delimiter, key, '=', val].join('');
  }, '');
}

/*
    @purpose  url 的请求参数变成对象
    @createTime 2017-09-04 11:45
    @author miles_fk
    @PS 注意尽量不要嵌套对象
    @example
        objectToQuerystring("n=fk&f=100"); // {n:"fk",f:100}
*/
function getPar(search) {
  var plist = decodeURIComponent(search).split("&");
  var par = {};
  plist.forEach(function (item) {
    var m = item.split("=");
    var oval = m[1];
    var val , key;
    try {
      val = JSON.parse(oval);
    } catch (err) {
      val = oval
    }
    key = m[0];
    if (m) {
      par[key] = val
    }
  });
  return par;
};
var extend = function(bo,eo){
    let al = arguments.length;
    if(al == 0) return {};
    if(al == 1) return arguments[0];
    for (let propName in eo) {
          if(eo.hasOwnProperty(propName)){
            let curItem = eo[propName]; //如果扩展为空
            if (curItem != ''){
              bo[propName] = curItem;
            }
          }
    }
    return bo
  }

  var extendos = function(){
      let al = arguments.length;
      if(al == 0) return {};
      if(al == 1) return arguments[0];
      for (let i = 1; i < al; i++){
        let eo = arguments[i];
        for (let propName in eo) {
              if(eo.hasOwnProperty(propName)){
                bo[propName] = eo[propName]
              }
        }
      }
      return bo
  }
/*
    @purpose 获得  datase数据
    @createTIme 2018-01-22 21:54
    @author miles_fk
*/
var getDataSetBy=function(event , key){
  let val = event.target.dataset[key] || event.currentTarget.dataset[key];
}

module.exports = {
  formatTime: formatTime,
  assets: assets,
  makePar: makePar,
  getPar: getPar,
  extend: extend,
  extendos:extendos,
  getDataSetBy: getDataSetBy
}
