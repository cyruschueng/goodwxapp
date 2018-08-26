var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js')
/**base64加密解密方法 */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}
function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c1 == -1);
    if (c1 == -1)
      break;
    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while (i < len && c2 == -1);
    if (c2 == -1)
      break;
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if (c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while (i < len && c3 == -1);
    if (c3 == -1)
      break;
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if (c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while (i < len && c4 == -1);
    if (c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}
function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}
function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;
  out = "";
  len = str.length;
  i = 0;
  while (i < len) {
    c = str.charCodeAt(i++);
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i - 1);
        break;
      case 12: case 13:
        // 110x xxxx　 10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx　10xx xxxx　10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
}
function doit() {
  var f = document.f
  f.output.value = base64encode(utf16to8(f.source.value))
  f.decode.value = utf8to16(base64decode(f.output.value))
}
/**base64加密解密方法 */
var app = getApp();
var ringChart = null;
Page({
  data: {
    host: 'https://m.changtounet.com/',
  },
  touchHandler: function (e) {
  
    var title=''
    var subtitle=''
    wx.getStorage({
      key: 'model',
      success: function (res) {
        
      //   subtitle: {
      //     name: '总资产',
      //       color: '#666666',
      //         fontSize: 15
      //   },
      // series: [{
      //   name: '预期收益',
      //   data: model.dssy,
      //   stroke: false
      // }, {
      //   name: '借出本金',
      //   data: model.dsbj,
      //   stroke: false
      // }, {
      //   name: '闲置余额',
      //   data: model.xjye,
      //   stroke: false
      // }],

        var model = res.data
        switch (ringChart.getCurrentDataIndex(e)){
          case 0:
            title = model.dssy;
            subtitle ='预期收益'
          break;
          case 1:
            title = model.dsbj;
            subtitle = '借出本金'
            break;
          case 2:
            title = model.xjye;
            subtitle = '闲置余额'
            break;
            default:
            title =  model.total;
            subtitle = '总资产'
            break;
        }

        ringChart.updateData({
          title: {
            name: title
          },
          subtitle: {
            // color: '#ff0000',
            name: subtitle
          }
        });
        ringChart.stopAnimation();
      }
    })
  
    ringChart.stopAnimation();
  },
  updateData: function () {
    wx.getStorage({
      key: 'model',
      success: function (res) {
        var model = res.data
       
        // ringChart.updateData({
        //   title: {
        //     name: '80%'
        //   },
        //   subtitle: {
        //     color: '#ff0000'
        //   }
        // });
      }
    })
   
  },
  onReady: function (e) {
    util.checklogin()
    load(this);
    var g = this;
  
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        var userid = base64encode(res.data)
        wx.request({
      url: g.data.host + 'About/AboutHandler.ashx',
      data: { userid: userid},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data;
        console.log(result)
        createRing(result);
      },
      complete: function () {
        //隐藏loading
        // wx.hideLoading()
      }, fail: function () {
        
      }
    })
      }})
  }
});

var load=function(g){
  var res = wx.getSystemInfoSync();
  var screenHeight = (parseInt(res.windowHeight) * 0.5)
  g.setData({
    height: screenHeight
  })
}

var createRing=function(result){
  var g=this
  var model = result.model;

  var windowWidth = 320;
  var windowHeight = 200;

  try {
    var res = wx.getSystemInfoSync();
    windowWidth = res.windowWidth;
    windowHeight = res.windowHeight / 2;
 
  } catch (e) {
    console.error('getSystemInfoSync failed!');
  }
  wx.setStorage({
    key: "model",
    data: model
  })
  ringChart = new wxCharts({
    animation: true,
    canvasId: 'ringCanvas',
    type: 'ring',
    extra: {
      ringWidth: 25
    },
    title: {
      name:model.total,
      color: '#7cb5ec',
      fontSize: 25
    },
    subtitle: {
      name: '总资产',
      color: '#666666',
      fontSize: 15
    },
    series: [{
      name: '预期收益',
      data: model.dssy,
      stroke: false
    }, {
      name: '借出本金',
      data: model.dsbj,
      stroke: false
    }, {
      name: '闲置余额',
      data: model.xjye,
      stroke: false
    }],
    disablePieStroke: true,
    width: windowWidth,
    height: windowHeight,
    dataLabel: false,
    legend: true,
    padding: 0
  });
  ringChart.addEventListener('renderComplete', () => {
    console.log('renderComplete');
  });
  setTimeout(() => {
    ringChart.stopAnimation();
  }, 500);
}
 