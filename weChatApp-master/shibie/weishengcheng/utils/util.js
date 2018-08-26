
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

function getDataRange() {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    return [(year - 10) + "-" + month + "-" + day, year + "-" + month + "-" + day];
}

function getDateStr(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    return year + "-" + month + "-" + day;
}
function getTimeStr() {
    var curDate = new Date();
    var curHour = curDate.getHours().toString();
    var curMinute = curDate.getMinutes().toString();
    if(curHour.length<2){
        curHour = '0'+curHour;
    }
    if(curMinute.length<2){
        curMinute = '0'+curMinute;
    }
    return curHour+':'+curMinute;
}

function getDetails(){
  let details=[]
  details = wx.getStorageSync('details')
  if(isEmptyObject(details)){
    return []
  }else{
    return details
  }
}

function emptyDeatails() {
    let details = getDetails()
    let _return=true
    for(var i in details) {
        if(i!=99&&details[i]&&details[i].content){
            _return = false
        }
    }
    return _return
}

function getDetail() {
    let details=[]
    let current_detail_index = wx.getStorageSync('current_detail_index')
    if(current_detail_index===''){
        current_detail_index = 99
    }
    details = wx.getStorageSync('details')
    if(isEmptyObject(details)){
        return {}
    }else{
        if(details[current_detail_index]){
            return details[current_detail_index]
        }else{
            return {}
        }
    }
}

function saveDetail(detail) {
    let details=[]
    let current_detail_index = wx.getStorageSync('current_detail_index')
    if(current_detail_index===''){
        current_detail_index = 99
    }
    details = wx.getStorageSync('details')
    if(isEmptyObject(details)){
        details = []
    }

    details[current_detail_index] = detail

    wx.setStorageSync("details", details);
}

function setDetailIndex() {
    var index = 0
    var details = getDetails();

    for(var i in details) {
        if(i!=99&&details[i]){
            index ++
        }
    }

    wx.setStorageSync('current_detail_index',index)
}

function setDuihuaIndex(app,type) {
    var _app  = wx.getStorageSync(app);
    if(this.isEmptyObject(_app)){_app = {};}
    if(this.isEmptyObject(_app[type])){_app[type] = {};}
    if(this.isEmptyObject(_app[type].list)){_app[type].list = [];}
    console.log(_app[type])
    var index = _app[type].list.length

    wx.setStorageSync('current_'+app+'_'+type+'_index',parseInt(index))
}

function removeCircle() {
    wx.setStorageSync("info", {});
    var details = getDetails();

    for(var i in details) {
        if(i!=99&&details[i]){
            //details.splice(i, 1);
            details[i] = null
        }
    }
    wx.setStorageSync("details", details);
}

function endWith(str,char){
    var reg=new RegExp(char+"$");
    return reg.test(str);
}

function savePic(path,success){
    wx.saveFile({
        tempFilePath: path,
        success: function(res) {
            console.log(res.savedFilePath)
            success(res.savedFilePath)
        }
    })
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
function getVideoAvatar(url){
    var exploded_url = url.split("/");
    if (exploded_url[3]) {
        var key = exploded_url[3];
        var exploded_key = key.split(".");
        var new_avatar_key = 'avatar_' + exploded_key[0].replace("af_","") + '.jpg';
        return 'http://video.maiyizhi.cn/'+new_avatar_key+'?imageView2/1/format/jpg';
    }else{
        return url+'?vframe/png/offset/1'
    }
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
function getSize(width,height,fix_height,system) {
    var _rpxHeight = (system.windowHeight/system.windowWidth*730)-fix_height   //屏幕高度  rpx
    var _height;
    var _width;
    var _marginTop = 0

    if(height/width > system.windowHeight/system.windowWidth){//图片固定高   宽度缩小
      console.log(height/width)
      console.log(system.windowHeight/system.windowWidth)
        _height = _rpxHeight
        _width = width/height*_rpxHeight
    }else{//图片固定宽   高度缩小
      console.log(height/width)
      console.log(system.windowHeight/system.windowWidth)
        _width = 730
        _height = height/width*730
    }

    if(_height<_rpxHeight){
        _marginTop = (_rpxHeight-_height)/2
    }
    return {"width":_width,"height":_height,"marginTop":_marginTop}
}

function randomPrice(min,max){
    var price =  (Math.random()*(max-min)+min).toFixed(2);
    if(price == '0.00'){
        return '0.01';
    }else{
        return price;
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
//2017-08-20 12:33  格式化为  2017年08月20日 12:33   或者  周三  12:33
function formateDateTime(time){
    //console.log(new Date(time).getTime())
    if(time){
        var timeArr = time.split(" ");
        if(timeArr.length==2){
            var date = timeArr[0];
            var _time = timeArr[1];
            var dateArr = date.split("-");
            if(dateArr.length==3){

                var myDate = new Date();
                var year = myDate.getFullYear();
                var month = myDate.getMonth();
                var day = myDate.getDate();

                var dateNow = new Date(year,month,day);
                var date3 = dateNow.getTime() - new Date(dateArr[0],dateArr[1]-1,dateArr[2]).getTime();
                console.log(time)
                console.log(date)
                console.log(dateNow)
                console.log(dateArr)
                console.log(new Date(dateArr[0],dateArr[1]-1,dateArr[2]))
                console.log(date3)
                var days=Math.floor(date3/(24*3600*1000))
                console.log(days)
                if(days==0){
                    return _time;
                }else if(days==1){
                    return '昨天 '+_time;
                }else if(days>0&&days<7){
                    var week = new Date(date).getDay();
                    if (week == 0) {
                        return '星期日 '+_time;
                    } else if (week == 1) {
                        return '星期一 '+_time;
                    } else if (week == 2) {
                        return '星期二 '+_time;
                    } else if (week == 3) {
                        return '星期三 '+_time;
                    } else if (week == 4) {
                        return '星期四 '+_time;
                    } else if (week == 5) {
                        return '星期五 '+_time;
                    } else if (week == 6) {
                        return '星期六 '+_time;
                    }
                }else{
                    return dateArr[0]+'年'+dateArr[1]+'月'+dateArr[2]+'日'+' '+_time
                }
            }else{
                return time;
            }
        }else{
            return time;
        }
    }else{
        return time;
    }
}

function lunTouchstart(e , that) {
  that.data.touchDot = e.touches[0].pageX;
  that.data.interval = setInterval(function () {
    that.data.time += 1;
  }, 100);
}

function lunTouchmove(e , that) {
  let touchMove = e.touches[0].pageX;
  let touchDot = that.data.touchDot;
  let time = that.data.time;

  if (touchMove - touchDot <= -40 && time < 10 && !that.data.done) {
    that.data.done = true;
    that.scrollRight(e);
  }

  if (touchMove - touchDot >= 40 && time < 10 && !that.data.done) {
    that.data.done = true;
    that.scrollLeft(e);
  }
}

function lunTouchend(e , that) {
  clearInterval(that.data.interval);
  that.data.time = 0;
  that.data.done = false;
}

function lunScrollLeft(clubs , that) {
  if (that.data.index == false) {
    return;
  }
  that.setData({
    index: false
  })
  setTimeout(function () {
    that.setData({
      index: true
    })
  }, 500)

  let array = that.data.lb;
  let shift = array.shift();
  array.push(shift);

  for (let i = 0; i < array.length; i++) {
    if (array[i] == "cur") {

      if (clubs[i].model) {
        var select = clubs[i].model;
        var type = clubs[i].type;
      } else {
        var select = clubs[i].target.url;
      }
      if (clubs[i].items && clubs[i].items.length) {
        that.setData({
          contentItem: clubs[i].items
        })
      }
      if (clubs[i].title) {
        wx.setNavigationBarTitle({
          title: clubs[i].title
        });
      }
      break;
    }
  }

  that.setData({
    lb: array,
    select: select,
    type: type
  })
}

function showPreviewTip (tips_name,text,url) {
  var app = getApp()
  if(app.globalData.system_info.platform!='ios' && app.globalData.system_info.SDKVersion<'1.5.0'){
    text = text.replace(/长按/, '点右上角"┇"');
  }
  if(!wx.getStorageSync(tips_name)){
    wx.setStorageSync(tips_name,1)
    wx.showModal({
      title: '提示',
      content: text,
      showCancel:false,
      confirmText:'知道了',
      complete: function(re) {
        downloadAndPreview(url)
      }
    })
  }else{
    downloadAndPreview(url)
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

function lunScrollRight(clubs , that) {
  if (that.data.index == false) {
    return;
  }
  that.setData({
    index: false
  })
  setTimeout(function () {
    that.setData({
      index: true
    })
  }, 500)

  let array = that.data.lb;
  let pop = array.pop();
  array.unshift(pop);

  for (let i = 0; i < array.length; i++) {
    if (array[i] == "cur") {
      if (clubs[i].model) {
        var select = clubs[i].model;
        var type = clubs[i].type;
      } else {
        var select = clubs[i].target.url;
      }

      if (clubs[i].items && clubs[i].items.length) {
        that.setData({
          contentItem: clubs[i].items
        })
      }
      if (clubs[i].title) {
        wx.setNavigationBarTitle({
          title: clubs[i].title
        });
      }
      break;
    }
  }

  that.setData({
    lb: array,
    select: select,
    type: type
  })
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

class toucheAction {
  constructor(initial) {
    this.canvasId = initial.canvasId;
    this.contentItem = initial.contentItem;
    this.size = initial.size;
    this.radio = initial.radio;
    this.imageUrls = initial.imageUrls;
    this.scaleSmall = 1
  }

  touchStart(event) {
    this.startPoint = {
      x: event.touches[0].x,
      y: event.touches[0].y
    };
    var contentItem = this.contentItem;
    var radio = this.radio;
    var that = this;
    contentItem.forEach(function (element, index, array) {
      that.contentItem[index].disabled = 1;
    })

    for (let i = 0; i < contentItem.length; i++) {
      let element = contentItem[i];
      let elementSize = this.calculateW_H(element);
      let w = elementSize.w;
      let h = elementSize.h;
      let centerX = radio * element.dx;
      let centerY = radio * element.dy;

      let rotateCenterPoint = {
        x: centerX + element.rbX,
        y: centerY + element.rbY
      }
      let cancelCenterPoint = {
        x: centerX - element.rbX,
        y: centerY - element.rbY
      }
      let vertexs = [
        {
          x: centerX - element.rbX,
          y: centerY - element.rbY
        },
        {
          x: centerX - element.rbX,
          y: centerY + element.rbY
        },
        {
          x: centerX + element.rbX,
          y: centerY + element.rbY
        },
        {
          x: centerX + element.rbX,
          y: centerY - element.rbY
        },
        {
          x: centerX - element.rbX,
          y: centerY - element.rbY
        }
      ]
      let inCancelCicle = this.jugeInCicle(this.startPoint, cancelCenterPoint, 20);
      let inRotateCicle = this.jugeInCicle(this.startPoint, rotateCenterPoint, 20);
      let inPoly = this.judgeInPoly(this.startPoint, vertexs, 4);
      // console.log("inCicle",inCicle);
      // console.log("inPoly",inPoly);

      if (inRotateCicle) {
        let isRotate = true;
        let isMove = false;
        this.resetParams(isRotate, isMove, i);
        console.log("isRotate");
        break;
      } else if (inCancelCicle && element.cancel) {
        this.contentItem.splice(i, 1);
        this.imageUrls.splice(i, 1);
        break;
      } else if (inPoly) {
        let isRotate = false;
        let isMove = true;
        this.resetParams(isRotate, isMove, i);
        console.log("isMove");
        break;
      }
    }

    this.drawElements();
    return {
      contentItem: this.contentItem
    }
  }

  touchMove(event) {
    var deviceRadio = getApp().globalData.system_info.windowWidth / 375 * 0.5;
    let canvasW = deviceRadio * this.size.width;
    let canvasH = deviceRadio * this.size.height;
    let canvasVertexs = [
      {
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: canvasH
      },
      {
        x: canvasW,
        y: canvasH
      },
      {
        x: canvasW,
        y: 0
      },
      {
        x: 0,
        y: 0
      }
    ]
    var toucheX = event.touches[0].x;
    var toucheY = event.touches[0].y;
    let inPoly = this.judgeInPoly({x:toucheX, y:toucheY}, canvasVertexs, 4);
    if (!inPoly) {
      return;
    }

    var contentItem = this.contentItem;
    var selectedIndex = this.selectedIndex;
    if (selectedIndex >= 0 && contentItem[selectedIndex]) {
      if (contentItem[selectedIndex].isRotate) {
        if (this.scaleSmall) {
          this.calculateScale(toucheX, toucheY);
          this.calculateRotate(toucheX, toucheY);
        } else {
          this.calculateRotate(toucheX, toucheY);
        }
      } else if (contentItem[selectedIndex].isMove) {
        this.contentItem[selectedIndex].dx += (toucheX - this.startPoint.x) / this.radio;
        this.contentItem[selectedIndex].dy += (toucheY - this.startPoint.y) / this.radio;
        this.startPoint = {
          x: toucheX,
          y: toucheY
        }
      }
    }
    this.drawElements();
  }

  touchEnd() {
    var selectedIndex = this.selectedIndex;
    if (selectedIndex >= 0 && this.contentItem[selectedIndex]) {
      this.contentItem[selectedIndex].isRotate = false;
      this.contentItem[selectedIndex].isMove = false;
      this.contentItem[selectedIndex].isShowSymbol = false;
    }
  }

  setParams(w, h, index) {
    let r = 0.5 * Math.sqrt(Math.pow(w,2) + Math.pow(h,2));
    let angle = Math.atan(h / w);
    this.contentItem[index].oldDistance = r;
    this.contentItem[index].r = r;
    this.contentItem[index].rbX = r * Math.cos(angle);
    this.contentItem[index].rbY = r * Math.sin(angle);
    this.contentItem[index].original_w = w;
  }

  resetParams(isRotate, isMove, index) {
    this.contentItem[index].isRotate = isRotate;
    this.contentItem[index].isMove = isMove;
    this.contentItem[index].isShowSymbol = true;
    this.contentItem[index].disabled = 0;
    this.selectedIndex = index;
  }

  drawElements(background) {
    var context = wx.createCanvasContext(this.canvasId);
    var deviceRadio = getApp().globalData.system_info.windowWidth / 375 * 0.5;//相对于iPhone 屏幕宽度的比例

    if (background && background.circle) {
      context.save();
      context.arc(background.circle.x, background.circle.y, background.circle.R, 0, 2 * Math.PI);
      context.clip();
      if (background.src) {
        context.drawImage(this.imageUrls[this.imageUrls.length - 1], 0, 0, deviceRadio * this.size.width, deviceRadio * this.size.height);
      } else {
        context.rect(0, 0, deviceRadio * this.size.width, deviceRadio * this.size.height);
        context.setFillStyle('white');
        context.fill();
      }
      context.restore();
    } else if (background && background.rectangle) {
      if (background.src) {
        context.drawImage(this.imageUrls[this.imageUrls.length - 1], 0, 0, deviceRadio * this.size.width, deviceRadio * this.size.height);
      } else {
        context.rect(0, 0, deviceRadio * this.size.width, deviceRadio * this.size.height);
        context.setFillStyle('white');
        context.fill();
      }
    }
    var radio = this.radio;
    var that = this;
    this.contentItem.forEach(function (element, index, array) {
      let elementSize = that.calculateW_H(element);
      let w = elementSize.w;
      let h = elementSize.h;
      let angle = Math.atan(h / w);

      if (element.type == "image" || element.watermark) {
        if (element.angle) {
          context.save();
          context.translate(radio * element.dx, radio * element.dy);
          context.rotate(element.angle - angle);
          context.drawImage(that.imageUrls[index], -0.5 * w, -0.5 * h, w, h);
          if (element.isShowSymbol) {
            that.symbolAction(context, element, w, h);
          }
          // context.beginPath();
          // context.arc(0.5 * w, 0.5 * h, 10, 2 * Math.PI, false);
          // context.stroke();
          context.translate(-radio * element.dx, -radio * element.dy);
          context.restore();
        } else {
          context.drawImage(that.imageUrls[index], radio * element.dx - 0.5 * w, radio * element.dy - 0.5 * h, w, h);
          // context.beginPath();
          // context.arc(radio * element.dx + 0.5 * w, radio * element.dy + 0.5 * h, 10, 2 * Math.PI, false);
          // context.stroke();
        }
      } else if (element.type == "text") {
        if (element.angle) {
          context.save();
          context.translate(radio * element.dx, radio * element.dy);
          context.rotate(element.angle - angle);
          context.setFillStyle(element.color);
          context.setFontSize(radio * element.size);
          context.setTextBaseline('top');
          context.fillText(element.value, -0.5 * w, -0.5 * h);
          if (element.isShowSymbol) {
            that.symbolAction(context, element, w, h);
          }
          context.translate(-radio * element.dx, -radio * element.dy);
          context.restore();
        } else {
          context.save();
          context.setFillStyle(element.color);
          context.setFontSize(radio * element.size);
          context.setTextBaseline('top');
          context.fillText(element.value, radio * element.dx - 0.5 * w, radio * element.dy - 0.5 * h);
          context.restore();
        }
      } else if (element.type == "textarea") {
        let byteArr = spliteByLength(element.value, 0, element.lineLenght);
        if (element.angle) {
          context.save();
          context.translate(radio * element.dx, radio * element.dy);
          context.rotate(element.angle - angle);
          context.setFillStyle(element.color);
          context.setFontSize(radio * element.size);
          context.setTextBaseline('top');
          for (let i = 0; i < byteArr.length; i++) {
            context.fillText(byteArr[i], -0.5 * w, -0.5 * h + radio * i * element.lineHeight);
          }
          if (element.isShowSymbol) {
            that.symbolAction(context, element, w, h);
          }
          context.translate(-radio * element.dx, -radio * element.dy);
          context.restore();
        } else {
          context.save();
          context.setFillStyle(element.color);
          context.setFontSize(radio * element.size);
          context.setTextBaseline('top');
          for (let i = 0; i < byteArr.length; i++) {
            context.fillText(byteArr[i], radio * element.dx - 0.5 * w, radio * (element.dy + i * element.lineHeight) - 0.5 * h);
          }
          context.restore();
        }
      }

      if (element.isShowSymbol && !element.angle) {
        that.symbolAction(context, element, w, h);
      }
    })
    context.draw();
  }

  symbolAction(context, element, w, h) {
    var radio = this.radio;
    context.setStrokeStyle('black');
    if (element.angle) {
      context.strokeRect(-0.5 * w, -0.5 * h, w, h);
      context.drawImage('/styles/lashen.png', 0.5 * w - 15, 0.5 * h - 15, 30, 30);
      if (element.cancel) {
        context.drawImage('/styles/quxiao.png', -0.5 * w - 15, -0.5 * h - 15, 30, 30);
      }
    } else {
      context.strokeRect(radio * element.dx - 0.5 * w, radio * element.dy - 0.5 * h, w, h);
      context.drawImage('/styles/lashen.png', radio * element.dx + 0.5 * w - 15, radio * element.dy + 0.5 * h - 15, 30, 30);
      if (element.cancel) {
        context.drawImage('/styles/quxiao.png', radio * element.dx - 0.5 * w - 15, radio * element.dy - 0.5 * h - 15, 30, 30);
      }
    }
  }

  calculateScale(toucheX, toucheY) {
    var contentItem = this.contentItem;
    var selectedIndex = this.selectedIndex;
    var radio = this.radio;
    var distance = Math.sqrt(Math.pow((toucheX - radio * contentItem[selectedIndex].dx),2) + Math.pow((toucheY - radio * contentItem[selectedIndex].dy),2));
    // 计算缩放的比率
    var scale = distance / contentItem[selectedIndex].oldDistance;
    if (contentItem[selectedIndex].type == "image" || contentItem[selectedIndex].watermark) {
      this.contentItem[selectedIndex].width *= scale;
      this.contentItem[selectedIndex].height *= scale;
    } else if (contentItem[selectedIndex].type == "text" || contentItem[selectedIndex].type == "textarea") {
      this.contentItem[selectedIndex].size *= scale;
    }
    this.contentItem[selectedIndex].oldDistance = distance;

    let elementSize = this.calculateW_H(contentItem[selectedIndex]);
    let multiple = elementSize.w / contentItem[selectedIndex].original_w;
    if (multiple <= 0.5) {
      this.scaleSmall = 0;
    }
  }

  calculateRotate(toucheX, toucheY) {
    var contentItem = this.contentItem;
    var selectedIndex = this.selectedIndex;
    var radio = this.radio;
    var distance = Math.sqrt(Math.pow((toucheX - radio * contentItem[selectedIndex].dx),2) + Math.pow((toucheY - radio * contentItem[selectedIndex].dy),2));
    // 计算缩放的比率
    var scale = distance / contentItem[selectedIndex].oldDistance;
    if (scale > 1) {
      this.scaleSmall = 1;
    }
    let elementSize = this.calculateW_H(contentItem[selectedIndex]);
    let w = elementSize.w;
    let h = elementSize.h;
    // 计算旋转角度
    this.contentItem[selectedIndex].angle = Math.atan2(toucheY - radio * contentItem[selectedIndex].dy, toucheX - radio * contentItem[selectedIndex].dx);
    var r = 0.5 * Math.sqrt(Math.pow(w,2) + Math.pow(h,2));
    // 计算旋转点用
    this.contentItem[selectedIndex].r = r;
    this.contentItem[selectedIndex].rbX = r * Math.cos(contentItem[selectedIndex].angle);
    this.contentItem[selectedIndex].rbY = r * Math.sin(contentItem[selectedIndex].angle);
  }

  jugeInCicle(point, centerPoint, r) {
    if (Math.pow(point.x-centerPoint.x,2) + Math.pow(point.y-centerPoint.y,2) <= Math.pow(r,2)) {
      return 1;
    } else {
      return 0;
    }
  }

  judgeInPoly(point, vertexs, edges) {
    var counter = 0;
    for (let i = 0; i < edges; i++) {
      if ((vertexs[i].y <= point.y && vertexs[i +1 ].y > point.y) || (vertexs[i].y > point.y && vertexs[i +1 ].y <= point.y)) {
        let vector = (point.y - vertexs[i].y) / (vertexs[i + 1].y - vertexs[i].y);
        if (point.x < vertexs[i].x + vector * (vertexs[i + 1].x - vertexs[i].x)) {
          ++counter;
        }
      }
    }
    return (counter % 2);
  }

  calculateW_H(element) {
    var radio = this.radio;
    if (element.type == "image" || element.watermark) {
      var textWidth = radio * element.width;
      var textHeight = radio * element.height;
    } else if (element.type == "text") {
      var byteLength = getTrueLength(element.value);
      var textWidth = 0.5 * radio * element.size * byteLength;
      var textHeight = 1.5 * radio * element.size;
    } else if (element.type == "textarea") {
      let byteArr = spliteByLength(element.value, 0, element.lineLenght);
      var textWidth = radio * element.size * byteArr[0].length;
      var textHeight = radio * byteArr.length * element.lineLenght;
    }
    return {
      w: textWidth,
      h: textHeight
    }
  }

}

module.exports = {
    urlSafe: urlSafe,
    showTips: showTips,
    isEmptyObject: isEmptyObject,
    formatTime: formatTime,
    getTimeStr:getTimeStr,
    formateDateTime:formateDateTime,
    getDetail:getDetail,
    tiaozhuan:tiaozhuan,
    replaceQiniuHttps:replaceQiniuHttps,
    saveDetail:saveDetail,
    getDetails:getDetails,
    randomNum:randomNum,
    encode:encode,
    getDateStr:getDateStr,
    getVideoAvatar:getVideoAvatar,
    getSize:getSize,
    getTrueLength:getTrueLength,
    byteSub:byteSub,
    spliteByLength:spliteByLength,
    setDuihuaIndex:setDuihuaIndex,
    setDetailIndex:setDetailIndex,
    removeCircle:removeCircle,
    emptyDeatails:emptyDeatails,
    endWith:endWith,
    getThumbnailUrl:getThumbnailUrl,
    previewSingalPic:previewSingalPic,
    savePic:savePic,
    decode:decode,
    showPreviewTip:showPreviewTip,
    getDataRange: getDataRange,
    randomPrice:randomPrice,
    lunTouchstart: lunTouchstart,
    lunTouchmove: lunTouchmove,
    lunTouchend: lunTouchend,
    lunScrollLeft: lunScrollLeft,
    downloadAndPreview:downloadAndPreview,
    lunScrollRight: lunScrollRight,
    dealFormIds: dealFormIds,
    toucheAction: toucheAction,
    randdomDomain:randdomDomain
}
