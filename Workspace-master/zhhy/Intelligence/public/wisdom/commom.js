function GetRequest() {
  var url = location.href; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.lastIndexOf("?") != -1) {
    var str = url.substr(url.lastIndexOf("?") + 1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
function GetCode() {
  var url = location.href; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(url.indexOf("?") + 1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
function isFn(fn){
  return fn !== null && typeof fn === 'function'
}

var commom = {}
;(function(){
  var ss = this
  this.getDataList = function(cmd, param, callback){
    var param = param, self = this
    $.ajax({
      url: config.apiURL + 'ysh/getSesskey',
      type: 'POST',
      success: function(ret){
        if(ret && ret.status === 0){
          param.sesskey = ret.aaData[0].sesskey
          $.ajax({
            url: config.apiURL + cmd,
            type: 'POST',
            data: param,
            success: function(d){
              if(d && d.status === 0 && callback && typeof callback === 'function'){
                callback(d)
              }
            },
            error: function(d){
              self.msg('网络出错')
              self.msg(cmd)
            }
          })
        }
      },
      error: function(d){        
        self.msg('网络出错')
        self.msg(cmd)
      }
    })
  }
  this.setmiddle = function(els){
    for(var i = 0, l = els.length; i < l; i++){
      els[i].each(function(index, el) {
        var ph = $(el).parent().height()
        $(el).height(ph)
        $(el).css('line-height', ph + 'px') 
      })          
    } 
  }
  this.completeUploadPicURL = function(itemList, itemurl){
    for(var i = 0, l = itemList.length; i < l; i++){
      if(!itemList[i][itemurl]){
        itemList[i][itemurl] = ysh_config.loadingPicURL
      }else if(itemList[i][itemurl].indexOf(ysh_config.uploadPicURL) == -1){
        itemList[i][itemurl] = ysh_config.uploadPicURL + itemList[i][itemurl]
      }
    } 
  }
  this.mobileCheck = function(tel){
    var isPhone = /^1[3|4|5|7|8][0-9]{9}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    tel = tel.trim();
    if (isPhone.test(tel) || isMob.test(tel)) {
      return true;
    } else {
      return false;
    }
  }
  this.msg = function(str){
    layer.open({
      className: 'layer-msg',
      content: str,
      shade: false, 
      time: 2
    })
  }
  this.getCode = function(){
    var winlocation = encodeURIComponent(window.location.href)
    window.location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?"
                         + "appid=" + config.appID + "&"
                         + "redirect_uri=" + winlocation
                         + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
  }  
  this.appShow = function() {
    var END_TIME = new Date().getTime() //结束时间
    var diffTime = END_TIME - PAGE_START_TIME 
    document.querySelector('.app-loading').className += ' app-loading-hide'
  }
  this.passPort = function(vm, callback) {
    var self = this
    if(vm.$store.state.openID.length <= 0){
      var code = GetCode().code
      if(code){
        $.ajax({
          type:"GET",
          url:config.getOpenIDURL + code,
          async: false,
          success:function(d){
            if(d.aaData && d.aaData.openid){
              var openid = d.aaData.openid
              window.localStorage.setItem('zhhy_openid', openid)
              vm.$store.commit('storeOpenID', openid)
              self.getUserRoleByOpenID(vm, openid, callback)
            }else{
              self.msg('网络出错')
            }
          },
          error:function(error){
            console.log(error)
          }                  
        })     
      }else{
        commom.getCode()
      }
    }else{
      self.getUserRoleByOpenID(vm, vm.$store.state.openID, callback)
    }
  }
  this.getUserByOpenID = function(vm, openid, callback) {
    var self = this
    self.getDataList('ysh/GetUserIdByOpenId', {Openid: openid}, function(d){
      if(d.aaData &&　d.aaData.length > 0){
        vm.$store.commit('storeUserID', d.aaData[0].Id)
        if(isFn(callback)) callback()
      }else{
        self.msg('网络出错')
      }      
    }) 
  }
  this.getUserRoleByOpenID = function(vm, openid, callback) {
    var self = this
    $.ajax({
      url: config.apiURL + 'userrole',
      type: 'POST',
      data: {openid: openid},
      success: function(d){
        if(d.aaData){
          vm.$store.commit('storeUserRole', d.aaData.value)
          self.getUserByOpenID(vm, vm.$store.state.openID, callback)
        }else{
          self.msg('网络出错')
        }        
      }
    })
  }
  this.showQR = function(url){
    // 设置参数方式
    var qrcode = new QRCode('qrcode', {
      width: Math.floor(window.innerWidth/2),
      height: Math.floor(window.innerWidth/2)
    })
    // 使用 API
    qrcode.clear()
    qrcode.makeCode(url)
    $("#mask").addClass('active')
    $('#mask .qrcode').addClass('active')
  }
  this.closeQR = function(){
    $("#mask").removeClass('active')
    $('#mask .qrcode').removeClass('active')
    $("#qrcode").html('')
  }
  this.passPort2 = function(callback){
    var openID = window.localStorage.getItem('zhhy_openid') || '',
        self = this
    if(openID.length > 0){
      self.getUserRole(openID, callback)
    }else{
      var code = GetCode().code
      if(code){
        $.ajax({
          type:"GET",
          url:config.getOpenIDURL + code,
          async: false,
          success:function(d){
            if(d.aaData && d.aaData.openid){
              var openid = d.aaData.openid
              window.localStorage.setItem('zhhy_openid', openid)
              self.getUserRole(openid, callback)
            }else{
              self.msg('网络出错')
            }
          },
          error:function(error){
            self.msg('网络出错')
          }                  
        })     
      }else{
        self.getCode()
      }
    }
  }
  this.getUserRole = function(openid, callback){
    var self = this
    $.ajax({
      url: config.apiURL + 'userrole',
      type: 'POST',
      data: {openid: openid},
      success: function(d){
        if(d.aaData){
          window.localStorage.setItem('zhhy_user_role', d.aaData.value)
          self.getUserID(openid, callback)
        }else{
          self.msg('网络出错')
        }        
      }
    })
  }
  this.getUserID = function(openid, callback){
    var self = this
    self.getDataList('ysh/GetUserIdByOpenId', {Openid: openid}, function(d){
      if(d.aaData &&　d.aaData.length > 0){
        window.localStorage.setItem('zhhy_user_id', d.aaData[0].Id)
        if(isFn(callback)) callback()
      }else{
        self.msg('网络出错')
      }      
    })
  }
}).apply(commom)
