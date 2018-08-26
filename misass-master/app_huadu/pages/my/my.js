// pages/my/my.js
var trim = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    status: 0,   //0为求职者，1为企业
    show: 0,        //性别选择框显示标志
    sex: '',        //性别值
    workInfo: {},
    inputEdit: true,   //输入框是否可修改
    headImg: '',
    wechaName: '',
    name: '',
    IDNum: '',
    age: '',
    companyName: '',
    companyNum: '',
    companyAddr: '',
    companWokAddr: '',
    companyFa: '',
    phone: '',
    username: '',
    ipnCode:'',     //验证码
    countdown: '获取验证码',
    timeOut: null, //倒计时时间
    isChange: true,
  },

  //姓名
  checkName: function (e) {
    console.log(e.detail.value);
    this.setData({
      name: trim.trim(e.detail.value)
    })
  },

  //获取验证码
  gainTap: function () {
    var that = this;
    console.log(that.data.phone)
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/Edit_Getcode',
      method: 'POST',
      data: {
        phone: that.data.phone,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if ( res.data.code == '100000' ){
          wx.showModal({
            title: '提示',
            content: res.data.rand,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          if (that.data.isChange) {
                that.data.timeOut = 60;
                that.data.isChange = false;
                that.setData({
                  countdown: that.data.timeOut
                });
                var clearTime = setInterval(function () {
                  that.data.timeOut --
                  that.setData({
                    countdown: that.data.timeOut
                  });
                  if (that.data.timeOut <= 0) {
                    clearInterval(clearTime);
                    that.setData({
                      countdown: '获取验证码'
                    });
                    that.data.isChange = true;
                  };
                }, 1000);
              };
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.error,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

      },
      fail: function (res) {
        console.log(res)
      }

    });
  },

  //验证码
  checkCode: function (e) {
    console.log(e.detail.value);
    this.setData({
      ipnCode: trim.trim(e.detail.value)
    })
  },

  //身份证
  checkID: function (e) {
    console.log(e.detail.value);
    this.setData({
      IDNum: trim.trim(e.detail.value)
    })
  },

  //年龄
  checkAge: function (e) {
    console.log(e.detail.value);
    this.setData({
      age: trim.trim(e.detail.value)
    })
  },

  //手机
  checkPhone: function (e) {
    console.log(e.detail.value);
    this.setData({
      phone: trim.trim(e.detail.value)
    })
  },



  //性别选择
  selectSex: function () {
    if (this.data.show == 0) {
      this.setData({
        show: 1
      })
    } else {
      this.setData({
        show: 0
      })
    }
  },

  //选择男
  selectMan: function (e) {
    this.setData({
      show: 0,
      sex: e.currentTarget.dataset.index
    })
  },

  //选择女
  selectFemale: function (e) {
    this.setData({
      show: 0,
      sex: e.currentTarget.dataset.index
    })
  },

  //修改个人信息
  changeInfo: function () {
    this.setData({
       inputEdit: false,
    })
  },
  //个人手机号码修改跳转
  toPhoneJump: function (e) {
    var that = this;
    if (this.data.inputEdit == false) {
      var dataPhone = that.data.phone;
      wx.navigateTo({
        url: '../phoneJump/phoneJump?status=0',
      })
    }
  },



  //点击我要招人
  toRecruit: function () {
    if (this.data.companyWorkAddr == '') {
      wx.navigateTo({
        url: '../companyInfo/companyInfo',
      });
    } else {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '是否确定切换？',
        confirmColor: '#29b6f6',
        success: function (res) {
          if (res.confirm) {
            //请求切换
            wx.request({
              url: 'https://xcx.misass.com/huadu/index.php?s=/api/user/switch_status',
              method: 'POST',
              data: {
                wecha_id: getApp().globalData.wecha_id,
                status: 1
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                if (res.data.code == '100000') {
                  getApp().globalData.status = 1;
                  that.setData({
                    status: 1,
                    inputEdit: true
                  })
                }
              }
            })
          }
        }
      })
    }
  },

  //提交个人信息
  subInfo: function () {
    var that = this;
    var name = this.data.name;
    var phone = this.data.phone;
    var ipnCode = this.data.ipnCode;
    var orcid = this.data.IDNum;
    var age = this.data.age;
    var sex = this.data.sex;
    var regName = /^[\u2E80-\u9FFF]+$/;                           //Unicode编码中的汉字范围
    var regID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;      //验证身份证
    var regAge = /^[1-9]\d?$|^1[0-4]\d$|^0$|^150$/               //验证年龄

    if (name.length <= 1 || name.length >= 10) {
      wx.showModal({
        content: '姓名长度需两位或两位以上',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else if (!regName.test(name)) {
      wx.showModal({
        content: '名字只能为中文',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else if (!regID.test(orcid)) {
      wx.showModal({
        content: '请输入正确的身份证号码',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else if (!regAge.test(age) || age <= 0) {
      wx.showModal({
        content: '年龄不合法',
        confirmColor: '#29b6f6',
        showCancel: false
      })
    } else {
      console.log(name);
      console.log(orcid);
      console.log(age);
      console.log(sex);
      console.log(phone);
      console.log(ipnCode);
    
      wx.showLoading({
        title: '修改中',
        success: function () {
          setTimeout(function () {
            wx.request({
              url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/user_information',
              method: 'POST',
              data: {
                name: name,
                orcid: orcid,
                age: age,
                sex: sex,
                wecha_id: getApp().globalData.wecha_id
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                //console.log(res)
                if (res.data.code == '100000') {
                  wx.request({
                    url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/info',
                    method: 'POST',
                    data: {
                      wecha_id: getApp().globalData.wecha_id
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      that.setData({
                        username: res.data.user.username,
                        name: res.data.user.username,
                        orcid: res.data.user.orcid,
                        age: res.data.user.age,
                        sex: res.data.user.sex,
                        inputEdit: true,
                        phone: res.data.user.telphone
                      })
                      wx.hideLoading();
                      wx.showToast({
                        title: '修改成功'
                      })
                    }
                  })
                } else {
                  wx.hideLoading();
                  wx.showModal({
                    content: res.data.error,
                    showCancel: false,
                    confirmColor: '#29b6f6'
                  })
                }
              }
            })
          }, 1500)
        }
      })
    }
  },

  //修改企业信息
  toCompanyInfo: function () {
    wx.navigateTo({
      url: '../companyInfo/companyInfo',
    })
  },



  //切换到个人版
  toChangeStatus: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确定切换？',
      confirmColor: '#29b6f6',
      success: function (res) {
        if (res.confirm) {
          //请求切换
          wx.request({
            url: 'https://xcx.misass.com/huadu/index.php?s=/api/user/switch_status',
            method: 'POST',
            data: {
              wecha_id: getApp().globalData.wecha_id,
              status: 0
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.code == '100000') {
                getApp().globalData.status = 0;
                that.setData({
                  status: 0
                })
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/info',
      method: 'POST',
      data: {
        wecha_id: getApp().globalData.wecha_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          inputEdit: true,
          headImg: res.data.user.img,
          wechaName: res.data.user.wecha_name,
          id: 1000+res.data.user.id,
          name: res.data.user.username,
          username: res.data.user.username,
          age: res.data.user.age,
          IDNum: res.data.user.orcid,
          sex: res.data.user.sex,
          companyName: res.data.user.enterprise_name,          //企业名称
          companyNum: res.data.user.business,            //企业工商号
          companyAddr: res.data.user.address,              //企业地址
          companyWorkAddr: res.data.user.hiring_address,           //企业招聘地址
          companyFa: res.data.user.enterprise_username,             //法人代表
          phone: res.data.user.telphone,               //联系方式
        })
      }
    })
    this.setData({
      status: getApp().globalData.status
    })
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