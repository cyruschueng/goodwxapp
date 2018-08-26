import {
  goToUser, goToShare, goToNearbyDev, goToMapNav, goToReceiveDev, goToScaneCode, 
goToUserInfo, goToPayUseFee, goToShareDetail } from "../../libs/router";
import {
  getShareScore
} from "../../libs/publiceFn";
import {
  scansaoma, gofujin, gofenxaing,getDeviceState
} from "../../libs/saoma";
//获取应用实例

let app = getApp();
let PATH = app.globalData.PATH;
let IMG_PATH = app.globalData.IMG_PATH;
let userInfoSync = wx.getStorageSync("userInfo");
let windowWidth = wx.getStorageSync("windowWidth");
let imgWidth = windowWidth * 0.48;
let num = 0;
let imgArr = [];
let col1H = 0;
let col2H = 0;
let arr1 = [];
let arr2 = [];
let switchScroll = true;
Page({
  data: {
    IMG_PATH: IMG_PATH,
     imgUrls:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    loadingCount: 0,
    page: 1,
    openMask: false,
    openTip: false,
    status: "new",
    confalse:false,
    //存视频数据
    video_data:[],

    // 视频列表
    divoe: [
    ]
  },

  onShow: function () {
    // console.log("ref");
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
   
  },

  //调视频详情
  mengbanbindtap:function(e){
    console.log(e)
    //这里用数组
    wx.navigateTo({
      url: '/pages/yinyue/yinyue?index=' + e.currentTarget.dataset.id,
    })


  },

  //调图片详情
  bindShareDetail: function (e) {
    goToShareDetail(e.currentTarget.dataset.id, 'home');
  },

  // 列表状态
  bindStatus: function (e) {
    let that = this;
    let status = e.currentTarget.dataset.status;
    // console.log(status)
    that.setData({
        status: status
    });
    // console.log(status)
    if (that.data.status != 'ranking'){
      getShareList(that, 1, status);
    }
  },

  // 关注
  bindFollow: function () {
    let that = this;

    wx.request({
      url: PATH + "/resource-service/fans/follow",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "GET",
      data: {
        userId:app.globalData.userId,
        followUserId:app.globalData.userId //模拟id
      },

      success: function (res) {
        // console.log(res);
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            success: function () {
              // 替换关注按钮为已关注
            }
          })
        }

        if (res.data.status == 210) {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
        }

      }
    });
  },
  // 去通知
  goToNotice: function () {
    wx.navigateTo({
      url: '../user/notice/notice?id=' + app.globalData.userId
    });
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

  closeNewUserMask: function () {
    this.setData({
      openTip: false
    })
  },
  
  //
  onLoad: function (options) {
    // console.log("options", options);

    let that = this;
    if (options.newUser == 'yes') {
      that.setData({
        openTip: true
      })
    }
    //hu获取视频数据
   wx.request({
      url: PATH + "/resource-service/movie/list",
      header:{
        "Access-token":app.globalData.accessToken,
      },
      method: 'GET',
      success:function(res){
        console.log("aaa");
        console.log(res.data.list)
        that.setData({video_data:res.data.list})
      }
   })

   //开始定时函数 每隔10秒 调一次钱包 如果钱包余额有增长响一次音乐 

    let timeInterval = setInterval(function () {

       getmyWallet(that);
  
    }, 10000);
   
  // 获取轮播图列表
    getBanner(that);
    
    that.setData({
      arr1: [],
      arr2: []
    });


    if (options.share && options.share == 'ok') {
      that.setData({
        openMask: true,
        share_id: options.share_id,
        status: 'new'
      })
    }
    if (options.sence && options.sence != "undefined") {
      let code = options.scene;
      wx.request({
        url: PATH + '/resource-service/device/getDeviceState',
        method: 'GET',
        header: {
          'Access-Token': app.globalData.accessToken,
        },
        data: {
          userId:app.globalData.userId,
          deviceNo: code,
        },
        //post success
        success: function (data) {
          // console.log(data)
          if (data.statusCode == 200 && data.data.status == 200) {
            if (data.data.device) {
              tipModal(data.data.message);
              return;
            }
            app.globalData.payInfo = data.data.payInfo;
            goToReceiveDev(code);
          } else {
            tipModal(data.data.message);
          }
        }
      })
    }
   
    // 列表信息
    getShareList(that, that.data.page, that.data.status);
    if (that.data.openMask!= false){
      yinyue()
    }
    setTimeout(function () {
      guanbi(that)
    }, 2000)
  },
  bindUpper: function (e) {
    let that = this;
    that.setData({
      page: 1
    })
    getShareList(that, that.data.page, that.data.status);
  },
  bindLower: function (e) {
    let that = this;
    if (switchScroll == true) {
      let page = that.data.page++;
     
      getShareList(that, page, that.data.status);
      switchScroll = false;
    }
    
  },

  // 关闭模态框
  bindCloseMask: function () {
    this.setData({
      openMask: false
    })
  },

  // 分享
  onShareAppMessage: function (res) {
    let that = this;
    let path_share;
    
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
      that.setData({
        openMask: false
      });
      path_share = '/pages/login/login?type=share&id=' + that.data.share_id + "&invideCode=" + app.globalData.userId
    } else {
        path_share = '/pages/login/login?invideCode=' + app.globalData.userId
    }

    return {
      title: '爱心分享图片，轻松月入百万！',
      path: path_share,
      success: function (res) {
        console.log(res);
        // 转发成功
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {
         
          getShareScore(app.globalData.userId);
          
          },
          complete: function (res) {
            // console.log(res);
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})

//这块目前没有 
function editUserModal() {
  wx.showModal({
    title: "提示",
    content: "请先完善个人信息",
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        goToUserInfo();
      } else if (res.cancel) {
        return;
      }
    }
  })
}

//弹窗提示
function tipModal(tip) {
  wx.showToast({
    title: tip,
    icon: 'loading',
    duration: 3000
  })
}

// 拉取图片列表
function getShareList(that, page, status) {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
  })
  
  wx.request({
    url: PATH + '/resource-service/share/getShareList',
    method: 'get',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    data: {
      page: page,
      perPage: 10,
      status: status,
      userId:app.globalData.userId
    },
    //post success
    success: function (res) {
      console.log(res);
      switchScroll = true;
  
      if (res.statusCode == 200 && res.data.status == 200) {
        let list = res.data.result.data
        if (list.length == 0) {
          tipModal("没有更多了");
          return;
        }
        if (page > 1) {
          list = that.data.shareList.concat(list);
        }
        setTimeout(function () { 
          wx.hideToast();
        }, 500);
 
        // console.log(list);
        that.setData({
          shareList: list
        });
        let len = that.data.shareList.length;
        arr1 = [];
        arr2 = [];
        col1H = 0;
        col2H = 0;
        console.log(that.data.shareList)
        for (let i = 0; i < len; i++) {
          let imgItem = that.data.shareList[i];
          
          let scale = imgWidth / imgItem.imageWidth;
          let imgHeight = imgItem.imageHeight * scale;
          if (col1H <= col2H) {
            col1H += imgHeight;
            arr1.push(that.data.shareList[i]);
          } else {
            col2H += imgHeight;
            arr2.push(that.data.shareList[i]);
          }
        }
        that.setData({
          arr1: arr1,
          arr2: arr2
        })
      }
    }
  })
}

function goToShraeFn(that) {
  goToShare();
}

function getBanner(that) {
  wx.request({
    url: PATH + '/resource-service/share/getBanner',
    method: 'get',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    success: function (res) {
      console.log(res);
      if (res.statusCode == 200 && res.data.status == 200) {
        that.setData({
          imgUrls: res.data.list
        });
      }
    }
  })
}

 //调取个人钱包函数
 function getmyWallet(that){

   wx.request({
     url: PATH + "/account-service/user/getUserInfoById",
     header: {
       'Access-Token': app.globalData.accessToken,
     },
     method: "GET",
     data: {
       id: app.globalData.userId
     },
     success: function (res) {

       if (res.data.status == 200) {

         let amount = res.data.user.amount;
         let electric = res.data.user.electric;
         try {
           var value = wx.getStorageSync('key');

           if (value == null || value < amount ) {
          //  wx.playBackgroundAudio({
          //    dataUrl: 'http://didicharging-v2.oss-cn-beijing.aliyuncs.com/sound/didi.wav',
          //  })

             wx.setStorage({
               key: "key",
               data: amount
             });             
           }

           if (value == null || value > amount) {

             wx.playBackgroundAudio({
               dataUrl: 'http://didicharging-v2.oss-cn-beijing.aliyuncs.com/sound/didi1.wav',
             })

             wx.setStorage({
               key: "key",
               data: amount
             });
           }

           var value1 = wx.getStorageSync('key1');

           console.log("value: "+value1);    

           if (value1 == null || value1 < electric) {
      
             wx.playBackgroundAudio({
               dataUrl: 'http://didicharging-v2.oss-cn-beijing.aliyuncs.com/sound/didi2.wav',
    
             })

             wx.setStorage({
               key: "key1",
               data: electric
             });

             wx.showModal({
               title: '提示',
               content: '有人给你点赞了，请在消息列表查看',
               showCancel:false,
               success: function (res) {
                
               }
             })
           }


         } catch (e) {
           console.log();
         }

       }
     },
   });

 }

// 关闭模态框
function guanbi (that) {
  that.setData({
    openMask: false
  })
}
