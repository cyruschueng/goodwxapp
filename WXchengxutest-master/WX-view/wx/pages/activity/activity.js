//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    banner_img: '',
    help_img: 'http://ruihe.99zan.net/Public/images/wx/wx_06.jpg',
    rule_img: 'http://ruihe.99zan.net/Public/images/wx/wx_09.jpg',
    cooperation_img: 'http://ruihe.99zan.net/Public/images/wx/wx_08.jpg',
    order_img: 'http://ruihe.99zan.net/Public/images/wx/wx_07.jpg',
    share_img: 'http://ruihe.99zan.net/Public/images/wx/wx_10.png',
    jack_img: 'http://ruihe.99zan.net/Public/images/wx/wx_11.png',
    image_tel: 'http://ruihe.99zan.net/Public/images/wx/wx_05.jpg',
    image_file: 'http://ruihe.99zan.net/Public/images/wx/file.png',
    result: [
      { image: 'http://ruihe.99zan.net/Public/images/wx/head1.jpg', name: "刘*喜 兑换了200元港惠购物卡" },
      { image: 'http://ruihe.99zan.net/Public/images/wx/wx_08.jpg', name: "于* 兑换了200元港惠购物卡" },
      { image: 'http://ruihe.99zan.net/Public/images/wx/wx_09.jpg', name: "李*全喜 兑换了200元港惠购物卡" },
      { image: 'http://ruihe.99zan.net/Public/images/wx/head1.jpg', name: "张*龙 兑换了200元港惠购物卡" },
      { image: 'http://ruihe.99zan.net/Public/images/wx/wx_08.jpg', name: "刘* 兑换了200元港惠购物卡" },
      { image: 'http://ruihe.99zan.net/Public/images/wx/wx_09.jpg', name: "徐*露 兑换了200元港惠购物卡" }],
    actice_id: '',
    mopenid: '',
    res_pro: {},
    list_num: {},
    jacknumber: '',
    time: '',
    title: '',
    exchange: '',
    copie: '',
    distance: '0px',
    share_item: false,
    Jack_info: false,
    info_txt: '',
    mask: false,
    storage:{}
  },
  //事件处理函数
  onLoad: function (options) {
    wx.showLoading({ title: '数据加载中' });
    // 转发回调
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showToast({
      title: '活动加载完成',
      icon: 'success',
      duration:2000,
    });
    var that = this;
    var range = 0;
    this.getStorage();//初始化读取信息
    this.gettime();   //校准时间
    this.lcal(range); //获奖名单
  },
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    
  },
  // 请求Storage
  getStorage: function () {
    var that = this;
    wx.getStorage({
      key: 'u_Info',
      success: function (res) {
        console.log('已存储用户信息');
        that.setData({
          mopenid: res.data.openid
        })
        // 初始化请求活动内容
        wx.request({
          url: 'https://xcx.aichukad.com/index.php/home/activity/activity',
          data: {},
          method: 'POST',
          success: function (active) {
            // console.log(active)
            var data = active.data;
            // console.log(that.title)
            that.setData({
              actice_id: data.id,
              banner_img: data.imgurl,
              title: data.activity_name,
              copie: data.residue_num,
              exchange: data.prize_num - data.residue_num,
              time: '距离结束剩：' + data.time_d + '天 ' + data.time_t + '小时 ' + data.time_f + '分钟',
              res_pro: data.words,
            });
            //获取集卡数量
            that.lululuck(that.data.actice_id);
            //判断分享入口
            that.isshare(that.options);
          }
        });
      },
      fail: function (res) {
        setTimeout(function () {
          that.getStorage();
          console.log('尚未存储用户信息')
        }, 300)
      }

    })
  },
  lululuck: function (actice_id) {
    var that = this;
    // 读取Storage-u_Info
    wx.getStorage({
      key: 'u_Info',
      success: function (res) {
        res.data.activity_id = actice_id;
        // 新建存储
        wx.setStorage({
          key: "u_Info_acid",
          data: res.data
        });
        that.setData({
          storage: res.data
        });
        // console.log(res.data);
        // 创建lulu key发送给后台 查询获奖状态
        wx.request({
          url: 'https://xcx.aichukad.com/index.php/Home/User/index',
          //仅为示例，并非真实的接口地址
          data: {
            nickName: res.data.nickName,
            avatarUrl: res.data.avatarUrl,
            gender: res.data.gender,
            city: res.data.city,
            province: res.data.province,
            country: res.data.country,
            openid: res.data.openid,  //openid
            unionid: res.data.unionid,  // unionid
            activity_id: res.data.activity_id,
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (data_res) {
            // console.log(data_res.data.datalist)
            that.setData({
              list_num: data_res.data.datalist,
              jacknumber: data_res.data.datalist.lotto_num
            });
            wx.hideLoading();
          }
        });
      },
      fail: function (res) {
        var that = this;
        console.log('lulu getStorage失败');
        wx.hideLoading();
      }
    });
  },
  luck: function (event) {  //我要抽奖 
    var that = this;
    // 读取Storage-u_Info
    wx.showLoading({ title: '正在抽奖', mask:true});
    wx.getStorage({
      key: 'u_Info_acid',
      success: function (res) {
        // console.log(res)
        wx.showToast({
          title: '抽奖成功',
          icon: 'success',
          duration:2000,
          mask:true
        });
        wx.request({
          url: 'https://xcx.aichukad.com/index.php/home/activity/luckDraw', 
          data: {
            openid: res.data.openid,
            acid: res.data.activity_id
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (data_res) {
            that.setData({
              list_num: data_res.data.datalist,
              jacknumber: data_res.data.datalist.lotto_num,
              info_txt: data_res.data.card.words,
            });
            wx.hideLoading();
            that.jackopen();
          }
        })
      }
    })

  },
  make: function (e) {  //生成海报
    var that = this;
    wx.navigateTo({
      url: '/pages/poster/poster'
    });
    that.setData({
      share_item: false,
      Jack_info: false,
      mask: false
    });
  },
  close: function () { //关闭所展示的弹框
    var that = this;
    that.setData({
      share_item: false,
      Jack_info: false,
      mask: false
    });
  },
  jackopen: function () { //展示中奖字符
    var that = this;
    that.setData({
      Jack_info: true,
      mask: true
    });
  },
  seek: function () {  // 展示求助好友
    var that = this;
    that.setData({
      share_item: true,
      mask: true
    });
  },
  // 请求时间
  gettime: function () {
    var that = this;
    // 初始化请求活动内容
    wx.request({
      url: 'https://xcx.aichukad.com/index.php/home/activity/activity', //仅为示例，并非真实的接口地址
      data: {},
      method: 'POST',
      success: function (active) {
        var data = active.data;
        that.setData({
          time: '距离结束剩：' + data.time_d + '天 ' + data.time_t + '小时 ' + data.time_f + '分钟',
        });
      }
    });
    setTimeout(function () {
      that.gettime()
    }, 60000)
  },
  lcal: function (range) {
    var that = this;
    var height = -300;
    setTimeout(function () {
      range = range - 40;
      if (range < -250) {
        range = 0;
      }
      // console.log(range)
      that.setData({
        distance: range + 'px',
      });
      that.lcal(range)
    }, 2000)
  },
  // 直接求助 设置转发
  onShareAppMessage: function (res) {
    var that = this;
    var share_openid = that.data.mopenid;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('来自页面内转发按钮')
    }
    return {
      title: '哈尔滨优选送好礼',
      path: '/pages/activity/activity?share_openid=' + share_openid + '&acid=' + that.data.actice_id+'&type=1',
      success(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
        console.log(res);
        if (res.shareTickets) {
           // 获取转发详细信息
           wx.getShareInfo({
              shareTicket: res.shareTickets[0],
              success(res) {
                 res.errMsg; // 错误信息
                 res.encryptedData; // 解密后为一个 JSON 结构（openGId  群对当前小程序的唯一 ID）
                 res.iv; // 加密算法的初始向量
              },
              fail() {
              console.log('获取转发群组信息失败')
            },

           });
        };
      },
      fail(e) {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 2000
        })
        // shareAppMessage:fail cancel
        // shareAppMessage:fail(detail message) 
      },
      complete() {
        that.close();
      }
    }
  },
  isshare: function (options,res){
    var that = this;
    // 校验是否为分享入口
    if (options.type == 2){
      wx.request({
        url: 'https://xcx.aichukad.com/index.php/home/activity/help',
        data: {
          type: 1,
          my_openid: that.data.mopenid,
          share_openid: options.share_openid,
          acid: that.data.activity_id
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.errcode == 1) {
            //请求 为分享者+1
            that.lululuck(that.data.actice_id);
          };
        }
      })
    } else if (options.type == 1) {
      wx.request({
        url: 'https://xcx.aichukad.com/index.php/home/activity/help',
        data: {
          type:2,
          my_openid: that.data.mopenid,
          share_openid: options.share_openid,
          acid: that.data.activity_id
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.errcode == 1) {
            //请求 为分享者+1
            that.lululuck(that.data.actice_id);
          };
        }
      })
    }
        
        


  }
})
