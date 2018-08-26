const { loginUrl, regUrl, getUserBySessionUrl, hostUrl, getSpecialListUrl, staticHostUrl, imgDirUrl, socketHostUrl } = require('./config.js');
const { NetRequest, formatTime } = require('./utils/util.js');
let Login = {
  init(appConText, fn){
    console.log('init');
    let self = this;
    if(fn){
      wx.showLoading({
        title: '重新登录中...',
      });
    }else{
      wx.showLoading({
        title: '登录中...'
      });
    }
    self.appConText = appConText;
    let sessionId = wx.getStorageSync('sessionId');
    //console.log(sessionId);
    if (sessionId){   //是否有sessionid
      NetRequest({
        url: getUserBySessionUrl,
        method: 'POST',
        success(res) {
          //console.log(res);
          let { data, statusCode } = res;
          if (statusCode == 200){ //是否session有效
            wx.hideLoading();
            wx.showToast({
              title: '登录成功'
            });
            !/http/.test(data.avatarUrl) && (data.avatarUrl = staticHostUrl + data.avatarUrl); //如果没有http证明是存储的本地头像
            //data.avatarUrl = hostUrl + data.avatarUrl;
            self.appConText.globalData.userInfo = data;
          }else{  
            self.start();
          }
        },
        fail(res) {
          self.start();
        }
      });
    }else{   //没有sessionId
      self.start();
      //console.log('没有session');
    }

  },

  start(){
    let self = this;
    console.log('开始登陆');
    self.login((err, res={}) => {
      //console.log(err, res);
      let { data, statusCode } = res;
      //console.log(res);
      if (-statusCode === -200) {  //登录成功
        //console.log(data);
        !/http/.test(data.avatarUrl) && (data.avatarUrl = staticHostUrl + data.avatarUrl); //如果没有http证明是存储的本地头像
        //data.avatarUrl = hostUrl + data.avatarUrl;
        self.appConText.globalData.userInfo = data;
        wx.hideLoading();
        wx.showToast({
          title: '登录成功'
        });
      } else {
        console.log('开始注册');
        self.reg((err, res) => {
          wx.hideLoading();
          if (err || !res ||  res.statusCode != 200){  //注册失败
            
            wx.showModal({
              title: '注册失败',
              content: '是否跳转到我的页面,重新注册',
              success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/page/tabBar/mine/index',
                  })
                }
              }
            });         
          }else{
            let { statusCode, data } = res;
            wx.showToast({
              title: '注册成功'
            });
            //data.avatarUrl = hostUrl + data.avatarUrl;
            !/http/.test(data.avatarUrl) && (data.avatarUrl = staticHostUrl + data.avatarUrl); //如果没有http证明是存储的本地头像
            self.appConText.globalData.userInfo = data;
          }
          
          
        });
      }
    });   
  },


  login(fn){
    wx.login({
      success(res){
        //console.log(res);
        NetRequest({
          url: loginUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success(res) {
            //console.log(res);
            typeof fn === 'function' && fn(null, res);
          },
          fail(err){
            console.log(err);
            typeof fn === 'function' && fn(err);
          }
        });
      },
      fail(err){
        console.log(err);
        typeof fn === 'function' && fn(err);
      }
    })
  },

  reg(fn){
    let self = this;
    wx.getUserInfo({
      success(res) {
        let { encryptedData, iv } = res;
        NetRequest({
          url: regUrl,
          method: 'POST',
          data: {
            encryptedData, iv
          },
          success(res) {
            typeof fn === 'function' && fn(null,res);
          },
          fail(err) {
            typeof fn === 'function' && fn(err);
          }
        });
      },
      fail(err){  //获取用户信息失败
        typeof fn === 'function' && fn(err);
      }
    })
     
  }
};




App({
  getRoomPage: function () {
    return this.getPage("pages/mine/page/meet/pages/chat/index")
  },
  getPage: function (pageName) {
    var pages = getCurrentPages()
    return pages.find(function (page) {
      return page.__route__ == pageName
    })
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    let self = this;
    console.log('app onLaunch');
    //var logs = wx.getStorageSync('logs') || [];
    //logs.unshift(Date.now());
    //wx.setStorageSync('logs', logs);
    
    //Login.init(self);
    self.getWeixinUserInfo();


    //wss
    /*this.getUserInfo((userInfo) => {
      if(!userInfo._id) return; 
      wx.connectSocket({
        url: 'wss://vvshow.site/wss?id=' + userInfo._id
      })
      wx.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
      })
      wx.onSocketMessage(function (res) {
        var data;
        try{
          data = JSON.parse(res.data);
        }catch(err){
          data = res.data;
        }
        if(typeof data === 'object'){
          switch(data.type){
            case 'text':{
              var page = self.getRoomPage();
              console.log('app-page-->', page)
              var recTime = formatTime(new Date);
              var msgData = Object.assign(data, { recTime: recTime });
              var chatMsg = wx.getStorageSync(msgData.to + msgData.from) || []
              chatMsg.push(msgData);
              wx.setStorage({
                key: msgData.to + msgData.from,
                data: chatMsg,
                success: function (res) {
                  if(page){  //如果在聊天页
                  console.log(page);
                    page.receiveMsg(msgData);
                  }
                }
              })
            }

          }
        }
        
      });

      wx.onSocketClose(function (res) {
        wx.connectSocket({
          url: 'wss://vvshow.site/wss?id=' + userInfo._id
        })
      });
    });*/

   
    
    
    
  },

  getNetworkType(fn){
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType
        typeof fn === 'function' && fn(null, networkType);
      },
      fail(err){
        typeof fn === 'function' && fn(err);
      }
    })
  },

  getWeixinUserInfo(cb){
    let self = this;
    if (self.globalData.userInfo) {
      typeof cb === 'function' && cb(self.globalData.userInfo);
    } else {
      wx.login({
        success() {
          wx.getUserInfo({
            success(res) {
              //console.log(res);
              self.globalData.userInfo = res.userInfo;
              typeof cb === 'function' && cb(self.globalData.userInfo);
            }
          })
        }
      })
    }
    
  },

  getUserInfo: function (cb) {
    var self = this;
    if (self.globalData.userInfo){
      //console.log(self.globalData.userInfo);
      typeof cb === 'function' && cb(self.globalData.userInfo);
    }else{
      let interval = setInterval(() => {
        if (self.globalData.userInfo){
          clearInterval(interval);
          typeof cb === 'function' && cb(self.globalData.userInfo);
        }
      }, 200);
    }
    
    
  },

  getSpecialList(fn){   //创意工厂列表，针对于spciallist和makespecial
    let self = this;
    console.log('正在获取创意工厂列表');
    if (self.globalData.specialList){   //列表存在
      return typeof fn === 'function' && fn(null, self.globalData.specialList);
    }else{  //未获取过
      NetRequest({
        url: getSpecialListUrl,
        method: 'GET',
        success(res){
          console.log(res);
          let { data, statusCode } = res;
          if (-statusCode === -200){
            data.forEach(item => {
              item.mainImgUrl = imgDirUrl + item.mainImgUrl;
              item.subImgUrl = imgDirUrl + item.subImgUrl;
            });
            self.globalData.specialList = data;
            typeof fn === 'function' && fn(null, self.globalData.specialList);
          }else{
            typeof fn === 'function' && fn(data);
          }
        },
        fail(err){
          typeof fn === 'function' && fn(err);
        }
      });
    }
  },

  getUserInfoAgain(fn){
    let self = this;
    Login.init(self,fn);
  },

  getCode(fn){
    wx.login({
      success(res){
        typeof fn === 'function' && fn(res.code);
      }
    })
  },

  getDevice(){
    let self = this;
    if(self.globalData.device){
      return self.globalData.device;
    }else{
      self.globalData.device = wx.getSystemInfoSync();
      return self.globalData.device;
    }
  },

  globalData: {
    userInfo: null,
    hasNewSpace: false,   //是否有秀场有新通知，主要针对添加心情后，刷新v秀场,刷新后改为false
    specialList: null,
    device: null  //对应着getSystemInfo
  }
})