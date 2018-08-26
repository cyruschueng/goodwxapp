// profile.js
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');

var Bmob = util.Bmob;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    hasUserInfo: false,
    userInfo: {},
    myproject: [],
    join_in_porject: [],
    isSelected: [],
    currentId: 0,
    ownerid: null,
    owner: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    if (app.globalData.userInfo) {
      console.log("1")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("2")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      console.log("3")
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //调用应用实例的方法获取全局数据
    /*
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })*/

  },
  canILogin: function (e) {
    console.log("aaaaa")
    if (!wx.canIUse('button.open-type.getUserInfo')) {
      common.showModal('使用旧版微信将无法登陆！', "微信版本太久啦");
    } 
  },
  getUserInfo: function (e) {
    var currentUser = Bmob.User.current()
    var that = this
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.login(e,currentUser.id, (err, res) => {
      if (err) {
        console.log("login function has error");
        that.setData({
          hasUserInfo: false
        })
      }
    })
    /*
    var currentUser = Bmob.User.current()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var userInfo = e.detail.userInfo;
    var nickName = userInfo.nickName;
    var avatarUrl = userInfo.avatarUrl;

    var u = Bmob.Object.extend("_User");
    var query = new Bmob.Query(u);
    // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    query.get(currentUser.id, {
      success: function (result) {
        // 自动绑定之前的账号

        result.set('nickName', nickName);
        result.set("userPic", avatarUrl);
        result.set("openid", wx.getStorageSync('openid'));
        result.save();

      }
    });*/
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    var currentUser = Bmob.User.current();
    //console.log(currentUser);
    var that = this
    that.setData({
      currentId: currentUser.id
    });
    var Project = Bmob.Object.extend("project");
    //创建查询对象，入口参数是对象类的实例
    var query = new Bmob.Query(Project);
    query.equalTo("user", currentUser);
    query.find({
      success: function (results) {
        console.log("发布：共查询到 " + results.length + " 条记录");
        that.setData({
          myproject: results
        })
        // 循环处理查询到的数据
        /*
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));
        }*/
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var Project_User = Bmob.Object.extend("project_user");
    var Project2 = Bmob.Object.extend("project");
    var query2 = new Bmob.Query(Project_User);
    var proQuery = new Bmob.Query(Project2);
    query2.equalTo("user_id", currentUser.id);
    proQuery.matchesKeyInQuery("objectId", "pro_id", query2);
    proQuery.find({
      success: function (results) {
        console.log("参加：共查询到 " + results.length + " 条记录");
        that.setData({
          join_in_porject: results
        })
        // 循环处理查询到的数据
        /*
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));

        }*/
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    //查询被选中的项目
    var Order = Bmob.Object.extend("order");
    var Project3 = Bmob.Object.extend("project");
    var query3 = new Bmob.Query(Order);
    var proQuery2 = new Bmob.Query(Project3);

    query3.equalTo("developerid", currentUser.id)
    proQuery2.matchesKeyInQuery("objectId", "proid", query3);
    //查询单条数据，第一个参数是这条数据的objectId值
    proQuery2.find({
      success: function (results) {
        // 查询成功，调用get方法获取对应属性的值
        console.log("被选中：共查询到 " + results.length + " 条记录");
        that.setData({
          isSelected: results
        })
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));

        }
      },
      error: function (object, error) {
        // 查询失败
      }
    });



  },
  publish_action: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("点击" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&op=' + 'publish',
    })
  },
  joinin_action: function (e) {
    var id = e.currentTarget.dataset.id
    console.log("点击" + e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&op=' + 'joinin',
    })
  },


  about: function (e) {
    common.showModal('码赚是一个软件外包供需信息提供平台！平台本身不参与项目交易过程，如遇纠纷，与本平台无关！', "免责声明");

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

  },

  chatroom: function (e) {
    var currentUser = Bmob.User.current()
    var id = e.currentTarget.dataset.id;
    var that = this


    util.getDetail(id).then(res => {
      that.setData({
        result: res.data,
        owner: res.user
      });
      wx.navigateTo({
        url: '../chatroom/chatroom?ownerid=' + that.data.owner.id + "&developerid=" + currentUser.id
      })
    });




  }
})