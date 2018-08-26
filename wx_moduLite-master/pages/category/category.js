// category.js

var util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    block: "block",
    none: "block",
    myfollow: [],  //  已关注列表
    unfollow: [],  //未关注列表,
    cateList: [],  //  全部分类列表,
    
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * 页面初始化，显示我的关注，全部分类（实际数据为尚未关注）
   */
  onLoad: function (options) {

    var loaddata;  // 全部分类
    var undata;   // 未关注分类
    var isGetFollow = false;  // 已经获取到订阅分类标识
    var that = this;

    /**
     * （1）读取订阅信息
     * （2）读取全部分类
     */
      
    // （1）
    try {
      var value = wx.getStorageSync('modu_follow_cateList');   // 同步获取
      if (value) {
        isGetFollow = true;  // 成功获取
        that.setData({
          myfollow: value
        })
      }
    } catch (e) {
      // util.categoryError()
    }
    // （2）
    try {
      var value = wx.getStorageSync('modu_cateList');   // 同步获取
      if (value) {
        loaddata = value;
      }
    } catch (e) {
      // util.categoryError()
    }

      undata = loaddata.slice();  // 将全部分类数组复制
      // console.log(loaddata);

      // 用户自定义订阅分类(暂时)
      var fdata = this.data.myfollow || [];

      for(let i=0; i<fdata.length; i++){
        for (let j = 0; j < undata.length; j++){
          if (fdata[i].id == undata[j].id){
            undata.splice(j,1)
          }
        }
      }
      // console.log(this.data.unfollow);
      // 从缓存载入全部分类信息
      that.setData({
        cateList: loaddata,
        unfollow: undata
      });
      
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  
    // var that = this;
    // if (!this.data.cateList) {
    //   console.log("onshow 分类")
    //   try {
    //     var value = wx.getStorageSync('modu_cateList')
    //     if (value) {
    //       // 从缓存载入全部分类信息
    //       that.setData({
    //         cateList: value
    //       });
    //     }
    //   } catch (e) {
    //     util.categoryError()
    //   }
    // }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.update()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.update()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /****
   * ======================================================================
   */

  /**
   * 点击编辑
   */
  edit: function(e){
    this.setData({
      block: "block",
      none: "none"
    })
  },
  /**
   * 点击完成
   */
  update: function(e){
    var that = this;
    this.setData({
      block: "none",
      none: "block"
    });
    // wx.showToast({
    //   title: '请稍后',
    //   icon: 'loading',
    //   duration: 1000,
    //   mask: true,
    // })

    // 将数据缓存
    wx.setStorage({
      key: 'modu_follow_cateList',
      data: that.data.myfollow,
    })

    app.setChangedData(that.data.myfollow);
    
    // 将数据提交到服务器
    // wx.request({
    //   url: 'https://test.com/onLogin',
    //   data: {
    //     code: res.code
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data)
        // wx.setStorage({
        //   key: 'modu_cateList',
        //   data: that.data.myfollow,
        // })
    //   }
    // })

  },

  /**
   * 取消关注
   * */
  unfollow: function(e){
     
    var id = e.currentTarget.dataset.id;
    var list = this.data.myfollow;
    var unList = this.data.unfollow;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        unList.push(list[i]);
        list.splice(i, 1);
      }
    }

    this.setData({
      myfollow: list,
      unfollow: unList
    });
  },

  /***
   * 添加关注
   */
  follow: function(e){
    var id = e.currentTarget.dataset.id;
    var list = this.data.myfollow;
    var unList = this.data.unfollow;

    for (let j = 0; j < unList.length; j++) {
      if (id == unList[j].id) {
        list.push(unList[j]);
        unList.splice(j,1);
      }
    }
    
    this.setData({
      myfollow: list,
      unfollow: unList
    });
  }

})