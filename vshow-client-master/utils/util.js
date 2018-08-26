let { saveFormIdUrl } = require('../config');
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}


function NetRequest({ url, data, success, fail, complete, method = "POST" }) {

  var session_id = wx.getStorageSync('sessionId'), header;//本地取存储的sessionID
  if (session_id != "" && session_id != null) {
    header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'sessionId=' + session_id }
  } else {
    header = { 'content-type': 'application/x-www-form-urlencoded' }
  }

  
  wx.request({
    url,
    method,
    data,
    header,
    success: (res) => {
      setCookie(res);
      typeof success === 'function' && success(res);
    },
    fail: (res) => {
      setCookie(res);
      typeof fail === 'function' && fail(res);
    }
  })

  function setCookie(res) {  //管理sessionId, 如果返回的header中有Set-Cookie,就设置到本地storage中
    if (!res.header) return;
    let setCookie = res['header']['set-cookie'] || res['header']['Set-Cookie'];
    if (setCookie) {//存在则设置

      Array.isArray(setCookie) && (setCookie = setCookie[0]);
      let curSessionId = setCookie.split(';')[0].replace('sessionId=', '');
      wx.setStorageSync('sessionId', curSessionId);
    }
    
  }

}

function NetUploadFile({ url, filePath, name, formData, success, fail, complete }) {

  var session_id = wx.getStorageSync('sessionId'), header;//本地取存储的sessionID
  if (session_id != "" && session_id != null) {
    header = { 'content-type': 'application/json', 'Cookie': 'sessionId=' + session_id }
  } else {
    header = { 'content-type': 'application/json' }
  }

  //console.log(session_id);
  wx.uploadFile({
    url,
    filePath,
    name,
    header,
    formData,
    success,
    fail,
    complete(res) {  //管理sessionId, 如果返回的header中有Set-Cookie,就设置到本地storage中
      //console.log(res);
      if(!res.header) return;
      let setCookie = res['header']['set-cookie'] || res['header']['Set-Cookie'];
      if (setCookie) {  //存在则设置
        Array.isArray(setCookie) && (setCookie = setCookie[0]);
        let curSessionId = setCookie.split(';')[0].replace('sessionId=', '');
        wx.setStorageSync('sessionId', curSessionId);
      }
      typeof complete === 'function' && complete(res);
    }
  })

}

function showTips(txt='', isBack=false, icon='success'){
  wx.showToast({
    title: txt,
    icon
  });
  isBack && setTimeout(()=>{
    wx.navigateBack({
      delta: 1
    })
  }, 1000);
}

function saveFormId(formId){
  if(!formId || /formId/i.test(formId)) return console.log('请填写正确的formid');
  console.log('发送formid中...');
  NetRequest({
    url: saveFormIdUrl,
    data: {
      formId
    },
    success(res){
      console.log(res);
    }
  });
}

module.exports = {
  formatTime, NetRequest, NetUploadFile, showTips, saveFormId
}