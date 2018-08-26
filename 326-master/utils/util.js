
import * as echarts from '../ec-canvas/echarts';
var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// sha1 实现密码加密
function encodeUTF8(s) {
  var i, r = [], c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
  return r;
};

// 字符串加密成 hex 字符串
function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [], f = [
    function () { return m[1] & m[2] | ~m[1] & m[3]; },
    function () { return m[1] ^ m[2] ^ m[3]; },
    function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
    function () { return m[1] ^ m[2] ^ m[3]; }
  ], rol = function (n, c) { return n << c | n >>> (32 - c); },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");

  return hex;
};

function rc4(str, key) {
  var s = [], j = 0, x, res = '';
  for (var i = 0; i < 256; i++)
    s[i] = i;
  for (i = 0; i < 256; i++) {
    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
  }
  i = 0;
  j = 0;
  for (var y = 0; y < str.length; y++) {
    i = (i + 1) % 256;
    j = (j + s[i]) % 256;
    x = s[i];
    s[i] = s[j];
    s[j] = x;
    res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
  }
  return res;
}

function byte2hex(srcstr) {
  var strarray = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
  var hexstr = "";
  for (var i = 0; i < srcstr.length; ++i)
    hexstr += (strarray[srcstr.charCodeAt(i) >>> 4]) + "" + (strarray[srcstr.charCodeAt(i) & 0x0F]);
  return hexstr.toLowerCase();
}
// 登录start
// 判断是否有记住密码存在本地
function loginRemember(that) {
  var UAInfoRem_index = wx.getStorageSync('UAInfoRem_index')
  var UInfoRem_index = wx.getStorageSync('UInfoRem_index')
  if (UAInfoRem_index){
    // 登录厂家账号
    loginFunc(that, UAInfoRem_index.userNameAdm, UAInfoRem_index.userPasswordAdm)
  } else if (UInfoRem_index){
    // 登录电站业主
    loginFunc(that, UInfoRem_index.userName, UInfoRem_index.userPassword)
  } else if (that.data.fromLoginOut != true){
    // 微信登录
    queryCode(function (opsCode) {
      if (opsCode.code) {
        var globalData0 = wxCharCode()
        var url = '&action=wxAuth&code=' + opsCode.code + '&appid=' + globalData0.appid + "&secret=" + globalData0.secret;
        http_oper(encodeURI(url), function (err, dat, desc) {
          if (err == 0) {// 微信登录成功 str
            if (dat.role == 0 || (dat.role == 5)) {  // 电站业主 str
              wx.setStorageSync('identity', 'Owner') //登录者是电站业主
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
              })
              var UInfo_index = {
                'dat': dat,
              }
              wx.setStorageSync('UInfo_index', UInfo_index)
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/list/list?fromIndex=true',
                })
              }, 1500)
            } else if (dat.role == 1 || dat.role == 2) {
              wx.setStorageSync('identity', 'Adminis') //登录者是管理员
              var UAInfo_index = {
                'datAdm': dat,
              }
              wx.setStorageSync('UAInfo_index', UAInfo_index)
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/listAdm/listAdm?fromIndex=true',
                })
              }, 1500)
            } else {
              that.setData({
                errtS: true,
                errMsg: '只支持管理员和电站业主登录'
              })
            }
          } else {
            // 微信登录失败，未绑定微信
            return
          }
        }, function () { }, function () { }, 'appidLogin')
      }
     })
  }
}
function loginFunc(that,usr, pwd){
  var checked = true
  var salt = new Date().getTime();
  var action = "&action=auth&usr=" + encodeURI(usr) + "&company-key=bnrl_frRFjEz8Mkn";
  var sign = sha1(salt + pwd + action);
  var urlHead = RequestHead()
  var url = urlHead + "?sign=" + sign + "&salt=" + salt + action;
  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {
   
      if (res.data.err == 0) {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        })
       
        if (res.data.dat.role == 0 || (res.data.dat.role == 5) || ((usr == 'vplant' && (pwd == sha1('vplant'))))) {          
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/list/list?fromIndex=true',
            })
          }, 1500)
        } else if (res.data.dat.role == 1 || res.data.dat.role == 2) {
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/listAdm/listAdm?fromIndex=true',
            })
          }, 1500)
        }else{
          that.setData({
            errtS: true,
            errMsg: '只支持管理员和电站业主登录'
          })
        }
      }
    },
  })
}
// 登录end
// 储存
// ajax请求
function http_oper(action, operOnSuccess, operOnError, operOnComplete,appidLogin) {

  var stationArr = wx.getStorageSync('stationArr') 
  var identity = wx.getStorageSync('identity')

  var salt = new Date().getTime();
  if (stationArr && (stationArr.length != 0)) { ////登陆子用户
    var currUsr = stationArr[stationArr.length - 1].tokenArr.dat
  } else {        // 厂家账号未跳转
    if (identity == 'Adminis') {
      var currUsr = wx.getStorageSync('UAInfo_index').datAdm
    } else if (identity == 'Owner') {
      var currUsr = wx.getStorageSync('UInfo_index').dat
    }
  }
  if (currUsr){
      var sign = sha1(salt + currUsr.secret + currUsr.token + action);
    }else{
      var sign = sha1(salt + action);
    }
  var urlHead = RequestHead()
  // 如果是从appid处登录
  if (appidLogin == 'appidLogin'){
    var url = urlHead + "?sign=" + sign + "&salt=" +
      salt  + action;
  } else if (appidLogin == 'wxlogin'){ 
    var url = action
  }else {
    var url = urlHead + "?sign=" + sign + "&salt=" +
      salt + "&token=" + currUsr.token + action;
  }
  
    http_async_request(url, operOnSuccess, operOnError, operOnComplete);
}
//上传固件URL
function http_upload_pic_url() {
  var stationArr = wx.getStorageSync('stationArr')
  var identity = wx.getStorageSync('identity')

  var salt = new Date().getTime();
  if (stationArr && (stationArr.length != 0)) { ////登陆子用户
    var currUsr = stationArr[stationArr.length - 1].tokenArr.dat
  } else {        // 厂家账号未跳转
    if (identity == 'Adminis') {
      var currUsr = wx.getStorageSync('UAInfo_index').datAdm
    } else if (identity == 'Owner') {
      var currUsr = wx.getStorageSync('UInfo_index').dat
    }
  }
  var action = "&action=uploadImg&thumbnail=true";
  var sign = sha1(salt + currUsr.secret + currUsr.token + action); 
  var urlHead = RequestHead()
  var url = urlHead + "?sign=" + sign + "&salt="+salt + "&token=" + currUsr.token + action;
  return url;
}
function http_async_request(url, onSuccess, onError, onComplete) {
 
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    method: 'GET', //必须为大写（例如：POST）
    header: {
      'content-type': 'application/json'
    },
    success: function (res, status) {
      onSuccess(res.data.err, res.data.dat, res.data.desc);
    },
    error: onError,
    complete:onComplete,
  })
}
// 日期转换
/*传入日期xxxx-yy-mm得到上一日日期  1*/
function getYestoday(date) {

  var temp = date + " " +  "00:00:00";
  var d = parseyyyymmddhhmiss2Date(temp);
  var yesterday_milliseconds = d.getTime() - 1000 * 60 * 60 * 24;
  var yesterday = new Date();
  yesterday.setTime(yesterday_milliseconds);
  var strYear = yesterday.getFullYear();
  var strDay = yesterday.getDate();
  var strMonth = yesterday.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay
  }
  var datastr = strYear + "-" + strMonth + "-" + strDay;
  return datastr;
}

/*传入日期xxxx-yy-mm得到下一日日期  2*/
function getNextday(date) {
  var temp = date + " " + "00:00:00";
  var k = parseyyyymmddhhmiss2Date(temp);
  var y = k.getFullYear();
  var m = k.getMonth();
  var d = k.getDate() + 1;
  var nextDate = new Date(y, m, d);
  var nextTime = parseDate2yyyymmdd(nextDate);
  return nextTime;
}

/*传入日期xxxx-yy得到上一个月日期  3*/
function getPreMonth(date) {
  var year = date.substring(0, 4); //获取当前日期的年份
  var month = date.substring(5, 7); //获取当前日期的月份
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  var preMonth = year2 + '-' + month2;
  return preMonth;
}

/*传入日期xxxx-yy得到下一个月日期 4*/
function getNextMonth(date) {
  var year = date.substring(0, 4); //获取当前日期的年份
  var month = date.substring(5, 7); //获取当前日期的月份
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var nextMonth = year2 + '-' + month2;
  return nextMonth;
}

/*传入日期xxxx得到上一年日期  5*/
function getPreYear(year) {
  var lastYear = parseInt(year) - 1;
  return lastYear;
}

/*传入日期xxxx得到下一年日期  6*/
function getNextYear(year) {
  var nextYear = parseInt(year) + 1;
  return nextYear;
}
/* 将yyyy-mm-dd hh:mi:ss字符串转换成Date. */
function parseyyyymmddhhmiss2Date(yyyymmddhhmiss) {
  var y = yyyymmddhhmiss.substring(0, 4);
  var m = yyyymmddhhmiss.substring(5, 7);
  var d = yyyymmddhhmiss.substring(8, 10);
  var h = yyyymmddhhmiss.substring(11, 13);
  var i = yyyymmddhhmiss.substring(14, 16);
  var s = yyyymmddhhmiss.substring(17, 19);
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d), parseInt(h), parseInt(i), parseInt(s));
}
/* 将Date转换成yyyy-mm字符串. */
function parseDate2yyyymm(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  return y + "-" + (m < 10 ? ("0" + m) : m);
}
/* 将Date转换成yyyy-mm-dd字符串. */
function parseDate2yyyymmdd(date) {
  var m = date.getMonth() + 1;
  var d = date.getDate();
  return date.getFullYear() + "-" + (m < 10 ? ("0" + m) : m) + "-" + (d < 10 ? ("0" + d) : d);
}
//去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
// 登录注册end
// 标签颜色切换
function tabFun(e, that) {
  var _datasetId = e.target.dataset.id;
  var _obj = {};
  _obj.curHdIndex = _datasetId;
  _obj.curBdIndex = _datasetId;
  that.data.tabBox.tabArr1 = _obj
  that.setData({
    tabBox: that.data.tabBox
  });
}
/*传入单位为kwh的发电量,根据大小转换为GWh或者MWh并返回小数1位数值*/
function formatKwh(energy) {//返回数组[realNum, unit];formatKwh[0]formatKwh[1]
  var num = parseFloat(energy);
  var realNum = num;
  var unit = "kWh";
  if (num >= 999999999) {
    realNum = (num / 1000000).toFixed(1);
    unit = "GWh";
  } else if (num >= 999999) {

    realNum = (num / 1000).toFixed(1);
    unit = "MWh";
  } else {
    realNum = num.toFixed(1);
  }
  var result = [realNum, unit];
  return result;
}
///*传入单位为kW数值,numStatus 0-不返回,1-返回,两个都为1全部返回*/
function formatKw(power, numStatus, unitStatus) { //返回数组[realNum, unit];
    var num = parseFloat(power);
    var realNum = num;
    var unit = "kW";
    if (num >= 999999999) {
      realNum = (parseFloat(num) / 1000000).toFixed(1);
      unit = "GW";
    } else if (num >= 999999) {

      realNum = (parseFloat(num) / 1000).toFixed(1);
      unit = "MW";
    } else {
      realNum = parseFloat(num).toFixed(1);
    }
    var result = [realNum, unit];

    if ((numStatus == 1) && (unitStatus == 1)) {
      //返回带单位数值
      return result;
    } else if ((numStatus == 1) && (unitStatus == 0)) {
      //只返回转换数据,不返回单位
      return realNum;
    } else
      return unit; //只返回单位
}
//获取设备类型
function devCode(dc) {
  if (dc == 0x200)
    return "逆变器";
  if (dc == 0x300)
    return "环境检测仪";
  if (dc == 0x400)
    return "智能电表";
  if (dc == 0x500)
    return "汇流箱";
  if (dc == 0x600)
    return "摄像头";
  if (dc == 0x700)
    return "电池";
  if (dc == 0x800)
    return "充电器";
  if (dc == 0x900)
    return "储能机";
  if (dc == 0xA00)
    return "防孤岛装置";
}

function getDevtyoe(devcode) {
  if (0x300 > devcode <= 0x200)
    return devCode(0x200)
  if (0x400 > devcode <= 0x300)
    return devCode(0x300)
  if (0x500 > devcode <= 0x400)
    return devCode(0x400)
  if (0x600 > devcode <= 0x500)
    return devCode(0x500)
  if (0x700 > devcode <= 0x600)
    return devCode(0x600)
  if (0x800 > devcode <= 0x700)
    return devCode(0x700)
  if (0x900 > devcode <= 0x800)
    return devCode(0x800)
  if (0xA00 > devcode <= 0x900)
    return devCode(0x900)
  if (devcode <= 0xA00)
    return devCode(0xA00)
}
// 图文 
function char(Cid, ts, val, typ, widthP) {
  let pageThis = this
  app.deviceInfo.then(function (deviceInfo) {
    let width = widthP
    let height = Math.floor(width / 1.6)//这个项目canvas的width/height为1.6
    let canvasId = Cid
    let canvasConfig = {
      width: width,
      height: height,
      id: canvasId
    }
    var tsvalSum = [] //零数据
    for (var i = 0; i < val.length; i++) {
      tsvalSum += parseFloat(val[i])
    }
    if (tsvalSum == 0) {
      ts = []
      val = []
      typ = 'area'
    }
    let labels = ts
    let data = val
    if (typ == 'column') {
      let config = getConfig(canvasConfig, labels, data)
      chartWrap.bind(pageThis)(config)
    } else if (typ == 'area') {
      let config = getConfigArea(canvasConfig, labels, data)
      chartWrap.bind(pageThis)(config)
    }
  });
}
function canvasPar(action, parameter, paraOne, tstype, valtype, that, date, typ, widthP) {
  http_oper(encodeURI("&action=" + action + "&pn=" + paraOne.pn + "&devcode=" + paraOne.devcode + "&devaddr=" + paraOne.devaddr + "&sn=" + paraOne.sn + "&date=" + date + "&parameter=" + parameter), function (err, dat, desc) {
    if (err == 0) {
      var ts = []
      var val = []
      // 
      if (action == "queryDeviceActiveOuputPowerOneDay") {
        dat = dat.outputPower
      } else if (action == "queryDeviceEnergyYearPerMonth") {
        dat = dat.permonth
      } else if (action == "queryDeviceEnergyMonthPerDay") {
        dat = dat.perday
      } else if (action == "queryDeviceEnergyTotalPerYear") {
        dat = dat.peryear
      } else if (action == "queryDeviceKeyParameterOneDay") {
        // 风速   
        dat = dat.parameter
      }
      var valSum=0;
      for (var i = 0; i < dat.length; i++) {
        if (action == "queryDeviceActiveOuputPowerOneDay" || (action == "queryDeviceKeyParameterOneDay")) {
          ts[i] = trim(dat[i].ts).substring(11, 16)
        } else if (action == "queryDeviceEnergyYearPerMonth") {
          ts[i] = trim(dat[i].ts).substring(5, 7)
        } else if (action == "queryDeviceEnergyMonthPerDay") {
          ts[i] = trim(dat[i].ts).substring(8, 10)
        } else if (action == "queryDeviceEnergyTotalPerYear") {
          ts[i] = trim(dat[i].ts).substring(0, 4)
        }
        val[i] = dat[i].val;
        valSum += parseFloat(val[i] )
      }
      that.setData({
        tstype: ts,
      })
      that.setData({
        valtype: val
      })
      if (valSum==0){
        that.setData({
          datCharF: false,
          chartNavCharHid: true
        })
      }else{
        //图文
        char('myCanvas', that.data.tstype, that.data.valtype, typ, widthP)  
      }
     
    } else {
      that.setData({
        datCharF: false,
        chartNavCharHid: true
      })
    }
  }, function () {
    netWork(that) 

  })
}
// 日期单位数转为两位数 1变为01
function doubDigit(w) {
  return (parseInt(w) < 10) ? "0" + w : w + "";
}
// 排序筛选
/*
   *
   *@param 说明：
   *arr是需要排序的数组；
   *byWhat 单指是用alias，还是output_power 进行排序
   *order表示排序顺序（asc/desc）：asc-升序；desc-降序；
   */
function getOrder(arr, byWhat, order) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      // console.log(arr)
      /**用alias进行排序*/
      // 如果报undefined，就将注释打开，开是否js异常处理机制的问题（既当一个字段没有的时候，用判空的方式无法绕过报错），此问题不解决
      // console.log(arr[j + 1].jj == undefined )
      // console.log(arr[j + 1].alias == undefined )
      var alaisV = (typeof (arr[j].alias) == undefined ? arr[j].sn : arr[j].alias)
      var alaisV1 = (typeof (arr[j + 1].alias) == undefined ? (typeof (arr[j + 1].sn) == undefined ? "" : arr[j + 1].sn ): arr[j + 1].alias)
      if ("alias" == byWhat) {
        if ("asc" == order) { //升序
          if (alaisV > alaisV1) {
            var tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        } else { //降序
          if (alaisV < alaisV1) {
            var tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        }
      }
/**用output_power进行排序*/
      if ("output_power" == byWhat) {
        if ("asc" == order) { //升序
          if (parseFloat(arr[j].output_power) > parseFloat(arr[j + 1].output_power)) {
            var tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        } else { //降序
          if (parseFloat(arr[j].output_power) < parseFloat(arr[j + 1].output_power)) {
            var tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;
          }
        }
      }
    }
  }
  return arr;
}
// 修改别名
function confiAliFunc(that, modiAliDat, action, DevPage) {
  if (modiAliDat && modiAliDat != '') {
    var url = ''
    if (action == 'editDeviceInfo') { 
      url = "&action=" + action + "&pn=" + DevPage.pn + "&devcode=" + DevPage.devcode + "&devaddr=" + DevPage.devaddr + "&sn=" + DevPage.sn + "&alias=" + modiAliDat
    } else if (action == 'editCollector'){
      url = "&action=" + action + "&pn=" + DevPage.pn + "&alias=" + modiAliDat
    }

    http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1500
        })
        that.setData({
          showModalStatus: false,
          showModalStatus0: false,
          chartHide: false,
          subMenuDisplay: ['hidden']
        })
      } else {
        wx.showToast({
          title: '修改失败' + desc,
          icon: 'loading',
          duration: 1500,
        })
        that.setData({
          showModalStatus: false,
          showModalStatus0: false,
          chartHide: false,
          subMenuDisplay: ['hidden']
        })
      }
    })
  } else {
    wx.showToast({
      title: '请输入别名',  
      icon: 'loading',
      duration: 1500
    })
  }
}
// 删除设备   
function confiDelFunc(that, action, DevPage) {
  var url = ''
  if (action == 'delDeviceFromPlant'){
    url = "&action=" + action + "&pn=" + DevPage.pn + "&devcode=" + DevPage.devcode + "&devaddr=" + DevPage.devaddr + "&sn=" + DevPage.sn
  } else if (action =='delCollectorFromPlant'){
    url = "&action=" + action + "&pn=" + DevPage.pn
  }
  http_oper(encodeURI(url), function (err, dat, desc) {
    if (err == 0) {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1500
      })
      that.setData({
        showModalStatus: false,
        showModalStatus1: false,
        chartHide: false,
        subMenuDisplay: ['hidden']
      })
      wx.redirectTo({
        url: '/pages/device/device',
      })
    } else {
      wx.showToast({
        title: '删除失败' + desc,
        icon: 'loading',
        duration: 1500
      })
      that.setData({
        showModalStatus: false,
        showModalStatus1: false,
        chartHide: false,
        subMenuDisplay: ['hidden']
      })
    }
  })
}
// 数据调试   
function confidebuFunc(that, action, DevPage, CMD,colle) {
  
  var url = ''
  if (colle){
    var devaddr = colle
  }else{
    var devaddr = DevPage.devaddr
  }
  if (action == 'sendCmdToDevice') {
    url = "&action=" + action + "&pn=" + DevPage.pn + "&devaddr=" + devaddr + "&cmd=" + CMD
  } else{
    
  }
  http_oper(encodeURI(url), function (err, dat, desc) {
    if (err == 0) {
      wx.showToast({
        title: '调试成功',
        icon: 'success',
        duration: 1500
      })
      that.setData({
        showModalStatus: false,
        showModalStatus1: false,
        showModalStatus2: false,
        chartHide: false,
        subMenuDisplay: ['hidden']
      })
    } else {
      wx.showToast({
        title: '调试失败' + desc,
        icon: 'loading',
        duration: 1500
      })
      that.setData({
        showModalStatus: false,
        showModalStatus1: false,
        showModalStatus2: false,
        chartHide: false,
        subMenuDisplay: ['hidden']
      })
    }
  },function(){
    wx.showToast({
      title: '调试失败：网络错误',
      icon: 'loading',
      duration: 1500
    })
    that.setData({
      showModalStatus: false,
      showModalStatus1: false,
      showModalStatus2: false,
      chartHide: false,
      subMenuDisplay: ['hidden']
    })
  })
}
// 错误码   var tip = errCode(err, desc)
function errCode(code){
  if(code == 0){
    return '成功'
  } else if (code == 1) {
    return '失败'
  } else if (code == 2) {
    return '超时,请稍后再试'
  } else if (code == 3) {
    return '系统繁忙，请稍后再试'
  } else if (code == 4) {
    return '请勿输入特殊字符'
  } else if (code == 5) {
    return '盐值错误, 未按规则使用'
  } else if (code == 6) {
    return '参数格式错误'
  } else if (code == 7) {
    return '缺少必要的参数'
  } else if (code == 8) {
    return '平台拒绝'
  } else if (code == 9) {
    return '不支持该操作'
  } else if (code == 10) {
    return '未通过认证,请重新登录'
  } else if (code == 11) {
    return '无权限的操作，请联系上级管理员'
  } else if (code == 12) {
    return '无记录'
  } else if (code == 13) {
    return '超出限制'
  } else if (code == 14) {
    return '命名重复或操作重复'
  } else if (code == 15) {
    return '没有找到厂家key'
  } else if (code == 16) {
    return '密码或用户名错误'
  } else if (code == 17) {
    return '密码格式错误'
  } else if (code == 18) {
    return '手机号已绑定，请更换手机号，或解除绑定'
  } else if (code == 19) {
    return '电话号码格式错误（6<=号码长度<32）'
  } else if (code == 20) {
    return '邮箱格式错误（6<=邮箱长度<64）'
  } else if (code == 21) {
    return '用户名格式错误（2<=用户名长度<32）'
  } else if (code == 22) {
    return '公司名称格式错误'
  } else if (code == 23) {
    return '厂家编码无效，请验证编码是否填写正确'
  } else if (code == 24) {
    return '用户名重复'
  } else if (code == 256) {
    return '无数据'
  } else if (code == 257) {
    return '无数采器'
  } else if (code == 258) {
    return '无设备'
  } else if (code == 259) {
    return '无效的数采器编号'
  } else if (code == 260) {
    return '无电站'
  } else if (code == 261) {
    return '无用户'
  } else if (code == 262) {
    return '设备已离线'
  } else if (code == 263) {
    return '数采器已离线'
  } else if (code == 264) {
    return '无设备告警'
  } else if (code == 265) {
    return '无环境检测仪'
  } else if (code == 271) {
    return '无任何修改操作'
  } else if (code == 288) {
    return '无摄像头'
  } else if (code == 352) {
    return '无固件'
  } else if (code == 353) {
    return '无协议'
  } else if (code == 368) {
    return '无角色'
  } else if (code == 369) {
    return '无用户分组'
  } else if (code == 370) {
    return '无电站分组'
  } else if (code == 371) {
    return '无GPRS流量充值套餐'
  } else if (code == 372) {
    return '无GPRS流量充值订单'
  } else if (code == 384) {
    return '无短信验证码'
  } else if (code == 385) {
    return '无device_token'
  } else if (code == 386) {
    return '无设备配置信息'
  } else if (code == 387) {
    return '无数采器类型'
  } else if (code == 512) {
    return '短信验证码不匹配'
  } else if (code == 513) {
    return '短信验证码超时'
  } else if (code == 514) {
    return '电话号码未绑定'
  } else if (code == 515) {
    return '电话号码不匹配'
  } else if (code == 516) {
    return '名称不能同名'
  } else if (code == 517) {
    return '用户或电站下还存在数采器'
  } else if (code == 518) {
    return '用户还存在下属用户'
  } else if (code == 519) {
    return '用户已存在'
  } else if (code == 520) {
    return '数采器编号已被注册'
  } else if (code == 521) {
    return '数采器不属于该用户'
  } else if (code == 522) {
    return '数采器已存在'
  } else if (code == 523) {
    return '不是浏览者账号'
  } else if (code == 768) {
    return '协议中没有可选字段'
  } else if (code == 1024) {
    return '只支持电站业主'
  } else if (code == 1025) {
    return '只支持管理员'
  } else if (code == 1026) {
    return '只支持设备厂家'
  } else if (code == 1027) {
    return '上级用户需要是管理员或设备厂家'
  } else if (code == 1028) {
    return '不支持的充值方式'
  } else if (code == 1029) {
    return '重复的数采器编号'
  } else if (code == 1030) {
    return '无效的GPRS卡'
  } else if (code == 1792) {
    return '数采器必须都属于该管理员'
  } else {
    return '查询失败，稍后再试'
  }
}
// 错误提示
function errtipFunc(that, err, desc, tiparg) {
  if (err == '') {
    var tip = tiparg + '获取失败：网络异常，请稍后再试'
  } else {
    var tip = tiparg +'获取失败：'+ errCode(err, desc)
  }

  that.setData({
    showRegTopTips: true,
    errorRegMsg: tip
  })
  setTimeout(function () {
    that.setData({
      showRegTopTips: false,
      errorRegMsg: ''
    })
  }, 3500)
}
// 金额转换
function turnVal(w){
  w = parseFloat(w)
  if(w>=10000 ){
     w = (w / 10000).toFixed(1) +'万';
  } else if (w<10000){
    w = w.toFixed(1)
  } else {
    w = '0.0'
  }
  return w;
}
//图文插件（封装） 传入（5个）:canvasId、type、横坐标、纵坐标、插件的宽（屏幕宽） str
function chartFunc(that, canvasId, type, ts, val, width) {
  let pageThis = this
  app.deviceInfo.then(function (deviceInfo) {

    let width = Math.floor(deviceInfo.windowWidth - (deviceInfo.windowWidth / 750) * 10 * 2)
    let height = Math.floor(width / 1.6)//这个项目canvas的width/height为1.6
    let canvasId = 'myCanvas'
    let canvasConfig = {
      width: width,
      height: height,
      id: canvasId
    }

    var tsvalSum = [] //零数据
    for (var i = 0; i < val.length; i++) {
      tsvalSum += parseFloat(val[i])
    }
    if (tsvalSum == 0) {
      ts = []
      val = []
      type = 'area'
    }

    let labels = ts
    let data = val
    if (type == 'column') {
      // that.setData({
      //   areaH: true,
      // })
      let config = getConfig(canvasConfig, labels, data)
      chartWrap.bind(pageThis)(config)
    } else if (type == 'area') {
      // that.setData({
      //   areaH: false,
      // })
      let config = getConfigArea(canvasConfig, labels, data)
      chartWrap.bind(pageThis)(config)
    }
  });
}
  // 模态框end
// 获取本周开始的日期
function getWeekTime() {
  var now = new Date();
  var Year = now.getFullYear();
  var Month = (now.getMonth() + 1);
  var Day = (now.getDate() - now.getDay()+1); //返回值是 0（周日） 到 6（周六） 之间的一个整数
  if (now.getDay() == 0)           //星期天表示 0 故当星期天的时候，获取上周开始的时候
  {
    Day -= 7;
  }
  Month = (parseInt(Month) < 10) ? "0" + Month : Month + "";
  Day = (parseInt(Day) < 10) ? "0" + Day : Day + "";
  var beginTime = Year + "-" + Month + "-" + Day + " 00:00:00";        //格式 Y-m-d
  return beginTime;
}
function getMonthTime() {
  var now = new Date();             //获取当前时间
  var beginTimes = now.getFullYear();     //开始计算
  var Month = now.getMonth() + 1;           //getMonth()是以0开始的月份
  Month = (parseInt(Month) < 10) ? "0" + Month : Month + "";
  var beginTimes = beginTimes + "-" + Month + "-01 00:00:00";        //格式 Y-m-d
  return beginTimes;
}
// toast提示
function toast(that,msg) {
  wx.showToast({
    title: msg,
    icon: 'loading',
    mask: false,
    duration:1500,
  });
}
// toast提示 成功
function toastOK(that, msg) {
  wx.showToast({
    title: msg,
    icon: 'success',
    mask: false,
    duration: 1500,
  });
}
// 加载中
function showLoading(that) {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    mask:true,
    duration:1500,
  });
}
function cancelLoading(that) {
  wx.hideToast();
}
function unique2(arr) {
  arr.sort(); //先排序
  var res = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== res[res.length - 1]) {
      res.push(arr[i]);
    }
  }
  return res;
}
// 跳转到对应电站
function stationTo(that, url, uindex,pag,devLis) {
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  http_oper(encodeURI(url), function (err, dat, desc) {
    if (err == 0) {
      that.setData({
        ToNextDelta: true,
      })
      // 数组形式存储
      var stationArr = wx.getStorageSync('stationArr')  // 如果是厂家账号的电站页面跳转
      
        if (pag == 'stapage') { //电站导航
          wx.setStorageSync('checkPlant', that.data.stationBox.list[uindex])
          var staColumn = []
          staColumn[0] = that.data.stationBox.list[uindex]
          wx.setStorageSync('Plant', staColumn)
          wx.setStorageSync('PlantIn', 'Adm')
          wx.reLaunch({
            url: '/pages/dataPage/dataPage',
          })
        }else{
          if (dat.role == 0 || (dat.role == 5)) {// 电站业主   // 用户页面或设备界面跳转
            // var staArg = 'Owner'
            if (pag == 'devpage') {
              wx.setStorageSync('PlantIndev', 'Admdev')
              wx.reLaunch({
                url: '/pages/inver/inver?inverDevPage=' + JSON.stringify(devLis),
              })
            } else if (pag == 'usrpage') {
              wx.reLaunch({
                url: '/pages/list/list',
              })
            }
          } else if (dat.role == 1 || dat.role == 2) { // 管理员   
            wx.reLaunch({
              url: '/pages/listAdm/listAdm',
            })
          }
        }
        stationArr[stationArr.length] = {
          // 'staArg': staArg,
          'tokenArr': {
            dat: dat
          }
        }
        wx.setStorageSync('stationArr', stationArr)
    } else {
      errBoxFunc(that, err, desc)
    }
  }, function () {
    netWork(that)
  }, function () {
    wx.hideLoading()
  })
}
// 分享内容公用
function shareFunc() {
  var that = this;
  var id = wx.getStorageSync("shareId")
  if (id){
    var shareObj = {
      title: '恒通源光伏监控',
      imageUrl: '/images/plant_img1.png',
      path: '/pages/sharePage/sharePage?id=' + JSON.stringify(id),
      success(e) {
        wx.showShareMenu({
          withShareTicket: true
        });
      },
      fail(e) {
        toastOK(that, "分享失败，稍后再试")
      }
    }
  }else{
    var shareObj = {
        title: '恒通源光伏监控',
        imageUrl: '/images/plant_img3.png',
        path: '/pages/index/index?fromLoginOut=true',
        success(e) {
          wx.showShareMenu({
            withShareTicket: true
          });
        }
      }
  }
  return shareObj
}
// 请求接口地址
function RequestHead() {
  var urlHead = 'https://wx.shinemonitor.com/test/'
  return urlHead
}
// 小程序账号
function wxCharCode(){
  var globalData0 = {
    appid: 'wx39aa60d28cb6c0ae',
    secret: 'fc7e574dd11f50dadf1445a3c9996956',
  }
  return globalData0
}
// 获取code
function queryCode(codeSuccess){
  wx.login({
    success: codeSuccess,
  });
}
// 获取openid
function queryOpenid() {
  var globalData0 = wxCharCode()
  queryCode(function(resCode){
    var url = "&action=sendWxRequest&code=" + resCode.code + "&appid=" + globalData0.appid + "&secret=" + globalData0.secret
    http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        console.log(dat)
      }
    }
    )
  })
}
// 解码操作
function queryDecrypt(appopts, onSuccess, onFail, onComplete, appidLogin){
  var that = this
  var globalData0 = wxCharCode()
  queryCode(function (resOpenid) {//&sessionKey=" + encodeURIComponent(resOpenid.data.session_key)
    var urlDecrypt = "&action=wxDecryptData" + "&iv=" + encodeURIComponent(appopts.iv) + "&encryptedData=" + encodeURIComponent(appopts.encryptedData) + "&code=" + encodeURI(resOpenid.code) + "&appid=" + encodeURI(globalData0.appid) + "&secret=" + encodeURI(globalData0.secret)
    http_oper(urlDecrypt, onSuccess, onFail, onComplete, appidLogin)
  })
}
// 查询账号绑定情况
function queryWXbind(that) {
  var globalData0 = wxCharCode()
  queryCode(function (resCode) {
    var url = '&action=queryWxBindAccount&code=' + resCode.code + "&appid=" + globalData0.appid + "&secret=" + globalData0.secret
    // var url = '&action=queryWxBindAccount&openid=' + resOpenid.data.openid
    http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        wx.setStorageSync("bindStatus", dat)
        if (dat.isUsrBindedWx == false && dat.isWxBindedUsr == false) {
          wx.showModal({
            title: '提示',
            content: '该账号是否绑定微信？',
            success: function (res) {
              if (res.confirm) {
                wx.getUserInfo({
                  success: function (resInfo) {
                    that.setData({
                      wx_userInfo: resInfo.userInfo,
                    })
                    // 绑定前向数据库添加用户信息
                    // queryOpenid(function (resOpenid) {
                    queryCode(function (resOpenid) {
                      var urlUsrInfo = '&action=bindWxUsrInfo&code=' + resOpenid.code + '&nickName=' + that.data.wx_userInfo.nickName + "&avatar=" + that.data.wx_userInfo.avatarUrl + '&mobile=' + that.data.wx_userInfo.mobile + '&gender=' + that.data.wx_userInfo.gender + '&city=' + that.data.wx_userInfo.city + '&province=' + that.data.wx_userInfo.province + '&country=' + that.data.wx_userInfo.country + '&lang=' + that.data.wx_userInfo.language + "&appid=" + globalData0.appid + "&secret=" + globalData0.secret;
                      http_oper(encodeURI(urlUsrInfo), function (err, dat, desc) {
                        if (err == 0) {
                        //  添加用户信息成功后绑定微信
                    queryCode(function (opsCode) {
                      if (opsCode.code) {
                        var urlBind = "&action=wxAccountBindLogin&code=" + opsCode.code + "&appid=" + globalData0.appid + '&secret=' + globalData0.secret
                        http_oper(encodeURI(urlBind), function (err, dat, desc) {
                          if (err == 0) {
                            // 获得用户信息
                            wx.getUserInfo({
                              success: function (res) {
                                that.setData({
                                  wx_userInfo: res.userInfo,
                                })
                              },
                              fail: function () {
                              },
                              complete: function () {
                                wx.showToast({
                                  title: '绑定成功',
                                  icon: 'success',
                                  duration: 1500
                                })
                              }
                            })
                          } else {
                            wx.showToast({
                              title: '绑定失败',
                              icon: 'loading',
                              duration: 1500
                            })
                          }
                        }, function () {
                          wx.showToast({
                            title: '绑定失败',
                            icon: 'loading',
                            duration: 1500
                          })
                        })
                      }
                    })
                        } else {
                          wx.showToast({
                            title: '绑定用户信息失败',
                            icon: 'loading',
                            duration: 1500
                          })
                        }
                      })
                    })
                  },
                  fail:function(){
                    errBoxFunc1(that, "绑定失败，无法获取用户信息")
                  }
                })
                
              }
            }
          })
        }
      }
    })
  })
}
// 下拉菜单
function tapMainMenuFunc(that,e){
  var index = parseInt(e.currentTarget.dataset.index);
  var newSubMenuDisplay = initSubMenuDisplay();
  if (that.data.diy == false){
    that.setData({
      diy: true
    })
  }
  if (that.data.tapBox && (index != 0)){
    that.data.tapBox.tapTop.subMenuDisplay = ['hidden', 'hidden', 'hidden', 'hidden']
    that.setData({
      tapBox: that.data.tapBox,
    })
  } 
   if (that.data.tapBox1 && (index != 1)) {
    that.data.tapBox1.tapTop.subMenuDisplay = ['hidden', 'hidden', 'hidden', 'hidden']
    that.setData({
      tapBox1: that.data.tapBox1,
    })
  } 
   if (that.data.tapBox2 && (index != 2)) {
    that.data.tapBox2.tapTop.subMenuDisplay = ['hidden', 'hidden', 'hidden', 'hidden']
    that.setData({
      tapBox2: that.data.tapBox2,
    })
  } 
   if (that.data.tapBox3 && (index != 3)) {
    that.data.tapBox3.tapTop.subMenuDisplay = ['hidden', 'hidden', 'hidden', 'hidden']
    that.setData({
      tapBox3: that.data.tapBox3,
    })
  }
  
  if (index == "0") {
    var currTapBox = that.data.tapBox
  } else if (index == "1") {
    var currTapBox = that.data.tapBox1
  } else if (index == "2") {
    var currTapBox = that.data.tapBox2
  } else if (index == "3") {
    var currTapBox = that.data.tapBox3
  }
  if (currTapBox.tapTop.subMenuDisplay[index] == 'hidden') {
    if (that.data.ecShow == false &&(index == 0 || (index == 1))) {
      that.setData({
        ecShow: true
      })
    }
    newSubMenuDisplay[index] = 'show';
  } else {
    if (that.data.ecShow == true && (index == 0 || (index == 1))) {
      that.setData({
        ecShow: false
      })
    }
    newSubMenuDisplay[index] = 'hidden';
  }
  currTapBox.tapTop.subMenuDisplay = newSubMenuDisplay
  if (index == "0") {
    that.setData({
      tapBox: currTapBox,
    });
  } else if (index == "1") {
    that.setData({
      tapBox1: currTapBox,
    });
  } else if (index == "2") {
    that.setData({
      tapBox2: currTapBox,
    });
  } else if (index == "3") {
    that.setData({
      tapBox3: currTapBox,
    });
  }
}
// 模态框的下拉菜单
function tapSubMenuFunc(e,that){
  var initSubMenuHighLight = [
    ['', '', '', '', ''],
    ['', ''],
    ['', '', '']
  ];
  that.data.tapBox.tapTop.subMenuDisplay = initSubMenuDisplay()
  var indexArray = e.currentTarget.dataset.index.split('-');
  for (var i = 0; i < initSubMenuHighLight.length; i++) {
    if (indexArray[0] == i) {
      for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
        initSubMenuHighLight[i][j] = '';
      }
    }
  }
  var indexArr1 = indexArray[0]
  var indexArr2 = indexArray[1]
  initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
  that.setData({
    subMenuHighLight: initSubMenuHighLight,
    tapBox: that.data.tapBox,
  });
  if (indexArr1 == '0') {
    var modelShow = that.data.modelDat
    if (indexArr2 == '0') {
      modelShow.mStatus = true
      modelShow.modiStatus = true
      modelShow.label = '修改别名'
    } else if (indexArr2 == '1') {
      modelShow.mStatus = true
      modelShow.delStatus = true
      modelShow.label = '删除设备'
    } else if (indexArr2 == '2') {
      modelShow.mStatus = true
      modelShow.debStatus = true
      modelShow.label = '数据调试'
    }
  }
  that.setData({
    modelDat: modelShow
  })
}
function modeCancel(that) {
  var modelDat = {
    mStatus: false,
    modiStatus: false,
    delStatus: false,
    debStatus: false
  }
  that.setData({
    modelDat: modelDat
  })
}
// 下拉菜单
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden', 'hidden'];
}
function errHide(that){
  setTimeout(function () {
    that.data.errBox.isErr = false
    that.setData({
      errBox: that.data.errBox,
    })
  }, 3000)
}
function errBoxFunc(that,err,desc) {//错误提示
  var errBox = {}
  errBox.isErr = true
  errBox.errMsg = errCode(err, desc)
  that.setData({
    errBox: errBox,
  })
  errHide(that)
}
function errBoxFunc1(that,msg) {
  var errBox = {}
  errBox.isErr = true
  errBox.errMsg = msg
  that.setData({
    errBox: errBox,
  })
  errHide(that)
}
function netWork(that) {
  var errBox = {}
  errBox.isErr = true
  errBox.errMsg = '网络异常，请稍后再试'
  that.setData({
    errBox: errBox,
  })
  errHide(that)
}
function drawCircle(that, x, y, r, r1, r2, r_1, r_2) {
  var cxt_arc = wx.createCanvasContext('canvasArc');
  cxt_arc.setLineWidth(1);
  cxt_arc.setStrokeStyle('#d2d2d2');
  cxt_arc.setLineCap('round')
  cxt_arc.beginPath();
  cxt_arc.arc(x, y, r, r1, r2, false);//原点(106,106)，r=100
  cxt_arc.stroke();

  cxt_arc.setLineWidth(3);
  cxt_arc.setStrokeStyle(that.data.cirColor);
  cxt_arc.setLineCap('round')
  cxt_arc.beginPath();
  cxt_arc.arc(x,y,r,r_1,r_2,false);
  cxt_arc.stroke();
  cxt_arc.draw();
}
function tabFunc(that,e){
  var _datasetId = e.target.dataset.id;
  var _obj = {};
  _obj.curHdIndex = _datasetId;
  _obj.curBdIndex = _datasetId;
  that.data.tabBox.tabArr1 = _obj
  that.setData({
    tabBox: that.data.tabBox,
    errBox: {},
  });
  if (_datasetId == '0') {    // 图表数据显示隐藏
    that.setData({
      chartNavHid: false,//图表hidden
      datNav: true,//数据hidden
      chartHide: false,
    })
  } else if (_datasetId == '1') {
    that.setData({
      chartHide: true,
    })
    that.setData({
      chartNavHid: true,//圆环 、日月年、日历
      datNav: false, //第二个日历 、滑块
      chartHide: true,
    })
  }
}
// 生成二维码
function QRcode() {
  var globalData0 = wxCharCode() //直接成已储存的页面的小程序码
  var urlPic = '&action=queryWxAcodeUrl&appid=' + globalData0.appid + '&path=pages/index/index'
  http_oper(encodeURI(urlPic), function (err, dat, desc) {
    if (err == 0) {
      wx.navigateTo({
        url: '/pages/shareFriends/shareFriends?fromLoginOut=true&sharePic=' + dat.url,
      })
    }else{
  // 获取token
  var urlAccess_token = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + globalData0.appid + "&secret=" + globalData0.secret
  wx.request({
    url: urlAccess_token, //仅为示例，并非真实的接口地址
    method: 'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      var urlPic1 = '&action=wxAcode&appid=' + globalData0.appid + '&path=pages/index/index&access_token=' + res.data.access_token
      http_oper(encodeURI(urlPic1), function (err, dat, desc) {
        if (err == 0) {
          wx.navigateTo({
            url: '/pages/shareFriends/shareFriends?fromLoginOut=true&sharePic=' + dat.url,
          })
        }
      })
    }
  })
    }
  })
}
module.exports = {
  QRcode: QRcode,// 生成二维码
  shareFunc: shareFunc,
  errBoxFunc1: errBoxFunc1,
  tabFunc: tabFunc,
  modeCancel: modeCancel,//关闭弹窗
  tapSubMenuFunc: tapSubMenuFunc,
  RequestHead:RequestHead,
  drawCircle: drawCircle,//画圆环
  errBoxFunc: errBoxFunc,//错误提示
  netWork:netWork,//网络异常的错误提示
  tapMainMenuFunc: tapMainMenuFunc,
  queryDecrypt: queryDecrypt,
  queryWXbind: queryWXbind,
  wxCharCode: wxCharCode,
  queryCode: queryCode,
  queryOpenid: queryOpenid,
  stationTo:stationTo,
  unique2: unique2,
  toastOK: toastOK,
  toast: toast,
  showLoading:showLoading,
  cancelLoading: cancelLoading,
  formatTime: formatTime,
  sha1: sha1,
  rc4: rc4,
  http_oper: http_oper,
  http_async_request: http_async_request,
  loginRemember: loginRemember,
  byte2hex: byte2hex,
  trim: trim,
  tabFun: tabFun,
  getNextday: getNextday,
  getPreMonth: getPreMonth,
  getNextMonth: getNextMonth,
  getPreYear: getPreYear,
  getNextYear: getNextYear,
  formatKwh: formatKwh, //转化kWh
  formatKw: formatKw,
  getYestoday: getYestoday,
  getDevtyoe: getDevtyoe,
  devCode: devCode,
  canvasPar: canvasPar,
  doubDigit: doubDigit,
  getOrder:getOrder,
  http_upload_pic_url: http_upload_pic_url,
  confiDelFunc: confiDelFunc,
  confiAliFunc: confiAliFunc,
  char: char,
  errCode:errCode,
  turnVal: turnVal, //￥
  confidebuFunc: confidebuFunc,
  errtipFunc:errtipFunc,
  chartFunc: chartFunc,//图文插件
  initSubMenuDisplay: initSubMenuDisplay,
  getWeekTime: getWeekTime,//获得本周起止时间
  getMonthTime: getMonthTime,//获得本月起止时间
}
// queryPlantEnergyDay 当日发电量响应失败 queryPlantEnergyMonth 当月发电量响应失败 queryPlantEnergyYear 当年发电量响应失败 
// 当日收益 总收益


