var TESTMODE = false;

//服务器地址
var SERVER_URL = "https://isart.me/DSYYServer";
var DEBUG_URL = "http://localhost/DSYYServer";
var SERVER_URL = (TESTMODE) ? DEBUG_URL : SERVER_URL;


///////七牛相关///////////////////////////////////
//根据key值获取图片真实链接
function getImgRealUrl(key_v) {
  return "http://dsyy.isart.me/" + key_v;
}


//获取七牛URL，进行图片剪裁
function qiniuUrlTool(img_url, type) {
  if ((img_url == undefined || img_url == null) && type == "head_icon") {
    return "../../images/jiazai.png";
  }
  if (img_url == undefined || img_url == null) {
    return "";
  }
  var pos = img_url.indexOf("?");
  //alert(pos);
  if (pos != -1) {
    img_url = img_url.substr(0, pos);
  }
  var qn_img_url;
  switch (type) {
    case "top_ad":      //广告图片
      qn_img_url = img_url + "?imageView2/2/w/320/h/165/interlace/1";
      break;
    case "folder_index":        //首页图片
      qn_img_url = img_url + "?imageView2/2/w/500/q/75/interlace/1";
      break;
    case "work_step":           //编辑的画夹步骤
      qn_img_url = img_url + "?imageView2/2/w/750/interlace/1";
      break;
    case "user_hi":  //头像
      qn_img_url = img_url + "?imageView2/1/w/200/h/200/interlace/1";
    case "bar_detail":  //书吧详情页
      qn_img_url = img_url + "?imageView2/1/w/750/h/384/interlace/1";
    case "user_bg":  //我的背景
      qn_img_url = img_url + "?imageView2/1/w/750/interlace/1";
      break;
  }

  return qn_img_url;
}

//获取真实的七牛云存储链接
function getRealImgUrl(img_url) {
  //如果img_url为空
  if (judgeIsAnyNullStr(img_url)) {
    return img_url
  }
  var pos = img_url.indexOf("?");
  return img_url.substring(0, pos)
}

//是否还有本地图片
function isLocalImg(img) {
  if (judgeIsAnyNullStr(img)) {
    return false;
  }
  if (img.indexOf("wxfile") >= 0) {
    return true;
  }
  return false;
}


//跳转到登录页面
function navigateToLogin(param) {

  console.log("navigateToLogin" + JSON.stringify(param));
  wx.navigateTo({
    url: '/pages/login/login?jsonStr=' + JSON.stringify(param),
  })
}

// 获取头像
function getHeadIconA(dir, hi) {
  // console.log(hi);
  if (hi == undefined || hi.length < 15) {
    if (dir == "html") {
      return "../image/default_head_logo.png";
    } else {
      return "../image/default_head_logo.png";
    }
  }
  if (hi.indexOf('7xku37.com') < 0) {
    return hi;
  }
  return qiniuUrlTool(hi, "head_icon");
}

///接口调用相关方法///////////////////////////////////////////

//进行接口调用的基本方法
function wxRequest(url, param, method, successCallback, errorCallback) {
  console.log("wxRequest url:" + JSON.stringify(url) + " param:" + JSON.stringify(param));
  if (!judgeIsAnyNullStr(getApp().globalData.userInfo)) {
    //user_id未设置
    if (judgeIsAnyNullStr(param.user_id)) {
      param.user_id = getApp().globalData.userInfo.id;
    }
    param.token = getApp().globalData.userInfo.token;
  }
  console.log("param：" + JSON.stringify(param))
  wx.request({
    url: url,
    data: param,
    header: {
      "Content-Type": "application/json"
    },
    method: method,
    success: function (res) {
      successCallback(res)
      hideLoading()
    },
    fail: function (err) {
      console.log("wxRequest fail:" + JSON.stringify(err))
      hideLoading()
    }
  });
}


///接口调用相关方法///////////////////////////////////////////
//获取七牛上传token
function getQnToken(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getUploadToken.do', param, "GET", successCallback, errorCallback);
}


//获取用户的OpenId
function getOpenId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getOpenIdForXCX.do', param, "GET", successCallback, errorCallback);
}


//用户登录
function login(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/login.do', param, "GET", successCallback, errorCallback);
}

//获取广告图
function getADs(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getADs.do', param, "GET", successCallback, errorCallback);
}


//通过ISBN码获取图书信息
function getBookInfoByISBN(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookInfoByISBN.do', param, "GET", successCallback, errorCallback);
}

//更新图书信息
function updateBookInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/updateBookInfoById.do', param, "GET", successCallback, errorCallback);
}


//新建图书对象
function createBookObj(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/createBookObj.do', param, "GET", successCallback, errorCallback);
}


//获取首页数据
function getIndexPage(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getIndexPage.do', param, "GET", successCallback, errorCallback);
}


//获取条件获取图书信息
function getBookObjByCon(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookObjByCon.do', param, "GET", successCallback, errorCallback);
}

//根据位置获取图书信息
function getBarInfoByPos(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBarInfoByPos.do', param, "GET", successCallback, errorCallback);
}
//根据标题获取图书信息
function getBookInfosByTitle(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookInfosByTitle.do', param, "GET", successCallback, errorCallback);
}

//根据书吧id获取书吧页面
function getBarPageByBarId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBarPageByBarId.do', param, "GET", successCallback, errorCallback);
}

//根据标题获取图书信息
function getBookInfosByTitle(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookInfosByTitle.do', param, "GET", successCallback, errorCallback);
}

//根据类型获取图书信息
function getBookInfosByType(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookInfosByType.do', param, "GET", successCallback, errorCallback);
}


//微信预下单
function wxPrepay(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/wxPrepay.do', param, "GET", successCallback, errorCallback);
}

//根据用户id获取所属书吧列表
function getBarListByUserId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBarListByUserId.do', param, "GET", successCallback, errorCallback);
}

//意见反馈
function createSuggestion(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/createSuggestion.do', param, "GET", successCallback, errorCallback);
}

//更新用户信息
function updateUserInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/updateUserInfo.do', param, "GET", successCallback, errorCallback);
}

//生成借阅码
function createBorrowCode(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/createBorrowCode.do', param, "GET", successCallback, errorCallback);
}

//根据借书码获取用户
function getUserInfoByBorrowCode(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getUserInfoByBorrowCode.do', param, "GET", successCallback, errorCallback);
}

//根据书吧id和isbn号获取图书列表
function getBookInfosByBarIdAndISBN(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookInfosByBarIdAndISBN.do', param, "GET", successCallback, errorCallback);
}

//借阅图书
function borrowBook(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/borrowBook.do', param, "GET", successCallback, errorCallback);
}

//更新书吧信息
function updateBarInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/updateBarInfo.do', param, "GET", successCallback, errorCallback);
}

//根据ISBN和书吧id获取借出图书信息
function getBorrowedOutInfoByBarIdAndISBN(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBorrowedOutInfoByBarIdAndISBN.do', param, "GET", successCallback, errorCallback);
}

//根据book_id获取图书页面
function getBookPageByBookId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getBookPageByBookId.do', param, "GET", successCallback, errorCallback);
}

//归还图书
function returnBook(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/returnBook.do', param, "GET", successCallback, errorCallback);
}

//根据isbn获取读后感列表信息
function getTWDetailInfoByISBN(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getTWDetailInfoByISBN.do', param, "GET", successCallback, errorCallback);
}

//编辑读后感接口
function createTWBaseInfo(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/createTWBaseInfo.do', param, "POST", successCallback, errorCallback);
}

//编辑读后感接口JSON版
function createTWBaseInfoJSON(param, successCallback, errorCallback) {
  console.log("createTWBaseInfoJSON param before:" + JSON.stringify(param))
  param = {
    info: JSON.stringify(param)
  }
  console.log("createTWBaseInfoJSON param after:" + JSON.stringify(param))
  wxRequest(SERVER_URL + '/APP/createTWBaseInfoJSON.do', param, "GET", successCallback, errorCallback);
}

//根据读书感名称搜索图文列表
function getTWDetailInfoBySearchWord(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getTWDetailInfoBySearchWord.do', param, "GET", successCallback, errorCallback);
}

//根据读书感名称搜索图文列表
function getTWDetailInfoByCon(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getTWDetailInfoByCon.do', param, "GET", successCallback, errorCallback);
}

//根据用户id获取借阅详情
function getDetailBorrowInfoByUserId(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getDetailBorrowInfoByUserId.do', param, "GET", successCallback, errorCallback);
}

//会员退办
function refundMember(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/refundMember.do', param, "GET", successCallback, errorCallback);
}

//获取会员列表
function getMemberLevels(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getMemberLevels.do', param, "GET", successCallback, errorCallback);
}

//根据借书码获取用户
function getUserDetailInfoById(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getUserDetailInfoById.do', param, "GET", successCallback, errorCallback);
}

//根据id获取读后感详情
function getTWDetailInfoById(param, successCallback, errorCallback) {
  wxRequest(SERVER_URL + '/APP/getTWDetailInfoById.do', param, "GET", successCallback, errorCallback);
}

/////////基本方法///////////////////////////////////////////
//跳转到inputText页面

// var id = "nick_name"             输入框id
// var title = "用户昵称"             输入框标题
// var value = "我的昵称是变色龙"       输入框的默认值
// var length = 16                    输入框文字长度校验
// var tip = "好的昵称更容易让您记住您"   输入框下方提示
// var plach = "请输入昵称"          输入框提示
// var funName = "changeNickName"   上级页面的方法名

function navigateToInput(param) {
  console.log("navigateToInput" + JSON.stringify(param));
  wx.navigateTo({
    url: '/pages/inputText/inputText?jsonStr=' + JSON.stringify(param),
  })
}

//返回
function navigateBack(delta) {
  wx.navigateBack({
    delta: delta
  })
}


//数字处理
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//判断是否有空字符串
function judgeIsAnyNullStr() {
  if (arguments.length > 0) {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] == null || arguments[i] == "" || arguments[i] == undefined || arguments[i] == "undefined" || arguments[i] == "未设置") {
        return true;
      }
    }
  }
  return false;
}

//获取日期 2017-06-13
function getDateStr(str) {
  if (judgeIsAnyNullStr(str)) {
    return str
  }
  var pos = str.indexOf(' ');
  if (pos < 0) {
    return str
  }
  return str.substr(0, pos)
}

//格式化日期时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


//展示toast
function showToast(msg, img) {
  console.log(img);
  if (judgeIsAnyNullStr(img)) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1500,
    })
  } else {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 1500,
      image: img
    })
  }
}

//展示modal
function showModal(title, content, confirmCallBack, cancelCallBack) {
  wx.showModal({
    title: title,
    content: content,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        confirmCallBack(res)
      } else if (res.cancel) {
        console.log('用户点击取消')
        cancelCallBack(res)
      }
    }
  })
}

//错误modal
function showErrorModal(msg) {
  wx.showModal({
    title: '调用失败',
    content: msg,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

//展示loadding
function showLoading(msg) {
  if (!wx.canIUse('showLoading')) {
    return;
  }
  wx.showLoading({
    title: msg,
  })
}

//隐藏loadding
function hideLoading() {
  if (!wx.canIUse('hideLoading')) {
    return;
  }
  wx.hideLoading();
}


//优化字符串输出，如果str为空，则返回r_str
function conStr(str, r_str) {
  if (judgeIsAnyNullStr(str)) {
    return r_str;
  }
  return str;
}


//鉴权相关
function convertEnNameToChiName(name) {
  switch (name) {
    case "":
      return "";
    case "":
      return "";
  }
  return name;
}

//判断是否为空图
function judgeIsNullImg(img_url) {
  if (judgeIsAnyNullStr(img_url)) {
    return true
  }
  if (img_url.indexOf('def.png') >= 0) {
    return true
  }
  return false
}

//判断图书类型是否为空
function judgeNoBookType(book_type) {
  if (book_type.indexOf('其他') >= 0) {
    return true
  } else {
    return false
  }
}


function judgeIsAnyNullStrImp(obj) {
  if (obj.length > 0) {
    for (var i = 0; i < obj.length; i++) {
      var value = obj[i].value;
      var name = obj[i].name;
      if (value == null || value == "" || value == undefined || value == "未设置") {
        showToast("请设置" + convertEnNameToChiName(name), "../../images/close_icon.png");
        return true;
      }
    }
  }
  return false;
}


//是否还有本地图片
function isLocalImg(img) {
  if (img.indexOf("wxfile") >= 0) {
    return true;
  }
  return false;
}


///选择图片////////////////////////////////////////////////////////
function chooseImage(param, successCallBack, errorCallBack, completeCallBack) {

  //进行参数配置
  if (judgeIsAnyNullStr(param.count)) {
    param.count = 9
  }
  if (judgeIsAnyNullStr(param.sizeType)) {
    param.sizeType = ['compressed']
  }
  if (judgeIsAnyNullStr(param.sourceType)) {
    param.sourceType = ['album']
  }
  console.log("param :" + JSON.stringify(param))

  wx.chooseImage({
    sizeType: param.sizeType, // 可以指定是原图还是压缩图，默认二者都有
    sourceType: param.sourceType, // 可以指定来源是相册还是相机，默认二者都有
    count: param.count,
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      console.log("wx.chooseImage success:" + JSON.stringify(res))
      successCallBack(res)
    },
    fail: function (res) {
      console.log("wx.chooseImage fail:" + JSON.stringify(res))
      if (typeof errorCallBack == "function") {
        errorCallBack(res)
      }
      errorCallBack(res);
    },
    complete: function (res) {
      console.log("wx.chooseImage complete:" + JSON.stringify(res))
      if (typeof completeCallBack == "function") {
        completeCallBack(res)
      }
    }
  })
}

function clone(myObj) {
  if (typeof (myObj) != 'object') return myObj;
  if (myObj == null) return myObj;

  var myNewObj = new Object();

  for (var i in myObj)
    myNewObj[i] = clone(myObj[i]);

  return myNewObj;
}

function getErrorMsg(error_code) {
  switch (error_code) {
    case "999":
      return "调用失败"
  }
  return "未知错误";
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
** 生成3-32位随机串：randomWord(true, 3, 32)
** 生成43位随机串：randomWord(false, 43)
*/

function randomWord(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}


/* 时间戳产生函数   */
function createTimeStamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}

/* 随机数 */
function randomString() {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

module.exports = {
  INDEX_PAGE: "/pages/index/index",
  navigateToInput: navigateToInput,
  navigateToLogin: navigateToLogin,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  showModal: showModal,
  showErrorModal: showErrorModal,
  navigateBack: navigateBack,
  conStr: conStr,
  clone: clone,
  getDateStr: getDateStr,
  randomWord: randomWord,
  judgeIsAnyNullStr: judgeIsAnyNullStr,
  judgeIsAnyNullStrImp: judgeIsAnyNullStrImp,
  judgeNoBookType: judgeNoBookType,
  isLocalImg: isLocalImg,
  getImgRealUrl: getImgRealUrl,
  qiniuUrlTool: qiniuUrlTool,
  getRealImgUrl: getRealImgUrl,
  judgeIsNullImg: judgeIsNullImg,
  chooseImage: chooseImage,
  getErrorMsg: getErrorMsg,
  getOpenId: getOpenId,
  getQnToken: getQnToken,
  getADs: getADs,
  login: login,
  getBookInfoByISBN: getBookInfoByISBN,
  updateBookInfo: updateBookInfo,
  createBookObj: createBookObj,
  getIndexPage: getIndexPage,
  getBookObjByCon: getBookObjByCon,
  getBarInfoByPos: getBarInfoByPos,
  getBarPageByBarId: getBarPageByBarId,
  getBookInfosByTitle: getBookInfosByTitle,
  getBookInfosByType: getBookInfosByType,
  wxPrepay: wxPrepay,
  getBarListByUserId: getBarListByUserId,
  createSuggestion: createSuggestion,
  updateUserInfo: updateUserInfo,
  createBorrowCode: createBorrowCode,
  getUserInfoByBorrowCode: getUserInfoByBorrowCode,
  getBookInfosByBarIdAndISBN: getBookInfosByBarIdAndISBN,
  borrowBook: borrowBook,
  createTimeStamp: createTimeStamp,
  randomString: randomString,
  updateBarInfo: updateBarInfo,
  getBorrowedOutInfoByBarIdAndISBN: getBorrowedOutInfoByBarIdAndISBN,
  getBookPageByBookId: getBookPageByBookId,
  returnBook: returnBook,
  getTWDetailInfoByISBN: getTWDetailInfoByISBN,
  createTWBaseInfo: createTWBaseInfo,
  createTWBaseInfoJSON: createTWBaseInfoJSON,
  getTWDetailInfoBySearchWord: getTWDetailInfoBySearchWord,
  getTWDetailInfoByCon: getTWDetailInfoByCon,
  getDetailBorrowInfoByUserId: getDetailBorrowInfoByUserId,
  refundMember: refundMember,
  getMemberLevels: getMemberLevels,
  getUserDetailInfoById: getUserDetailInfoById,
  getTWDetailInfoById: getTWDetailInfoById
}