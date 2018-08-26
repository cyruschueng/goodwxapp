
// hotest.js
var Api = require('../../utils/api.js');
// var View = require('../../utils/view.js');
var Menu = require('../../utils/menu.js');

var KEY = require('../../utils/storage_key.js');

var t_id = 0
var GLOBAL_PAGE
var APP = getApp()
Page({
  data: {
    myCategory:["t1","t2"],
    tempCategory:["t1","t2"],
    hasImg:["true","false"],

    //屏幕高宽
    windowWidth:0,
    windowHeight:1000,

    category:[],
    tCategory:[],
    // t_index:0,
    
    isAdd:false, //是否增加新目录
    addCategoryInput:"", //新目录名字输入
  },

  //focus离开input后，更新临时缓存
  inputBlur:function(e){
      GLOBAL_PAGE.setData({addCategoryInput:e.detail.value })
  },

  // 1 增加目录
  addCategory:function(){

    if(GLOBAL_PAGE.data.category.length <= 15)
        GLOBAL_PAGE.setData({
            isAdd:true,
        })
    else
        wx.showModal({
            title: '无法增加目录',
            content: '暂时支持最多15个目录',
            showCancel:false,
        })
  },

  // 2 确认增加目录
  addCategoryOK:function(){
        if (GLOBAL_PAGE.data.addCategoryInput == "")
        {
            wx.showModal({
                title: '请输入目录名称',
                showCancel:false,
            })
            return
        }

        GLOBAL_PAGE.setData({
            isAdd:false,
        })

        wx.request({
            url: Api.categoryAdd(),
            method:"GET",
            data: {
                session: wx.getStorageSync(KEY.session) ,
                category_name:GLOBAL_PAGE.data.addCategoryInput,
            },
            success: function(res) {
                var object = res.data
                if(object.status == "true")
                {
                    var c = wx.getStorageSync(KEY.category)
                    c.push(object.category)
                    wx.setStorageSync(
                        KEY.category,
                        c
                    )
                    GLOBAL_PAGE.renderCategory()
                     wx.showToast({
                        title: '添加目录成功',
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
  },
  
  // 3 取消增加目录 
  addCategoryCancel:function(){
      GLOBAL_PAGE.setData({
          isAdd:false,
      })
  },

  // 4 目录修改
//   fixCategory:function(){
//       var _my = GLOBAL_PAGE.data.myCategory
//       var _temp = GLOBAL_PAGE.data.tempCategory
//       if( _my.toString() == _temp.toString())
//       {
//         wx.showToast({
//             title: '未做任何修改',
//             icon: 'loading',
//             duration: 500,
//             success:function(){}
//         })
//       }
//       else
//       {
//           //TodoTodo 上传修改书局
//           //本地Storage保存

          
//         wx.showToast({
//             title: '修改成功',
//             icon: 'success',
//             duration: 500,
//             success:function(){}
//         })
//       }
//   },
  // 5 目录删除 ,模态框显示，怕用户点错
  deleteCategory:function(e){
      wx.showModal({
        title: '是否删除目录:' + e.currentTarget.dataset.name,
        success: function(res) {
            if (res.confirm) {
                GLOBAL_PAGE.Delete(e)
            }
        }
    })
  },
  Delete:function(e){
        //默认目录不能删除
        if (e.currentTarget.dataset.is_default == "1" || e.currentTarget.dataset.is_default == 1)
        {
             wx.showModal({
                title: '无法删除目录',
                content: '默认目录不能删除',
                showCancel:false,
            })
            return
        }

       //目录带有 
        if (e.currentTarget.dataset.has_img == "true" || e.currentTarget.dataset.has_img == true)
        {
            wx.showModal({
                title: '无法删除目录',
                content: '需移除该目录"'+ e.currentTarget.dataset.name +'"下的表情',
                showCancel:false,
            })
            return
        }
     
        wx.request({
            url: Api.categoryDelete(), //仅为示例，并非真实的接口地址
            method:"GET",
            data: {
                session : wx.getStorageSync(KEY.session),
                category_id : e.currentTarget.dataset.category_id
            },
            success: function(res) {
                var object = res.data
                wx.setStorageSync(
                    KEY.category,
                    object.category_list
                )
                GLOBAL_PAGE.renderCategory()
                wx.showToast({
                    title: '目录删除成功',
                    icon: 'success',
                    duration: 700
                })
            }
        })
    
  },

    onShareAppMessage: function () { 
        return {
            title: '表情袋',
            desc: '海量表情天天让你惊喜，斗图乐趣无限，ヽ(°◇° )ノ',
            path: '/pages/public/public'
        }
    },
  onLoad: function (option) {
    GLOBAL_PAGE = this
    console.log(option["category"])
  

   
    if(APP.globalData.isLogin == true)
        GLOBAL_PAGE.onInit(option)
    else
        APP.login(option)

  },

    //必须要登陆以后发起的请求，在这里完成
    onInit:function(option){
       //Todo 登陆过后做的请求
        //数据初始化 目录
        var url = Api.categoryQuery() 
        wx.request({
            url: Api.categoryQuery(), //仅为示例，并非真实的接口地址
            method:"GET",
            data: {
                session:  wx.getStorageSync(KEY.session),
            },
            success: function(res) {
                var object = res.data
                wx.setStorageSync(
                    KEY.category,
                    object.category_list
                )
                GLOBAL_PAGE.renderCategory()
            }
        })
        },

  renderCategory:function(){
    GLOBAL_PAGE.setData({category:wx.getStorageSync(KEY.category)})
  },

})