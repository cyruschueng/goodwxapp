// detail.js
var util = require('../../utils/util.js');
var common = require('../../utils/common.js');
var Bmob = util.Bmob;
var app = getApp()



//加入项目通知 给客户发
function newOneJoin(e, pro_title, user, nickName) {
  var fId = e.detail.formId;
  var temp = {
    "touser": user,
    "template_id": "fczEzaxPxcLRINlLk8VxYifX6cXAyRSz0m9p37CtSGM",
    "page": "",
    "form_id": fId,
    "data": {
      "keyword1": {
        "value": pro_title,
        "color": "#173177"
      },
      "keyword2": {
        "value": nickName
      },
      "keyword3": {
        "value": util.formatTime(new Date())
      }
    },
    "emphasis_keyword": "keyword1.DATA"
  }
  Bmob.sendMessage(temp).then(function (obj) {
    console.log('发送成功')
  },
    function (err) {
      console.log(err)
      common.showTip('失败' + err)
    });
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {},
    hidden: false,
    userInfo: {},
    people: {},
    isJoinin: false,
    owner: {},
    trueowner: {},
    ownerid: null,
    proid: null,
    pro_own: {},
    isSelected: false,
    //owner: new Bmob.User()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var currentUser = Bmob.User.current();
    var id = options.id
    var op = options.op
    var that = this;
    that.setData({
      proid: id,
      ownerid: currentUser.id
    });
    util.getDetail(id).then(res => {
      that.setData({
        result: res.data,
        owner: res.user
      });
      console.log(that.data.owner.id)
      util.getUser(that.data.owner.id).then(res => {
        that.setData({
          trueowner: res.data,
        });
        console.log(that.data.trueowner)
      })
    });
    /*
    util.getProjectStatus(id).then(res => {
      that.setData({
        pro_own: res.data,
      });
    });*/
    util.getPeople(id).then(res => {

      that.setData({
        people: res.data,
      });
    });
    util.isJoinin(id, currentUser.id).then(res => {
      that.setData({
        isJoinin: res.data,
      });
    });
    util.isSelected(id, that.data.owner.id, currentUser.id).then(res => {
      that.setData({
        isSelected: res.data,
      });
    });






    /**
        for (var i = 0; i < array.length; i++) {
          var object = array[i];
          console.log(object.id + ' - ' + object.get('title'));
        }*/

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
    var that = this
    console.log(that.data.proid)
    return {
      title: "码赚新项目,点击查看",
      desc: '码赚新项目',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  joinin: function (e) {
    var that = this
    var currentUser = Bmob.User.current();
    util.getPersonalData(currentUser.id).then(res => {
      if (res.content == "" || res.content == null || res.telnum == "" || res.telnum == null) {
        wx.showModal({
          title: '提示',
          content: '请先完善资料，便于客户更好的了解优秀的你！',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '../profile/profile'
              });
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        
      } else {
        var Project_User = Bmob.Object.extend("project_user");
        var puQuery = new Bmob.Query(Project_User);
        puQuery.equalTo("user_id", currentUser.id);
        puQuery.find({
          success: function (results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              //console.log(object.get('pro_id'))
              if (object.get('pro_id') == that.data.result.id) {
                that.setData({
                  hidden: true
                });
                return
              }
            }
            //console.log(that.data.trueowner.get("objectId"))
            var pro_user = new Project_User();
            pro_user.set("user_id", currentUser.id)
            pro_user.set("pro_id", that.data.result.id)
            pro_user.save().then(function (object) {
              //newOneJoin(e, that.data.result.get("title"), that.data.trueowner.get("openid"), currentUser.get("nickName"))
              wx.showToast({
                title: '参加项目成功!',
              });

              wx.switchTab({
                url: '../profile/profile'
              });
            })
          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        })
      }
    })




  },


  userDetail: function (e) {
    var developerid = e.target.dataset.developerid;
    wx.navigateTo({
      url: '../userDetail/userDetail?developerid=' + developerid + "&proid=" + this.data.proid
    })
  },

  chatroom: function (e) {
    var currentUser = Bmob.User.current()
    wx.navigateTo({
      url: '../chatroom/chatroom?ownerid=' + this.data.trueowner.id + "&developerid=" + currentUser.id
    })
  }

})