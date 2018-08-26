//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var constants = require('../../vendor/wafer2-client-sdk/lib/constants');
var config = require('../../config')
var util = require('../../utils/util.js')
wx.setTopBarText({
  text: 'hello, world!'
})
wx.setNavigationBarTitle({
  title: '首页'
})
//获取加速度值
wx.onAccelerometerChange(function (res) {
  console.log(res.x)
  console.log(res.y)
  console.log(res.z)
})
//设置
 /*wx.openSetting({
  success: (res) => {
   
     * res.authSetting = {
     *   "scope.userInfo": true,
     *   "scope.userLocation": true
     * }
     
  }
})*/
//获取罗盘数据

wx.onCompassChange(function (res) {
  console.log(res.direction)
})
//获取手机信息
wx.getSystemInfo({
  success: function (res) {
    console.log(res.brand)
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.statusBarHeight)
    console.log(res.model)
    console.log(res.language)
    console.log(res.version)
    console.log(res.system)
    console.log(res.platform)
    console.log(res.fontSizeSetting)
    console.log(res.SDKVersion)
  }
})
//获取位置
wx.getLocation({
  type: 'wgs84',
  success: function (res) {
    var latitude = res.latitude
    var longitude = res.longitude
    var speed = res.speed
    var accuracy = res.accuracy
    console.log(latitude)
    console.log(longitude)
    console.log(speed)
    console.log(accuracy)
  }
})
//获取网络类型
wx.getNetworkType({
  success: function (res) {
    // 返回网络类型, 有效值：
    // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
    var networkType = res.networkType
    console.log(networkType)
    if (networkType === '2g' || networkType === '3g' || networkType==='4g'){
      wx.showToast({
        title: '您当前处于数据流量模式，请小心使用',
        icon: 'none',
        image: '',
        duration: 3000,
        mask: true
      })
    }else{
      wx.showToast({
        title: '您当前处于WiFi模式，可以放心使用',
        icon: 'none',
        image: '',
        duration: 3000,
        mask: true
      })
    }
  }
})
//监听网络变化
wx.onNetworkStatusChange(function (res) {
  console.log(res.isConnected)
  console.log(res.networkType)
  if(res.isConnected===true){
    if(res.networkType=='wifi'){
      wx.showToast({
        title: '您已切换至WiFi环境',
        icon: 'none',
        image: '',
        duration: 3000,
        mask: true
      })
    }else{
      wx.showToast({
        title: '您已切换至数据流量环境',
        icon: 'none',
        image: '',
        duration: 3000,
        mask: true
      })
    }
  }
})
//剪切板
wx.setClipboardData({
  data: 'data',
  success: function (res) {
    wx.getClipboardData({
      success: function (res) {
        console.log(res.data) // data
      }
    })
  }
})

//用户截屏事件
wx.onUserCaptureScreen(function (res) {
  console.log('用户截屏了')
})
//获取剪切板内容
wx.getClipboardData({
  success: function (res) {
    console.log(res.data)
  }
})
//监听蓝牙适配器状态变化事件
wx.onBluetoothAdapterStateChange(function (res) {
  console.log(`adapterState changed, now is`, res)
})

//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
wx.switchTab({
  url: 'pages/addCgi/addCgi'
})
wx.setNavigationBarColor({
  frontColor:'#ffffff',
  backgroundColor:'#AEEEEE',
  animation:{
    duration:400,
    timingFunc:'easeInOut'
  }
})
wx.showNavigationBarLoading()
setTimeout(function(){wx.hideNavigationBarLoading()},2000)
wx.setTabBarBadge({
  index: 1,
  text: 'new'
})
wx.showTabBarRedDot({index:0})
Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        requestBlue:'',
        searchBlues:true 
    },
   
    // 用户登录示例
    login: function() {
        if (this.data.logged) return

       // util.showBusy('正在登录')
      wx.showToast({
        title: '正在登录中',
        icon:'loading',
        image:'',
        duration:3000,
        mask:true 
      })
        var that = this

        // 调用登录接口
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    that.setData({
                        userInfo: result,
                        logged: true
                    })
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            that.setData({
                                userInfo: result.data.data,
                                logged: true
                            })
                        },

                        fail(error) {
                            util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },


    // 切换是否带有登录态
    switchRequestMode: function (e) {
        this.setData({
            takeSession: e.detail.value
        })
        this.doRequest()
    },
    
    doRequest: function () {
        util.showBusy('请求中...')
        var that = this
        var options = {
            url: config.service.requestUrl,
            login: true,
            success (result) {
                util.showSuccess('请求成功完成')
                console.log('request success', result)
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        }
        if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
            qcloud.request(options)
        } else {    // 使用 wx.request 则不带登录态
            wx.request(options)
        }
    },



    // 切换
    switchBlue: function (e) {    
      console.log(e.detail.value)//true  or false
      if (e.detail.value){
        this.setData({
          searchBlues: false
        })
        this.doBlue()
      }else{
        this.setData({
          searchBlues: true
        })
      }
    },

    doBlue: function () {
      util.showBusy('蓝牙打开请求中...')
      var that = this
      wx.openBluetoothAdapter({
        success: function(res) {
          console.log('blue'+res)
        },
        fail:function(res){
          console.log('error'+res.errMsg)
        }
      })
      wx.getBluetoothAdapterState({
        success: function(res) {
          console.log('blues information'+res.discovering)
          console.log('blue states'+res.available)
        },
        fail:function(res){
          console.log('errorss' + res.errMsg)
        }
      })
      
    },
    // 搜索蓝牙
    switchSearch: function (e) {
      console.log(e.detail.value)//true  or false
      if (e.detail.value) {
        this.searchBlue()
      }else{
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log(res.errMsg)
          }
        })
      }
    },

    searchBlue: function () {
      util.showBusy('蓝牙搜索请求中...')
      var that = this
      // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
      wx.startBluetoothDevicesDiscovery({
        services: ['FEE7'],
        allowDuplicatesKey:false,
        interval:0,
        success: function (res) {
          console.log(res)
        },
        fail:function(res){
          console.log(res.errMsg)
        }
      })

    },



    // iBeacon搜索
    switchBeacon: function (e) {
      console.log(e.detail.value)//true  or false
      if (e.detail.value) {
        this.doBeacon()
      }else{
        wx.stopBeaconDiscovery({
          success:function(res){

          },
          fail:function(res){
           console.log(res.errMsg)
          }
        })
      }
    },

    doBeacon: function () {
      util.showBusy('正在搜索附近的iBeacon商户...')
      var that = this
      wx.startBeaconDiscovery({
        uuids: ['FEE7'],
        success:function(res){
          console.log(res.errMsg)
        },fail:function(res){
          console.log(res.errMsg)
        }
      })
    },
  screenBright:function(){
    wx.setScreenBrightness({
      value: 0.3
    })
  },
  //微信既不数获取
  doRun:function(e){
    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData
        const iv=res.iv
        consolo.log(encryptedData)
        console.log(iv)
        
      }
    })
  },
    // 上传图片接口
    doUpload: function () {
        var that = this
       wx.showLoading({
         title: '加载中哦'
       })
       setTimeout(function(){wx.hideLoading()},2000)
        // 选择图片
        wx.chooseImage({
            count: 9,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var filePath = res.tempFilePaths[0]

                // 上传图片
               var uploads= wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: filePath,
                    name: 'file',

                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        that.setData({
                            imgUrl: res.data.imgUrl
                        })
                    },

                    fail: function(e) {
                        util.showModel('上传图片失败')
                    }
                })
             uploads.onProgressUpdate((res)=>{
               console.log('上传进度',res.progress)
               console.log('已经上传的数据长度',res.totalBytesSent)
               console.log('预期需要上传的数据总长度',res.totalBytesExpectedToSend)
             })
            // uploads.abort()//取消上传任务
             //获取图片信息
             wx.getImageInfo({
               src: filePath,
               success:function(res){
                 console.log(res.width)
                 console.log(res.height)
               }
             })
            //保存图片到系统相册，需要用户授权
            wx.saveImageToPhotosAlbum({
              filePath: '../../images/',
              success(res){
                console.log(res.data)
              }
            })
            },
            fail: function(e) {
                console.error(e)
            }
        })
        //保存文件到本地
        wx.saveFile({
          tempFilePath: filePath,
          success:function(res){
            var savedFilePath=res.savedFilePath
            console.log(savedFilePath)
          }
        })
    },
    //收货地址
    doAddr:function(e){
      var that=this
      wx.chooseAddress({
        success: function (res) {
          console.log(res.userName)
          console.log(res.postalCode)
          console.log(res.provinceName)
          console.log(res.cityName)
          console.log(res.countyName)
          console.log(res.detailInfo)
          console.log(res.nationalCode)
          console.log(res.telNumber)
        }
      })

    },
    //获取发票抬头测试
    doInvo:function(e){
    wx.chooseInvoiceTitle({
      success(res){
    console.log(res.type)
    console.log(res.title)
    console.log(res.taxNumber)
    console.log(res.companyAddress)
    console.log(res.bankAccount)
    console.log(res.bankName)
    console.log(res.telephone)
      },
      fail(res){
    console.log(res.errMsg)
      }
    })
    },
    //增加卡券测试
    doCard:function(e){
      var that=this
      wx.addCard({
        cardList: [{
          cardId:'',
          cardExt:'{"code":"","openid":"","timestamp":"","signature":""}'
        },{
            cardId: '',
            cardExt: '{"code":"","openid":"","timestamp":"","signature":""}'
        }],
        success:function(res){
          console.log(res.cardList)
        }
      })
    },
//扫码测试
  doScan:function(e){
    // 允许从相机和相册扫码
    wx.scanCode({
      success: function(res) {
        console.log(res)
        console.log(res.result)
        console.log(res.scanType)
        console.log(res.charSet)
        console.log(res.path)
      }
    })

    // 只允许从相机扫码
   /* wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })*/

  },
    // 预览图片
    previewImg: function () {
        wx.previewImage({
            current: this.data.imgUrl,
            urls: [this.data.imgUrl],
            success:function(res){
              util.showBusy('预览图片')
              //console.log(this.data.imgUrl+'sdfs')
            }
        })
       
    },
    location:function(e){

      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
          })
        }
      })
    },
    //获取本地保存文件
    doSaveF:function(e){
     var that=this
     wx.getSavedFileList({
       success:function(res){
         console.log(res.fillList)//文件的本地路径
         console.log(res.createTime)//文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         console.log(res.size)//文件大小，单位B
       }
     })
      wx.getSavedFileInfo({
        filePath: 'wxfile://somefile', //仅做示例用，非真正的文件路径
        success: function (res) {
          console.log(res.size)
          console.log(res.createTime)
        }
      })
//
      wx.downloadFile({
        url: 'http://example.com/somefile.pdf',
        success: function (res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    },
    //获取手机联系人
    getPhoneNumber:function(e){
      
    },
    //录音测试
    doVoice:function(){
      var that=this
     const recorderManager=wx.getRecorderManager()
     // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
     wx.getSetting({
       success:function(res){
           consolo.log(res.authSetting)

         if (!res.authSetting['scope.record']) {
           wx.authorize({
             scope: 'scope.record',
             success() {
               // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              
             }
           })
         }
       },
       fail:function(res){
         console.log(res.errMsg)
       }
     })

      recorderManager.onStart((res)=>{
        console.log('recorder start')
      })
      recorderManager.onResume((res)=>{
        console.log('recorder resume')
      })
      recorderManager.onPause((res)=>{
        console.log('recorder pause')
      })
      recorderManager.onStop((res)=>{
        console.log('recorder stop',res)
        const {tempFilePath}=res
      })
      recorderManager.onFrameRecorded((res)=>{
        const {framBuffer}=res
        console.log('frameBuffer.byteLength',framBuffer.byteLength)
      })
      recorderManager.onError((res)=>{
        console.log('录音错误',res)
      })
      const options={
        duration:10000,
        sampleRate:44100,
        numberOfChannels:1,
        encodeBitRate:192000,
        format:'aac',
        frameSize:50
      }
      recorderManager.start(options)
    },
    doModal:function(){
      var that=this
      wx.showModal({
        title: '模态框哦',
        content: '这是一个模态框哦，不知道能不能加输入框之类的',
        showCancel:true,
        cancelText:'取消',
        cancelColor:'#008B8B',
        confirmText:'ok',
        confirmColor:'#00BFFF',
        success:function(res){
          if(res.confirm){
            wx.showToast({
              title: '你点了确定哦',
              icon: 'success',
              image: '',
              duration: 3000,
              mask: true
            })
          }else{
            wx.showToast({
              title: '你点了取消哦',
              icon: 'none',
              image: '',
              duration: 3000,
              mask: true
            })
          }
        }
      })
    },
    doSheet:function(){
      var that=this
      wx.showActionSheet({
        itemList: ['AS','IF','OK','AI'],
        itemColor:'#8B4726',
        success:function(res){
          console.log(res.tapIndex)
        },
        fail:function(res){
          console.log(res.errMsg)
        }
      })
    },
    //背景音频播放测试
    doAudio:function(){
      var that=this
      const backgroundAudioManager=wx.getBackgroundAudioManager()
     /* backgroundAudioManager.title='此时此刻'
      backgroundAudioManager.epname='此时此刻'
      backgroundAudioManager.singer='汪峰'
      backgroundAudioManager.coverImgUrl ='http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'// 设置了 src 之后会自动播放*/
      const options={
        duration: 10000,//当前音频的长度（单位：s），只有在当前有合法的 src 时返回
        currentTime: 1000,//当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
        paused: false,//当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',//音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav
        startTime: 0,//音频开始播放的位置（单位：s）
        buffered: 1,//音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。
        title: '此时此刻',//	音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
        epname: '此时此刻',//专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
        singer: '汪峰',//歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',//封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图
        webUrl: ''//页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
      }
      backgroundAudioManager.onCanplay((res)=>{
        console.log('背景音频进入可以播放状态，但不保证后面可以流畅播放',res)
      })
      backgroundAudioManager.onPlay((res)=>{
        console.log('正在播放音频',res)
      })
      backgroundAudioManager.onPause((res)=>{
        console.log('音频暂停',res)
      })
      backgroundAudioManager.onStop((res)=>{
        console.log('音频停止',res)
      })
      backgroundAudioManager.onEnded((res)=>{
        console.log('音频自然播放结束',res)
      })
      backgroundAudioManager.onTimeUpdate((res)=>{
        console.log('音频播放进度更新事件',res)
      })
      backgroundAudioManager.onPrev((res)=>{
        console.log('用户在系统音乐播放面板点击上一曲事件（iOS only）',res)
      })
      backgroundAudioManager.onNext((res)=>{
        console.log('用户在系统音乐播放面板点击下一曲事件（iOS only）',res)
      })
      backgroundAudioManager.onError((res)=>{
        console.log('音频播放错误',res)
      })
      backgroundAudioManager.onWaiting((res)=>{
        console.log('音频加载中，当音频因为数据不足，需要停下来加载时会触发',res)
      })
    },

     //下载测试
    doDownload:function(){
       var that=this
       var downloads=wx.downloadFile({
         url:`https://864926360.cybil.club`,
         success:function(res){
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if(res.statusCode===200){
            wx.playVoice({
              filePath: res.tempFilePath
            })
          }
         }
       })
     downloads.onProgressUpdate((res)=>{
       console.log('下载进度',res.progress)
       console.log('已经下载的数据长度',res.totalBytesWritten)
       console.log('预期需要下载的数据总长度',res.totalBytesExpectedToWrite)
     })

     downloads.abort()//取消下载任务
     },
     //socket测试
     doSocket:function(){
       var that=this
       var socketOpen=false
       var socketMsgQueue=[]
       wx.connectSocket({
         url:`wss://6zo1vk1v.ws.qcloud.la`,
         data:{
           x:"",
           y:""
         },
         header:{
           'content-type':'application/json'
         },
         protocols:['protocols'],
         method:"GET"
       })
       //注意这里有时序问题，
//如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
//必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭
       wx.onSocketOpen(function(res){
         console.log('websocket连接已断开')
         socketOpen=true
         for (var i=0;i<socketMsgQueue.length;i++){
           sendSocketMessage(socketMsgQueue[i])
         }
         socketMsgQueue=[]
        // wx.closeSocket()
       })
       wx.onSocketClose(function(res){
         console.log('websocket已关闭')
       })
       wx.onSocketError(function(res){
         console.log('websocket连接打开失败，请检查')
       })
       //通过Websocket连接发送数据
       function sendSocketMessage(msg){
         if(socketOpen)
         {
           wx.sendSocketMessage({
             data: msg
           })
         }else{
           socketMsgQueue.push(msg)
         }
       }
       wx.onSocketMessage(function(res){
         console.log('收到的服务器内容：',res.data)
         wx.closeSocket()
       })
     },
    
    // 切换信道的按钮
    switchChange: function (e) {
        var checked = e.detail.value

        if (checked) {
            this.openTunnel()
        } else {
            this.closeTunnel()
        }
    },

    openTunnel: function () {
        util.showBusy('信道连接中...')
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
            util.showSuccess('信道已连接')
            console.log('WebSocket 信道已连接')
            this.setData({ tunnelStatus: 'connected' })
        })

        tunnel.on('close', () => {
            util.showSuccess('信道已断开')
            console.log('WebSocket 信道已断开')
            this.setData({ tunnelStatus: 'closed' })
        })

        tunnel.on('reconnecting', () => {
            console.log('WebSocket 信道正在重连...')
            util.showBusy('正在重连')
        })

        tunnel.on('reconnect', () => {
            console.log('WebSocket 信道重连成功')
            util.showSuccess('重连成功')
        })

        tunnel.on('error', error => {
            util.showModel('信道发生错误', error)
            console.error('信道发生错误：', error)
        })

        // 监听自定义消息（服务器进行推送）
        tunnel.on('speak', speak => {
            util.showModel('信道消息', speak)
            console.log('收到说话消息：', speak)
        })

        // 打开信道
        tunnel.open()

        this.setData({ tunnelStatus: 'connecting' })
    },

    /**
     * 点击「发送消息」按钮，测试使用信道发送消息
     */
    sendMessage() {
        if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (this.tunnel && this.tunnel.isActive()) {
            // 使用信道给服务器推送「speak」消息
            this.tunnel.emit('speak', {
                'word': 'I say something at ' + new Date(),
            });
        }
    },

    /**
     * 点击「关闭信道」按钮，关闭已经打开的信道
     */
    closeTunnel() {
        if (this.tunnel) {
            this.tunnel.close();
        }
        util.showBusy('信道连接中...')
        this.setData({ tunnelStatus: 'closed' })
    },
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function () {
    wx.hideTabBarRedDot({index:0})
    },
    onTabItemTap(item) {
      console.log('点击',item.index)
      console.log(item.pagePath)
      console.log(item.text)
    },
    doNav:function(){
      var that=this
      //关闭当前页面，跳转到应用内的某个页面
     /* wx.redirectTo({
        url: './video?id=4'
      })*/
      //关闭所有页面，打开到应用内的某个页面
     /* wx.reLaunch({
        url: './video?id=3'
      })*/
      //
    }
})
