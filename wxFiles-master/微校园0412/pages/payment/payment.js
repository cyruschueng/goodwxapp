var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: '',
    pwdl: [0, 0, 0, 0, 0, 0],
    repwd: '',
    repwdl: [0, 0, 0, 0, 0, 0],
    user:null,
    dotrue: false,
    open:false,
    list:[],
  },
  navToMingxi: function () {
    wx.navigateTo({
      url: '/pages/mingxi/mingxi',
    })
  },
  navToRecharge: function () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  navToJifen: function () {
    wx.navigateTo({
      url: '/pages/jifen/jifen',
    })
  },
  dosu: function(){
    this.setData({
      open:false,
      dotrue:false,
      pwd: '',
      pwdl: [0, 0, 0, 0, 0, 0],
      repwd: '',
      repwdl: [0, 0, 0, 0, 0, 0],
    })
  },
  openit: function(){
    this.setData({
      open: true
    })
  },
  clickNum: function (e) {
    var num = e.currentTarget.dataset.num;
    var pwd = this.data.pwd;
    var pwdl = this.data.pwdl;
    var repwd = this.data.repwd;
    var repwdl = this.data.repwdl;
    var dotrue = this.data.dotrue;
    if(num != '#'){
      if (!this.data.dotrue) {
        
        if (pwd.length <= 6) {
          pwd += num;
          console.log(pwd);
          for (var i = 0; i < pwd.length; i++) {
            pwdl[i] = 1;
          }
        }
        if (num == 'c') {
          pwd = '';
          pwdl = [0, 0, 0, 0, 0, 0];
        }
        if (pwd.length == 6) {
          this.setData({ dotrue: true })
        }
        this.setData({ pwd: pwd, pwdl: pwdl })
      } else {
        
        if (pwdl.length <= 6) {
          repwd += num;
          console.log(repwd);
          for (var i = 0; i < repwd.length; i++) {
            repwdl[i] = 1
          }
        }
        if (num == 'c') {
          repwd = '';
          repwdl = [0, 0, 0, 0, 0, 0];
        }
        this.setData({ repwd: repwd, repwdl: repwdl });
        if (repwd.length == 6) {
          var that = this;
          if (pwd == repwd) {
            wx.showToast({
              title: '请稍等...',
              icon: 'loading',
              duration:5000
            })
            wx.request({
              url: app.globalData.IP + 'wx/startbell.do',
              data:{
                userid: app.globalData.ID,
                pass: that.data.pwd,
				        sid:app.globalData.sid
              },
              success: function(res){
                console.log(res)
                that.setData({user:res.data})
                if(res.data.bell != 0){
                  wx.hideToast();
                  wx.showModal({
                    title: '设置成功',
                    content: '系统奖励红包一个',
                    showCancel: false,
                    confirmText:'朕知道了',
                    success: function(res){
                      wx.request({
                        url: app.globalData.IP + 'wx/mymsg.do',
                        data: {
                          userid: app.globalData.ID,
                          start:0
                        },
                        success: function (res) {
                          res.data.money = res.data.money.toFixed(2)
                          that.setData({ user: res.data })
                        }
                      });
                      that.log(0);
                    }
                  })

                }else{
                  wx.showModal({
                    title: '提示',
                    content: '抱歉，设置失败',
                    showCancel: false,
                    confirmText: '朕知道了'
                  })
                }
                that.setData({open:false})
              },
              fail: function(res){
                wx.showToast({
                  title: '服务器跟小三跑了！！！',
                  image:'/images/60.png',
                  duration:800
                })
                that.setData({ open: false })
              }
        
            })
          } else {
            wx.showToast({
              title: '密码不符',
              image: "/images/60.png",
              duration: 800
            })
            pwd = '';
            pwdl = [0, 0, 0, 0, 0, 0];
            repwd = '';
            repwdl = [0, 0, 0, 0, 0, 0];
            this.setData({
              pwd: pwd,
              pwdl: pwdl,
              repwd: repwd,
              repwdl: repwdl,
              dotrue: false
            })
          }
        }
      }
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    app.getWindow(this);
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/mymsg.do',
      data:{
        userid: app.globalData.ID
      },
      success:function(res){
        res.data.money = res.data.money.toFixed(2);
        that.setData({user:res.data})
      }
    });

    that.log(0); 
   
  },

log: function(start){
  var that=this;
    wx.request({
      url: app.globalData.IP + 'wx/mybelllog.do',
      data: {
        userid: app.globalData.ID,
        start: start
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].time = res.data[i].time.substring(0, res.data[i].time.length - 2)
        }
        that.setData({
          list: res.data
        })
        wx.hideLoading()

      }
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
    app.run("进入我的钱包界面");
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/mymsg.do',
      data: {
        userid: app.globalData.ID
      },
      success: function (res) {
        res.data.money = res.data.money.toFixed(2);
        that.setData({ user: res.data })
      }
    });
    that.log(0);
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
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/mymsg.do',
      data: {
        userid: app.globalData.ID
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        res.data.money = res.data.money.toFixed(2);
        that.setData({ user: res.data })
      }
    });
    that.log(0);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var list = that.data.list;
    var start = that.data.list.length;
    wx.request({
      url: app.globalData.IP + 'wx/mybelllog.do',
      data: {
        userid: app.globalData.ID,
        start: start
      },
      success: function (res) {
        wx.hideToast();
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].time = res.data[i].time.substring(0, res.data[i].time.length - 2);
          list.push(res.data[i]);
        }
        that.setData({
          list: list
        })
      }
    })
  }
})