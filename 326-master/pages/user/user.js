var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userTop:[
      {
        val:'管理员' 
      }, {
        val: '电站业主'
      }, {
        val: '分组'
      },
    ],
    inputBox: {
      pic: '/images/sousuo.png',
      bgColor: '#B2ACAC',
      color: '#fff',
      Val: '',
      placeHoder: '请输入用户名称'
    },
    userList:{//管理员和电站业主循环列表
      accountArr:[],
      more: false //加载更多
    },
    modelBox:{
      showModal:false
    },
    errBox: {},
    userGroup:false,
    roleVal:'2',
    AccountGroup:[],//分组
    tabBox:{
      tabArr1: {
        curHdIndex: 0,
        curBdIndex: 0
      }
    },
    groupTitle:'管理员未分组',
    roleImg:'jingxiaoshang.png',
    userLisIf:true,
    usrVal:'',
    groupnameVal:'',
    userLisGroupIf:true,
    tapMainMenuIndex:'',
    page:0,
    pagesize:10,
    subMenuDisplay: initSubMenuDisplay(),
    AccountFromGroup:[],
    gid:'',
  },
  // 加载更多
  More: function () {
    var that = this;
    that.setData({
      page: that.data.page + 1
    })
    that.webQueryAccountsFunc(that, '') // 24.1.2 账号查询
  },

  groupLisDetail:function(e){
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    // 分组列表的组的id
    that.setData({
      gid: that.data.AccountGroup[index].id
    })
    // 查询分组下账号
    that.webQueryAccountsFunc(that,'groupDetailTo')
  },
 
  tapMainMenu: function (e) {
    var that = this;
    that.data.userList.accountArr = []
    that.setData({
      userList: that.data.userList,
      page:0,
      })
    var newSubMenuDisplay = initSubMenuDisplay();
    if (this.data.subMenuDisplay[index] == 'hidden') {
      var index = parseInt(e.currentTarget.dataset.index);
      // 分组列表的组的id
      that.setData({
        gid: that.data.AccountGroup[index].id
      })
      // 查询分组下账号
      that.webQueryAccountsFunc(that,'')
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
  },
  // 下拉菜单end
  // 用户详情页跳转
  groupFormInfo: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/userAdmInfo/userAdmInfo?accountArrOne=' + JSON.stringify(that.data.userList.accountArr[index]),
    })
  },
  addUserpage:function(){
    wx.navigateTo({
      url: '/pages/addUser/addUser?roleVal=' + this.data.roleVal,
    })
  },
  // 新建分组
  inputModel: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        groupnameVal: util.trim(e.detail.value)
      })
      //请求
    }
  },
  comfirmModel:function(){
    var that = this;
    if (that.data.groupnameVal == ''){
      util.toast(that,'输入不能为空')
    }else{
      that.addAccountGroupFunc(that)
    }
  },
  addGroupShow:function(){
    var that =this;
    that.data.modelBox.showModal = true
    that.setData({
      modelBox: that.data.modelBox,
    })
  },
  cancelModel: function () {
    var that = this;
    that.data.modelBox.showModal = false
    that.setData({
      modelBox: that.data.modelBox,
    })
  },
  // 搜索框
  inputTap: function(e) {
    var that = this
    if (util.trim(e.detail.value) != null) {
      that.setData({
        usrVal: util.trim(e.detail.value)
      })
    }
  },
  usrSearch:function(){
    var that = this;
    that.data.userList.accountArr = []
    that.setData({
      userList: that.data.userList,
      page: 0,
      gid: '',
      userGroup: false,
      userLisIf: true
    })
    that.webQueryAccountsFunc(that,'')
  },
  // 跳转到用户详情页
  userDetailpage:function(){
    var that = this;
    if (that.data.roleVal == '0' || that.data.roleVal == '2'){
      wx.navigateTo({
        url: '/pages/userDetail/userDetail?accountArr=' + JSON.stringify(that.data.userList.accountArr),
      })
    } else if (that.data.roleVal == ''){
      wx.navigateTo({
        url: '/pages/groupDetail/groupDetail?AccountGroup=' + JSON.stringify(that.data.AccountGroup),
      })
    }
  },
  // 点击切换标签的颜色
  tabFun: function (e) {
    var that = this;
    that.data.inputBox.val = ''
    that.data.userList.accountArr = []
    that.setData({
      userList: that.data.userList,
      page:0,
      gid: '',
      inputBox: that.data.inputBox,
      usrVal:'',
    })
    util.tabFun(e, this)
    if (e.target.dataset.id == '0'){
      that.setData({
        roleVal:'2',
        userGroup: false,
        groupTitle: '管理员未分组',
        roleImg: 'jingxiaoshang.png',
        userLisIf: true,
        AccountGroup:[],
      })
      that.webQueryAccountsFunc(that,'')
    } else if (e.target.dataset.id == '1') {
      that.setData({
        roleVal: '0',
        userGroup: false,
        groupTitle: '电站业主未分组',
        roleImg: 'yezhutitle.png',
        userLisIf: true,
        AccountGroup: [],
      })
      that.webQueryAccountsFunc(that,'')
    } else if (e.target.dataset.id == '2') {
      var that =this;
      that.setData({
        roleVal: '',
        userGroup: true,
        groupTitle: '分组列表',
        roleImg: 'icon_group.png',
        userLisIf: false,
        AccountGroup: [],
        subMenuDisplay: initSubMenuDisplay(),
      })
      that.queryAccountGroupFunc(that)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.editTabBar3();
    that.webQueryAccountsFunc(that,'') // 24.1.2 账号查询
  },
  webQueryAccountsFunc: function (that, isTo) { // 24.1.2 账号查询 0电站业主 1厂家账号 2经销商 3集团账号 5电站浏览账号
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    var url = "&action=webQueryAccounts&page=" + that.data.page + '&pagesize=' + that.data.pagesize
    if (that.data.roleVal != '') {// roleVal厂家账号/电站业主 nav
      url += '&role=' + that.data.roleVal
    }
    if (that.data.usrVal != '') {// usrVal搜索框电站名称
      url += '&usr=' + that.data.usrVal
    }
    if (that.data.gid != '') {
      url += '&groupid=' + that.data.gid
    }
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        if (dat.account.length < 10) {
          that.data.userList.more = false
        } else {
          that.data.userList.more = true
        }
          that.data.userList.accountArr = that.data.userList.accountArr.concat(dat.account)
        that.setData({
          userList: that.data.userList,
        })
        if (isTo == 'groupDetailTo') {// 跳转到 开启 禁用 移动到的页面  isto是否是从 分组页面跳转的
          wx.navigateTo({
            url: '/pages/userDetail/userDetail?accountArr=' + JSON.stringify(that.data.userList.accountArr),
          })
        }
      } else {
        that.data.userList.more = false
        that.setData({
          userList: that.data.userList,
        })
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      that.data.userList.more = false
      that.setData({
        userList: that.data.userList,
      })
      util.netWork(that)
    },function(){
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
  queryAccountGroupFunc: function (that) { // 22.1查询分组
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    var url = "&action=queryAccountGroup"
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          AccountGroup: dat.group
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
      util.errtH(that)
      }, function () {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
  },
  addAccountGroupFunc: function (that) {  // 22.2 创建分组
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    var url = "&action=addAccountGroup&groupName="+that.data.groupnameVal
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        util.toastOK(that, '创建成功')
        that.data.modelBox.showModal = false
        that.setData({
          modelBox: that.data.modelBox,
        })
        that.queryAccountGroupFunc(that)
      } else {
        wx.hideLoading()
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      wx.hideLoading()
      util.netWork(that)
    },function () {

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
  var that = this;
  wx.showNavigationBarLoading()
  if (that.data.roleVal == '') {
    that.queryAccountGroupFunc(that)
  } else if (that.data.roleVal == '2' || (that.data.roleVal == '0')) {
    that.webQueryAccountsFunc(that, '')
  }
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
    var shareObj = util.shareFunc()
    return shareObj
  },

})
function initSubMenuDisplay() {
  var tapHidden = []
  for (var i = 0; i < 10000; i++) {
    tapHidden[i] = 'hidden'
  }
  return tapHidden;
}