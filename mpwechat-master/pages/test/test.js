//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    // 页面巨幕图片路径
    jumbotronSrc: './../../static/img/banner.png',
    // 选项卡参数设置
    tabSetting: {
      item: ['群排行', '群动态'],
      selectIndex: 0,
      rankHeight: '',
      btn: {
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false
      },
      data: [
        {
          nickName: '韩帅帅',
          type: 1,
          friendNum: 197,
          newclientNum: 29,
          allclientNum: 159
        },
        {
          nickName: '韩帅帅',
          type: 0,
          friendNum: 197,
          newclientNum: 29,
          allclientNum: 159
        },
        {
          nickName: '韩帅帅',
          type: 1,
          friendNum: 197,
          newclientNum: 29,
          allclientNum: 159
        },
        {
          nickName: '韩帅帅',
          type: 0,
          friendNum: 197,
          newclientNum: 29,
          allclientNum: 159
        },
      ],
      data1: [
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '转发文章',
          time: '3分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次 - 韩帅帅工作室'
          },

        },
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '分享文章',
          time: '13分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次你的经历分配决定了你的层次你的经历分配决定了你的层次你的经历分配决定了你的层次你的经历分配决定了你的层次你的经历分配决定了你的层次 - 韩帅帅工作室'
          }
        },
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '转发文章',
          time: '20分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次 - 韩帅帅工作室'
          }
        },
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '转发文章',
          time: '20分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次 - 韩帅帅工作室'
          }
        },
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '转发文章',
          time: '20分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次 - 韩帅帅工作室'
          }
        },
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '转发文章',
          time: '20分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次 - 韩帅帅工作室'
          }
        },
        {
          userImg: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
          nickName: '韩帅帅',
          type: '转发文章',
          time: '20分钟前',
          share: {
            img: 'http://wx.qlogo.cn/mmopen/vi_32/rz4xqX0A7oyAPVbbqylbDcDQhZmibHHouwcxHPycLVfyicN3xEEXBOibdjw3LPN12UvedakfMO4y0ufAsKQIrfSfg/0',
            content: '你的经历分配决定了你的层次 - 韩帅帅工作室'
          }
        }
      ]
    },
    userInfo: {},
    showModalStatus: false,
    friendNum: undefined,
    dynamicgroup_load:false,
    rank_load:false
  },
  //事件处理函数
  bindViewTap: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      'tabSetting.selectIndex': index
    })
  },
  onLoad: function () {
    var that = this
    //要求小程序返回分享目标信息
    wx.showShareMenu({
      withShareTicket: true
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })
    //获取屏幕高度
    var screenHeight = wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.windowHeight;
        console.log(screenHeight)
        console.log(screenHeight - (wx.getSystemInfoSync().screenWidth / 750) * (298 + 88));
        var rankHeight = screenHeight - (wx.getSystemInfoSync().screenWidth / 750) * (298 + 88 + 15) - 46;
        console.log(rankHeight);
        that.setData({
          'tabSetting.rankHeight': rankHeight + 'px'
        })
      }
    })
  },
  //转发函数
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      //转发标题
      title: '排行榜',
      //desc
      desc: '看看你当前的排行吧!',
      //转发路径
      path: '/pages/share/share',
      success: function (res) {
        // 转发成功
        console.log("转发成功!")
        console.log(JSON.stringify(res));
        console.log(res.shareTickets[0]);
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败!")
        console.log(JSON.stringify(res));
      },
      complete: function () {
        //转发结束后的回调函数
        console.log("转发操作!")
      }
    }
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    var that = this;
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            friendNum: null
          }
        );
      }
      //关闭 
      if (currentStatu == "ok") {
        this.setData(
          {
            showModalStatus: false
          }
        );
        console.log("ok")
        wx.showToast({
          title: '今日好友数' + this.data.friendNum,
          icon: 'success',
          duration: 2000
        })
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  bindKeyInput(e) {
    this.setData({
      friendNum: e.detail.value
    })
  },
  //上拉加载
  lower(e) {
    var that =  this;
    console.log(e)
    if (this.data.dynamicgroup_load === true){return ;}
    this.setData(
      {
        dynamicgroup_load: true
      }
    );
    setTimeout(()=>{
      this.setData(
        {
          dynamicgroup_load: false
        }
      );
    },1000);
  },
})
