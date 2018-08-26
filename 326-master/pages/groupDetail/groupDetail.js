var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addGroupIf:false,
    showModalStatus0: false,
    groupnameVal:'',
    AccountGroup:[],
    editgroupId:'',
    delgroupId:'',
    newGroupName:'',
  },
  userpage: function () {
    wx.navigateBack({
      delta:1
    })
  },
  // 新建分组输入框
  addGroupInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        groupnameVal: util.trim(e.detail.value)
      })
    }
  },
  // 编辑分组输入框
  editGroupInput: function (e) {
    var that = this;
    if (util.trim(e.detail.value) != '') {
      that.setData({
        newGroupName: util.trim(e.detail.value)
      })
    }
  },
  // 开始新建分组
  addGroupShow: function () {
    var that = this;
    that.setData({
      addGroupIf: true,
      showModalStatus0: true,
    })
  },
  // 开始删除分组点击
  delGroup: function (e) {
    var that = this;

    that.setData({
      addGroupIf: true,
      showModalStatus1: true,
      delgroupId: e.currentTarget.dataset.id
    })
  },
  // 开始编辑别名点击
  editGroup: function (e) {
    var that = this;
    that.setData({
      addGroupIf: true,
      showModalStatus2: true,
      editgroupId: e.currentTarget.dataset.id
    })
  },
  // 新建分组确定
  confiaddGroup: function () {
    var that = this;
    if (that.data.newGroupVal == '') {
      util.toast(that, '输入不能为空')
    } else {
      that.addAccountGroupFunc(that)
    }
  },
  // 编辑分组确定
  confieditGroup: function () {
    var that = this;
    if (that.data.newGroupName == '') {
      util.toast(that, '请输入组名')
    } else if (that.data.newGroupName.length < 2 || (that.data.newGroupName.length > 32)) {
      util.toast(that, '组名长度2~32个字符')
    } else {
      that.editGroupFunc(that)
    }
  },
  // 删除分组请求
  configroupDev: function (e) {
    var that = this;
    that.delGroupFunc(that)
  },
  // 关闭弹窗
  canceladdGroup: function () {
    var that = this;
    that.setData({
      addGroupIf: false,
      showModalStatus0: false,
      showModalStatus1: false,
      showModalStatus2: false,
    })
  },
  // 22.2 创建分组
  addAccountGroupFunc: function (that) {
    var url = "&action=addAccountGroup&groupName=" + that.data.groupnameVal
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        util.toastOK(that, '创建成功')
        that.setData({
          addGroupIf: false,
          showModalStatus0: false,
        })
        that.queryAccountGroupFunc(that)
      } else {
        util.errtipFunc(that, err, desc, '创建失败')
      }
    }, function () {
      util.errtipFunc(that, '', '', '创建失败')
    }, 'Manu', function () {

    })
  },
  // 22.3 编辑分组
  editGroupFunc: function (that) {
      var url = "&action=editAccountGroup&id=" + that.data.editgroupId + '&name=' + that.data.newGroupName
      util.http_oper(encodeURI(url), function (err, dat, desc) {
        if (err == 0) {
          util.toastOK(that, '编辑成功')
          that.setData({
            addGroupIf: false,
            showModalStatus2: false,
          })
          that.queryAccountGroupFunc(that)
        } else {
          util.errtipFunc(that, err, desc, '编辑失败')
        }
      }, function () {
        util.errtipFunc(that, '', '', '编辑失败')
      }, 'Manu', function () {

      })
  },
  // 22.4 删除分组
  delGroupFunc: function (that) {
    var url = "&action=delAccountGroup&id=" + that.data.delgroupId 
      util.http_oper(encodeURI(url), function (err, dat, desc) {
        if (err == 0) {
          util.toastOK(that, '删除成功')
          that.setData({
            addGroupIf: false,
            showModalStatus1: false,
          })
          that.queryAccountGroupFunc(that)
        } else {
          util.errtipFunc(that, err, desc, '删除失败')
        }
      }, function () {
        util.errtipFunc(that, '', '', '删除失败')
      }, 'Manu', function () {

      })
  },
  // 22.1查询分组
  queryAccountGroupFunc: function (that) {
    var url = "&action=queryAccountGroup&page=" + that.data.page0 + '&pagesize=' + that.data.pagesize0
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          AccountGroup: dat.group
        })
      } else {
        util.errtipFunc(that, err, desc, '分组')
      }
    }, function () {
      util.errtipFunc(that, '', '', '分组')
    }, 'Manu', function () {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
  that.setData({
    AccountGroup: JSON.parse(options.AccountGroup)
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
  }
})