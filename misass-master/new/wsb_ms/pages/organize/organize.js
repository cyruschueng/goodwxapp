// pages/policymsg/policymsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _manage: true,   //管理与完成的状态切换
    manager:'张穗聪',
    sonArr: [{ 'listname': '子账号  ', 'listArr': [{ 'name': '张穗聪', 'imgsrc': '../../images/my_img.jpg' }, { 'name': '邱瑞秋', 'imgsrc': '../../images/my_img.jpg' }, { 'name': 'Larry', 'imgsrc': '../../images/my_img1.jpg' }], 'ifthree': true }],
    _show: false,      //控制蒙版的显示隐藏
    _delname: '',        //判断删除哪个
    _delId: '',
    _name: 0,
    managername: ['张穗聪', '邱瑞秋','Larry']

  },

  //管理存在时候点击
  changeManage: function (e) {
    let self = this;
    if (this.data._manage) {
      console.log('点击管理')
      self.setData({
        _manage: false,
      })
    } else {
      console.log('点击完成')
      self.setData({
        _manage: true,
      })
      wx.switchTab({
        url: '../me/me',
      })
    }
  },

  /********点击变更管理员*************/
  //点击  弹出选框
  clickEdit: function (e) {
    this.setData({
      _name: 1
    })
  },
  //滑动选择
  bindType: function (e) {
    const val = e.detail.value;
    this.setData({
      manager: this.data.managername[val[0]],
      ifType: true
    })
  },
  //点击取消
  closeType: function (e) {
    this.setData({
      _name: 0
    })
  },
  //点击确定
  rightType: function (e) {
    if (!this.data.ifType) {
      this.setData({
        manager: this.data.managername[0]
      })
    }
    this.setData({
      _name: 0
    })
  },

  //点击删除
  clickdel: function (e) {
    console.log(e.currentTarget.dataset);
    let _delname = e.currentTarget.dataset.name;
    let _delId = e.currentTarget.dataset.index;
    this.setData({
      _show: true,
      _delname: _delname,
      _delId: _delId
    });
  },





  //点击取消
  modelClose: function (e) {
    this.setData({
      _show: false
    })
  },
  //点击确定
  modelConfirm: function (e) {
    console.log(this.data._delname, this.data._delId, this.data.msgArr);
    let len = '';
    for (let i = 0; len = this.data.sonArr[0].listArr.length, i < len; i++) {
      if (this.data._delname == this.data.sonArr[0].listArr[i].name) {
        console.log(this.data.sonArr[0].listArr[i].name)
        this.data.sonArr[0].listArr.splice(this.data._delId, 1);
      }
    }
    this.setData({
      _show: false,
      sonArr: this.data.sonArr
    })
  },
  //添加子账号
  addson: function (e) {
    console.log("添加子账号");
    wx.navigateTo({
      url: '../addsonaccount/addsonaccount',
    })
  },
  //切换组织结构
  tabOrganize: function (e) {
    console.log("切换组织结构");
    wx.navigateTo({
      url: '../organizetab/organizetab',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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