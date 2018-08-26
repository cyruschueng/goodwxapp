
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function urlSafe(str) {
    return str.replace(/[+\/]/g, function (m0) {
        return m0 === '+' ? '-' : '_'
    })
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }
}

function showTips(msg) {
    var time = arguments[1] ? arguments[1] : 2000;
    wx.showToast({
        image:'/style/info_icon.png',
        title: msg.toString(),
        duration: time
    });
}

function endWith(str,char){
    var reg=new RegExp(char+"$");
    return reg.test(str);
}

function _utf8_encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }
    return utftext;
}
function _utf8_decode(utftext) {
  var string = "";
  var i = 0;
  var c =0;
  var c1 = 0;
  var c2 = 0;
  var c3 = 0;
  while ( i < utftext.length ) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i+1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i+1);
      c3 = utftext.charCodeAt(i+2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
}

function encode(input) {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}

function decode(input) {
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = _utf8_decode(output);
  return output;
}

function previewSingalPic(url){
    wx.previewImage({
        current: url,
        urls: [url]
    })
}
function getThumbnailUrl(url,width,height,radiusx,radiusy){
  if(url.indexOf("maiyizhi.cn") > 0){
    var urlArr = url.split("?");
    var ret = urlArr[0]+'?imageView2/1/w/'+width+'/h/'+height;
    if(radiusx&&radiusy){
      ret +=  '|roundPic/radiusx/'+radiusx+'/radiusy/'+radiusy;
    }
    console.log(ret);
    return ret;
  }else{
      return url
  }
}

//将长字符串按照最大长度，分成数组
var byteArr=[];
function spliteByLength(str,start,len){
    var subStr = byteSub(str,start,len);
    byteArr.push(subStr);
    if((start+getTrueLength(subStr))>=getTrueLength(str)){
        var ret = byteArr
      byteArr=[]
      return ret;
    }else{
      return spliteByLength(str,start+getTrueLength(subStr),len)
    }
}
function getTrueLength(str){//获取字符串的真实长度（字节长度）
    var len = str.length, truelen = 0;
    for(var x = 0; x < len; x++){
        if(str.charCodeAt(x) > 128){
            truelen += 2;
        }else{
            truelen += 1;
        }
    }
    return truelen;
}

function byteSub(str, start, len, more) {
  start = start > 0 ? start : 0;
  len = len > 0 ? len : null;
  var byteL = 0;
  var sub = '';

  for (var i = 0; i < str.length; i++) {
      var c = 0;
    var cl = 0;
    c = str.charCodeAt(i);
    cl = c > 0xff ? 2 : 1;
    byteL += cl;

    if (start >= byteL) {//还不到开始位
      continue;
    }

    if (
      (len == null) //取完
      || ((len -= cl) >= 0) //取本字时不超过
    ) {
      sub += String.fromCharCode(c);
    } else {//取超了
      more && (sub += more);
      break;
    }
  }
  return sub;
}
/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
function cutstr(str, len) {
  var str_length = 0;
  var str_len = 0;
  str_cut = new String();
  str_len = str.length;
  for (var i = 0; i < str_len; i++) {
    a = str.charAt(i);
    str_length++;
    if (escape(a).length > 4) {
      //中文字符的长度经编码之后大于4
      str_length++;
    }
    str_cut = str_cut.concat(a);
    if (str_length >= len) {
      str_cut = str_cut.concat("...");
      return str_cut;
    }
  }
  //如果给定字符串小于指定长度，则返回源字符串；
  if (str_length < len) {
    return str;
  }
}


function downloadAndPreview (url,title,path,tips) {
  if(url.indexOf('http')!=-1){
    wx.showNavigationBarLoading();
    wx.showToast({
      title: tips,
      duration:20000,
      icon: 'loading'
    })
    wx.downloadFile({
      url: replaceQiniuHttps(url),
      success: function(res) {
        wx.hideToast()
        wx.hideNavigationBarLoading();
        console.log(res.tempFilePath)
          //previewSingalPic(res.tempFilePath)
        wx.navigateTo({
          url: '/pages/preview/preview?pic='+encodeURIComponent(res.tempFilePath)+'&title='+title+'&path='+encodeURIComponent(path)
        })
      }
    })
  }else{
    //previewSingalPic(url)
    wx.navigateTo({
      url: '/pages/preview/preview?pic='+encodeURIComponent(url)+'&title='+title+'&path='+encodeURIComponent(path)
    })
  }
}


function tiaozhuan ($wuxNotification,that,res,tips_name) {
  that.closeNotification = $wuxNotification.show({
    image: res.image,
    title: res.title,
    text: res.text,
    data: {
      message: '逗你玩的!!!'
    },
    timer: 300000,
    onClick(data) {
      that.closeNotification()
      if(res.appid){
        if(wx.navigateToMiniProgram){
          wx.navigateToMiniProgram({
            appId: res.appid,
            path:res.path
          })
        }else{
          util.previewSingalPic(res.preview)
        }
      }else{
        if(res.istab){
          wx.switchTab({
            url: res.path
          })
        }else{
          wx.redirectTo({
            url: res.path
          })
        }
      }

    },
    onClose(data) {
      if(wx.getStorageSync(tips_name)){
        wx.setStorageSync(tips_name,parseInt(wx.getStorageSync(tips_name))+1)
      }else{
        wx.setStorageSync(tips_name,1)
      }
    },
  })
}

function replaceQiniuHttps (url) {
  return url.replace('http://pics.maiyizhi.cn','https://ogrzx2jit.qnssl.com').replace('http://icons.maiyizhi.cn','https://ogrzjw8in.qnssl.com').replace('http://avatars.maiyizhi.cn','https://ogbtdokqr.qnssl.com').replace('http://video.maiyizhi.cn','https://ogrz13ent.qnssl.com');
}

function dealFormIds(formId) {
  var app = getApp();
  let formIds = app.globalData.gloabalFomIds
  if (!formIds) formIds = [];
  let data = {
    formId: formId,
    expire: parseInt(new Date().getTime() / 1000)+604800 //计算7天后的过期时间时间戳
  }
  formIds.push(data);
  console.log("formIds",formIds);
  app.globalData.gloabalFomIds = formIds;
}

function randdomDomain(){
  var domains=['lvjing','zhuang','datoutie','data','ai'];
  return domains[Math.floor(Math.random()*domains.length)];
}

/* 随机生产字符串 */
function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function generQueryStr(path,para = {}) {
  path = path + '?'
  for(let key in para) {
    let val = encodeURIComponent(para[key])
    path += `${key}=${val}&`
  }
  return path.substr(0, path.length - 1)
}

function uniqueArray(array) {
  var n = [array[0]]; //结果数组 
  //从第二项开始遍历 
  for (var i = 1; i < array.length; i++) {
    //如果当前数组的第i项在当前数组中第一次出现的位置不是i， 
    //那么表示第i项是重复的，忽略掉。否则存入结果数组 
    if (array.indexOf(array[i]) == i) n.push(array[i]);
  }
  return n;
}

module.exports = {
    urlSafe: urlSafe,
    showTips: showTips,
    isEmptyObject: isEmptyObject,
    formatTime: formatTime,
    tiaozhuan:tiaozhuan,
    replaceQiniuHttps:replaceQiniuHttps,
    randomNum:randomNum,
    encode:encode,
    getTrueLength:getTrueLength,
    byteSub:byteSub,
    spliteByLength:spliteByLength,
    endWith:endWith,
    getThumbnailUrl:getThumbnailUrl,
    previewSingalPic:previewSingalPic,
    decode:decode,
    downloadAndPreview:downloadAndPreview,
    dealFormIds: dealFormIds,
    randdomDomain:randdomDomain,
    randomString,
    generQueryStr,
    uniqueArray,
}
