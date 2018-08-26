//index.js
//获取应用实例

const app = getApp()
Page({
  data: {
    userInfo: {},
    integral: 0,
    grade: '小白',
    class_list: ['优粮大学一班', '优粮大学二班', '优粮大学三班', '优粮大学四班'],
    class_list_id: [],
    class_index: 0,
    region: '北京, 北京市, 朝阳区',
    descript:'一句话介绍自己',
    brand:'请输入您经营门店的名称',
    hidden: false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.fetchData(app.globalData.userInfo,options);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.fetchData(res.userInfo, options);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.fetchData(res.userInfo, options);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
     
  },
  fetchData: function (userInfo, options) {
    console.log(userInfo);
    var that = this;
    var class_name = '优粮大学一班';
    wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          //获取openid接口  
          url: 'https://youliang.shaoziketang.com/user_info.php',
          data: {
            code: res.code,
          },
          method: 'POST',
          success: function (res) {
            console.log(res );
            
            for (var sss in res.data.info.class_list) {
              console.log(res.data.info.class_list[sss].class_name);
              that.data.class_list[sss] = res.data.info.class_list[sss].class_name;
              that.data.class_list_id[sss] = res.data.info.class_list[sss].id;
              if (res.data.info.class_list[sss].class_name == res.data.info.class_name)
              {
                that.setData({
                  class_index:sss,
                  
                })
              }
            }
            var des = '一句话介绍自己';
            var reg='北京, 北京市, 朝阳区';
            var bra='请输入您经营门店的名称';
            var gra='小白';
            if (res.data.info.descript.length>0) { des = res.data.info.descript;}
            if (res.data.info.brand.length > 0) { bra = res.data.info.brand; }
            if (res.data.info.area.length > 0) { reg = res.data.info.area; }
            if (res.data.info.class_name.length > 0) { class_name = res.data.info.class_name; }
            if (res.data.info.grade.length >0) { gra = res.data.info.grade; }
            that.setData({
              integral: res.data.info.integral,
              descript: des,
              array: class_name,
              region: reg,
              grade: gra,
              class_list: that.data.class_list,
              brand: bra,
              hidden: true,
            })
          }
        })
      }
      
    })
    setTimeout(function () {
      that.setData({
        hidden: true
      })
    }, 1500)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var cl = e.detail.value;
    this.setData({
      class_index: e.detail.value
    })
    var that = this;
    var class_ban = that.data.class_list[cl];
    var class_id = that.data.class_list_id[cl];
    wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          //获取openid接口  
          url: 'https://youliang.shaoziketang.com/update.php',
          data: {
            code: res.code,
            class_name: class_ban,
            class_id: class_id
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
     wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          //获取openid接口  
          url: 'https://youliang.shaoziketang.com/update.php',
          data: {
            code: res.code,
            area: e.detail.value[0] + ',' + e.detail.value[1] + ',' + e.detail.value[2],
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
          }
        })
      }
    })


  },
  evaSubmit: function (eee) {
    var that = this;
    console.log(that.textcontent);
    //提交(自定义的get方法)
    wx.redirectTo({
      url: '../home/home',
    })
  }
}) 