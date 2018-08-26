// pages/map/map.js
import { reToMainPage, goToUserInfo, goToReceiveDev, goToUser } from "../../libs/router";

import {
  scansaoma, gofujin, gofenxaing
} from "../../libs/saoma";


let app = getApp();
let PATH = app.globalData.PATH;
let IMG_PATH = app.globalData.IMG_PATH;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    stations: null,
    IMG_PATH: IMG_PATH,
    maskState: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    let local = app.globalData.location;

    //获取用户信息
    wx.getSystemInfo({
      success: (res) => {

        that.setData({
          windowHeight: res.windowHeight,
          windowWeight: res.windowWidth,
          longitude: local.longitude,
          latitude: local.latitude,

        })
      }
    });

    let mapControls = [

      {
        id: 1,
        iconPath: '/images/kefu.png',
        position: {
          left: 21,
          top: that.data.windowHeight - 70,
          width: 40,
          height: 40
        },
        clickable: true
      },
      
      {
        id: 2,
        iconPath: '/images/chudian.png',
        position: {
          left: that.data.windowWeight / 2 - 35,
          top: that.data.windowHeight - 110,
          width: 80,
          height: 80
        },

        clickable: true
      },


      {
        id: 3,
        iconPath: '/images/wode3.png',
        position: {
          left: that.data.windowWeight  - 61,
          top: that.data.windowHeight - 70,
          width: 40,
          height: 40
        },
        clickable: true
      }

      

    ];

    that.setData({
      controls: mapControls,
    })

    getLocalPoint(that);
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('myMap');
  },

  

  markertap:function(e){
    let that = this;

    console.log("fhpioupapshfioahs");
    console.log(e.markerId);

   if(that.data.stations[e.markerId] != null ) {

      this.setData({
        station: this.data.stations[e.markerId],
        maskState: true
      });

     }else{
       
   wx.navigateTo({
     url: '../shareHistory/shareHistory?id=' + e.markerId
   });
}
   
   


  },

//关闭模态框
  bindCloseMask: function () {
    console.log(0);
    this.setData({
      maskState: false,
    });
  },

  //急求按钮功能
  controltap: function (e) {
    //加个if 纯翠是为了后续粘代码方便
   
   let that=this;

   //打客户电话
    if (e.controlId == 1) {
      wx.navigateTo({
        url: '../xundian/xundian',
      })
    }

    //扫码
    if (e.controlId == 2) {
      console.log("yui");
      scansaoma(app.globalData.userId, goToReceiveDev, PATH);
        
      
    }

    //我的
    if (e.controlId == 3) {

       wx.navigateTo({
         url: '../laidian/laidian',
       })
    }
  },
  
  // 坐标点改变
  bindChange: function (e) {
    let that = this;
    if (e.type == 'end') {
      // console.log(e);
      that.mapCtx.getCenterLocation({
        success: function (res) {

          that.setData({
            longitude: res.longitude,
            latitude: res.latitude
          });
          getLocalPoint(that);
        }
      })
    }
  },



  callChargeMan:function(){
    let that=this;
    wx.makePhoneCall({
      phoneNumber: that.data.station.phone
    });
    that.setData({
      maskState: false,
    });
  },

  findStation:function(){    
   let that=this;

   if (that.data.station != null) {

    wx.openLocation({
      latitude: that.data.station.latitude,
      longitude: that.data.station.longitude,
      scale: 10, // 缩放比例 
      name: that.data.station.name,
      address: that.data.station.address  
    });
    that.setData({
      maskState: false,
    });
    }

  },

  // 去地图
  goToMap: function () {
    gofujin(app.globalData.location)
  },
  // 触电扫码
  scanCode: function () {
    let that = this;
    scansaoma(app.globalData.userId, goToReceiveDev, PATH);
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
  }

})

//定位用
function getLocalPoint(that) {
 wx.request({
   url: PATH +"/resource-service/wallet/getWalletInfoByUserId",
   header: {
     'Access-Token': app.globalData.accessToken,
   },
   method: "GET",
   data: {
     userId: app.globalData.userId,
   },
   success: function (res) {
     
     if (res.data.status == 200){
     
       that.setData({
         wallet: res.data.wallet
       });
     }

   }

 })


  wx.request({
    url: PATH + "/resource-service/map/getPointList",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "GET",
    data: {
      longitude: that.data.longitude,
      latitude: that.data.latitude,
      distance: 500,
       userId: app.globalData.userId
    },
    success: function (res) {
      // console.log(res);
      if (res.data.status == 200) {
        let markArr = [];
        // 分享定位
        let sharelist = res.data.result.sharelist;
        // console.log(sharelist);
        for (let i = 0; i < sharelist.length; i++) {
          // 男女图标区分
          let iconPath = sharelist[i].sex == 1 ? "/images/man.png" : '/images/wuman.png';
          let mark = {
            iconPath: iconPath,
            id: sharelist[i].shareUserId,
            // shareId:sharelist[i].userId,
            latitude: sharelist[i].latitude,
            longitude: sharelist[i].longitude,
            width: 40,
            height: 40,
            pointType: 'user',
            display: "ALWAYS"
          };

          markArr.push(mark);
        }

        // 驿站定位
        let stationlist = res.data.result.stationlist;

        that.setData({
          stations: stationlist,

        })

        console.log(stationlist);
        for (let i = 0; i < stationlist.length; i++) {
          let mark = {
            iconPath: "/images/station.png",
            id: i,
            latitude: stationlist[i].latitude,
            longitude: stationlist[i].longitude,
            width: 40,
            height: 40,
            pointType: 'station',
            // callout: {
            //   content: ' 站点：' + stationlist[i].name + '\r'+'充电侠：'+stationlist[i].user+'\r'+'电话：'+stationlist[i].phone +'\r'+'地址：'+ stationlist[i].address,
            //   borderRadius: 5,
            //   padding:10,
            //   bgColor: '#ffd843',
            //   display: 'BYCLICK'
            // },

          };
          markArr.push(mark);

        }
        console.log(markArr)
        that.setData({
          mapMarks: markArr,

        })

      }
    }
  });



}




