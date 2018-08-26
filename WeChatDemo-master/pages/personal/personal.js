// pages/personal/personal.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    schoolname: [],
    alinfo: [],
    schoolIndex: null,
    major:[],
    majorindex: null,
    majorname: [],
    industry: [],
    industryindex: null,
    industryname: [],
    Education: ["小学","初中","高中","大学","硕士","博士"],
    educationIndex: null,
    date: '',
    birthday: '',
    isAgree: true,
    interestVal: '',
    nameVal: '',
    telVal: '',
    weChatVal: '',
    schoolClassVal: '',
    companyVal: '',
    positionVal: '',
    personalInfoVal: '',
    addressVal: '',
    endDay: '',
    is_private: false,
    privatetext: '公开，所有校友可见'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
    })
    if (app.globalData.userInfo) {
      wx.hideLoading();
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.hideLoading();
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          wx.hideLoading();
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var _this = this;
    var openid = wx.getStorageSync('openid');
    if (openid !==''){
      wx.request({
        url: app.globalData.url + 'apiUserInfo',
        data: { openid: app.globalData.openid },
        method: 'POST',
        success: function (res2) {
          wx.request({
            url: app.globalData.url + 'apiSchool',
            success: function (res) {
              var alinfo = res.data;
              var schoolname = new Array();
              for (var i = 0; i < res.data.length; i++) {
                schoolname.push(res.data[i].schoolname);
              }
              _this.setData({
                schoolname: schoolname,
                alinfo: alinfo
              });
              wx.request({
                url: app.globalData.url + '/settingApi/0',
                success: function (res) {
                  var majorname = new Array();
                  for (var i = 0; i < res.data.length; i++) {
                    majorname.push(res.data[i].name);
                  }
                  _this.setData({
                    major: res.data,
                    majorname: majorname
                  });
                  wx.request({
                    url: app.globalData.url + '/settingApi/1',
                    success: function (res) {
                      var industryname = new Array();
                      for (var i = 0; i < res.data.length; i++) {
                        industryname.push(res.data[i].name);
                      }
                      _this.setData({
                        industry: res.data,
                        industryname: industryname
                      });
                      var school_info = res2.data.school_info;
                      var schoolindexs = null;
                      if (school_info != null) {
                        for (var i = 0; i < _this.data.schoolname.length; i++) {
                          if (_this.data.schoolname[i] == school_info.schoolname) {
                            schoolindexs = i;
                          }
                        }
                      }
                      var zhuanye_info = res2.data.zhuanye_info;
                      var majorindexs = null;
                      if (zhuanye_info != null) {
                        for (var j = 0; j < _this.data.majorname.length; j++) {
                          if (_this.data.majorname[j] == zhuanye_info.name) {
                            majorindexs = j;
                          }
                        }
                      }
                      var Educations = res2.data.xueli;
                      var educationIndexs = null;
                      if (Educations != null) {
                        for (var z = 0; z < _this.data.Education.length; z++) {
                          if (_this.data.Education[z] == Educations) {
                            educationIndexs = z;
                          }
                        }
                      }
                      var hangye_info = res2.data.hangye_info;
                      var industryindexs = null;
                      if (hangye_info != null) {
                        for (var a = 0; a < _this.data.industryname.length; a++) {
                          if (_this.data.industryname[a] == hangye_info.name) {
                            industryindexs = a;
                          }
                        }
                      }
                      var myDate = new Date();
                      var schooltime = res2.data.school_time != null ? res2.data.school_time : '';
                      var birthday = res2.data.birthday != null ? res2.data.birthday : '';
                      var endDay = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
                      if (res2.data.isopen == 0){
                        _this.setData({
                          is_private: false,
                          privatetext: '公开，所有校友可见'
                        })
                      }else{
                        _this.setData({
                          is_private: true,
                          privatetext: '不公开，只有管理员可见'
                        })
                      }
                      _this.setData({
                        nameVal: res2.data.name,
                        telVal: res2.data.tel,
                        weChatVal: res2.data.wx_number,
                        schoolIndex: schoolindexs,
                        majorindex: majorindexs,
                        educationIndex: educationIndexs,
                        date: schooltime,
                        schoolClassVal: res2.data.banji,
                        companyVal: res2.data.company,
                        positionVal: res2.data.zhiwei,
                        industryindex: industryindexs,
                        personalInfoVal: res2.data.content,
                        addressVal: res2.data.address,
                        birthday: birthday,
                        interestVal: res2.data.aihao,
                        endDay: endDay
                      });
                      wx.hideLoading();
                    }
                  })
                }
              })
            }
          });
        },
        fail: function (res) {
        }
      })
    }else{
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiUserInfo',
          data: { openid: app.globalData.openid },
          method: 'POST',
          success: function (res2) {
            wx.request({
              url: app.globalData.url + 'apiSchool',
              success: function (res) {
                var alinfo = res.data;
                var schoolname = new Array();
                for (var i = 0; i < res.data.length; i++) {
                  schoolname.push(res.data[i].schoolname);
                }
                _this.setData({
                  schoolname: schoolname,
                  alinfo: alinfo
                });
                wx.request({
                  url: app.globalData.url + '/settingApi/0',
                  success: function (res) {
                    var majorname = new Array();
                    for (var i = 0; i < res.data.length; i++) {
                      majorname.push(res.data[i].name);
                    }
                    _this.setData({
                      major: res.data,
                      majorname: majorname
                    });
                    wx.request({
                      url: app.globalData.url + '/settingApi/1',
                      success: function (res) {
                        var industryname = new Array();
                        for (var i = 0; i < res.data.length; i++) {
                          industryname.push(res.data[i].name);
                        }
                        _this.setData({
                          industry: res.data,
                          industryname: industryname
                        });
                        var school_info = res2.data.school_info;
                        var schoolindexs = null;
                        if (school_info != null) {
                          for (var i = 0; i < _this.data.schoolname.length; i++) {
                            if (_this.data.schoolname[i] == school_info.schoolname) {
                              schoolindexs = i;
                            }
                          }
                        }
                        var zhuanye_info = res2.data.zhuanye_info;
                        var majorindexs = null;
                        if (zhuanye_info != null) {
                          for (var j = 0; j < _this.data.majorname.length; j++) {
                            if (_this.data.majorname[j] == zhuanye_info.name) {
                              majorindexs = j;
                            }
                          }
                        }
                        var Educations = res2.data.xueli;
                        var educationIndexs = null;
                        if (Educations != null) {
                          for (var z = 0; z < _this.data.Education.length; z++) {
                            if (_this.data.Education[z] == Educations) {
                              educationIndexs = z;
                            }
                          }
                        }
                        var hangye_info = res2.data.hangye_info;
                        var industryindexs = null;
                        if (hangye_info != null) {
                          for (var a = 0; a < _this.data.industryname.length; a++) {
                            if (_this.data.industryname[a] == hangye_info.name) {
                              industryindexs = a;
                            }
                          }
                        }
                        var schooltime = res2.data.school_time != null ? res2.data.school_time : '';
                        var birthday = res2.data.birthday != null ? res2.data.birthday : '';
                        var myDate = new Date();
                        var endDay = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDay();
                        _this.setData({
                          nameVal: res2.data.name,
                          telVal: res2.data.tel,
                          weChatVal: res2.data.wx_number,
                          schoolIndex: schoolindexs,
                          majorindex: majorindexs,
                          educationIndex: educationIndexs,
                          date: schooltime,
                          schoolClassVal: res2.data.banji,
                          companyVal: res2.data.company,
                          positionVal: res2.data.zhiwei,
                          industryindex: industryindexs,
                          personalInfoVal: res2.data.content,
                          addressVal: res2.data.address,
                          birthday: birthday,
                          interestVal: res2.data.aihao,
                          endDay: endDay
                        });
                        wx.hideLoading();
                      }
                    })
                  }
                })
              }
            });
            var school_info = res.data.school_info;
            var schoolindexs = null;
            if (school_info != null) {
              for (var i = 0; i < _this.data.schoolname.length; i++) {
                if (_this.data.schoolname[i] == school_info.schoolname) {
                  schoolindexs = i;
                }
              }
            }
            var zhuanye_info = res.data.zhuanye_info;
            var majorindexs = null;
            if (zhuanye_info != null) {
              for (var j = 0; j < _this.data.majorname.length; j++) {
                if (_this.data.majorname[j] == zhuanye_info.name) {
                  majorindexs = j;
                }
              }
            }
            var Educations = res.data.xueli;
            var educationIndexs = null;
            if (Educations != null) {
              for (var z = 0; z < _this.data.Education.length; z++) {
                if (_this.data.Education[z] == Educations) {
                  educationIndexs = z;
                }
              }
            }
            var hangye_info = res.data.hangye_info;
            var industryindexs = null;
            if (hangye_info != null) {
              for (var a = 0; a < _this.data.industryname.length; a++) {
                if (_this.data.industryname[a] == hangye_info.name) {
                  industryindexs = a;
                }
              }
            }
            var schooltime = res.data.school_time != null ? res.data.school_time : '';
            var birthday = res.data.birthday != null ? res.data.birthday : '';
            _this.setData({
              nameVal: res.data.name,
              telVal: res.data.tel,
              weChatVal: res.data.wx_number,
              schoolIndex: schoolindexs,
              majorindex: majorindexs,
              educationIndex: educationIndexs,
              date: schooltime,
              schoolClassVal: res.data.banji,
              companyVal: res.data.company,
              positionVal: res.data.zhiwei,
              industryindex: industryindexs,
              personalInfoVal: res.data.content,
              addressVal: res.data.address,
              birthday: birthday,
              interestVal: res.data.aihao
            });
          },
          fail: function (res) {
          }
        })
      }
      wx.hideLoading();  
    }
  },
  /**
   * 同意协议
   */
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  /**
   * 关联日期
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 关联学校select
   */
  bindSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  /**
   * 关联学历select
   */
  bindEducationChange: function (e) {
    this.setData({
      educationIndex: e.detail.value
    })
  },
  /**
   * 关联专业select
   */
  bindMajorChange: function (e) {
    this.setData({
      majorindex: e.detail.value
    })
  },
  /**
   * 关联专业select
   */
  bindIndustryChange: function (e) {
    this.setData({
      industryindex: e.detail.value
    })
  },
  /**
   * 关联生日
   */
  bindBirthdayChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    var _this = this;
    var openid = wx.getStorageSync('openid');
    if (openid !== '') {
      wx.request({
        url: app.globalData.url + 'apiAddUser',
        data: { openid: openid },
        method: 'POST',
        success: function (res) {
        },
        fail: function (res) {
        }
      })
    } else {
      app.openIdReadyCallback = res => {
        var json = JSON.parse(res.data);
        openid = json.openid;
        wx.request({
          url: app.globalData.url + 'apiAddUser',
          data: { openid: openid },
          method: 'POST',
          success: function (res) {
          },
          fail: function (res) {
          }
        })
      }
    }
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
   * 表单提交
   */
  formSubmit: function (e) {
    if (!this.data.isAgree) {
      wx.showModal({
        title: '',
        content: '您还没有阅读并同意相关条款',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入名字',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.name.length > 6) {
      wx.showModal({
        title: '',
        content: '请输入6字以内的名字',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.telPhone == "" || e.detail.value.telPhone == null) {
      wx.showModal({
        title: '',
        content: '您还没有输入手机号码',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.schoolId == null) {
      wx.showModal({
        title: '',
        content: '您还没有关联学校',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.majorId == null) {
      wx.showModal({
        title: '',
        content: '您还没有选择专业',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.Education == null) {
      wx.showModal({
        title: '',
        content: '您还没有选择学历',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.schoolOpenTime == null || e.detail.value.schoolOpenTime == '') {
      wx.showModal({
        title: '',
        content: '您还没有选择入学时间',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.schoolClass == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入班级',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.company == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入公司',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.positon == "") {
      wx.showModal({
        title: '',
        content: '您还没有输入职位',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (e.detail.value.industryId == null) {
      wx.showModal({
        title: '',
        content: '您还没有关联行业',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var tel = "";
    if (e.detail.value.telPhone != ""){
      tel = e.detail.value.telPhone.trim();
      if(tel.length != 11){
        wx.showModal({
          title: '',
          content: '手机号输入格式不正确',
          showCancel: false,
          confirmText: '知道了'
        })
        return
      }
    }
    //公开信息为0，不公开为1
    var isopen = e.detail.value.private ? 1 : 0;
    var person = {
      openid: app.globalData.openid,
      name: e.detail.value.name,
      tel: tel,
      wx_number: e.detail.value.weChatId,
      school_id: e.detail.value.schoolId,
      zhuanye_id: e.detail.value.majorId,
      xueli: this.data.Education[e.detail.value.Education],
      school_time: e.detail.value.schoolOpenTime,
      banji: e.detail.value.schoolClass,
      company: e.detail.value.company,
      zhiwei: e.detail.value.positon,
      hangye: e.detail.value.industryId,
      content: e.detail.value.personalInfo,
      address: e.detail.value.address,
      birthday: e.detail.value.birthday,
      aihao: e.detail.value.interest,
      headImg: this.data.userInfo.avatarUrl,
      isopen: isopen
    }
    wx.showLoading({
      title: '数据加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.url + 'apiEditUser',
      data: person,
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        var pagelength = getCurrentPages().length;
        if (pagelength == 1){
          wx.switchTab({
            url: '../alumnilist/alumnilist',
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '保存失败',
          duration: 2000,
          mask: true
        })
      }
    })
  },
  switchChange: function(e){
    var _this = this;
    if (e.detail.value){
      _this.setData({
        privatetext: '不公开，只有管理员可见'
      })
    }else{
      _this.setData({
        privatetext: '公开，所有校友可见'
      })
    }
  }
})