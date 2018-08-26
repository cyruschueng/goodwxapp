//app.js

App({
  cache: {},
  _user:{
    //微信数据
    wx:{},
    //游客数据
    we:{},
  },
  _server: 'https://smallapp.dragontrail.cn',
  _appid: 'banfu123',

  onLaunch: function () {
    var that=this
    try{
      var data=wx.getStorageInfoSync()
      if(data && data.keys.length){
        data.keys.forEach(function(key){
          var value=wx.getStorageSync(key)
          if(value){
            that.cache[key]=value
          }
        })
      }
    }catch(e){
      console.log('获取缓存失败')
    }
  },

  //保存缓存
  saveCache:function(key,value){
    if(!key || !value){return;}
    var that=this
    that.cache[key]=value
    wx.setStorage({
      key: key,
      data: value,
    })
  },

  //清除缓存
  removeCache:function(key){
    if(!key){return;}
    var that=this
    that.cache[key]=''
    wx.removeStorage({
      key: key,
    });
  },

  //getUser函数，在index中调用
  getUser:function(response){
    var that=this
    wx.showNavigationBarLoading()
    wx.login({
      success:function(res){
        if(res.code){
          console.log(res.code)
          that.getUserInfo(function(info){
            that.saveCache('userinfo',info)
            that._user.wx=info.userinfo
            if(!info.encryptedData || !info.iv){
              that.g_status = '无关联AppID'
              typeof response == "function" && response(_this.g_status)
              return
            }

            //发送code与微信用户信息，获取游客数据
            wx.request({
              method:'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              url:that._server+'/login/userkey?jscode='+res.code,
              data:{
                 code:res.code
               },
              success:function(res){
                console.log(res)
                if (res.data && res.statusCode >= 200 && res.statusCode < 400){
                  var status=false
                  //注意：到时看看那边传来的是啥，不一定叫data
                  var data=res.data.data
                  //判断缓存是否更新
                  if(that.cache.userdata != data){
                    that.saveCache('userdata',data)
                    status=true
                  }
                  //如果缓存有更新，则执行回调函数
                  if(status){
                    typeof response == "function" && response();
                  }
                }else{
                  //清除缓存
                  if(that.cache){
                    that.cache={}
                    wx.clearStorage()
                  }
                  typeof response == "function" && response(res.data.message || '加载失败')
                }
              },
              fail:function(res){
                var status='网络错误'
                that.g_status=status
                typeof response == "function" && response(status);
                console.warn(status);
              },
              complete:function(){
                wx.hideNavigationBarLoading();
              }
            })
            
          })
        }
      }
    })
  },


  getUserInfo:function(cb){
    var that=this
    //获取微信用户信息
    wx.getUserInfo({
      success:function(res){
        typeof cb == "function" && cb(res)
      },
      fail:function(res){
        that.showErrorModal('获取微信用户信息失败!','登录失败')
        that.g_status = '未授权'
      }
    })
  },

})