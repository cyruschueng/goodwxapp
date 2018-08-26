var util = require('../../utils/util.js');
var Bmob = util.Bmob;
var app = getApp()
var inputinfo = "";



Page({
  data: {
    userInfo: {},
    complete: false,
    result: {},
    modifyType: "",
    animationData: "",
    showModalStatus: false,
    num: 0
  },
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }

    var currentId = options.currentId;
    
    util.getPersonalData(currentId).then(res => {
      that.setData({
        result: res.data,
        complete: res.ret
      });
      console.log(that.data.complete)
    });


    //调用应用实例的方法获取全局数据

  },

  bindInput: function (e) {
    this.setData({
      num: e.detail.value.length
    })
  },

  personalData: function (event) {
    var currentUser = Bmob.User.current()
    var that = this;
    var contact = event.detail.value.contact;
    var weixin = event.detail.value.weixin;
    var qq = event.detail.value.qq;
    var content = event.detail.value.content;

    that.setData({
      loading: true
    })
    util.addPersonalData(currentUser.id, contact, weixin, qq, content).then(res => {
      var that = this
      console.log(res);
      wx.showToast({
        title: '保存个人资料成功',
        success: function(result){
          wx.switchTab({
            url: '../profile/profile'
          });
        }
      });
      
      that.setData({
        hidden: true
      });
    })
  },






  //对话框
  showModal: function () {
    // 显示遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  toModifyData: function (e) {
    this.setData({
      modifyType: e.target.dataset.content
    });
    if (this.data.showModalStatus) {
      this.hideModal();
    } else {
      this.showModal();
    }
  },
  hideModal: function () {
    // 隐藏遮罩层  
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  click_cancel: function () {
    console.log("点击取消");
    this.hideModal();
  },
  click_ok: function () {
    var that = this
    console.log("点击了确定===，输入的信息为为==", inputinfo);
    var user = that.data.result;
    var modifyType = that.data.modifyType;
    user.set(modifyType, inputinfo);
    user.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        console.log("日记创建成功, objectId:" + result.id);
        that.setData({
          result: result
        });
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');

      }
    });
    this.hideModal();
  },
  input_content: function (e) {
    inputinfo = e.detail.value;

  }

})