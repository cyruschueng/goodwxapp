//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    page:1,
    maxtime: '',
    loadingHidden: false
  },
  onLoad: function () {
    this.requestData('newlist');
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '那就来看段子',
      path: 'pages/index/index?maxtime=' + this.data.maxtime,
      success: function (res) {
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  requestData:function(a){
    var that=this;
    wx.request({
      method: "GET",
      url: 'https://api.budejie.com/api/api_open.php',
      data: {
        a:a,
        c:'data',
        maxtime:that.data.maxtime,
        type:'29',
      },
      // header: "application/json", 
      success: function (resp) {
        // console.log(resp.data.showapi_res_body.pagebean.contentlist)
        that.setData({
          // list: that.data.list.concat(resp.data.showapi_res_body.pagebean.contentlist),
          list: that.data.list.concat(resp.data.list),
          loadingHidden: true,
          maxtime: resp.data.info.maxtime
        });
      }
    })
  },
  onPullDownRefresh: function () {
    // 显示导航栏loading  
    wx.showNavigationBarLoading();
    // 调用接口加载数据  
    
    // this.requestData("newlist");
    
    // 隐藏导航栏loading  
    wx.hideNavigationBarLoading();
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新  
    wx.stopPullDownRefresh();
  },
  // 上拉加载  
  onReachBottom(e) {
    let that = this;
    that.setData({
      page: that.data.page + 1,  // 每次触发上拉事件，把pageNum+1  
      isFirstLoad: false              
    });
    that.requestData("list");
  },

  // 点赞的触摸事件
  loveDz:function(){
    console.log("喜欢")
  },
  hateDz:function(){
    console.log("不喜欢")
  },
  shareDz: function () {
    console.log("转发")
  },
  commentDz: function (e) {
    var newData=[]
    console.log(e.currentTarget.id)
    for(let i=0;i<this.data.list.length;i++){
      if (this.data.list[i].id == e.currentTarget.id){
        newData.push(this.data.list[i])
      }
    }
    var a = newData[0].profile_image
    var b = newData[0].name
    var c = newData[0].create_time
    var d = newData[0].text
    var ee = newData[0].ding
    var f = newData[0].hate
    var g = newData[0].repost
    var h = newData[0].comment
    wx.navigateTo({
      url: '../comment/comment?who=' + e.currentTarget.id + '&profile_image=' + a + '&name=' + b + '&create_time=' + c + '&text=' + d + '&ding=' + ee + '&hate=' + f + '&repost=' + g + '&comment=' + h,
    })
  },
})
