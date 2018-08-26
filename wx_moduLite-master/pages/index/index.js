//index.js

var util = require('../../utils/util.js');

//获取应用实例
var app = getApp()
Page({
  data: { 
    hasCateStorage: false, //  有全部分类缓存,
    hasFollowStorage: false, //  有订阅分类缓存,默认为false
    current_cate: 0,  // 当前分类的id
    scroll_to: "0", // 当前被查看的分类（表示scroll-view中的元素ID，规则“category”+ current_cate）
    swiperCurrent: "0",  // 当前swiper的current值，实现版块翻页
    followCateList: [],  // 订阅分类列表{id,name,active},其中“active”由format_follow方法完成
    cateList: [  // 全部分类信息
      // { "id": "1", "name": "旅游达人" },
    ],
    articleLists: [
      // {cate_id: "0", list: [
      //   { "tmp": 1, "id": "16", "name": "上海最后的处女地！绝美渔村!", "image": ["http://122.152.211.147/ueditor/php/upload/image/20170908/1504869133118174.png"], "author": "小蘑菇", "view": "120", "content": '<p style="color:#f40;">文章主题内容</p>' },
      //   { "tmp": 3, "id": "15", "name": "上半年浦东人气最旺的十大景点！", "image": ["http://122.152.211.147/ueditor/php/upload/image/20170908/1504869129939144.png"], "author": "新浪娱乐", "view": "1325", "content": '<p style="color:#f40;">文章主题内容</p>' },
      // ]}
    ],
    dictionary: [], // 数据词典，categoryId与currentId对应，{categoryId: "",currentId: ""}
    refresh_animate: "",  //“refresh_animate”实现刷新动画
    main_duration: 500,  // 实现切换动画时长   
    load_animate: "", // "load_animate"外框动画
    loadin_animate: "",  // "loadin_animate"
    articletips: "刷新成功",  // 加载文章接口返回的msg信息
    is_bottom: true,  // 到底事件控制参数，防止页面到底事件触发多次
    load_more: "",  //"<icon type='waiting' size='16' color='#ccc'></icon>加载更多……"
    scrolltop: ''
  },
  
  //事件处理函数

  onLoad: function () {
    // var up = app.testUpdate();


    /**
     * （1）从缓存中寻找用户订阅信息；
     *    1.0 初次打开，默认订阅全部
     *    1.1 若没有找到对应的缓存，检测用户的登录信息
     *    1.2 从服务器获取用户的订阅信息，若无信息，默认全部
     * （2）加载全部分类；
     * （3）加载推荐的文章列表；
     * （4）通过用户订阅的分类，生成对应的文章板块容器；
     * （5）点击顶部scroll-view，显示对应的列表
     * （6）点击刷新
     */

    var that = this;

    wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys)
        var keys = res.keys;

        //  ( 1 )分类相关数据处理
        //(1)全部分类
        if (keys.indexOf("modu_cateList") >= 0){
          // console.log("存在全部分类缓存")
          wx.getStorage({
            key: 'modu_cateList',
            success: function (res) {
              that.setData({
                hasCateStorage: true,
                cateList: res.data
              });
              that.updateAllCate();
            },
          })
        }else{
          // console.log("暂无全部分类信息");
          that.getAllCate();
        }
        //(2)订阅分类
        if (keys.indexOf("modu_follow_cateList") >= 0){
          // console.log("存在订阅分类缓存")    
          that.format_follow();
      
        }else{ // 没有缓存订阅信息，说明用户在此设备上初次打开小程序
          // console.log("暂无缓存订阅信息");
          that.getFollowCate();
        }
      },
    })
    
  
    /**
     * （2）文章列表数据相关处理
     *    仅对首屏推荐列表数据作缓存 处理？不处理、=====暂不处理
     */
    // that.article_format();
      //(1)预加载推荐列表文章
      // that.requestArticleList("up");


    // 设置scroll-view的高度，实现加载更多功能
    // 下拉刷新暂时不支持
    var res = wx.getSystemInfoSync()
    that.setData({
      viewHeight: res.windowHeight - 43
    })


  },

  onShow: function(){
    wx.startPullDownRefresh()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 第一： 判断刷新的是哪一个分类，由分类id来获取对应的数据
    // 第二： 将获取的数据合并到对应的数组之前（并显示）
    // 第三： 将该分类下的，最新获取到的，文章列表进行缓存，下次直接打开（保留了阅读记录和加快相应速度）
    // 第四： 用户退出后，清除文章缓存？
    // console.log(1)
  },

  /**
   * 页面上拉触底事件处理函数
   */
  onReachBottom: function(){
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(){
    return {
      title: "掌上魔都，史上最强“吃喝玩乐”攻略大放送，你还在等什么！ “借过借过！我也来挤挤！”"
    }
  },

// ================================自定义方法========================================


  /**
   * onload格式化
   * 格式化订阅数组，添加推荐项
   * 调用此方法的前提：“===---必须确保,存在订阅缓存信息---===”
   * 
   * 数据格式化完成，生成对应的文章空数组列表
   */
  format_follow: function(){
    var that = this;

    var this_update = function (that, value) {

     
      var recommend = { "id": 0, "name": "推荐", "active": "active" }
      for (var i in value) {
        value[i].active = ""
      }
      value.unshift(recommend);
      
      that.setData({
        followCateList: value
      })

      console.log(that.data.followCateList)
    };
    
    wx.getStorage({
      key: 'modu_follow_cateList',
      success: function(res) {
        var value = res.data;

        /**
         *  一级页面对数据启动监听，数据变化则执行this_update方法。
         */
        app.addListener(function (value) {
          this_update(that, value);

          // 额外执行文章数据数组的更新
          that.article_format();

          // 额外执行数据词典的更新
          that.init_dictionary();
        });
        

        this_update(that, value);  // 执行格式化
        
        /**
         * ￥页面初始化执行入口￥
         */
        
        // 根据订阅分类数组，生成对应的文章空数组列表
        that.article_format();

      },
    })
  },

  
  /**
   * 从服务器加载用户的订阅信息
   * 并缓存，和setData
   */
  getFollowCate: function(){
    var that = this;

    that.setData({
      followCateList: that.data.cateList
    })
    wx.setStorageSync("modu_follow_cateList", that.data.cateList)
    that.format_follow();

    // 该接口执行逻辑：
      // 检索用户订阅信息。（为全部注册用户默认订阅所有分类信息？部分分类信息√？空订阅×）；
      // 必须有正确分类数组信息返回
    wx.request({
      url: "https://请求用户订阅信息",
      data: {"userInfo": {}},
      success: function(res){
        wx.setStorage({
          key: 'modu_follow_cateList',
          data: res.data,
        });
        that.format_follow();
      },
      fail: function(){
        
        wx.showModal({
          title: '提示',
          content: '暂无相关订阅信息,点击右上角“+”重新设置订阅分类！',
          success: function (res) {
            if (res.confirm) {
              that.openCategorys();
            }
            if (res.cancel){
              that.setData({
                followCateList: that.data.cateList
              })
              wx.setStorageSync("modu_follow_cateList", that.data.cateList)
              that.format_follow();
            }
          }
        })
      }
    })
  },

  /**
   * 从服务器加载全部分类信息
   * 并缓存，和setData
   */
  getAllCate: function(){
    var that = this;
    wx.request({
      url: app.globalData.url + "/admin/category/category_format",
      success: function (res) {
        console.log(res)
        that.setData({
          cateList: res.data
        });
        // 并设置缓存
        wx.setStorage({
          key: "modu_cateList",
          data: res.data
        })
      },
      fail: function () {
        wx.showToast({
          title: '全部分类信息请求失败，请检查网络后重试',
          icon: "loading",
          duration: 800
        })
      }
    })
  },
  /**
   * 若已经存在全部分类缓存，进行更新
   */
  updateAllCate: function(){
    var that = this;
    wx.request({
      url: app.globalData.url + "/admin/category/category_format",
      success: function (res) {
        console.log("=============更新分类============")
        var list = res.data;
        var storage_list = [];
        
        wx.getStorage({
          key: 'modu_follow_cateList',
          success: function(data) {
            var cate_list = data.data
            // 本地订阅id==全部分类id，则从全部分类中提取，实现数据的更新（分类名，已删除分类的过滤）
            for (var i in cate_list) {
              for(var j in list){
                if(cate_list[i].id == list[j].id){
                  storage_list.push(list[j])
                }
              }
            }
  
            // 设置新缓存
            wx.setStorage({
              key: "modu_follow_cateList",
              data: storage_list
            })

          },
        })
        
        // that.setData({
        //   cateList: res.data
        // });
        wx.setStorage({
          key: "modu_cateList",
          data: res.data
        })
      }
    })
  },


  /**
   * 文章列表 articleLists 预格式化
   * （1）将articleLists与格式化，实现有页面容器，无容器数据，效果：实现swiper-item滑块；
   * （2）当用户取消某一个关注，删除该文章列表
   * 
   * 方法调用前提，订阅列表可获取
   */
  article_format: function(){
    // 问题 空数据初始化 ？ 已有数据格式化
    var that = this;
    that.init_dictionary();
    var follow = that.data.followCateList;
    var article = [];
    var cur_article = that.data.articleLists;

    // 如果订阅出现变动，新增的分类list为空[]；删掉的分类直接删除

    var getArticleList_byCateId = function(cate_id, article_list){
      var item = { "cate_id": cate_id, list: [], loadinfo: '',scrolltotop:0 };
      var return_item = "";

      for (var i in article_list){
        if(article_list[i].cate_id == cate_id){
          return_item = article_list[i];
        }
      }

      // 在现有数据中未找到对应的分类文章列表
      if(return_item == ""){
        return_item = item
      }

      return return_item;
    }

    for(var i in follow){
      article.push(getArticleList_byCateId(follow[i].id, cur_article))
    } //  article为新的文章列表
    
    that.setData({
      articleLists: article
    })

    // console.log("文章格式化");
    // console.log(that.data.articleLists)

    // loading
    that.requestArticleList("up");
  },


  /**
   * 加载文章列表数据，return
   * articleLists: [
   *  {cate_id: "5", list: [
   *     { "compose": 1, "id": "16", "title": "文章标题!", "cover": ["http://1174.png"], "author": "作者", "view": "120", "content": '<p>文章主题内容</p>' }
   *     ],}
   *  ]
   * 每次请求，可得到8条数据，通过concat组合。
   * //可以将最新的推荐数据缓存作下次预加载（暂不处理）
   * 
   * 参数介绍：
   * @dataType:区分‘下拉刷新’与‘加载更多’，‘up’与‘down’
   */
  requestArticleList: function(dataType, callback){
    var that = this;
    var article = this.data.articleLists;
    
    var categoryId = that.data.current_cate;
    var currentId = that.getCurrentId(categoryId)
    dataType = dataType || "up";
  
    wx.showLoading({
      title: '玩命加载中',
    })

    wx.request({
      url: app.globalData.url + "/admin/article/article_format",
      data: { "cat_id": categoryId, "current": currentId, "cursor": dataType},
      success: function(res){
        wx.hideLoading();
        var newData = res.data.article; // 表示返回文章列表

        // 新文章堆栈
        for(var i in newData){
          newData[i].image = newData[i].image.split(",")
        }

        for(var i in article){
          if(article[i].cate_id == categoryId){
            if (dataType == "up") {
              article[i].list = newData.concat(article[i].list);
            }
            if (dataType == "down") {
              article[i].list = article[i].list.concat(newData)
            }
            if(newData.length == 0){
              article[i].loadinfo = "暂无更多文章"
            }else{
              article[i].loadinfo = "加载更多……"
            }
          }
          // 判断提示信息
        }

        that.setData({
          articleLists: article,
          articletips: res.data.msg
        })


        if(typeof callback == "function"){
          callback();
        }

        //更新currentId
        if(newData.length > 0)
        that.update_dictionary(newData);
        
      },
      fail: function(){
        wx.showToast({
          title: '网络错误',
          icon: "loading"
        });
        that.hideLoading();
      }
    })
  },


/**
 * 格式化/初始化currentId词典；
 * 启用分类数据监听变化，调用前提是订阅分类已更新
 * 初次调用执行之后，dictionary只有推荐类有currentId值，其他为空值
 */
  init_dictionary: function () {
    var that = this;
    var dic = that.data.dictionary;
    var cate = that.data.followCateList;
    var newDic = [];

    var getDic_byCateId = function(cateId,dic){
      var item = {categoryId: cateId, currentId: ""};
      for(var i in dic){
        if(dic[i].categoryId == cateId){
          // newDic.concat(dic.splice(i,1));
          item = dic[i];
        }
      }
      return item;
    }

    for(var i in cate){
      var dic_item = getDic_byCateId(cate[i].id, dic);
      newDic.push(dic_item);
    }

    that.setData({
      dictionary: newDic
    })
    console.log(newDic)
  },


  /**
   * 更新currentId。
   * 每次数据加载完成更新当前的dictionary
   * @list 表示每次加载到的文章数组,数组内文章id降序排序
   */
  update_dictionary: function(list){
    var that = this;
    var cateId = that.data.current_cate;
    var dictionary = that.data.dictionary;
    for (var i in dictionary){
      if (dictionary[i].categoryId == cateId){
        dictionary[i].currentId = list[list.length - 1].id;
        return;
      }
    }
    that.setData({
      dictionary: dictionary
    })
  },


  /**
   * 用于requestArticleList方法，返回currentId
   * 数据格式
   * dictionary: [
   *    {categoryId: 0, currentId: 150}, 
   * ]
   */
  getCurrentId: function (categoryId) {
    var dictionary = this.data.dictionary;
    console.log(dictionary);
    for (var i in dictionary) {
      if (dictionary[i].categoryId == categoryId) {
        return dictionary[i].currentId;
      }
    }
  },


/**
 * 设置当前分类文章列表返回顶部
 */
this_cate_toTop: function(id){


},

  
  /**
   * 顶部导航 - 点击获取该分类下的文章列表
   */
  getThisList: function(e){
    this.setData({
      main_duration: 0,  // 临时取消动画
    })
    var id = e.currentTarget.dataset.id;  // 当前分类ID
    var followList = this.data.followCateList;  
    var swiper_current = 0;

    //console.log(1);
    for (var i in followList) {
      followList[i].active = "";
      if (followList[i].id == id) {
        followList[i].active = "active"
        swiper_current = i
      }
    }
    this.setData({
      scroll_to: "category" + id,  // 实现导航滑动
      followCateList: followList,   // 实现active效果
      current_cate: id,  // 实时更换当前分类ID
      
      swiperCurrent: swiper_current,   //  swiper切换
    })
    
    ///// 切换，swiper自动执行bindchange


    if (id == this.data.current_cate) {
      this.setData({
        "scrolltop": 0
      })
    }
  },
  

  /**
   * 点击刷新按钮加载更多
   */
  refreshThisList: function(){
    var that = this;

    var cur_cate = that.data.current_cate;
    
    if (that.data.refresh_animate == ""){  // 当前处于未刷新状态
      that.showLoading();

      that.requestArticleList("up",function(){
        that.hideLoading();
        that.setData({
          'scrolltop': '0'
        })
      })
      
    }
  },


/**
 * mainSwiperChange事件，首页文章版块切换
 * 切换至当前分类，若暂无文章 ——> 加载文章
 */
  mainSwiperChange: function(e){ 
    var that = this;

    var cur_swiper = e.detail.current;
    var cate_id = this.data.articleLists[cur_swiper].cate_id;  // 切换到目标分类的id
    var followList = this.data.followCateList;

    for (var i in followList){
      followList[i].active = "";
      if (followList[i].id == cate_id){
        followList[i].active = "active"
      }
    }

    this.setData({
      scroll_to: "category"+cate_id,  // 实现导航滑动
      followCateList: followList,   // 实现active效果
      current_cate: cate_id,  // 实时更换当前分类ID
      swiperCurrent: cur_swiper
    });

    var list = this.data.articleLists[cur_swiper].list;
    if(list.length == 0){
      that.showLoading();
      that.requestArticleList("up",function(){
        that.hideLoading();
      })
    }
    this.setData({
      main_duration: 500,  // 实现切换动画时长恢复
    })
  },



/**
 * 页面滑动到底部
 */
loadMore: function(){
  // wx.showToast({
  //   title: '到底啦',
  // });
  var that = this;
  var bl = that.data.is_bottom;
  if(bl){
    that.setData({
      is_bottom: false
    })
    that.requestArticleList("down",function(){
      that.setData({
        is_bottom: true
      })
    });
  }

  
},




  /**===============================非功能方法=================================
   * 点击打开分类管理
   */
  openCategorys: function () {
    // 新页面打开分类
    wx.navigateTo({
      url: '../category/category'
    })
  },
  /**
   * navigateto打开文章详情页
   */
  navigateto: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../articledetail/articledetail?id='+ id,
    })

  },
  /**
   * 执行加载动画
   */
  showLoading: function(){
    this.setData({
      refresh_animate: "refresh_animate",
    })
  },
  /**
   * 取消加载动画
   */
  hideLoading: function(){
    var that = this;
    that.setData({
      refresh_animate: "",
      load_animate: "load_animate",
      loadin_animate: "load_animate"
    })
    setTimeout(function(){
      that.setData({
        load_animate: "",
        loadin_animate: ""
      })
    },2000)
  }
  
})