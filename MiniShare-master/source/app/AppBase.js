import { ApiConfig } from "../apis/apiconfig.js";
import { ApiUtil } from "../apis/apiutil.js";
import { MemberApi } from "../apis/member.api";
import { WechatApi } from "../apis/wechat.api";
import { GroupApi } from "../apis/group.api";

export class AppBase {

  static UserInfo = {};
  app = null;
  options = null;
  data = {
    uploadpath: ApiConfig.GetUploadPath(),
    copyright: { name: "超级群空间助手", website: "supershare.com" },
    thisyear:(new Date).getFullYear()
  };
  Page = null;
  static Util = ApiUtil;
  constructor() {
    this.app = getApp();
    this.me = this;
    //ApiConfig.SetToken("10e991a4ca7a93c60794628c11edaea3");
  }
  generateBodyJson() {
    var base = this;
    return {
      Base: base,
      /**
       * 页面的初始数据
       */
      data: base.data,
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: base.onLoad,

      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady: base.onReady,

      /**
       * 生命周期函数--监听页面显示
       */
      onShow: base.onShow,

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide: base.onHide,

      /**
       * 生命周期函数--监听页面卸载
       */
      onUnload: base.onUnload,

      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: base.onPullDownRefresh,

      /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: base.onReachBottom,

      /**
       * 用户点击右上角分享
       */
      onShareAppMessage: base.onShareAppMessage,

      viewPhoto: base.viewPhoto,
      phoneCall: base.phoneCall,
      openMap: base.openMap,
      backPage: base.backPage,
      backHome: base.backHome,
      logout: base.logout, 
      switchTab: base.switchTab, 
      closePage: base.closePage,
      gotoPage: base.gotoPage,
      navtoPage: base.navtoPage, 
      back: base.back,
      gohome: base.gohome
    }
  }
  log() {
    console.log("yeah!");
  }
  onLoad(options) {

    this.Base.options = options;
    console.log(options);
    console.log("onload");
    this.Base.setBasicInfo();
    this.Base.setMyData({});

    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          wx.login({
            withCredentials: true,
            success:function(loginres){
              //{ code: loginres.code, grant_type: "authorization_code" }
              
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              var wechatapi = new WechatApi();
              res.code = loginres.code;
              res.grant_type = "authorization_code";

              wechatapi.decrypteddata(res, data => {
                if(data.code==0){
                  AppBase.UserInfo.openid = data.return.openid;
                  ApiConfig.SetToken(data.return.openid);
                  var openGId = data.return.openGId;
                  console.log(openGId);
                }
                
              });

            }
          })
        }
      })
    }

    wx.showShareMenu({
      withShareTicket: true
    });
  }
  gotoOpenUserInfoSetting(){
    var that=this;
    wx.showModal({
      title: '需要您授权才能正常使用小程序',
      content: '请点击“去设置”并启用“用户信息”，然后确定即可正常使用',
      confirmText: "去设置",
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            
          })
        } else {
          that.gotoOpenUserInfoSetting();
        }
      }
    })
  }
  setBasicInfo() {
    var that = this;


  }
  onReady() {
    console.log("onReady");
  }
  onShow() {
    var that=this;
    if (AppBase.UserInfo.openid == undefined) {
      // 登录
      console.log("onShow");
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res);
          wx.getUserInfo({
            success: userres => {
              AppBase.UserInfo = userres.userInfo;
              console.log(userres);

              var memberapi = new MemberApi();
              memberapi.getuserinfo({ code: res.code, grant_type: "authorization_code" }, data => {
                console.log(data); 
                AppBase.UserInfo.openid = data.openid;
                AppBase.UserInfo.session_key = data.session_key;
                console.log(AppBase.UserInfo);
                ApiConfig.SetToken(data.openid);
                console.log("goto update info");
                memberapi.update(AppBase.UserInfo);
                wx.getLocation({
                  type: 'gcj02',
                  success: function (res) {
                    console.log(res);
                    var latitude = res.latitude;
                    var longitude = res.longitude;
                    var loc = { lat: latitude,lng:longitude};
                    that.Base.setMyData({ UserLocation: loc });
                    memberapi.updatelocation({lat:latitude,lng:longitude},data=>{
                      //console.error(data);
                    });
                  }
                });
                console.log(AppBase.UserInfo);
                that.Base.setMyData({ UserInfo: AppBase.UserInfo});
                that.onShow();
              });
            },
            fail: res => {
              that.Base.gotoOpenUserInfoSetting();
            }
          });

        }
      })
    }else{
      if (that.setMyData!=undefined){
        that.setMyData({ UserInfo: AppBase.UserInfo });
      }else{
        that.Base.setMyData({ UserInfo: AppBase.UserInfo });
      }
    }

  }
  onHide() {
    console.log("onHide");
  }
  onUnload() {
    console.log("onUnload");
  }
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
  }
  onReachBottom() {
    console.log("onReachBottom");
  }
  onShareAppMessage() {
    var that=this;
    return {
      title: '创建一个超级微信群空间',
      path: '/pages/index/index?create_id=' + AppBase.UserInfo.openid,
      success: function (res) {
        // 转发成功

        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        console.log(shareTickets);
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            console.log(res);
            var wechatapi = new WechatApi();
            wechatapi.decrypteddata(res, data => {
              console.log("aa");
              console.log(data);
              if(data.code==0){
                var groupapi = new GroupApi();
                groupapi.join({ opengid: data.return.openGId},data=>{
                  that.Base.onShow();
                });
              }
            });
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
  setMyData(obj) {
    console.log(obj);
    this.Page.setData(obj);
  }
  getMyData() {
    return this.Page.data;
  }
  viewPhoto(e) {
    var img = e.currentTarget.id;
    console.log(img);
    wx.previewImage({
      urls: [img],
    })
  }
  viewGallary(modul, photos,current="") {
    var nphotos = [];
    for (var i = 0; i < photos.length; i++) {
      nphotos.push(ApiConfig.GetUploadPath() + modul + "/" + photos[i]);
    }
    console.log(nphotos);
    wx.previewImage({
      urls: nphotos,
      current:current
    })
  }
  phoneCall(e) {
    var tel = e.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: tel
    })
  }
  openMap(e) {
    if (AppBase.QQMAP == null) {
      var QQMapWX = require('../libs/qqmap/qqmap-wx-jssdk.js');
      AppBase.QQMAP = new QQMapWX({
        key: 'IDVBZ-TSAKD-TXG43-H442I-74KVK-6LFF5'
      });
    }
    var address = e.currentTarget.id;
    AppBase.QQMAP.geocoder({
      address: address,
      success: function (res) {
        if (res.status == 0) {
          var lat = res.result.location.lat;
          var lng = res.result.location.lng;

          wx.openLocation({
            type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
            address: address,
            latitude: lat,
            longitude: lng,
            success: function (res) {

            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  uploadFile(modul, filename, callback) {

    var tempFilePaths = filename
    wx.uploadFile({
      url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        'module': modul,
        "field": "file"
      },
      success: function (res) {
        console.log(res);
        var data = res.data
        if (data.substr(0, 7) == "success") {
          data = data.split("|");
          var photo = data[2];
          callback(photo);
        } else {
          wx.showToast({
            title: '上传失败，请重试',
            icon: 'warn',
            duration: 2000
          })
        }
        //do something
      }
    });
  }
  uploadImage(modul, callback) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        //that.setData({
        //  photos: that.data.photos.concat(res.tempFilePaths)
        //});
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length;i++){

          wx.uploadFile({
            url: ApiConfig.GetFileUploadAPI(), //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'module': modul,
              "field": "file"
            },
            success: function (res) {
              console.log(res);
              var data = res.data
              if (data.substr(0, 7) == "success") {
                data = data.split("|");
                var photo = data[2];
                callback(photo);
              } else {
                console.error(res.data);
                wx.showToast({
                  title: '上传失败，请重试',
                  icon: 'warn',
                  duration: 2000
                })
              }
              //do something
            }
          });
        }
      }
    })
  }
  
  info(message) {
    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false
    })
  }
  warning(message) {
    wx.showModal({
      title: '警告',
      content: message,
      showCancel: false
    })
  }
  error(message) {
    wx.showModal({
      title: '错误',
      content: message,
      showCancel: false
    })
  }

  backPage() {
    wx.navigateBack({

    });
  }
  backHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
  logout() {
    wx.redirectTo({
      url: '/pages/signin/signin',
    })
  }
  gotoPage(e){
    console.log(e);
    var dataset = e.currentTarget.dataset;
    var page=dataset.page;
    var parameter=dataset.param;
    if(parameter!=""){
      parameter="?"+parameter;
    }
    var url = "../" + page + "/" + page+parameter;
    console.log(url);
    wx.redirectTo({
      url: url,
    })
  }
  navtoPage(e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    var page = dataset.page;
    var parameter = dataset.param;
    if (parameter != "") {
      parameter = "?" + parameter;
    }
    var url = "../" + page + "/" + page + parameter;
    console.log(url);
    wx.navigateTo({
      url: url,
    })
  }
  switchTab(e){
    console.log(e);
    var page=e.currentTarget.id;
    var url="../"+page+"/"+page;
    console.log(url);
    wx.redirectTo({
      url: url,
    })
  } 
  closePage(){

  }
  back() {
      wx.navigateBack({
        
      })
  }
  gohome() {
    wx.navigateTo({
      url: '../index/index',
    })
  }
} 