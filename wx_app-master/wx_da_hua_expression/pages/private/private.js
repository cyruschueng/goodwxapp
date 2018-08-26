// private.js
var Api = require('../../utils/api.js');
// var View = require('../../utils/view.js');
var Menu = require('../../utils/menu.js');
var Render = require('../../utils/render.js');
var Key = require('../../utils/storage_key.js');

var APP = getApp()
var GLOBAL_PAGE
var appInstance
var i = 0
Page({
  data: {
    pageName: "private",
    loginStatus:true,
    //loading框
    loadShow: true,
    
    //显示控制
    isUpload:false,
    selectCategoryShow:false,
    joinShow:false, //显示拼接框

    // 上传图片数量
    uploadNum:{count:9,finish:0},

    // category scroll-view的宽度
    categoryScrollWidth : 10,

    //join数据
    joinImg:{
      step:1,
      status:1, // 1 准备状态 2 用户已操作 3 正在上传 
      first:"http://image.12xiong.top/wx_app/join1.gif",
      seconde:"http://image.12xiong.top/wx_app/join2.gif",
      resualt:"http://image.12xiong.top/wx_app/resualt.gif",
    },

    //video 控制
    startTime:0,
    durationTime:6,

    // 控制菜单上架
    MENU_TYPE:Render.menu.TYPE,
    menuType:"0",
    menuWidth:0,
    menuHeight:0,
    
    // 手机设备信息，均已rpx为标准
    windowWidth:0,
    windowHeight:0,
    joinHeight:0,

    //页面渲染数据
    emoticon:[],
    category:[],

    //touch选择对象
    selectEmoticon:{id:"",name:"",img_url:"",size:""}, //预备编辑的图片
    // selectCategory:{category_id:null,name:""}, // 
    selectCategory:{category_id:-1,name:""},
    

    //临时表情
    temp:{
        show:false, 
        log:[]  ,
        // show:true,   
        // num:0,
        emoticon:[], //临时表情列表  
        // emoticon:["http://image.12xiong.top/12_20161226084253.gif","http://image.12xiong.top/12_20161226084253.gif",], //临时表情列表  
    },
    
    //右上角重新登录锁
    lockReLogin:false,
  },

  /**2 选择指定目录 */
  selectCategory:function(e){
    var c_id = e.currentTarget.dataset.select_category_id
    if (c_id == "") c_id = null  //c_id为空，全选
    GLOBAL_PAGE.setData({
      selectCategory:{ //改变目录
        category_id:c_id
      },
    })
    //根据emoticone，更新表情
    GLOBAL_PAGE.renderEmoticon()
  },


/** 3 表情滚动条
     * 1、传入该分类的总张数
     * 2、设置已获取张渚
     * 3、设置准备获取数量
     * 4、当准备获取量为0，提示"图片加载完毕"
     *  */
  emoticonScrollTolower:function(){
    console.log("scrollTolower")
  },

  //上传大类 4-1
  btnUpload:function() {
     wx.showActionSheet({
      // itemList: ['图片', '小视频'],
      itemList: ['图片', '添加目录','同步数据'],
      // itemList: ['图片'],
      success: function(res) {
        if (!res.cancel) {
          if(res.tapIndex == 0 || res.tapIndex =='0')
            GLOBAL_PAGE.uploadQiniuImage()
          if(res.tapIndex == 1 || res.tapIndex =='1')
            GLOBAL_PAGE.navigateToCategory()
            // GLOBAL_PAGE.uploadQiniuVideo()            
          if(res.tapIndex == 2 || res.tapIndex =='2')
            GLOBAL_PAGE.reLogin()
        }
      }
    })
  },

  previewUpload:function(){
       wx.chooseImage({
            count: 9, 
            sizeType: ['compressed'], 
            success: function(res) {
                var tempFilePath = res.tempFilePaths[0] //图片            
                // GLOBAL_PAGE.uploadFile(tempFilePath)
                console.log( res.tempFilePaths)
                wx.previewImage({
                    current: tempFilePath,
                    urls: res.tempFilePaths
                })
            },
            fail:function(res){
            console.log(res)
            }
      })
  },

//正在上传 4-2
  btnIsUpload:function() {
    wx.showToast({
        title: '正在执行上传任务，请稍等',
        icon: 'loading',
        duration: 700
    })
  },
  //传图片 4-3
  uploadQiniuImage:function(){
      wx.chooseImage({
        count: 9, 
        sizeType: ['compressed'], 
        success: function(res) {
            GLOBAL_PAGE.uploadPrepare(1,res.tempFilePaths)
            var tempFilePath = res.tempFilePaths[0] //图片 
            console.log( res.tempFilePaths)           
            GLOBAL_PAGE.uploadFile(tempFilePath)
        },
        fail:function(res){
          console.log(res)
        }
      })
  },
  //传视频 4-4
  uploadQiniuVideo:function(){
      wx.chooseVideo({
        sourceType: ['album','camera'],
        maxDuration: 60,
        camera: ['front','back'],
        success: function(res) {
            GLOBAL_PAGE.uploadPrepare(2,res.tempFilePath)
            var tempFilePath = res.tempFilePath //小视频
            GLOBAL_PAGE.uploadFile(tempFilePath)
        },
        fail:function(res){
          console.log(res)
        }
      })
  },

  //上传预处理 4-5
  uploadPrepare:function(method,path){
    var _method = method
    var _path = path
    var _count
    if (_method == 1) // 上传图片
        _count = _path.length
    if (_method == 2) // 上传视频 
    {
        _count = 1
        _path = [_path] //视频、图片地址，均按数组传递
    }
    //  if(_count <= 0)  console.log("上传数量出错")  
     GLOBAL_PAGE.setData({
        isUpload:true,//设置上传状态
        uploadNum:{
          path:_path,
          count:_count,//设置上传数量 
          finish:0
        }
      })
  },
  //上传完成 4-6
  uploadCompelte:function(){
      var _uploadNum = GLOBAL_PAGE.data.uploadNum
      var _count = _uploadNum.count
      var _finish = _uploadNum.finish
      _finish++ 
      _uploadNum.finish = _finish
      GLOBAL_PAGE.setData({
        uploadNum:_uploadNum
      })
      console.log(_count,_finish)
      if(_count == _finish)
      {
        GLOBAL_PAGE.setData({isUpload:false})
        wx.showToast({
            title: '上传完成',
            icon: 'success',
            duration: 700
        })
      }
      else
      {
          console.log( GLOBAL_PAGE.data.uploadNum)
          GLOBAL_PAGE.uploadFile( GLOBAL_PAGE.data.uploadNum.path[_finish])
      }
        
        //todo 上传函数
  },
  //正式上传 4-7
  uploadFile:function(file_path){
      var _type = file_path.split(".").pop()
      console.log(file_path)

      //全选的时候catId == null，选择默认目录的id存放
      //不改变当前selectCat的id，上传后就不会跳转
      var selectCategory = GLOBAL_PAGE.data.selectCategory
      var _tempCatId = null
      if (selectCategory.category_id == null)
      {
          var category = GLOBAL_PAGE.data.category
          for(var i=0;i<category.length;i++)
              if(category[i].is_default == 1) 
              {
                  _tempCatId = category[i].category_id
                  break
              }
      }
      else
        var _tempCatId = selectCategory.category_id 
          
      wx.request({
          url: Api.uploadToken(), 
          data:{
            'session': wx.getStorageSync(Key.session),
            "type":_type,
            "category_id":_tempCatId ,
          },
          success: function(res){
              var data = res.data
              console.log(data)
              if(data.status == "true")
              {
                  wx.uploadFile({
                      url: 'https://up.qbox.me',
                      // filePath: tempFilePaths[0],//图片
                      filePath: file_path,//小视频
                      name: 'file',
                      formData:{
                        'key': data.key,
                        'token': data.token,
                      },
                      success: function(res){
                        console.log("上传成功")
                        var data = JSON.parse(res.data);
                        console.log(data)
                        if(data.status == "true")
                        {
                          var e = wx.getStorageSync(Key.emoticon)
                          e.splice(0, 0, data.img); //从第一位插入
                          // e.push(data.img)
                          wx.setStorageSync(Key.emoticon,e)
                          GLOBAL_PAGE.renderEmoticon()

                          GLOBAL_PAGE.uploadCompelte()//上传成功，继续上传
                        } 
                        else{
                            wx.showModal({
                              title: '网络连接失败，请重试',
                              showCancel:false,
                            })
                            GLOBAL_PAGE.setData({isUpload:false})
                        }    
                      },
                      fail (error) {
                        console.log(error)
                        wx.showModal({
                          title: '网络连接失败，请重试',
                          showCancel:false,
                        })
                        GLOBAL_PAGE.setData({isUpload:false})
                      },
                      complete (res) {
                        console.log(res)
                        
                      }
                  })
              }
              else{
                wx.showModal({
                  title: '网络连接失败，请重试',
                  showCancel:false,
                })
                GLOBAL_PAGE.setData({isUpload:false})
              }              
          },
          fail:function(res){
              wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
              })
              GLOBAL_PAGE.setData({isUpload:false})
          },
          complete:function(res) { 
              // GLOBAL_PAGE.setData({isUpload:false})
          },
      })
  },

  /** 5 菜单-分享 */
  menuShare:function(e){
    // Menu.Option.Share( GLOBAL_PAGE.data.selectEmoticon )

      // var current = GLOBAL_PAGE.data.selectEmoticon.yun_url
      var current = e.currentTarget.dataset.yun_url
      var urls = []
      var e = GLOBAL_PAGE.data.emoticon
      for ( var i = 0;i<e.length;i++)
      {
        if( e[i].menu_type == GLOBAL_PAGE.data.MENU_TYPE.VIDEO)
            continue
        urls.push(e[i].yun_url)
      }

      if( wx.getStorageSync('is_share_info') == "")
      {
          wx.showModal({
              title: '保存提示',
              content:'点击右上角"⋮"，可保存图片',
              showCancel:false,
              confirmText:"继续预览",
              success: function(res) {
                  Render.share(current,urls)
                  wx.setStorageSync('is_share_info',true)
              }
          }) 
      }
      else{
          Render.share(current,urls)
      }
  },

  /** 7 菜单-删除 */
  menuDelete:function(){
    var url = Api.imgDelete() 
    wx.showModal({
        title: '是否删除表情',
        content: ' ',
        success: function(res) {
            if (res.confirm) {
                wx.request({
                    url: Api.imgDelete() , 
                    method:"GET",
                    data: {
                      session: wx.getStorageSync(Key.session),
                      img_id: GLOBAL_PAGE.data.selectEmoticon.img_id,
                      category_id:GLOBAL_PAGE.data.selectEmoticon.category_id,
                    },
                    success: function(res) {
                        var object = res.data
                        if (object.status == "true")
                        {
                           //删除成功，去掉数组元素
                            var img_id = parseInt(object.img_id)
                            var category_id = parseInt(object.category_id)
                            var e = wx.getStorageSync(Key.emoticon)
                            for ( var i=0;i<e.length;i++)
                            {
                              if ( e[i].img_id == img_id && e[i].category_id == category_id )
                              {
                                  e.splice(i,1)
                                  break
                              }
                            }
                          
                            //更新emotion
                            wx.setStorageSync(Key.emoticon,e)
                            GLOBAL_PAGE.renderEmoticon()

                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 700
                            })
                            GLOBAL_PAGE.setData({menuType:0})
                        }
                        else{
                          wx.showModal({
                            title: '网络连接失败，请重试',
                            showCancel:false,
                          })
                        }
                    },
                    fail:function(res){
                        wx.showModal({
                          title: '网络连接失败，请重试',
                          showCancel:false,
                        })
                    },
                })
            }
        },
        complete:function(res) { 
          
        }
    })
    //删除后，menu框隐藏
  },

   /** 8 菜单-分组 */
  menuMoveCategory:function(){
    var list = []
    for (var i=0;i<GLOBAL_PAGE.data.category.length;i++)
      list.push(GLOBAL_PAGE.data.category[i].name)

    if (list.length ==  1) //只有1个组，提示增加分组
    {
        wx.showModal({
          title: '请按右下角 + ,添加目录',
          showCancel:false,
        })
        return 
    }

    if (list.length <= 6 )
    {
        //竖排列表选取
        wx.showActionSheet({
          itemList: list,
          success: function(res) {
            if (!res.cancel) {
              console.log(res.tapIndex)
              var a = GLOBAL_PAGE.data.category[res.tapIndex] 
              GLOBAL_PAGE.moveCategory(res.tapIndex)
            }
          }
        })
    }
    else{
      GLOBAL_PAGE.setData({selectCategoryShow:true}) 
    }
   
  },
  // 8.1 点击空白处关闭
  closeMove:function(){
    GLOBAL_PAGE.setData({selectCategoryShow:false}) 
  },
  // 8.2 确认移动
  buttonMove:function(e){
    var index = parseInt( e.currentTarget.dataset.index )
    GLOBAL_PAGE.moveCategory(index)
    GLOBAL_PAGE.setData({selectCategoryShow:false}) 
  },
  // 8.3
  moveCategory:function(tapIndex){
    //移动表情
          wx.request({
              url: Api.imgMove() , 
              method:"GET",
              data: {
                session: wx.getStorageSync(Key.session),
                img_id: GLOBAL_PAGE.data.selectEmoticon.img_id,
                old_category_id:GLOBAL_PAGE.data.selectEmoticon.category_id,
                new_category_id: GLOBAL_PAGE.data.category[tapIndex].category_id,
              },
              success: function(res) {
                var object = res.data
                if (object.status == "true")
                {
                  var img_id = parseInt(object.img_id)
                  var category_id = parseInt(object.category_id)
                  var e = wx.getStorageSync(Key.emoticon)
                  for ( var i=0;i<e.length;i++)
                  {
                    if ( e[i].img_id == img_id )
                      e[i].category_id = category_id
                  }

                  //更新emotion
                  wx.setStorageSync(Key.emoticon,e)
                  GLOBAL_PAGE.renderEmoticon()

                   wx.showToast({
                      title: '修改分组成功',
                      icon: 'success',
                      duration: 700
                  })
                }
                else{
                  wx.showModal({
                    title: '图片已在该目录',
                    showCancel:false,
                  })
                }
               
              },
              fail:function(res){
                  wx.showModal({
                    title: '网络连接失败，请重试',
                    showCancel:false,
                  })
              },
            })
  },


  /** 9 join 拼接 */
  showJoinTab:function(){
      GLOBAL_PAGE.setData({joinShow:true,joinHeight:164})
  },
  joinCancel:function(){
      GLOBAL_PAGE.setData({joinShow:false,joinHeight:0})
  },
  //拼接3幅图预览
  joinPreview:function(e){
      wx.previewImage({
        current: e.currentTarget.dataset.img_url, // 当前显示图片的http链接
        urls: [
          GLOBAL_PAGE.data.joinImg.first,
          GLOBAL_PAGE.data.joinImg.seconde,
          GLOBAL_PAGE.data.joinImg.resualt,
        ] // 需要预览的图片http链接列表
      })
  },
   
  //10 设置join的的1，2幅图片
  joinSet:function(action,yun_url){
      // var action  = e.currentTarget.dataset.action
      var action  = action
      var joinImg = GLOBAL_PAGE.data.joinImg 
      var select = GLOBAL_PAGE.data.selectEmoticon 
      if(yun_url)
        select = {yun_url:yun_url}


      if (joinImg.status == 1)
          joinImg.status = 2
      if (action == "1"){
          if ( select.yun_url == joinImg.seconde)
              change()
          else
              joinImg.first = select.yun_url  //joinImg.first = select.img_url
      }
          
      if (action == "2") 
          if ( select.yun_url == joinImg.first)
              change()
          else
              joinImg.seconde = select.yun_url //joinImg.first = select.img_url
      
      GLOBAL_PAGE.setData({joinImg:joinImg})

      //交换图片1和2的位置
      function change(){
          var temp = joinImg.first
          joinImg.first = joinImg.seconde
          joinImg.seconde = temp
      }

      if( wx.getStorageSync('is_joinset_info') == "")
      {
          wx.showModal({
              title: '拼接提示',
              content:'点击“拼接”，获取新GIF表情',
              showCancel:false,
              confirmText:"知道了",
              success: function(res) {
                  wx.setStorageSync('is_joinset_info',true)
              }
          }) 
      }
  },

  //join按钮
  // 1 正在上中,return
  // 2 status == 1 ，请增加图片
  // 3 重复点击，提示图片加载成功，
  // 4 增加新图片，上传完成，提示成功；失败，提示网络失败
  joinConfirm:function(){
      //1 正上传
      if(GLOBAL_PAGE.data.isUpload == true)
      {
          wx.showToast({
              title: '正在执行上传任务，请稍等',
              icon: 'loading',
              duration: 700
          })
          return
      }

      //2 初始状态，还未拼接
      var joinImg = GLOBAL_PAGE.data.joinImg
      if (joinImg.status == 1) 
      {
          wx.showModal({
              title: '请设置表情顺序',
              content:'先点击"表情一"或"表情二"按钮，再点击"拼接"',
              showCancel:false,
          }) 
          return
      }

      //3 存在临时表情中中，重复点击
      var joinImg = GLOBAL_PAGE.data.joinImg
      var hasLog = GLOBAL_PAGE.tempLogExists(joinImg.first,joinImg.seconde)
      if (hasLog.status)
      {
          joinImg.resualt = hasLog.resualt
          GLOBAL_PAGE.setData({
              joinImg:joinImg,  //设置上传loading图片
          })
          wx.showModal({
              title: '拼接成功',
              // content:'现在预览表情么？（点击右上角"⋮"，分享给朋友）',
              confirmText:"预览",
              success: function(res) {
                  if (res.confirm) {
                      wx.previewImage({
                        current: joinImg.resualt, // 当前显示图片的http链接
                        urls: GLOBAL_PAGE.data.temp.emoticon // 需要预览的图片http链接列表
                      })
                  }
              }
          })
          // wx.showToast({
          //     title: '拼接已完成，点击图片预览',
          //     icon: 'success',
          //     duration: 1000
          // })
          return 
      }
        
      //4 发起join请求
      //4.1 设置loading图片 打开上传限制
      var origin_resualt = joinImg.resualt
      joinImg.resualt = "../../images/pinjie_loading.gif"
      GLOBAL_PAGE.setData({
        joinImg:joinImg,  //设置上传loading图片
        isUpload:true  //打开上传
      })
    
      //4.2 发起join请求
      var first = GLOBAL_PAGE.data.joinImg.first
      var seconde = GLOBAL_PAGE.data.joinImg.seconde
      wx.request({
          url: Api.editorJoin(), 
          data:{
            'session': wx.getStorageSync(Key.session),
            "first":first,
            "seconde":seconde,
          },
          success: function(res){
              var data = res.data
              console.log(data)
              if(data.status == "true")
              {
                  //预览图
                  var joinImg = GLOBAL_PAGE.data.joinImg
                  joinImg.resualt = data.local_url

                  //保存至临时文件夹
                  GLOBAL_PAGE.tempAdd(first,seconde,data.local_url)
                  //更新join图片，关闭上传限制
                  GLOBAL_PAGE.setData({
                    joinImg:joinImg,  //设置上传loading图片
                    isUpload:false  //打开上传
                  })
                
                   wx.showModal({
                      title: '拼接成功',
                      // content:'现在预览表情么？（点击右上角"⋮"，分享给朋友）',
                      confirmText:"预览",
                      success: function(res) {
                          if (res.confirm) {
                              wx.previewImage({
                                current: joinImg.resualt, // 当前显示图片的http链接
                                urls: GLOBAL_PAGE.data.temp.emoticon // 需要预览的图片http链接列表
                              })
                          }
                      }
                  })
              } 
              else{
                  var joinImg = GLOBAL_PAGE.data.joinImg
                  joinImg.resualt =  "http://image.12xiong.top/wx_app/web_error.png"
                  GLOBAL_PAGE.setData({
                    joinImg:joinImg,  //设置上传loading图片
                    isUpload:false  //打开上传
                  })
                  wx.showModal({
                    title: '网络连接失败，请重试',
                    showCancel:false,
                  })
              }
          },
          fail:function(res){
              var joinImg = GLOBAL_PAGE.data.joinImg
              joinImg.resualt =  "http://image.12xiong.top/wx_app/web_error.png"
              GLOBAL_PAGE.setData({
                joinImg:joinImg,  //设置上传loading图片
                isUpload:false  //打开上传
              })

              wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
              })         
          },
          complete:function(res) { 
              GLOBAL_PAGE.setData({isUpload:false})
          },
      })
  },

  /** 10 渲染表情 */
  renderEmoticon:function(){
    //根据条件选择emoticon，重新渲染
    var c_id = GLOBAL_PAGE.data.selectCategory.category_id 
    var e_storage = wx.getStorageSync(Key.emoticon) //存储
    var e_render = [] //预渲染
    if ( c_id == undefined || c_id == null)
    {
       e_render = e_storage
    } else
    {
      for (var i=0;i<e_storage.length;i++)
      {
        if(e_storage[i].category_id == c_id)
          e_render.push(e_storage[i])
      }
    }
     
    Render.emoticon(this,e_render)
  },
 
  /** 11 渲染目录 */
  renderCategory:function(){
    Render.category(this,wx.getStorageSync("category"))
  },

  onShow: function() {
    //菜单显示框

    //public 收藏后后，再进入private，要渲染表情和目录
    GLOBAL_PAGE.renderEmoticon()
    GLOBAL_PAGE.renderCategory()
    GLOBAL_PAGE.publicJoin()
  },


  // 分享页面
  onShareAppMessage: function () { 
      // wx.showModal({
      //   title: '请点点"帮抢"，保存',
      //   showCancel:false,
      // }) 
      // return

      return {
        title: '表情袋',
        desc: '海量表情天天让你惊喜，斗图乐趣无限，ヽ(°◇° )ノ',
        path: '/pages/public/public'
      }
  },

  /**
   *  页面加载
   */
  onLoad: function (option) {   

    GLOBAL_PAGE = this
    //1 page初始化高宽
    console.log("width:" , APP.globalData.windowWidth)
    console.log("height:" , APP.globalData.windowHeight)
    GLOBAL_PAGE.setData({
      windowWidth:APP.globalData.windowWidth,
      windowHeight:APP.globalData.windowHeight - 42,  //category框高度42px ,join框高度160 || 0
    //   categoryScrollWidth:APP.globalData.windowWidth - 104, //全选60 + 刷新42 + 竖直线2 
    //   categoryScrollWidth:APP.globalData.windowWidth - 86, // 客服42 + 刷新42 + 竖直线2 
    //   categoryScrollWidth:APP.globalData.windowWidth - 64, // 客服50 
      categoryScrollWidth:APP.globalData.windowWidth, // 客服50 

      // joinHeight
      // windowHeight:APP.globalData.windowHeight - 84,  //category框高度42px
      // windowHeight:app.globalData.windowHeight - 48,
    })
    //测试session
    // wx.setStorageSync('session',"ds9") 
    // wx.setStorageSync('session',"") 
    console.log("session:", wx.getStorageSync('session') )

    //正式登陆
    // GLOBAL_PAGE.login()

    //必须要登陆以后再做的事情
      if(APP.globalData.isLogin == true)
          GLOBAL_PAGE.onInit(option)
      else
          APP.login(option)
    
    // // 300ms后，隐藏loading
    setTimeout(function() {
          GLOBAL_PAGE.setData({
            loadShow: false
          })
    }, 500)
  },

  //必须要登陆以后发起的请求，在这里完成
  onInit:function(option){
      //Todo 登陆过后做的请求
      GLOBAL_PAGE.init()
  },

  //Page：private  初始化页面的钩子
  init:function( ){
    //数据初始化 图片
    var that = this;
    var url = Api.imgQuery() 

    var session = wx.getStorageSync(Key.session) 
    if (! session  ) //检查session,不存在，为false
      session = "false"

    //获取表情列表
     wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method:"GET",
        data: {
          session: session,
          category_id: 'null',
        },
        success: function(res) {
          var object = res.data
          if (object.status == "true")
          {
              wx.setStorageSync(
                  Key.emoticon,
                  object.img_list
              )
              GLOBAL_PAGE.renderEmoticon()
          }
          else
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
        },
        fail:function(res){
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
        },

      })

     //数据初始化 目录
      url = Api.categoryQuery() 
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        method:"GET",
        data: {
          session: session,
        },
        success: function(res) {
          var object = res.data
          if (object.status == "true")
          {      
              var _category_list = object.category_list      
              //目录保存本地
              wx.setStorageSync(
                  Key.category,
                  _category_list
              )
              //渲染目录
              GLOBAL_PAGE.renderCategory()
              //设置selecCategory == 默认目录。
              for(var i=0;i<_category_list.length;i++)
                  if( _category_list[i].is_default == 1 ){
                      GLOBAL_PAGE.setData({
                        selectCategory:_category_list[i]
                      })
                      var e = {currentTarget:{dataset:{select_category_id:_category_list[i].category_id}}}
                      // e.currentTarget.dataset.select_category_id = _category_list[i].category_id
                      GLOBAL_PAGE.selectCategory(e)
                  }              
          }
          else
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
        },
        fail:function(res){
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
        },
      })
  },

  
  //导航：目录设置页面
  //param 当前目录
  navigateToCategory: function(e) {
    //Todo 关闭所有页面
    var url = '../category/category'
    wx.navigateTo({
      url: url
    })
  },


  //临时文件是否存在join的log记录
  tempLogExists:function(first,seconde){
    var _first = first
    var _seconde = seconde
    var temp = GLOBAL_PAGE.data.temp
    var log = temp.log
    for (var i=0;i<log.length;i++)
      if( _first == log[i].first  && _seconde == log[i].seconde)
          return {status:true,resualt:log[i].resualt}

    return {status:false}
      // {first:"",seconde:"",resualt:""}
  },

  //增加临时文件
  tempAdd:function(first,seconde,resualt){


      var _resualt = resualt
      var temp = GLOBAL_PAGE.data.temp
      var log_list = temp.log
      var e_list = temp.emoticon
      log_list.push({
          first:first,
          seconde:seconde,
          resualt:resualt,
      })
      e_list.push(resualt)

      GLOBAL_PAGE.setData({
          temp:temp
      })
         
  },

  tempSwitch:function(){
      var temp = GLOBAL_PAGE.data.temp
      if(temp.show == true)
        temp.show = false
      else
        temp.show = true

      GLOBAL_PAGE.setData({temp:temp})
  },

  tempPreview:function(e){
      wx.previewImage({
        current: e.currentTarget.dataset.src, // 当前显示图片的http链接
        urls: GLOBAL_PAGE.data.temp.emoticon // 需要预览的图片http链接列表
      })
  },

  tempClear:function(e){
      wx.showModal({
        title: '是否清除临时表情？',
        content: ' ',
        success: function(res) {
            if (res.confirm) {
                var temp = GLOBAL_PAGE.data.temp
                temp.show = false
                temp.log = []
                temp.emoticon=[]
                GLOBAL_PAGE.setData({temp:temp})

                wx.showToast({
                  title: '临时表情清除完成',
                  icon: 'success',
                  duration: 1000
                })   
            }
        },
        complete:function(res) { 
          
        }
    })
      
  },

  getEmoticon:function(img_id){
      var emoticon = GLOBAL_PAGE.data.emoticon
      for( var i =0 ; i<emoticon.length ; i++)
        if(img_id == emoticon[i].img_id)
          return emoticon[i]
  },

  actionWatermark: function(yun_url,width,height) {
    var url = '../watermark/watermark?imgurl='+yun_url+"&width="+width +"&height=" + height 

    wx.navigateTo({
      url: url
    })
  },


  

  //对应public  94 行
  publicJoin:function(){

    var public_join = wx.getStorageSync('public_join',)
    if( public_join.is_join == true)
    {
        console.log("publicJoin",public_join)
        GLOBAL_PAGE.showJoinTab()
                
        wx.showActionSheet({
            itemList: ['表情一','表情二'],
            // itemList: ['图片'],
            success: function(res) {
            if(res.tapIndex == 0 || res.tapIndex =='0') //拼接
                GLOBAL_PAGE.joinSet(1,public_join.yun_url)
            if(res.tapIndex == 1 || res.tapIndex =='1')
                GLOBAL_PAGE.joinSet(2,public_join.yun_url)
            }
        })
         wx.setStorageSync('public_join', {is_join:false}) //关闭public的拼接提示
    }
    else
         console.log("publicJoin, 没有东西")
  },

  
 //右上角按钮
  followEvent:function(e){
      var select_id = e.currentTarget.dataset.img_id

      var _e = GLOBAL_PAGE.getEmoticon(select_id)
      GLOBAL_PAGE.setData({selectEmoticon:_e})

      console.log(_e.yun_url)
      wx.showActionSheet({
        itemList: ['拼接','水印', '分组','删除'],
        // itemList: ['图片'],
        success: function(res) {
          if (!res.cancel) {
            if(res.tapIndex == 0 || res.tapIndex =='0'){ //拼接
                GLOBAL_PAGE.showJoinTab()
                
                wx.showActionSheet({
                  itemList: ['表情一','表情二'],
                  // itemList: ['图片'],
                  success: function(res) {
                    if(res.tapIndex == 0 || res.tapIndex =='0') //拼接
                      GLOBAL_PAGE.joinSet(1)
                    if(res.tapIndex == 1 || res.tapIndex =='1')
                      GLOBAL_PAGE.joinSet(2)
                  }
                })
            }
            if(res.tapIndex == 1 || res.tapIndex =='1'){ //水印
                GLOBAL_PAGE.actionWatermark(_e.yun_url,_e.width,_e.height)
            }
            if(res.tapIndex == 2 || res.tapIndex =='2'){ //分组
                GLOBAL_PAGE.menuMoveCategory()
            }
            if(res.tapIndex == 3 || res.tapIndex =='3'){ //删除
                GLOBAL_PAGE.menuDelete()
            }
              
          }
        }
      })
  },

  tempJoinEvent:function(e){
      var _yun_url = e.currentTarget.dataset.yun_url

      GLOBAL_PAGE.showJoinTab()
      GLOBAL_PAGE.tempSwitch()
      wx.showActionSheet({
        itemList: ['表情一','表情二'],
        // itemList: ['图片'],
        success: function(res) {
          if(res.tapIndex == 0 || res.tapIndex =='0') //拼接
            GLOBAL_PAGE.joinSet(1,_yun_url)
          if(res.tapIndex == 1 || res.tapIndex =='1')
            GLOBAL_PAGE.joinSet(2,_yun_url)
        }
      })
  },

  //重新登录
  reLogin:function(){

      if (GLOBAL_PAGE.data.lockReLogin){
          wx.showModal({
              title: "同步太快了",
              content:"请休息几秒~",
              // confirmText:"知道了",
              showCancel:false,
          })
          return
      }
      

      wx.showModal({
          title: '是否同步最新数据',
          // content:'现在预览表情么？（点击右上角"⋮"，分享给朋友）',
          // confirmText:"预览",
          success: function(res) {
              if (res.confirm) {
                  GLOBAL_PAGE.setData({ lockReLogin:true})
                  setTimeout(function() {
                        GLOBAL_PAGE.setData({ lockReLogin:false})
                  }, 10000)
                  APP.login()
                  wx.showToast({
                    title: '同步中',
                    icon: 'loading',
                    duration: 2000,
                    success:function(){
                        setTimeout(function(){
                            wx.showToast({
                            title: '已同步至最新数据',
                            icon: 'success',
                            duration: 2000
                          })},
                          2000
                        )
                    }
                  })
              }
          }
      })
  },


})




