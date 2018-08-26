// pages/membership/membership.js
var app = getApp();
//查询下级列表
var queryLower = function (that, sort, state) {
  wx.removeStorageSync("memberList")
  var str = {
    "OperationType": "10016",
    "uid": wx.getStorageSync("uid"),
    "sort": sort,
    "state": state,
    "page": that.data.page
  }
  console.log(sort)
  console.log(state)
  console.log(that.data.page)
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10016)
      console.log(res)
      if (res.data.CODE == "00") {
        if (that.data.page == 1) {
          wx.setStorageSync("memberList", res.data.data)
        } else {
          var member = that.data.memberList;
        }
        if (res.data.data.length) {
          for (var i = 0; i < res.data.data.length; i++) {
            //订单状态的处理状态状态（0：；1：；2：；3：；4：，5：,6:）
            if (res.data.data[i].state == 0) {
              res.data.data[i].state = "注册中"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "未审核"
            } else if (res.data.data[i].state == 2) {
              res.data.data[i].state = "审核通过"
            } else if (res.data.data[i].state == 3) {
              res.data.data[i].state = "开通"
            } else if (res.data.data[i].state == 4) {
              res.data.data[i].state = "退回"
            } else if (res.data.data[i].state == 5) {
              res.data.data[i].state = "禁用"
            } else if (res.data.data[i].state == 6) {
              res.data.data[i].state = "所有"
            }

            res.data.data[i].createTime = res.data.data[i].createTime.split(" ")[0];
            if (res.data.data[i].realname.length <= 3 && res.data.data[i].realname.length > 1) {
              res.data.data[i].realname = res.data.data[i].realname.slice(0, 1)
            } else {
              res.data.data[i].realname = res.data.data[i].realname.slice(0, 2)
            }

            if (that.data.page == 1) {
            } else {
              member.push(res.data.data[i])
            }
          }

          if (that.data.page == 1) {
            that.setData({
              show: false,
              // state: arr,
              memberList: res.data.data
            })
            console.log(that.data.memberList)
          } else {
            that.setData({
              memberList: member
            })
            console.log(member)
          }
        } else {
          if (that.data.page == 1) {
            that.setData({
              show: true
            })
          } else {
            wx.showToast({
              title: '没有数据了',
              image: "../../images/icon/f.png",
              duration: 1000,
              mask: true,
            })
            that.data.page--;
            console.log(that.data.page)
          }
        }
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.MESSAGE,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    sort: 0, //下级类型
    state: "",  //用户状态
    show: '',
    // show1: false,
    // dec: "未消费",
    title: "",
    isSubmit: "",//判断是否消费
    memberList: []  //下级用户数据
  },

  //拨打电话
  call: function (e) {
    var that = this;
    console.log(e)
    var order = e.currentTarget.dataset.index;
    wx.showModal({
      title: '您是否拨打',
      content: that.data.memberList[order].mobile,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: that.data.memberList[order].mobile,
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
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
    var that = this;
    if (wx.getStorageSync("userToMember")) {
      if (wx.getStorageSync("order") == 0) {
        that.setData({
          sort: 0,
          title: "未注册"
        })
      } else if (wx.getStorageSync("order") == 1) {
        that.setData({
          sort: 3,
          show1: true,
          title: "已开通"
        })
      } else if (wx.getStorageSync("order") == 2) {
        that.setData({
          sort: 5,
          title: "禁止"
        })
      }
      wx.setNavigationBarTitle({
        title: that.data.title
      })
      queryLower(that, "All", that.data.sort)
    } else {
      if (wx.getStorageSync("order") == 0) {
        that.setData({
          sort: "Agpro"
        })
      } else if (wx.getStorageSync("order") == 1) {
        that.setData({
          sort: "Agcity"
        })
      } else if (wx.getStorageSync("order") == 2) {
        that.setData({
          sort: "Agcount"
        })
      } else if (wx.getStorageSync("order") == 3) {
        that.setData({
          sort: "Mer"
        })
      }
      that.setData({
        show1: true
      })
      queryLower(that, that.data.sort, 6)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.removeStorageSync("userToMember")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync("userToMember")
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
    var that = this;

    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.data.page++;
    if (wx.getStorageSync("userToMember")) {
      queryLower(that, "All", that.data.sort)
    } else {
      queryLower(that, that.data.sort, 6)
    }
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})