import { reToMainPage, goToUserInfo, goToReceiveDev, goToUser} from "../../libs/router";
import {
  scansaoma, gofujin, gofenxaing
} from "../../libs/saoma";
let app = getApp();
let PATH = app.globalData.PATH;


let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");
let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
let qqmapsdk;
let flag = 0;
let shareType = true;
Page({
  data: {
    IMG_PATH: IMG_PATH,
    upLodingImg: IMG_PATH+"/upimg.jpg",
    shareTypes: ["分享图片", "分享设备"],

    mood: " 爱是一种体会，即使心碎也会觉得甜蜜",
    shareType: "分享图片",
    deviceCode: "选择要分享的设备编号",
    tempFilePaths: "",
    imgUrl: "",
    content: "",
    character: 140
  },
  onShow: function () {
    flag = 0;
    this.setData({
      userId: app.globalData.userId
    })
  },
  onLoad: function (options) {
    let that = this;
    let location = app.globalData.location;
    qqmapsdk = new QQMapWX({
        key:'7I4BZ-EW6W4-3E2UX-DGOA7-MX67S-NZBPU'
    //   key: 'CRZBZ-ROG3G-WGTQS-I4KDH-NKHDQ-Q5FCX'
    });
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      success: function (res) {
        // console.log(res);
        if (res.status == 0) {
          that.setData({
            latitude: location.latitude,
            longitude: location.longitude,
            address: res.result.address_component.district + res.result.address_component.street
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
    wx.request({
      url: PATH + "/resource-service/share/getShareModeList",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "GET",
      data: {},
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          let moodList = res.data.result.data;
          moodList.unshift({
            title:"自定义心情",
            content:"自定义心情",
          });
          that.setData({
            chooseMood: moodList
          });
          // console.log(moodList);
        }
      },
    });
    // app.globalData.location = null;
    
    // console.log(location);
  },
  // 去地图
  goToMap: function () {
    gofujin(app.globalData.location)
  },
  // 触电扫码
  scanCode: function () {
    let that = this;
    scansaoma(app.globalData.userId, goToReceiveDev,PATH)
  },
  // 我的
  goToUser: function () {
    goToUser();
  },
  // 分享
  goToShare: function () {
    let that = this;
    gofenxaing()

  },
  //首页
  homePage: function () {
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },
  // 选择心情
  bindChooseMood: function (e) {
    console.log(this.data.chooseMood[e.detail.value].content)
    this.setData({
      mood: this.data.chooseMood[e.detail.value].content
    })
    if (this.data.mood != "自定义心情") {
      this.setData({
        content: this.data.chooseMood[e.detail.value].content
      });
    }
  },
  // 图片高度
  bindLoadImg: function (e) {
    console.log(e.detail.height);
    this.setData({
      imageHeight: e.detail.height,
      imageWidth: e.detail.width
    })
  },
  // 选择分享类型
  radioChange: function (e) {
    let that = this;
    // 选择分享设备时获取我的设备
    if (e.detail.value == '分享设备') {
      wx.request({
        url: PATH + '/account-service/user/getUserInfoById',
        method: 'GET',
        header: {
          'Access-Token': app.globalData.accessToken,
        },
        data: {
          id: app.globalData.userId,
        },
        //post success
        success: function (res_2) {
          wx.hideLoading();
          console.log(res_2)
          // if (res_2.statusCode == 200 && res_2.data.status == 200) {
            // if (res_2.data.user.name != '' && res_2.data.user.name != null) {
            //   if (!app.globalData.location || app.globalData.location == 'undefined') {
            //     that.setData({
            //       shareType: "分享图片"
            //     });
            //     wx.showModal({
            //       title: '无法获取您的地理位置',
            //       content: '请对微信进行地理位置授权',
            //       showCancel: false,
            //       confirmText: '知道了',
            //       success: function (res) {

            //       }
            //     })
            //     return;
            //   }
            // }
            //  else {
            //   editUserModal(that);
            //   return;
            // }
          // } 
          // else {
          //   editUserModal(that);
          //   return;
          // }
        }
      })
      
      wx.request({
        url: PATH + '/resource-service/device/getMyDeviceList',
        method: 'get',
        header: {
          'Access-Token': app.globalData.accessToken,
        },
        data: {
          page: 1,
          perPage: 200, // 
          userId: app.globalData.userId
        },
        //post success
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200 && res.data.status == 200) {
            let deviceArr = [];
            if (res.data.result.data.length > 0) {
              for (let i = 0; i < res.data.result.data.length; i++) {
                deviceArr.push(res.data.result.data[i].device_no); // 设备编号生成新的数组，渲染设备列表
              }
            }
            that.setData({
              deviceArr: deviceArr // 设备列表
            });
            console.log(deviceArr);
          }
        }
      })
    }
    that.setData({
      shareType: e.detail.value
    });
  },
  
  // 选择设备编号
  bindTest:function () {
    if (this.data.deviceArr.length == 0) {
      console.log(0);
      newsTip("当前账户没有设备，无法分享设备");
      return;
    }
  },
  bindPickerDevice: function (e) {
    let that = this;
    that.setData({
      deviceCode: that.data.deviceArr[e.detail.value]
    });
  },
  // 图片上传
  bindUpLoadImg: function () {
    flag = 1;
    let that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      success: function (res) {
        console.log(res);
        let tempFilePaths = res.tempFilePaths[0];
        that.setData({
          tempFilePaths: tempFilePaths
        });
        // 图片上传
        wx.showLoading({
          title: '图片上传中',
        })
        wx.uploadFile({
          url: PATH + '/resource-service/image/upload',
          header: {
            'Access-Token': app.globalData.accessToken,
            'content-type': 'multipart/form-data'
          },
          filePath: tempFilePaths,
          name: 'file',
          success: function (res) {
            console.log(res);
            if (res.statusCode == 200) {
              wx.hideLoading();
              let imgInfo = JSON.parse(res.data);
              if (imgInfo.status == 200) {
                // 图片上传成功
                console.log(imgInfo.result.key);
                let imgUrl = "http://img.didicharging.com/" + imgInfo.result.key;
                that.setData({
                  deviceId: that.data.deviceCode, // 分享设备id
                  imgUrl: imgUrl, // 图片路径地址
                });
              } else {
                console.log(imgInfo.message);
              }
            } else {
              console.log(res.errMsg);
            }
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            flag = 0;
          }
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        flag = 0;
      }
    });
  },
  bindContent: function (e) {
    if (this.data.character == 0) {
      return;
    }
    // console.log(this.data.character--);
    let character = this.data.character--
    this.setData({
      content: e.detail.value,
      character: character
    });
  },
  // 发布分享
  bindShare: function () {
    let that = this;
    let moodcontent;
    if (that.data.content==''){
      moodcontent = that.data.mood
    }else{
      moodcontent = that.data.content
    }
    // console.log(moodcontent)
    
    let submitData = {
      userId: this.data.userId, // 用户id
      imgUrl: this.data.imgUrl, // 图片路径地址
      content: moodcontent, // 模拟id
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      address: this.data.address,
      imageHeight: this.data.imageHeight,
      imageWidth: this.data.imageWidth
    };
    if (this.data.shareType == '分享设备') {
      submitData.deviceId = this.data.deviceCode; // 分享设备id   
    }
    if (this.data.shareType == '分享图片') {
      submitData.deviceId = ''; // 分享设备id   
    }
    // 分享类型必选
    if (this.data.shareType == '') {
      newsTip("请选择分享类型");
      return;
    }
    console.log(this.data.shareType, submitData.deviceId);
    // 当分享类型为分享设备时，必须有设备编号
    if (this.data.shareType == '分享设备' && submitData.deviceId == '选择要分享的设备编号') {
      newsTip("请选择要分享的设备");
      return;
    }
    // 分享心情不能为空
    // if (this.data.content == '') {
    //   newsTip("请输入分享心情");
    //   return;
    // }
    // 分享图片不能为空
    if (this.data.imgUrl == '') {
      newsTip("请选择分享图片");
      return;
    }
    if (flag != 0) {
      newsTip("分享上传中");
      return;
    }
    flag++;
    console.log(submitData);
    submit(that, submitData);
  },
  // onShareAppMessage: function (res) {
  //   return {
  //     title: '嘀嘀充电',
  //     path: '/page/main/main',
  //     success: function (res) {
  //       // 转发成功
  //       console.log(res);
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //       console.log(res);
  //     }
  //   }
  // }
})
// 提交分享方法
function submit(that, submitData) {
  console.log(submitData);
  if (shareType == true) {
    shareType == false;
  } else {
    return;
  }
  // 提交
  wx.request({
    url: PATH + "/resource-service/share/addShare",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "POST",
    data: submitData,
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && res.data.status == 200) {
        newsTip(res.data.message);
        setTimeout(function () {
          // reToMainPage();
          wx.reLaunch({
            url: '../main/main?share=ok&share_id=' + res.data.shareId
          })
        },1000);
      }
    },
    fail: function (res) {
      console.log(res);
    },
    complete: function (res) {
      flag = 0;
      shareType = true;
      // console.log(res);
    }
  });
}
// 信息提示方法
function newsTip(tip) {
  wx.showToast({
    title: tip,
    icon: 'loading',
    duration: 1000
  })
}
function editUserModal(that) {
  wx.showModal({
    title: "提示",
    content: "请先完善个人信息",
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        goToUserInfo();
      } else if (res.cancel) {
        that.setData({
          shareType: "分享图片"
        });
        return;
      }
    }
  })
}
