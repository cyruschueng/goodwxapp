import { goToUser, goToShare, goToMyWallet, goToUserInfo, reToMainPage } from "../../libs/router";
let app = getApp();
let PATH = app.globalData.PATH;


let IMG_PATH = app.globalData.IMG_PATH;


let userInfoSync = wx.getStorageSync("userInfo");
let time = 60;
let again = true;

Page({
  data:{
    IMG_PATH: IMG_PATH,
    phone: '',
    codeTrue: '',
    code: '',
    maskState: false,
    getCodeText: '获取验证码',
    user:{
      nickName:'',
      name: '',
      age: null,
      sex: 0,
      mobile: '',
      idCard: '',
    }
  },
  onLoad: function (option) {
    let that = this;
    app.getUserInfo(function (userInfo) {
      console.log(userInfo);
      wx.request({
        url: PATH + "/account-service/user/getUserInfoById",
        header:{
          'Access-Token': app.globalData.accessToken, 
        },
        method: "GET",
        data: { 
          id: app.globalData.userId 
        },
        success: function (res) {
          console.log(res);
          console.log(userInfo.avatarUrl);
          if (res.data.status == 200) {
            // res.data.user.mobile = parseInt(res.data.user.mobile)
            that.setData({
              user: {
                name: res.data.user.name || '',
                nickName: res.data.user.nickName || '',
                sex: res.data.user.sex || 1,
                profileImage: res.data.user.profileImage,
                age: res.data.user.age || null,
                mobile: res.data.user.mobile || null
              },

            });
         
            that.data.user.nickName = userInfo.nickName;//获取昵称
            that.data.user.profileImage = userInfo.avatarUrl;
            
          } else {
            that.setData({
              user: {
                nickName: userInfo.nickName,
                name: '',
                age: null,
                sex: 0,
                mobile: null,
                idCard: '',
                profileImage: userInfo.avatarUrl
              }
            });
          }
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          // console.log(res);
        }
      });
      that.setData({
        userInfo: userInfo,
        user: that.data.user
      })
    });
  },
  // 用户名
  bindinputName: function (e) {
    let that = this;
    this.data.user.name = e.detail.value;
    this.setData({
      user: that.data.user
    });
  },
  // 昵称
  bindinputNick: function (e) {
    let that = this;
    this.data.user.nickName = e.detail.value;
    this.setData({
      user: that.data.user
    });
  },
  // 用户年龄
  bindinputAge: function (e) {
    let that = this;
    this.data.user.age = e.detail.value;
    this.setData({
      user: that.data.user
    });
  },
  // 手机
  bindTestPhone: function () {
    this.setData({
      maskState: true,
    });
  },

  bindCloseMask: function () {
    console.log(0);
    this.setData({
      phone: "",
      code: "",
      maskState: false,
    });
  },
  // 手机号码
  bindPhone: function (e) {
    let that = this;
    // this.data.user.mobile = e.detail.value;
    this.setData({
      phone: e.detail.value
    });
  },
  bindCode: function (e) {
    let that = this;
    that.setData({
      code: e.detail.value
    });
  },
  // 获取验证码
  bindGetCode: function () {
    let that = this;
    let data = this.data;
    if (data.phone.length != 11) {
      wx.showToast({
        title: "不是正确的手机号码",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (!checkPhone(data.phone)) {
      wx.showToast({
        title: "不是正确的手机号码",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (again == true) {
      again = false;
      let timeInterval = setInterval(function () {
        console.log(time);
        time--;
        that.setData({
          getCodeText: time + '秒后再次获取'
        })
        if (time < 0) {
          that.setData({
            getCodeText: '获取验证码'
          })
          clearInterval(timeInterval);
          time = 60;
          again = true;
        }
      }, 1000);
    } else {
      return;
    }
    wx.request({
      url: PATH + "/resource-service/sms/sendValiCode",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "GET",
      data: {
        phone: that.data.phone
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 200) {
          that.setData({
            codeTrue: res.data.valiCode
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          });
        }
      }
    })
  },
  // 提交手机号码
  bindSubCode: function () {
    let that = this;
    let data = this.data;
    console.log(data);
    if (data.phone.length != 11) {
      wx.showToast({
        title: "不是正确的手机号码",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (!checkPhone(data.phone)) {
      wx.showToast({
        title: "不是正确的手机号码",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (data.code == '') {
      wx.showToast({
        title: "验证码不能为空",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (data.codeTrue != data.code) {
      wx.showToast({
        title: "验证码不正确",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    that.data.user.mobile = that.data.phone;
    wx.showToast({
      title: "手机验证成功",
      icon: 'success',
      duration: 1500,
      success: function () {
        setTimeout(function () {
          that.setData({
            user: that.data.user,
            phone: "",
            code: "",
            codeTrue: "",
            maskState: false,
          });
        }, 1500)
      }
    });
    
  },
  // 身份证
  bindinputIdCard: function (e) {
    let that = this;
    this.data.user.idCard = e.detail.value;
    this.setData({
      user: that.data.user
    });
  },
  // 性别
  sexChange: function (e) {
    let that = this;
    this.data.user.sex = e.detail.value;
    this.setData({
      user: that.data.user
    });
  },
  // 提交
  submit: function () {
    // console.log(app.globalData);
    let that = this;
    let user = that.data.user;
    user.userId = app.globalData.userId;
    if (user.nickName == "") {
      wx.showToast({
        title: "昵称不能为空",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (user.name == "") {
      wx.showToast({
        title: "姓名不能为空",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (user.sex == 0) {
      wx.showToast({
        title: "请选择性别",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (user.age == null) {
      wx.showToast({
        title: "请输入年龄",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (user.name.length < 2) {
      wx.showToast({
        title: "姓名过短",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    if (user.mobile == null) {
      wx.showToast({
        title: "请绑定手机",
        icon: 'loading',
        duration: 1000
      });
      return false;
    }
    // if (!checkPhone(user.mobile)) {
    //   wx.showToast({
    //     title: "电话号码格式不正确",
    //     icon: 'loading',
    //     duration: 1000
    //   });
    //   return false;
    // }
    // console.log({ a: user.idCard, b: user.userId, c: user.nickName, d: user.name, e: user.age, f: user.sex, g: user.mobile, h: user.profileImage});
    wx.request({
      url: PATH + "/account-service/user/updateUserInfo",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "POST",
      data: {
        userId: user.userId,
        nickName: user.nickName,
        name: user.name,
        age: user.age,
        sex: user.sex,
        mobile: user.mobile,
        idCard: '',
        profileImage: user.profileImage
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 200) {
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                // reToMainPage();
                wx.reLaunch({
                  url: '../main/main'
                });
              },1000)
            }
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon:"loading",
            duration: 1500
          })
        }
      }
    })
  }
})
function timeFn(that) {
  console.log('start');
  
}
function checkPhone(num) {
  return (/^1(3|4|5|7|8)\d{9}$/.test(num)) ? true : false;
}