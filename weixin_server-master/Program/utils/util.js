//引入基本配置文件
import config from "./config"
const u_id = config.u_id

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

const isServerRe = data => {
  var inval = null
  try{
    inval = data.error_code
  }catch(e){
  }
  if(inval){
    return true;
  }
  return false;
}

const encrypt = (data,callback,session_key_up="no") =>{

  var app = getApp();
  var session_key = wx.getStorageSync("session_key")
  var formData = {
      encryptedData:data.encryptedData,
      iv: data.iv,
      u_id,
      debug:true,
      session_key :session_key
  }
  if(session_key_up)formData["session_key_up"]=true;
  wx.request({
    url: config.encrypt,
    data: formData,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //请求失败时会带有error_code
      try{
        res = JSON.parse(res.data)
      }catch(e){
        res = res.data
      }
      if(isServerRe(res)){
        userLogin(()=>{
          console.log("重新登陆.")
          encrypt(data,callback,"yes");
        },"yes");
      }else{
          if(callback){
            callback(res);
          }
      }
    }
  })
}

//登陆失败时执行
const userLogin = (callback,session_key_up="no")=>{
  wx.login({
    success: login_res => {
      wx.request({
        url: config.get_session_key,
        data: {
          u_id,
          code :login_res.code,
          session_key_up,
          debug:true
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //成功后再解用户ID.
          //UserInfo
          console.log(res.data)
          wx.setStorageSync("session_key",res.data.session_key);

          if(callback){
            callback(res);
          }
        }
      })
    },
    fail: err =>{
    }
  })
}

const getInit = (dataFrom,callback)=>{
  console.log(dataFrom)
  dataFrom["u_id"] = u_id;
  wx.request({
    url: config.getInit,
    data: dataFrom,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //请求失败时会带有error_code
      if(callback){
        callback(res);
      }
    }
  })
}

const getGroup = (res,callback,IsGetList)=>{
  var app = getApp();

  var formData = {
    u_id,
    uid:app.globalData.uid,
    openGId:res.openGId,
    up:"no"
  }
  if(IsGetList){
    formData["up"] = "yes";
  }
  wx.request({
    url: config.getGroup,
    data: formData,
    header: {
      'content-type': 'application/json' // 默认值
    }, 
    success: function (res) {
      //请求失败时会带有error_code
      try{
        res = JSON.parse(res.data)
      }catch(e){
        res = res.data
      }
      if(callback){
        callback(res);
      }
    }
  })
}

/*根据uid读取全部数据*/
const getLikes = (uid=null,callback) => {
  var app = getApp();
  if(!uid)uid=app.globalData.uid;
  var formData = {
    u_id,
    debug:true,
    uid:uid
  }
  wx.request({
    url: config.getLikes,
    data: formData,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //请求失败时会带有error_code
      try{
        res = JSON.parse(res.data)
      }catch(e){
        res = res.data
      }
      if(callback){
        callback(res);
      }
    }
  })

}

const getGroupDetail = (gid,callback) =>{

    var app = getApp();
    console.log(app.globalData)
    var formData = {
      uid:app.globalData.uid,
      gid
    }

  wx.request({
    url: config.getGroupDetail,
    data: formData,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //请求失败时会带有error_code
      try{
        res = JSON.parse(res.data)
      }catch(e){
        res = res.data
      }
      if(callback){
        callback(res);
      }
    }
  })
}


const onShare = function(){
  wx.showShareMenu({
    withShareTicket: true
  })
}



const share = function (res,callback,IsGetList=false){
    var app = getApp()
    if (res.shareTickets) {
      app.globalData.testinfo = app.globalData.testinfo+"\nshareTickets开始解密 "
      // 获取转发详细信息
      wx.getShareInfo(
        {
        shareTicket: res.shareTickets[0],
        success(res) {
            //此处需要修改.
            encrypt(res,(result)=>{
                console.log("encrypt",result)
                getGroup(result,r=>{
                  if(callback){
                    callback(r);
                  }
                  console.log(r)
                },IsGetList);
            })
          },
        fail() {

          if(callback)callback(false)
        },
        complete() { }
      });
    }else{
      app.globalData.testinfo = app.globalData.testinfo+"\nshareTickets缺失"
    }
}

const getSessionKey = function(code){

  wx.request({
    url: config.getLikes,
    data: formData,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //请求失败时会带有error_code
      try{
        res = JSON.parse(res.data)
      }catch(e){
        res = res.data
      }
      if(callback){
        callback(res);
      }
    }
  })

}

module.exports = {
  formatTime: formatTime,
  userLogin,
  encrypt,
  getGroup,
  getLikes,
  getGroupDetail,
  share,
  onShare,
  getInit
}
