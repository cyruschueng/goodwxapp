// pages/dynamic/myRecommend/myRecommend.js
//获取应用实例
var app = getApp();
Page({
  data: {
      meartTab: 0,
      meartindex: 0,
      currentTab: 0,
      currentindex: 0,
      DirectList: [],//个人代言直接推荐数组
      DirectSum: 0,//个人代言直接数量
      IndirectList: [],//个人代言间接推荐数组
      IndirectSum:0,//个人代言间接数量
      ShopDirectList: [],//店铺代言直接推荐数组
      ShopDirectSum: 0,//店铺代言直接数量
      ShopIndirectList: [],//店铺代言间接推荐数组
      ShopIndirectSum: 0,//店铺代言间接数量
      DirectState: false,//直接推荐人有无状态
      IndirectState: false,//间接推荐人有无状态
      ShopDirectState: false,//店铺直接推荐人有无状态
      ShopIndirectState: false,//店铺间接推荐人有无状态
      //控件渲染
      ShowDirectList: [],//显示直接推荐数组
      ShowDirectSum: 0,//显示直接数量
      ShowIndirectList: [],//显示间接推荐数组
      ShowIndirectSum: 0,//显示间接数量
      ShowDirectState: false,//显示直接推荐人有无状态
      ShowIndirectState: false,//显示间接推荐人有无状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendUser("0","0",(res)=>{
      console.log(res)
      this.setData({
        ShowDirectList: this.data.DirectList,
        ShowDirectSum: this.data.DirectSum,
        ShowIndirectList: this.data.IndirectList,//个人代言间接推荐数组
        ShowIndirectSum: this.data.IndirectSum,//个人代言间接数量
        ShowDirectState: this.data.DirectState,
        ShowIndirectState: this.data.IndirectState
      })
    });
    
    //获取个人代言直接推荐
    this.getRecommendUser("1","0",()=>{});//获取个人代言间接推荐
    this.getRecommendUser("0", "1", () => { });//获取店铺代言直接推荐
    this.getRecommendUser("1", "1", () => { });//获取店铺代言间接推荐
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getRecommendUser("0", "0", (res) => {
      console.log(res)
      this.setData({
        ShowDirectList: this.data.DirectList,
        ShowDirectSum: this.data.DirectSum,
        ShowIndirectList: this.data.IndirectList,//个人代言间接推荐数组
        ShowIndirectSum: this.data.IndirectSum,//个人代言间接数量
        ShowDirectState: this.data.DirectState,
        ShowIndirectState: this.data.IndirectState
      })
    });

    //获取个人代言直接推荐
    this.getRecommendUser("1", "0", () => { });//获取个人代言间接推荐
    this.getRecommendUser("0", "1", () => { });//获取店铺代言直接推荐
    this.getRecommendUser("1", "1", () => { });//获取店铺代言间接推荐
    wx.stopPullDownRefresh();
    setTimeout(function () {
      wx.showToast({
        title: '下拉刷新',
        icon: 'success',
        duration: 1000
      })
    }, 800)

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  //点击代言模式
  meartType:function(e){
    if (e.target.dataset.current==0){
        //个人代言模式赋值到show
      this.setData({
        ShowDirectList: this.data.DirectList,
        ShowDirectSum: this.data.DirectSum,
        ShowIndirectList: this.data.IndirectList,//个人代言间接推荐数组
        ShowIndirectSum: this.data.IndirectSum,//个人代言间接数量
        ShowDirectState: this.data.DirectState,
        ShowIndirectState: this.data.IndirectState
      })
    }else{
        //门店代言模式赋值到show
      this.setData({
        ShowDirectList: this.data.ShopDirectList,
        ShowDirectSum: this.data.ShopDirectSum,
        ShowIndirectList: this.data.ShopIndirectList,//个人代言间接推荐数组
        ShowIndirectSum: this.data.ShopIndirectSum,//个人代言间接数量      
        ShowDirectState: this.data.ShopDirectState,
        ShowIndirectState: this.data.ShopIndirectState
      })
    }

      this.setData({
          meartTab: e.target.dataset.current,
          meartindex: e.target.dataset.current
      })
  },
  //点击推荐模式
  changeType:function(e){
      this.setData({
          currentTab: e.target.dataset.current,
          currentindex: e.target.dataset.current
      })
  },
  //获取2种推荐人的信息
  getRecommendUser:function(ele,pele,cb){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/recommend/recommend/getRecommendInfo',
      data: { 
        user_id: app.globalData.user_id,
        type:ele,//直接间接类型
        present_type: pele//个人代言与店铺代言
        },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
        if (res.data.errcode=="0"){
          if (res.data.data.data!=""){
            if (pele==0){
               //个人代言
              console.log("个人代言信息返回" + res.data.data.data)
                         if (ele==0){
              console.log("获取直接推荐人信息" + res.data.data.data.errmsg);        
              _this.setData({
                DirectList: res.data.data.data,
                DirectSum: res.data.data.data.length
              })
              console.log("获取直接推荐人信息数量" + res.data.data.data.length);
              if (res.data.data.data.length>0){
                _this.setData({
                  DirectState: true
                })
              }
            }else{
              console.log("获取间接推荐人信息" + res.data.data.income);
              _this.setData({
                IndirectList: res.data.data.data,
                IndirectSum: res.data.data.data.length
              })
              
              console.log("获取间接推荐人信息数量" + res.data.data.data.length);
              if (res.data.data.data.length > 0) {
                _this.setData({
                  IndirectState: true
                })
              }
            }
            }else{
              console.log("门店代言系统信息返回" + res.data.data.data)
               //店铺代言
              if (ele == 0) {
                console.log("获取直接推荐人信息" + res.data.data.data.errmsg);
                _this.setData({
                  ShopDirectList: res.data.data.data,
                  ShopDirectSum: res.data.data.data.length
                })
                console.log("获取直接推荐人信息数量" + res.data.data.data.length);
                if (res.data.data.data.length > 0) {
                  _this.setData({
                    ShopDirectState: true
                  })
                }
              } else {
                console.log("获取间接推荐人信息" + res.data.data.income);
                _this.setData({
                  ShopIndirectList: res.data.data.data,
                  ShopIndirectSum: res.data.data.data.length
                })
                console.log("获取间接推荐人信息数量" + res.data.data.data.length);
                if (res.data.data.data.length > 0) {
                  _this.setData({
                    ShopIndirectState: true
                  })
                }
              }
            }


            
          }else{
            // _this.setData({
            //   DirectState:false
            // })
          }
          cb(res)
        }else{
          wx.showToast({
            title: res.data.errmsg,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  //获取间接推荐
  // getIndirectUser:(e)=>{
  //     console.log(e);
  // }
})