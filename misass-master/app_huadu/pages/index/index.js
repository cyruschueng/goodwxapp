//index.js
//获取应用实例
const app = getApp()
var trim = require('../../utils/util.js');
Page({
  data: {
    status: -1,          //用户身份
    workType: [],
    hotWork: [],
    interestJobList: [],
    //已发布职位
    subJobList: [],
    //已发布工作
    subWorkList: [],
    //感兴趣职位
    interestWorkList: [],
    address: '',            //选择地址
    workAddr: '',           //招聘地址
    beginDate: '',         //开始日期
    overDate: '',          //结束日期
    workName: '',           //工作名称
    personNum: '',           //招聘人数
    workDesc: '',           //工作描述
    wi: 0,
    work1: '',                    //一级工种
    work2: '',                      //二级工种
    workAll1: '',                  //工种1
    workAll2: '',                  //工种2
    state: -1,                  //选中时的标志
    state2: -1,                  //工种2选中时的标志
    //存放图片的对象
    imgFilePath: [],
    videoFilePath: '',       //视频地址    
    hotstate: -1,               //热搜选中时的标志
    hotstate2: -1,               //热搜选中时的标志
    workflag: [],
    workType2: [],                  //工种二级列表
    workList: 0,                   //工种列表显示标志
    phone: null,
    cid: null,
    search: [],
    imgFilePathU: [],
    videoFilePathU: '',
    reviseTxt: '管理',
    isRevise: false,
    lat: '',
    lng: '',
    isPublishingWork: 1,  //是否显示管理
  },


  //显示工种
  showSelect: function () {
    this.setData({
      workList: 1,
    })
  },

  //选择工种1级列表
  selectWork: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.itemIndex);
    console.log(e.currentTarget.dataset.value);
    var index = e.currentTarget.dataset.itemIndex;
    var cid = e.currentTarget.dataset.index;
    var work1 = e.currentTarget.dataset.value;
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Classification/classification_list',
      method: 'POST',
      data: {
        cid: cid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          workType2: res.data.result,
          work1: work1,
          work2: '',
          state: index,
          state2: -1
        })
      }
    })
  },

  //选择工种2级列表
  selectWork2: function (e) {
    console.log(e.currentTarget.dataset.value);
    var index = e.currentTarget.dataset.itemIndex;
    var cid = e.currentTarget.dataset.index;
    var work2 = e.currentTarget.dataset.value;
    this.setData({
      work2: work2,
      state2: index,
      cid: cid
    });
  },

  //隐藏工种列表
  hideSelect: function () {
    this.setData({
      workList: 0
    })
  },

  //确定工种
  sureSelect: function () {
    var workAll1 = this.data.work1;
    var workAll2 = this.data.work2;
    if (workAll1 == '') {
      wx.showModal({
        title: '提示',
        content: '您还未选择工种',
        showCancel: false,
        confirmColor: '#29b6f6'
      })
    } else if (workAll2 == '') {
      wx.showModal({
        title: '提示',
        content: '请选择二级工种',
        showCancel: false,
        confirmColor: '#29b6f6'
      })
    } else {
      this.setData({
        workList: 0,
        wi: 1,
        workAll1: workAll1,
        workAll2: workAll2,
        work2: '',
        hotstate: -1,
        hotstate2: -1
      })
    }
  },

  //选择位置
  openLocation: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          wx.chooseLocation({
            success: function (res) {
              that.setData({
                lat: res.latitude,
                lng: res.longitude,
                address: res.address
              })
            },
          })
        } else {
          wx.chooseLocation({
            success: function (res) {
              that.setData({
                address: res.address
              })
            },
            fail: function (res) {
              wx.openSetting({
                success: function (res) {
                  console.log(res);
                  if (res.authSetting['scope.userLocation'] == true) {
                    wx.chooseLocation({
                      success: function (res) {
                        that.setData({
                          address: res.address
                        })
                      },
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  //选择热搜职位
  selHotWork: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    var search = this.data.search;
    var that = this;

    for (var i = 0; i < search.length; i++) {
      if (index == i) {
        var pathid = search[i].pathid;
        var workAll2 = search[i].name;
        this.setData({
          workAll2: workAll2,
          wi: 1,
          state2: -1,
          hotstate: index,
        })
        wx.request({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Classification/search',
          method: 'POST',
          data: {
            pathid: pathid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            that.setData({
              workAll1: res.data.result.name
            })
          }
        })
      }
    }
  },

  //去找工作
  chooseWork: function () {
    var address = this.data.address;
    var that = this;

    if (getApp().globalData.wecha_id == null) {
      wx.showModal({
        title: '提示',
        content: '需要授权获取您的用户数据，否则无法使用本产品，是否授权？',
        success: res => {
          if (res.confirm) {
            wx.login({
              success: res => {
                getApp().globalData.code = res.code;

                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      wx.getUserInfo({
                        success: res => {
                          wx.request({
                            url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/wx_user',
                            method: 'POST',
                            data: {
                              code: getApp().globalData.code,
                              encryptedData: res.encryptedData,
                              iv: res.iv
                            },
                            header: {
                              'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: res => {
                              getApp().globalData.wecha_id = res.data.user.wecha_id;
                              getApp().globalData.wecha_name = res.data.user.wecha_name;
                              getApp().globalData.headImg = res.data.user.img;
                              getApp().globalData.status = res.data.user.status;
                              getApp().globalData.phone = res.data.user.telphone;
                              console.log(res);
                              console.log(getApp().globalData.status);
                              console.log(getApp().globalData.phone);
                              that.setData({
                                status: getApp().globalData.status,
                                phone: getApp().globalData.phone
                              })

                              wx.request({
                                url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_add',
                                method: 'POST',
                                data: {
                                  address: that.data.address,
                                  cid: this.data.cid,
                                  wecha_id: getApp().globalData.wecha_id
                                },
                                header: {
                                  'content-type': 'application/x-www-form-urlencoded'
                                },
                                success: res => {
                                  if (getApp().globalData.phone == null || getApp().globalData.phone == '') {
                                    wx.navigateTo({
                                      url: '../login/login',
                                    })
                                  } else {
                                    that.setData({
                                      phone: getApp().globalData.phone,
                                      wi: 0,
                                      state2: -1,
                                      workAll2: ''
                                    })
                                  }
                                }
                              })
                            }
                          })
                        }
                      })
                    } else {
                      wx.openSetting({
                        success: function (res) {
                          if (res.authSetting['scope.userInfo'] == true) {
                            wx.getUserInfo({
                              success: res => {
                                wx.request({
                                  url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/wx_user',
                                  method: 'POST',
                                  data: {
                                    code: getApp().globalData.code,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv
                                  },
                                  header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                  },
                                  success: res => {
                                    getApp().globalData.wecha_id = res.data.user.wecha_id;
                                    getApp().globalData.wecha_name = res.data.user.wecha_name;
                                    getApp().globalData.headImg = res.data.user.img;
                                    getApp().globalData.status = res.data.user.status;
                                    getApp().globalData.phone = res.data.user.telphone;
                                    console.log(res);
                                    console.log(getApp().globalData.status);
                                    console.log(getApp().globalData.phone);
                                    that.setData({
                                      status: getApp().globalData.status,
                                      phone: getApp().globalData.phone
                                    })

                                    wx.request({
                                      url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_add',
                                      method: 'POST',
                                      data: {
                                        address: that.data.address,
                                        cid: this.data.cid,
                                        wecha_id: getApp().globalData.wecha_id
                                      },
                                      header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                      },
                                      success: res => {
                                        if (getApp().globalData.phone == null || getApp().globalData.phone == '') {
                                          wx.navigateTo({
                                            url: '../login/login',
                                          })
                                        } else {
                                          that.setData({
                                            phone: getApp().globalData.phone,
                                            wi: 0,
                                            state2: -1,
                                            workAll2: ''
                                          })
                                        }
                                      }
                                    })
                                  }
                                })
                              }
                            })
                          }
                        },
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    } else {
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_add',
        method: 'POST',
        data: {
          address: that.data.address,
          cid: this.data.cid,
          wecha_id: getApp().globalData.wecha_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (that.data.phone == null) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else {
            that.setData({
              phone: getApp().globalData.phone,
              wi: 0,
              state2: -1,
              workAll2: ''
            })
          }
        }
      })
    }

  },

  //发布工作
  subWork: function () {
    var that = this;
    console.log(getApp().globalData.wecha_id);
    if (this.data.address == '') {
      wx.showModal({
        content: '请选择您的位置',
        confirmColor: '#18b5f9',
        showCancel: false
      })
    } else {
      wx.showLoading({
        title: '正在发布',
        success: function () {
          setTimeout(function () {
            wx.request({
              url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_add',
              method: 'POST',
              data: {
                address: that.data.address,
                cid: that.data.cid,
                wecha_id: getApp().globalData.wecha_id,
                lat: that.data.lat,
                lng: that.data.lng,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                wx.hideLoading()
                wx.showToast({
                  title: '发布成功',
                })
                console.log(res);
                that.setData({
                  wi: 0,
                  state2: -1,
                  workAll2: '',
                  isPublishingWork: res.data.code,
                })
                that.showSubWork();
              }
            })
          }, 800)
        }
      })
    }

  },

  //遍历已发布工作
  showSubWork: function () {
    var that = this;
    var wecha_id = getApp().globalData.wecha_id;
    //console.log(wecha_id);
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_list',
      method: 'POST',
      data: {
        wecha_id: wecha_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == '100000') {
          that.setData({
            subWorkList: res.data.release,
            interestWorkList: res.data.hiring,
          })
        } else if (res.data.code == '1') {
          that.setData({
            subWorkList: [],
            interestWorkList: []
          });
          that.reviseTap();
        }
        that.setData({
          isPublishingWork: res.data.code,
        })
      }
    })
  },

  //个人 管理
  reviseTap: function () {
    var changesRevise = this.data.isRevise;
    if (this.data.isPublishingWork === '100000' ) {
      if (changesRevise) {
        this.setData({
          reviseTxt: '管理',
        });
      } else {
        this.setData({
          reviseTxt: '完成'
        })
      };
      this.setData({
        isRevise: !changesRevise,
      });
    };
  },

  //删除已发布工作
  deleteWork: function (e) {
    console.log(e.currentTarget.dataset.itemIndex);
    var id = e.currentTarget.dataset.itemIndex;
    var that = this;

    wx.showModal({
      title: '删除已发布工作',
      content: '您确定要删除此工作吗',
      confirmColor: '#29b6f6',
      success: function (res) {
        if (res.confirm) {   //确定删除
          wx.showLoading({
            title: '正在删除',
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.request({
                  url: 'https://xcx.misass.com/huadu/index.php?s=/api/release/release_delete',
                  method: 'POST',
                  data: {
                    id: id
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    if (res.data.code == '100000') {
                      wx.hideLoading();
                      wx.showToast({
                        title: '删除成功',
                        duration: 1000
                      });
                    }
                    that.showSubWork();
                  }
                })
              }, 800);
            }
          })
        }
      }
    })
  },

  //跳转到职位列表
  toJobPage: function (e) {
    console.log(this.data.isRevise)
    if (this.data.isRevise === false) {
      var cid = e.currentTarget.dataset.itemIndex;
      wx.navigateTo({
        url: '../jobPage/jobPage?cid=' + cid,
      })
    }
  },

  //跳转到招聘详情
  toWorkInfo: function (e) {
    var workid = e.currentTarget.dataset.itemIndex;
    wx.navigateTo({
      url: '../workInfo/workInfo?workid=' + workid,
    })
  },

  //获取开始日期
  getDateBegin: function (e) {
    console.log(e.detail.value)
    this.setData({
      beginDate: e.detail.value
    })
  },

  //获取结束日期
  getDateOver: function (e) {
    console.log(e.detail.value)
    this.setData({
      overDate: e.detail.value
    })
  },

  //获取工作名称
  getWorkName: function (e) {
    console.log(e.detail.value);
    this.setData({
      workName: trim.trim(e.detail.value)
    })
  },

  //获取招聘人数
  getPersonNum: function (e) {
    console.log(e.detail.value);
    this.setData({
      personNum: trim.trim(e.detail.value)
    })
  },

  //获取工作描述
  getWorkDesc: function (e) {
    console.log(e.detail.value);
    this.setData({
      workDesc: trim.trim(e.detail.value)
    })
  },

  //选择照片
  chooseImg: function (e) {
    console.log(e.currentTarget.dataset.itemIndex);
    var index = e.currentTarget.dataset.itemIndex;
    var imgFilePathU = this.data.imgFilePathU;
    var imgFilePath = this.data.imgFilePath;
    var that = this;

    wx.chooseImage({
      count: 1,
      success: function (res) {
        var imgPath = res.tempFilePaths;
        imgFilePath.splice(index, 1, imgPath);
        that.setData({
          imgFilePath: imgFilePath
        })
        wx.uploadFile({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/dowimg',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log(data);
            var imgPathU = data.imgurl;
            imgFilePathU.splice(index, 1, imgPathU);
            that.setData({
              imgFilePathU: imgFilePathU
            })
          }
        })

        console.log(imgFilePath);
        console.log(imgFilePathU);
      },
    })
  },

  //选择视频
  chooseVideo: function () {
    var that = this;
    wx.chooseVideo({
      success: function (res) {
        that.setData({
          videoFilePath: res.tempFilePath
        })
        wx.uploadFile({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/dowimg',
          filePath: res.tempFilePath,
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log(data);
            var videoPathU = data.imgurl;
            that.setData({
              videoFilePathU: videoPathU
            })
          }
        })
      }
    })
  },

  //提交招人信息
  subJob: function () {
    var that = this;
    var address = this.data.workAddr;
    var name = this.data.workName;
    var item1 = this.data.workAll1;
    var item2 = this.data.workAll2;
    var cid = this.data.cid;
    var num = this.data.personNum;
    var start_time = this.data.beginDate;
    var end_time = this.data.overDate;
    var text = this.data.workDesc;
    var img = '';
    for (var i = 0; i < this.data.imgFilePathU.length; i++) {
      if (i == 0) {
        img += this.data.imgFilePathU[i];
      } else {
        img += ',' + this.data.imgFilePathU[i];

      }

    }
    console.log(img);
    var video_url = this.data.videoFilePathU;

    wx.showLoading({
      title: '发布中',
    });
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Hiring/hiring_add',
      method: 'POST',
      data: {
        name: name,
        num: num,
        start_time: start_time,
        end_time: end_time,
        img: img,
        video_url: video_url,
        text: text,
        address: address,
        cid: cid,
        wecha_id: getApp().globalData.wecha_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == '100000') {
          wx.hideLoading();
          wx.showToast({
            title: '发布成功',
            duration: 1000
          })
          that.setData({
            imgFilePath: [],
            videoFilePath: '',
            workDesc: '',
            beginDate: '',
            overDate: '',
            workName: '',
            personNum: '',
            workAll2: '',
            wi: 0,
            state2: -1,
            isPublishingWork: res.data.code,
          })
          that.showAllJob();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '发布失败',
            duration: 1000
          })
        }
      }
    })

  },

  //删除发布工作
  deleteJob: function (e) {
    console.log(e.currentTarget.dataset.itemIndex);
    var id = e.currentTarget.dataset.itemIndex;
    var that = this;

    wx.showModal({
      title: '删除已发布职位',
      content: '是否确定删除此职位？',
      confirmColor: '#29b6f6',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除',
            success: function () {
              setTimeout(function () {
                wx.request({
                  url: 'https://xcx.misass.com/huadu/index.php?s=/api/Hiring/hiring_delete',
                  method: 'POST',
                  data: {
                    hiring_id: id
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    if (res.data.code = '100000') {
                      wx.hideLoading();
                      wx.showToast({
                        title: '删除成功',
                      })
                    }
                    that.showAllJob();
                  }
                })
              }, 800)
            }
          })
        }
      }
    })
  },

  //查看合适人选
  toPersonInfo: function (e) {
    var jobid = e.currentTarget.dataset.itemIndex;
    wx.navigateTo({
      url: '../workInfo/workInfo?jobid=' + jobid,
    })

  },

  //遍历已发布职位
  showAllJob: function () {
    var that = this;
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Hiring/hiring_list',
      method: 'POST',
      data: {
        wecha_id: getApp().globalData.wecha_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == '100000') {
          that.setData({
            subJobList: res.data.hiring,
            interestJobList: res.data.release
          })
        } else if (res.data.code == '1') {
          that.setData({
            subJobList: [],
            interestJobList: []
          });
          that.reviseTap();
        }
        that.setData({
          isPublishingWork: res.data.code,
        })
      }
    })
  },

  //监听页面初次加载
  onLoad: function () {
    wx.getLocation({
      success: res => {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude,
          data: {
            key: 'ULUBZ-GAR3X-VSD44-TIOL4-QOOWE-64BS5'
          },
          success: res => {
            this.setData({
              address: res.data.result.address
            })
          }
        })
      },
    })
  },

  //监听页面显示
  onShow: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        getApp().globalData.code = res.code;
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  //console.log(res)
                  wx.request({
                    url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/wx_user',
                    method: 'POST',
                    data: {
                      code: getApp().globalData.code,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: res => {
                      getApp().globalData.wecha_id = res.data.user.wecha_id;
                      getApp().globalData.wecha_name = res.data.user.wecha_name;
                      getApp().globalData.headImg = res.data.user.img;
                      getApp().globalData.status = res.data.user.status;
                      getApp().globalData.phone = res.data.user.telphone;
                      this.setData({
                        status: getApp().globalData.status,
                        phone: getApp().globalData.phone,
                        workAddr: res.data.user.hiring_address
                      })

                      if (this.data.status == 1) {
                        this.showAllJob();
                      } else if (this.data.status == 0) {
                        this.showSubWork();
                      }
                    }
                  })

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            } else {
              wx.getUserInfo({
                success: res => {
                  console.log(getApp().globalData.code)
                  console.log(res.encryptedData)
                  console.log(res.iv)
                  wx.request({
                    url: 'https://xcx.misass.com/huadu/index.php?s=/api/Commonc/wx_user',
                    method: 'POST',
                    data: {
                      code: getApp().globalData.code,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      getApp().globalData.wecha_id = res.data.user.wecha_id;
                      getApp().globalData.wecha_name = res.data.user.wecha_name;
                      getApp().globalData.headImg = res.data.user.img;
                      getApp().globalData.status = res.data.user.status;
                      getApp().globalData.phone = res.data.user.telphone;
                      that.setData({
                        status: getApp().globalData.status,
                        phone: getApp().globalData.phone,
                        workAddr: res.data.user.hiring_address
                      })

                      if (that.data.status == 1) {
                        that.showAllJob();
                      } else if (that.data.status == 0) {
                        that.showSubWork();
                      }
                    }
                  })
                  if (this.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                },
                fail: function (res) {
                  that.setData({
                    status: 0
                  })
                }
              })
            }
          }
        })
      }
    })

    //获取职位分类列表
    wx.request({
      url: 'https://xcx.misass.com/huadu/index.php?s=/api/Classification/classification_list',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          workType: res.data.result,
          search: res.data.search
        })
      }
    })
  }
})
