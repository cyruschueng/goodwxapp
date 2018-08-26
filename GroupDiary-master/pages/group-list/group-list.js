const AV = require('../../utils/av-weapp-min')
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    groupList: [],
    userGroupMapList: [],
    showHint: false,//是否显示更新提示
    canShowEmpty: false,//是否可展示空白页面
    canNavigate: true //是否可跳转
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //检查客户端基础库 
    wx.getSystemInfo({
      success: function (res) {
        //从基础库1.4.0开始，才能显示群名
        if (parseFloat(res.SDKVersion.substring(0, 4)) < 1.4) {
          that.setData({
            showHint: true
          })
        }
      }
    })
    //获得当前登录用户
    util.showLoading()
    AV.User.loginWithWeapp().then(user => {
      that.data.user = AV.User.current()
      that.getMyGroups()
      var shareTicket = getApp().globalData.shareTicket
      if (shareTicket.length > 0) {
        that.getShareInfo(shareTicket)
      }
    }, err => {
      util.hideLoading()
      console.log("登录失败")
      console.log(error)
    }).catch(console.error)
    //可获取转发目标信息
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  getMyGroups: function () {
    util.showLoading()
    var that = this
    var groupList = []
    var user = this.data.user
    // 构建 UserGroupMap 的查询
    var query = new AV.Query('UserGroupMap')
    query.equalTo('user', user)
    // 执行查询
    query.find().then(function (userGroupMapList) {
      if (userGroupMapList.length > 0) {
        userGroupMapList.forEach(function (userGroupMap, i, a) {
          // 获取 group 实例
          var group = AV.Object.createWithoutData('Group', userGroupMap.get('group').id)
          group.fetch().then(function () {
            var date = new Date(group.updatedAt)
            groupList.push({
              groupId: group.get('groupId'),
              groupNickName: userGroupMap.get('groupNickName'),
              updatedTime: date.getTime()
            })
            userGroupMap.set('groupId', group.get('groupId'))
            if (groupList.length == userGroupMapList.length) {
              that.refreshGroupList(groupList)
            }
          }, function (error) {
            util.hideLoading()
            console.log("获取群实例失败")
            console.log(error)
          })
        })
      } else {
        that.refreshGroupList([])
      }
      that.data.userGroupMapList = userGroupMapList
    })
  },

  /**
   * 刷新展示群列表
   */
  refreshGroupList: function (groupList) {
    util.hideLoading()
    var that = this
    this.setData({
      canShowEmpty: true,
      groupList: groupList.sort(that.sortGroup)
    })
    console.log("更新群列表")
    console.log(groupList)
  },

  /**
    * 降序排序
    */
  sortGroup: function (a, b) {
    return b.updatedTime - a.updatedTime
  },

  /**
   * 跳转到详情页
   */
  navigateToDetail: function (event) {
    if (!this.data.canNavigate) {
      return
    }
    var groupId = event.currentTarget.dataset.groupId
    wx.navigateTo({
      url: '../record-list/record-list?groupId=' + groupId,
    })
  },

  /**
    * 删除群
    */
  deleteGroup: function (event) {
    this.data.canNavigate = false
    var that = this
    var index = event.currentTarget.dataset.index
    var groupList = this.data.groupList
    var group = groupList[index]
    var userGroupMapList = this.data.userGroupMapList
    wx.showModal({
      title: '确定删除此群？',
      success: function (res) {
        that.data.canNavigate = true
        if (!res.confirm) {
          return
        }
        userGroupMapList.forEach(function (userGroupMap, i, a) {
          if (group.groupId == userGroupMap.get("groupId")) {
            util.showLoading()
            userGroupMap.destroy().then(function (success) {
              // 删除成功
              that.getMyGroups()
            }, function (error) {
              util.hideLoading()
              // 删除失败
              console.log("群删除失败")
              console.log(err)
            });
            return
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: "一起来记录群印记！",
      path: 'pages/group-list/group-list',
      success(res) {
        that.getShareInfo(res.shareTickets[0])
      }
    }
  },

  /**
   * 获取并处理分享信息
   */
  getShareInfo: function (shareTicket) {
    util.showLoading()
    var that = this
    wx.getShareInfo({
      shareTicket: shareTicket,
      success(res) {
        var user = that.data.user
        var paramsJson = {
          sessionKey: user.attributes.authData.lc_weapp.session_key,
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        AV.Cloud.run('decryptData', paramsJson).then(function (data) {
          console.log(data)
          //检查数据库中是否存在该群
          var query = new AV.Query('Group')
          query.equalTo('groupId', data.openGId)
          // 执行查询
          query.first().then(function (group) {
            if (group == null) {
              //没有则保存该群，并建立联系
              var group = new AV.Object('Group')
              group.set('groupId', data.openGId)
              that.saveUserGroupMap(user, group, "群")
            } else {
              //检查是否已建立联系
              var userQuery = new AV.Query('UserGroupMap')
              userQuery.equalTo('user', user)
              var groupQuery = new AV.Query('UserGroupMap')
              groupQuery.equalTo('group', group)
              // 组合查询
              var mapQuery = AV.Query.and(userQuery, groupQuery)
              mapQuery.first().then(function (userGroupMap) {
                if (userGroupMap == null) {
                  //没有则建立联系
                  that.saveUserGroupMap(user, group, "群")
                } else {
                  util.hideLoading()
                }
              }, function (err) {
                util.hideLoading()
                // 处理调用失败
                console.log("查找用户、群关系失败")
                console.log(err)
              })
            }
          }, function (err) {
            util.hideLoading()
            // 处理调用失败
            console.log("群查询失败")
            console.log(err)
          })
        })
      },
      fail(err) {
        util.hideLoading()
        // 处理调用失败
        console.log("获取分享信息失败")
        console.log(err)
        wx.showModal({
          title: '要转发到群哟~',
          showCancel: false
        })
      }
    })
  },

  /**
   * 建立用户和群之间的关系
   */
  saveUserGroupMap: function (user, group, groupNickName) {
    var that = this
    var userGroupMap = new AV.Object('UserGroupMap')
    userGroupMap.set('user', user)
    userGroupMap.set('group', group)
    userGroupMap.set('groupNickName', groupNickName)
    userGroupMap.save().then(function (res) {
      util.hideLoading()
      // 成功保存
      console.log("成功建立用户和群的关系")
      console.log(res)
      that.getMyGroups()
    }, function (error) {
      util.hideLoading()
      // 异常处理
      console.log("建立用户和群的关系失败")
      console.error(error.message)
    })
  }
})