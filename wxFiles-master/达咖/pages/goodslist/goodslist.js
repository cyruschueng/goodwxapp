var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    theme:'',
    themelist:[
      { label: '咖啡', color:'#8B4C39'},
      { label: '饮品', color:'#63B8FF'},
      { label: '甜品', color:'#43CD80'},
      { label: '午餐', color:'#EE3B3B'}
    ],
    list:[
      {img:'/img/c1.jpg',name:'卡布奇诺',sales:'152',like:250,price:15},
      { img: '/img/c5.jpg', name: '蛋糕', sales: '102', like: 350, price: 20 },
      { img: '/img/c3.jpg', name: '摩卡', sales: '152', like: 205, price: 15 },
      { img: '/img/c6.jpg', name: '海燕卡卡', sales: '152', like: 250, price: 15 },
      { img: '/img/c4.jpg', name: '玛奇朵', sales: '152', like: 250, price: 15 },
    ],
    setTheme:false,
    scroll:true,
    showdetail:false
  },
  doset: function (e) {
    var tl = this.data.themelist;
    this.setData({
      key:tl[e.currentTarget.dataset.index].label,
      theme: tl[e.currentTarget.dataset.index].color,
      setTheme: false,
    })
    this.setTitle();
  },
  setTheme: function () {
    if(this.data.setTheme){
      this.setData({ setTheme: false})
    }else{
      this.setData({ setTheme: true })
    }
  },
  navToDetail: function (e) {
    this.setData({
      showdetail: true,
      scroll: false
    })
  },
  close: function () {
    this.setData({
      showdetail: false,
      scroll: true
    })
  },
  //设置主题  文字
  setTitle: function () {
    var that = this;
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: that.data.theme,
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      key:options.key,
      theme:options.theme
    })
    this.setTitle();
    app.setWindow(this);
    
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})