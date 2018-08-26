const baseUrl = 'https://pintu.xizai.com';

// 接口列表
function getRequestUrl(methodName) {
  switch (methodName) {
    case 'getIndex':      // 获取用户详情
      return baseUrl + '/index.php';
    default:
      return baseUrl + '/index.php';
  }
}

function request(methodName, page, dataType, params) {
  let privateInfo = wx.getStorageSync("pivateInfo");
  //console.log("缓存privateInfo:");
  //console.log(privateInfo);
  if (!page){
    console.log("没传page！");
  }
  let openId = privateInfo.openId ? privateInfo.openId : '';
  params.openid = openId;
  if (params._DATA){
    var _DATA = JSON.parse(params._DATA);
    _DATA.openid = openId;
    _DATA = JSON.stringify(_DATA);
    params._DATA = _DATA;
  } 
  var data = getRequestData(dataType, params);
  var url = getRequestUrl(methodName);
  return wx.request({
    url: url,
    method: 'POST',
    dataType: 'json',
    data: data,
    header: {
      'content-type': getContentType(dataType)
    },
    success: function (res) {
      if (page)
        page.onSuccess(methodName,res);
    },
    fail: function (res) {
      console.log('methodName:',methodName);
      console.log('url:',url);
      console.log('data:',data);
      console.log('res:',res);
      if (page)
        page.onFail(methodName);
    },
    complete: function () {
      if (page)
        page.onComplete(methodName);
    }
  })
}

function getContentType(type) {
  if (type == 'form') {
    return 'application/x-www-form-urlencoded';
  } else {
    return 'application/json';
  }
}

function getRequestData(dataType, params) {
  if (dataType == 'form') {
    return params;
  } else {
    return JSON.stringify(params);
  }
}

// 发送模版
function sendTpl(accessToken,params,page,tplName){
  let privateInfo = wx.getStorageSync("pivateInfo");
  let openId = privateInfo.openId ? privateInfo.openId : '';
  params.touser = openId;
  wx.request({
    url: "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + accessToken,
    dataType: "json",
    method: "post",
    data: params,
    success: function (res) {
      console.log(res);
      return page.onTplSuccess(res,tplName);
    }, fail(res) {
      console.log(res);
      return page.onTplFail(res,tplName);
    }
  })
}

// 上传图片
function uploadFile(page,submitName,imgSrc,params){
  if (!page){showErrorTip("未指定上传页面")};
  let src = imgSrc ? imgSrc : '';
  let privateInfo = wx.getStorageSync("pivateInfo");
  params.openid = privateInfo.openId;  
  params._C = "Pic",
  params._A = "upload",
  console.log("上传图片的参数：");
  console.log(baseUrl + "/index.php");
  console.log(imgSrc);
  console.log(params);
  wx.uploadFile({
    url: baseUrl + "/index.php",
    filePath: imgSrc,
    name: 'file',
    formData: params,
    success: function (res) {
      page.onUpload("success", res, submitName);
    },
    fail: function (res) {
      console.log(submitName);
      console.log(res);
      page.onUpload("fail", res, submitName);
    }
  })
}

// 多种跳转,name：目标文件名，urltype：跳转类型，params：?+参数集合
function urlTarget(name,urltype,params){
  if (!params) params='';
  switch (urltype){
    case 'navigate':        // 保留当前页面，跳转到应用内的某个页面
      wx.navigateTo({
        url: '../' + name + '/' + name + params
      })
      break;
    case 'redirect':        // 关闭当前页，跳转到应用内的非tabBar页面
      wx.redirectTo({
        url: '../' + name + '/' + name + params
      })
      break;
    case 'switchTab':       // 关闭当前页，跳转到tabBar页面
      wx.switchTab({
        url: '../' + name + '/' + name
      })
      break;
    case 'reLaunch':        // 关闭所有界面，跳转到非tabBar页面
      wx.reLaunch({
        url: '../' + name + '/' + name + params
      })
      break;
    default:
      wx.navigateTo({
        url: '../' + name + '/' + name + params
      })
      break;
  }
}

function showLoadingToast() {       // 显示加载提示
  wx.showToast({
    title: '加载中...',
    icon: "loading",
    duration: 30000,
    mask: true
  });
}

function showErrorTip(text) {       // 显示错误提示
  wx.showToast({
    title: text,
    icon:'loading',
    image: '../../image/icon_warn.png',
    // mask:true,
    duration: 1500
  })
}
function showSuccessTip(text) {     // 显示成功提示
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 800,
    mask: true
  })
}
function verifyTel(tel) {            // 手机号验证
  var that = this;
  var bool = true;
  if (!/^1[3,4,5,7,8]\d{9}$/.test(tel)) {
    that.showErrorTip("手机号有误");
    bool = false;
  }
  return bool;
}
function verifyNull(val, text) {       // 验证内容是否为空
  var that = this;
  var bool = true;
  if (!val) {
    that.showErrorTip(text + "不能为空");
    bool = false;
  }
  return bool;
}
function verifySixDigit(val, text) {     // 验证六位数字
  var that = this;
  var bool = true;
  if (!/^\d{6}$/.test(val)) {
    that.showErrorTip(text);
    bool = false;
  }
  return bool;
}
function ok(title, content, fun) {//提示框
  wx.showModal({
    title: title,
    content: content,
    confirmColor: config.cdefault,
    success: function (res) { if (res.confirm) { fun && fun(); } }
  })
}


function computeCarts(carts) {
  carts.totalNum = 0;
  carts.totalPrice = 0;
  if (!carts.list || carts.list.length == 0) {
    return;
  }
  var cartsList = carts.list;
  for (var i = 0; i < cartsList.length; i++) {
    carts.totalNum += cartsList[i].num;
    carts.totalPrice += cartsList[i].totalPrice;
  }
}

function deleteTeaMoneyCart(carts, token, tableId) {
  if (!carts.list || carts.list.length == 0) {
    return;
  }
  var cartsList = carts.list;
  var teaMoneyCartIds = [];
  for (var i = 0; i < cartsList.length; i++) {
    if (cartsList[i].greens.name == '茶水费') {
      var teaMoneyCart = carts.list.splice(i, 1);
      teaMoneyCartIds.push(teaMoneyCart[0].id);
    }
  }
  if (teaMoneyCartIds.length > 0) {
    sendRequest('deleteCartByIds', undefined, 'form', { token: token, tableId: tableId, cartIds: teaMoneyCartIds });
  }
  computeCarts(carts);
}

function wxpay(timeStamp, nonceStr, pkg, paySign,page) {
  wx.requestPayment({
    timeStamp: timeStamp.toString(),
    nonceStr: nonceStr,
    "package": pkg,
    signType: 'MD5',
    paySign: paySign,
    success: function (res) {
      showSuccessTip("微信支付成功~");
      page.onWxPay("success",res);      
      //console.log(res);
    },
    fail: function (res) {
      showErrorTip("微信支付失败");
      console.log(res);  
      //page.onWxPay("fail",res);
      //console.log("微信支付失败：");          
    }
  })
}

function phoneInfo(){
  let curPhone = '';
  wx.getSystemInfo({
    success: function(res) {
      curPhone = res;
    },
  })
  return curPhone;
}

module.exports = {
  request:request,
  urlTarget:urlTarget,
  showErrorTip: showErrorTip,
  computeCarts: computeCarts,
  deleteTeaMoneyCart: deleteTeaMoneyCart,
  showSuccessTip: showSuccessTip,
  verifyTel: verifyTel,
  verifyNull: verifyNull,
  verifySixDigit: verifySixDigit,
  ok: ok,
  baseUrl: baseUrl,
  wxpay: wxpay,
  phoneInfo: phoneInfo,
  uploadFile: uploadFile,
  sendTpl: sendTpl
}