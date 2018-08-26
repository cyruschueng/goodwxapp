// hotest.js
var Api = require('../../utils/api.js');
// var View = require('../../utils/view.js');
var Menu = require('../../utils/menu.js');

var Render = require('../../utils/render.js');
var KEY = require('../../utils/storage_key.js');


var APP = getApp()
var GLOBAL_PAGE
Page({
  data: {
    pageName: "public",

    titleText: "斗图加群（管理员微信号：bushitan）",

    displayLoading: true,
    keyword:"今日斗图", //搜索关键字
    page_num:1 , //分页，查询第一页
    // emoticon: [],
    // hotLabel:["金馆长","我想静静","意外","疼！"],  
    hotLabel:[],  
    hidden: false,
    //点击弹出菜单
    displayMenu:false,

    //控制菜单上架
    MENU_TYPE:Render.menu.TYPE,
    menuType:"0",
    menuWidth:0,
    menuHeight:0,

    // 手机设备信息，均已rpx为标准
    windowWidth:0,
    windowHeight:0,

    //页面渲染数据
    emoticon:[],
    category:[],
    tagList:[],
    tagListDisplay:[],

    //touch选择对象
    selectEmoticon:{id:"",name:"",img_url:""}, //预备编辑的图片
    selectCategory:{id:"",name:""},

    indexShow:false,
    shortcutShow:false,
    emoticonShow:false,
    loadShow:true,

     inputShowed: false,
    //  inputVal: "",
     searchKey:[],//"搞笑","运动","笑屎了","老司机"
     searchResultShowed:false,

     scrollTolowerStatus:1, // 1 初始状态，全部隐藏  2、正在loading 3、返回首页 
     emoticonScrollTop:0 , //表情滚条位置
  },


  // 1 图片分享
  menuShare:function(e){
        var current = e.currentTarget.dataset.yun_url
        // var current = GLOBAL_PAGE.data.selectEmoticon.yun_url
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

  //对应private  1020 行
  //2 增加水印
  menuAddWatermark:function(e){
    //   var select_id = e.currentTarget.dataset.img_id
    //   var _e = GLOBAL_PAGE.getEmoticon(select_id)

    //   var public_join = {
    //       is_join : true,
    //       yun_url : _e.yun_url
    //     }
    //   wx.setStorageSync('public_join', public_join)
      
    //   var url = '/pages/private/private'
    //   wx.switchTab({
    //       url: url
    //   })

      var select_id = e.currentTarget.dataset.img_id
      var _e = GLOBAL_PAGE.getEmoticon(select_id)
      var url = '../watermark/watermark?imgurl='+_e.yun_url+"&width="+_e.width +"&height=" + _e.height 

      wx.navigateTo({
          url: url
      })
  },

  getEmoticon:function(img_id){
      var emoticon = GLOBAL_PAGE.data.emoticon
      for( var i =0 ; i<emoticon.length ; i++)
        if(img_id == emoticon[i].img_id)
          return emoticon[i]
  },


  // 2 菜单收藏按钮，可以收藏多张 
  menuCollect:function(e){
    
    if( wx.getStorageSync('session') == ""  )
    {
        wx.showModal({
            title: '数据同步未成功，点击"我"右上角按钮重新同步',
            showCancel:false,
             confirmText:"知道啦",
        })
        return
    }

    // 5.1 去除重复搜藏
    
    var select_id = e.currentTarget.dataset.img_id

    // var select_id = GLOBAL_PAGE.data.selectEmoticon.id

    var emoticon = wx.getStorageSync(KEY.emoticon)
    for(var i=0;i<emoticon.length;i++)
    {
        if (select_id == emoticon[i].img_id)
        {
            wx.showModal({
                title: "请勿重复收藏",
                showCancel:false,
            })
            return
        }
    }

      wx.request({
          url: Api.imgAdd() , 
          method:"GET",
          data: {
            session: wx.getStorageSync(KEY.session),
            img_id: select_id,
          },
          success: function(res) {
             console.log("collect success:",res.data)
              var object = res.data
              if (object.status == "true")
              {
                  //设置改图片为已收藏状态
                  var _img = object.img
                  
                  var _e = GLOBAL_PAGE.data.emoticon
                  for (var i=0;i<_e.length;i++)
                      if(_img.img_id == _e[i].img_id){
                          _e[i].is_collect = true
                          break
                      }
                  GLOBAL_PAGE.setData({emoticon:_e})
                          
                 
                
                    if( wx.getStorageSync('is_collect_info') == "")
                    {
                        wx.showModal({
                            title: '收藏成功',
                            content:'点击右下角“我”，进入专属表情袋',
                            showCancel:false,
                            confirmText:"知道了",
                            success: function(res) {
                                wx.setStorageSync('is_collect_info',true)
                            }
                        }) 
                    }
                    else{
                        wx.showToast({
                            title: '收藏成功',
                            icon: 'success',
                            duration: 700
                        })
                    }

                     //收藏成功
                  var e = wx.getStorageSync(KEY.emoticon)
                  e.splice(0, 0, _img); //从第一位插入
                //   e.push(_img)
                  wx.setStorageSync(KEY.emoticon,e)
                  
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
          }
      })
  },


  // 3 创建Tag
  createTag:function(category){
      var _cat = category
      var tag = []
      var parent = [],sun_name=[]
      for(var i=0;i<_cat.length;i++)
        if(_cat[i].parent_id ==  null)
          tag.push({
            "parent":_cat[i],
            "sub":[]
          })
          
      for(var i=0;i<_cat.length;i++)
        for(var j=0;j<tag.length;j++)
          if( _cat[i].parent_id == tag[j].parent.category_id)
            tag[j].sub.push(_cat[i])
              //  parent_name.push(_cat[i].name)
      
      console.log(tag)

      GLOBAL_PAGE.setData({
        tagList:tag
      })
  },

  // 4 渲染表情
  renderEmoticon:function(emoticon,add){
    Render.emoticon(GLOBAL_PAGE,emoticon,add)
  },

  //111 滚动条到底，追加图片
  scrollTolower:function(){
        console.log("scrollTolower")

        //非初始状态下，避免疯狂下拉发出无数请求
        //scrollTolowerStatus:1  // 1 初始状态，全部隐藏  2、正在loading 3、返回首页 
        if(GLOBAL_PAGE.data.scrollTolowerStatus != 1 ) 
            return
   
        console.log("not lock")
        GLOBAL_PAGE.setData({
            scrollTolowerStatus:2
        })

        var _keyword = GLOBAL_PAGE.data.keyword
        var url = Api.tagImgQuery() 
        var session = wx.getStorageSync(KEY.session) 
        //获取表情列表
        wx.request({
            url: url, 
            method:"GET",
            data: {
                session: session,
                tag_name : _keyword,
                page_num:GLOBAL_PAGE.data.page_num //从第二页开始查
            },
            success: function(res) {
                var object = res.data
                
                if (object.status == "true")
                {
                   
                   
                    
                    //页数相同，没有下文，不追加更新
                    if (object.page_num == GLOBAL_PAGE.data.page_num)
                        GLOBAL_PAGE.setData({
                            scrollTolowerStatus:3, //没有图片，返回导航
                            page_num:object.page_num //更新page_num 查询页
                        })
                    //有新的页数，追加更新
                    else
                    {
                        GLOBAL_PAGE.setData({
                            scrollTolowerStatus:1, //加载成功，返回初始状态
                            page_num:object.page_num //更新page_num 查询页
                        })
                    }
                    var _img_list = GLOBAL_PAGE.isCollect(object.img_list)
                    GLOBAL_PAGE.renderEmoticon(_img_list,true)
                       
                }
                else
                GLOBAL_PAGE.setData({
                    scrollTolowerStatus:3  //错误，提示回到首页
                })
            },
            fail:function(res){
                GLOBAL_PAGE.setData({
                    scrollTolowerStatus:3 //错误，提示回到首页
                })
            },
            complete:function(){
                GLOBAL_PAGE.setData({
                indexShow:false,
                shortcutShow:true,
                emoticonShow:true,
                loadShow:false,
                }) 
            }
        })

  },
  
  //5 搜索栏
  /**
  * 1 根据keyword，搜索
  */
  searchBtn:function(){
      
    //开启loading
   
    GLOBAL_PAGE.setData({
      indexShow:false,
      shortcutShow:true,
      emoticonShow:false,
      loadShow:true,
    }) 

    var keyword = GLOBAL_PAGE.data.keyword
    var tagList = GLOBAL_PAGE.data.tagList
    var hotLabel = []
    for(var i=0;i<tagList.length;i++)
        for(var j=0;j<tagList[i].sub.length;j++)
        {
            if ( keyword == tagList[i].sub[j].name )
            {
                for(var h=0;h<tagList[i].sub.length; h++)
                  hotLabel.push(tagList[i].sub[h].name)
            }
        }

    GLOBAL_PAGE.setData({hotLabel:hotLabel})

    var _category = GLOBAL_PAGE.data.category
    for (var i=0 ; i< _category.length; i++)
        if ( keyword == _category[i].name){
            GLOBAL_PAGE.setData({
                titleText:_category[i].des,
            })
            break
        }
                
    GLOBAL_PAGE.TagImgQueryRequst()
  },

 
  
  
  //图片tag查询
  TagImgQueryRequst:function(){

    //切换tag，返回初始状态
    GLOBAL_PAGE.setData({
        scrollTolowerStatus:1,
        emoticonScrollTop:0,
        page_num:1
    })
    
    var _keyword = GLOBAL_PAGE.data.keyword
    var url = Api.tagImgQuery() 
    var session = wx.getStorageSync(KEY.session) 
    //获取表情列表
     wx.request({
        url: url, 
        method:"GET",
        data: {
          session: session,
          tag_name : _keyword,
          page_num:GLOBAL_PAGE.data.page_num//默认查询第一页
          // category_id: '1',
          // category_name: _keyword,
        },
        success: function(res) {
            var object = res.data
            
            if (object.status == "true")
            {
                
                var _img_list = GLOBAL_PAGE.isCollect(object.img_list)
                GLOBAL_PAGE.renderEmoticon(_img_list)

                GLOBAL_PAGE.setData({
                    page_num:object.page_num //更新page_num 查询页
                })
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
        complete:function(){
            GLOBAL_PAGE.setData({
              indexShow:false,
              shortcutShow:true,
              emoticonShow:true,
              loadShow:false,
            }) 
        }
      })
  },
  /** 2 点击Shortcut按钮，触发search搜索，
   * 更新keyword
   */
  searchShortcut:function(e){
        GLOBAL_PAGE.setData({
        keyword:e.currentTarget.dataset.keyword,
        // inputVal:e.currentTarget.dataset.keyword,
        inputShowed:true,
        searchResultShowed:false,
        })

        //index目录列表
        //临时建立tagListDisplay中间选项，首页查询，所有tag一起展示，
        if(e.currentTarget.dataset.keyword == "目录导航")
        {
            var tagListDisplay = GLOBAL_PAGE.data.tagList   
            GLOBAL_PAGE.setData({
            indexShow:true,
            shortcutShow:false,
            emoticonShow:false,
            loadShow:false,
            tagListDisplay:tagListDisplay
            }) 
            return
        }
        // 单项父类查询，展示长度为1的tag数组，仅有父类一个元素
        var tagList = GLOBAL_PAGE.data.tagList
        for(var i = 0 ; i<tagList.length;i++)
        {
            if( e.currentTarget.dataset.keyword == tagList[i].parent.name)
            {
                var tagListDisplay = [ GLOBAL_PAGE.data.tagList[i] ]
                GLOBAL_PAGE.setData({
                indexShow:true,
                shortcutShow:false,
                emoticonShow:false,
                loadShow:false,
                tagListDisplay:tagListDisplay
                }) 
                return
            }
        }
        // else
        //正常搜索
        GLOBAL_PAGE.searchBtn();
  },

  //6 搜索栏交互
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  //
  hideInput: function () {
      this.setData({
        //   keyword: "",
          searchResultShowed: false
      });
  },
  //
  clearInput: function () {
      this.setData({
          keyword: ""
      });
  },
  //
  inputTyping: function (e) {
      GLOBAL_PAGE.setData({
          keyword: e.detail.value
      });

      var category = GLOBAL_PAGE.data.category
      var keyword = e.detail.value
      var searchKey = []
      for (var i=0;i< category.length;i++)
      { 
          console.log(keyword,category[i].name ,  category[i].name.indexOf(keyword))
          if(category[i].name.indexOf(keyword) != -1)
              searchKey.push(category[i].name)  
      }

      GLOBAL_PAGE.setData({
          searchKey: searchKey
      });
      

  },

  // 输入框聚焦
  inpuFocus:function(e){
      GLOBAL_PAGE.setData({
        searchResultShowed:true,
    })
  },
  // 输入变化显示提示栏
  inpuBlur:function(e){
      GLOBAL_PAGE.setData({
        searchResultShowed:false,
    })
  },

  onShareAppMessage: function () { 
     
      return {
        title: '表情袋',
        desc: '这有很多《'+GLOBAL_PAGE.data.keyword+'》的表情唷,(~˘▾˘)~',
        path: '/pages/public/public',
        success: function (res) {
            console.log("onshare",res)

        }
        // path: '/pages/public/public?keyword='+GLOBAL_PAGE.data.keyword
      }
  },
  
  //后台更新页脚
  adTitleText:function(){
      wx.request({
        url: Api.adTitle(), //查询Tag
        method:"GET",
        success: function(res) {
          var object = res.data
          if(object.status == "true"){
                GLOBAL_PAGE.setData({
                    titleText:object.title,
                    keyword:object.keyword,
                    searchKey:object.search_key
                })
          }
        },
        complete:function(){
             GLOBAL_PAGE.searchBtn() //搜索完成
        }
    })
  },

  isCollect:function(img_list){
      //对比storage,若已经收藏，标红心
    var _storage = wx.getStorageSync(KEY.emoticon)
    var _img_list = img_list
    for(var i=0;i<_img_list.length;i++ )
        for(var j=0;j<_storage.length;j++){
            if( _img_list[i].img_id == _storage[j].img_id ){
                _img_list[i].is_collect = true //已经被收藏
                break
            }
            else 
                _img_list[i].is_collect = false //未收藏

        }
    return _img_list
  },

    //从private删除表情，进入public，要刷新
    onShow:function(){
        //is_collect = false
        var _emoticon = GLOBAL_PAGE.data.emoticon
        for(var i=0;i<_emoticon.length;i++)
            _emoticon[i].is_collect = false
        
        var _img_list = GLOBAL_PAGE.isCollect(_emoticon)
        GLOBAL_PAGE.renderEmoticon(_img_list)
    },
//   onReady:function(){
//     var _img_list = GLOBAL_PAGE.isCollect(GLOBAL_PAGE.data.emoticon)
//     GLOBAL_PAGE.renderEmoticon(_img_list)
//   },

  
  onLoad: function (option) {

    console.log("onLoad")
    wx.showShareMenu({
        withShareTicket: true,
        //   success:function(){
        //       console.log(wx.getShareInfo())

        //   }
    })

    GLOBAL_PAGE = this
    //1 page初始化高宽
    console.log("width:" , APP.globalData.windowWidth)
    console.log("height:" , APP.globalData.windowHeight)
    GLOBAL_PAGE.setData({
      windowWidth:APP.globalData.windowWidth,
    //   windowHeight:APP.globalData.windowHeight - 90, //搜索框高度48px,短语框高度42px
      windowHeight:APP.globalData.windowHeight - 126, //搜索框高度48px,短语框高度42px,页眉36
    })

    if( option.keyword != null && option.keyword != "" && option.keyword != undefined )
        GLOBAL_PAGE.setData({
            keyword:option.keyword,
        })
    

    //从分享页面进入public，session为空，先登录
    // var session = wx.getStorageSync(KEY.session) 
    // if(session == "")
    //      GLOBAL_PAGE.login()

    //  必须要登陆以后再做的事情
        // if(APP.globalData.isLogin == true)
        //     GLOBAL_PAGE.onInit(option)
        // else
    //     APP.login(option)
    GLOBAL_PAGE.init(option)
    APP.login(option)

    //小程序码扫描进入
    var scene = option.scene
    if (scene)
        wx.redirectTo({
            url: '../painter/painter?master_id=' + scene,
        })
    
  },
  
   onInit:function(option){},

  //必须要登陆以后发起的请求，在这里完成
   init:function(option){
       //Todo 登陆过后做的请求
       
        //获取表情列表
        wx.request({
            url: Api.tagQuery(), //查询Tag
            method:"GET",
            data: {
            session: "ds9"
            },
            success: function(res) {
            var object = res.data
            if(object.status == "true"){
                GLOBAL_PAGE.setData({category:res.data.category_list})
                GLOBAL_PAGE.createTag(res.data.category_list)
                // var c_list = []
                // for (var i=0;i< res.data.category_list.length;i++)
                // {
                //     c_list.push(res.data.category_list[i].name)  
                // }
                
                GLOBAL_PAGE.adTitleText() //获取广告信息
                
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
            complete:function(){
                GLOBAL_PAGE.setData({
                indexShow:false,
                shortcutShow:true,
                emoticonShow:true,
                loadShow:false,
                }) 
            }
        })
    },
    
})
