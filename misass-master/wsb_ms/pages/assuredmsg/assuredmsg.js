// 被保险人
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _manage: true,   //管理与完成的状态切换
    msgArr: [
      { 'listname': '实际货主', 'name': ['江纯', '廖燕敏', '王洪宇'] },
      { 'listname': '物流公司', 'name': ['广州市顺丰物流有限公司', '广州市圆通物流有限公司', '广州市申通物流有限公司'] },
      { 'listname': '司机', 'name': ['陈金波', '廖燕敏', '王洪宇'] },
    ],
    _show: false,      //控制蒙版的显示隐藏
    _delname: '',        //判断删除哪个
    _delId: ''

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

  //点击编辑
  clickEdit: function (e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../assurededit/assurededit',
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
    for (let i = 0; len = this.data.msgArr.length, i < len; i++) {
      if (this.data._delname == this.data.msgArr[i].listname) {
        this.data.msgArr[i].name.splice(this.data._delId, 1)
      }
    }
    this.setData({
      _show: false,
      msgArr: this.data.msgArr
    })
  },
  //新增投保人
  addplicy: function (e) {
    console.log("新增被保险人");
    wx.navigateTo({
      url: '../assuredadd/assuredadd',
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