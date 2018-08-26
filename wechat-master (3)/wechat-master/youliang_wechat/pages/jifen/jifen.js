//index.js  
//获取应用实例  
const app = getApp()
Page({
  data: {
    /* 页面配置 */
    userInfo: {},
    // tab切换  
    currentTab: 0,
    ranking: [],
    school_ranking:[],
    num:0,
    integral:0,
    nickName:'',
    news_id:0,
    link:'',
    hidden: false,
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
     var that = this
     //调用应用实例的方法获取全局数据
     app.getUserInfo(function (userInfo) {
       //更新数据
       that.setData({
         userInfo: userInfo
       })
       that.update();
       that.fetchData(userInfo);
     })
  },
/* detail_id = options.detail_id,*/
  fetchData: function (userInfo, options) {
     
     console.log(options);
     var that = this
     wx.login({
       success: function (res) {
         console.log(res);
         wx.request({
           //获取openid接口  
           url: 'https://youliang.shaoziketang.com/ranking_list.php',
           data: {
             code: res.code,
             area: userInfo.area,
             province: userInfo.province,
             country: userInfo.country,
             avatarUrl: userInfo.avatarUrl,
             nickName: userInfo.nickName,
             integral: userInfo.integral,
             grade: userInfo.grade,
             city: userInfo.city,
           },
           method: 'POST',
           success: function (res) {
             console.log(res);
             var url = "../detail/detail?news_id=" + res.data.info.news_id; 
             that.setData({
               ranking: res.data.info.ranking,  
               ranking_scr: res.data.info.ranking_scr,
               integral: res.data.info.integral,
               news_title: res.data.info.news_title,
               num: res.data.info.num,
               news_id: res.data.info.news_id,
               url: url,
               hidden: true,
             })
           }
         })
       }
     })
     setTimeout(function () {
       that.setData({
         hidden: true
       })
     }, 1500)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  
