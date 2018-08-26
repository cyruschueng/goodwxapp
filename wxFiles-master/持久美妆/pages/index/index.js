var app = getApp();
var page1 = require('../sunwou/pages/page1.js');
var page2 = require('../sunwou/pages/page2.js');
var page3 = require('../sunwou/pages/page3.js');
var page4 = require('../sunwou/pages/page4.js');
var page5 = require('../sunwou/pages/page5.js');
Page({
  data: {
    firstIn:true,
    showBottomNav: false,
    bottomNavList:[],
    bottomNavColor:{},
    page1:null,
    page2:null,
    page3:null,
    page4:null,
    page5:null,
    page:1,
    theme:null
  },

  /**
   * 生命周期函数--监听页面加载   page参数代表首次加载哪个页面
   */
  onLoad: function (options) {
    
    var that = this;
    var page = 1;
    if(options.page){
      page = options.page;
    }
    //设置标题栏颜色
    wx.setNavigationBarColor({
      frontColor: app.phoneConfig.frontColor,
      backgroundColor: app.phoneConfig.theme,
    });
    //设置标题栏文字
    wx.setNavigationBarTitle({
      title: app.phoneConfig.projectName
    });
    //设置窗口大小
    wx.getSystemInfo({
      success: function(res) {
        
        var windowSize = res;
        //设置底部导航 ------------ start
        var bottomNavList = [];
        var bottomNavColor = { defaultTextColor: app.phoneConfig.defaultTextColor, selectedTextColor: app.phoneConfig.selectedTextColor};
        if(app.phoneConfig.page1.show){
          bottomNavList.push({ active:true,page: 1, text: app.phoneConfig.page1.text,icon:'/img/wxhomed.png',selectedIcon:'/img/wxhomes.png'});
        }
        if (app.phoneConfig.page2.show){
          bottomNavList.push({ active: false, page: 2, text: app.phoneConfig.page2.text, icon: '/img/wxshopd.png', selectedIcon: '/img/wxshops.png' });
        }
        if (app.phoneConfig.page3.show) {
          bottomNavList.push({ active: false, page: 3, text: app.phoneConfig.page3.text, icon: '/img/wxfindd.png', selectedIcon: '/img/wxfinds.png' });
        }
        if (app.phoneConfig.page4.show) {
          bottomNavList.push({ active: false, page: 4, text: app.phoneConfig.page4.text, icon: '/img/wxschoold.png', selectedIcon: '/img/wxschools.png' });
        }
        if (app.phoneConfig.page5.show) {
          bottomNavList.push({ active: false, page: 5, text: app.phoneConfig.page5.text, icon: '/img/wxuserd.png', selectedIcon: '/img/wxusers.png' });
        }
        //设置底部导航 ------------ end
        that.setData({
          firstIn:false,
          page1: app.phoneConfig.page1,
          page2: app.phoneConfig.page2,
          page3: app.phoneConfig.page3,
          page4: app.phoneConfig.page4,
          page5: app.phoneConfig.page5,
          windowWidth:windowSize.windowWidth,
          windowHeight:windowSize.windowHeight,
          showBottomNav: app.phoneConfig.showBottomNav,
          bottomNavList: bottomNavList,
          bottomNavColor: bottomNavColor,
          page:page,
          theme:app.phoneConfig.theme
        })
        that.switchBottomNav(page);
      },
    });
    
  },
  //初始化底部导航
  initBottomNav:function(cb){
    var bottomNavList = this.data.bottomNavList;
    for (var item in bottomNavList){
      bottomNavList[item].active = false;
    }
    cb(bottomNavList);
  },
  //初始化选中页面
  initPageActive: function (){
    this.data.page1.active = false;
    this.data.page2.active = false;
    this.data.page3.active = false;
    this.data.page4.active = false;
    this.data.page5.active = false;
  },
  //切换底部导航及页面
  switchBottomNav: function (e) {
    
    var page = null;
    if (typeof e == 'number' || typeof e == 'string'){
      page = e;
    }else{
      page = e.currentTarget.dataset.page
    }
    var that = this;
    this.initBottomNav(function(res){
      var bottomNavList =  res;
      for (var item in res) {
        if (res[item].page == page){
          res[item].active = true;
        }
      }
      that.initPageActive();
      if (page == 1) { 
        that.data.page1.active = true;
        if(!that.data.page1.onLoad){
          page1.onLoad(that,that.data.page1);
        }
        page1.onShow(that, that.data.page1);
      }
      if (page == 2) { 
        that.data.page2.active = true;
        if (!that.data.page2.onLoad) {
          page2.onLoad(that, that.data.page2);
        }
        page2.onShow(that, that.data.page2);
      }
      if (page == 3) { 
        that.data.page3.active = true;
        if (!that.data.page3.onLoad) {
          page3.onLoad(that, that.data.page3);
        }
        page3.onShow(that, that.data.page3);
      }
      if (page == 4) { 
        that.data.page4.active = true;
        if (!that.data.page4.onLoad) {
          page4.onLoad(that, that.data.page4);
        }
        page4.onShow(that, that.data.page4);
      }
      if (page == 5) { 
        that.data.page5.active = true;
        if (!that.data.page5.onLoad) {
          page5.onLoad(that, that.data.page5);
        }
        page5.onShow(that, that.data.page5);
      }
      that.setData({
        page: page,
        page1: that.data.page1,
        page2: that.data.page2,
        page3: that.data.page3,
        page4: that.data.page4,
        page5: that.data.page5,
        bottomNavList: bottomNavList
      })
    })
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
    var that = this;
    if(!that.data.firstIn){
      that.switchBottomNav(that.data.page);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var page = this.data.page;
    switch(page){
      case 1: page1.onPullDownRefresh(this, this.data.page1);break;
      case 2: page2.onPullDownRefresh(this, this.data.page2); break;
      case 3: page3.onPullDownRefresh(this, this.data.page3); break;
      case 4: page4.onPullDownRefresh(this, this.data.page4); break;
      case 5: page5.onPullDownRefresh(this, this.data.page5); break;
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this.data.page;
    switch (page) {
      case 1: page1.onReachBottom(this, this.data.page1); break;
      case 2: page2.onReachBottom(this, this.data.page2); break;
      case 3: page3.onReachBottom(this, this.data.page3); break;
      case 4: page4.onReachBottom(this, this.data.page4); break;
      case 5: page5.onReachBottom(this, this.data.page5); break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var page = this.data.page;
    if(page ==1 ){
      return page1.onShareAppMessage(this,this.data.page1)
    }else if(page == 2){
      return page2.onShareAppMessage(this, this.data.page2)
    } else if (page == 3) {
      return page3.onShareAppMessage(this, this.data.page3)
    } else if (page == 4) {
      return page4.onShareAppMessage(this, this.data.page4)
    } else if (page == 5) {
      return page5.onShareAppMessage(this, this.data.page5)
    }
    
  },

  bindTap: function (e) {
    var functionName = e.currentTarget.dataset.function;
    var index = e.currentTarget.dataset.index;
    if(this.data.page == 1){
      page1[functionName](this, index);
    } else if (this.data.page == 2){
      page2[functionName](this, index);
    } else if (this.data.page == 3) {
      page3[functionName](this, index);
    } else if (this.data.page == 4) {
      page4[functionName](this, index);
    } else if (this.data.page == 5) {
      page5[functionName](this, index);
    }
  },
})
