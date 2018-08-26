
// var Bmob = require('util/bmob.js');
var Bmob = require('../../util/bmob.js');
Bmob.initialize("fd4dbe92dfbb8c17ede6cbb700ad249a", "78f21f5644f57e0a0120a701c5ea73cc");

// This is our App Service.
// This is our data.
var helloData = {
  name: 'WeChat'
};

// Register a Page.
Page({
  data: helloData,
  changeName: function (e) {
    // sent data change to view
    if( Math.random()>0.5 )
    {
      this.setData({
        u_name: 'MINA'
      })
    }
    else {
      this.setData({
        u_name: 'MNA'
      })
    }
  },
  data: {
    nickName: [],
    countnum: 1,
    list: [
      {
        id: 'pay',
        name: '我要发起拼单',
        open: false,
        pages: ['pay1', 'pay2', 'pay3'],
      },
      {
        id: 'vote',
        name: '我要快速计算',
        open: false,
        pages: ['vote1', 'vote2', 'vote3'],
      },
      {
        id: 'rand',
        name: '风险感知测试',
        open: false,
        pages: ['prand1', 'prand2', 'prand3'],
        //pages: ['测试一', '测试二', '测试三']
      },
      {
        id: 'food',
        name: '风险偏好测试',
        open: false,
        pages: ['breakfast', 'lunch', 'dinner']
      },
      {
        id: 'content',
        name: '风险平衡参考',
        open: false,
        pages: ['text', 'icon', 'progress']
      },
      // {
      //   id: 'view',
      //   name: '暂停',
      //   open: false,
      //   pages: ['view', 'scroll-view', 'swiper']
      // }, 
      // {
      //   id: 'form',
      //   // name: '表单组件',
      //   name: '3这个没啥用',
      //   open: false,
      //   pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea']
      // }, {
      //   id: 'nav',
      //   // name: '导航',
      //   name: '4这个没啥用',
      //   open: false,
      //   pages: ['navigator']
      // }, {
      //   id: 'media',
      //   // name: '媒体组件',
      //   name: '5看这里',
      //   open: false,
      //   pages: ['image', 'audio', 'video']
      //   // pages: ['你瞧', '你听', '你看']
      // }, {
      //   id: 'map',
      //   // name: '地图',
      //   name: '6这个没啥用',
      //   pages: ['map']
      // }, {
      //   id: 'canvas',
      //   // name: '画布',
      //   name: '7这个没啥用',
      //   pages: ['canvas']
      // }
    ],
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'resources/pic/bidpic1.png',
      'resources/pic/bidpic2.png',
      'resources/pic/bidpic3.png',
      'resources/pic/bidpic4.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    vertical: Math.random()>0.5,
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    });

    // 转发到群组后打开 
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    };

    var Diary = Bmob.Object.extend("_User");
    var query = new Bmob.Query(Diary);
    query.count({
      success: function (count) {
        // 查询成功，返回记录数量
        var countnum = count;
        console.log("您是第 " + count + " 位用户");
        wx.showToast({
          title: "您是第 " + count + " 位用户",
          icon: 'success',
          duration: 1002
        });
        this.setData({
          countnum: count,
        })
      },
      error: function (error) {
        // 查询失败
      }
    });

    // // 添加一行数据
    // var Diary = Bmob.Object.extend("diary");
    // var diary = new Diary();
    // diary.set("title", "hello");
    // diary.set("content", "hello world");
    // //添加数据，第一个入口参数是null
    // diary.save(null, {
    //   success: function (result) {
    //     // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
    //     console.log("日记创建成功, objectId:" + result.id);
    //   },
    //   error: function (result, error) {
    //     // 添加失败
    //     console.log('创建日记失败');
    //   }
    // });


    // // 获取一行数据
    // var user_table = Bmob.Object.extend("_User");
    // var query = new Bmob.Query(user_table);
    // query.get("4edc3f6ee9", {
    //   success: function (result) {
    //     // The object was retrieved successfully.
    //     console.log("该日记标题为" + result.get("title"));
    //   },
    //   error: function (result, error) {
    //     console.log("查询失败");
    //     }
    // });

    // // 修改一行数据
    // var Diary = Bmob.Object.extend("diary");
    // var query = new Bmob.Query(Diary);
    // // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    // query.get("4edc3f6ee9", {
    //   success: function (result) {
    //     // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
    //     result.set('title', "我是title");
    //     result.set('content', "我是content");
    //     result.save();
    //     // The object was retrieved successfully.
    //   },
    //   error: function (object, error) {
    //   }
    // });

  },
  
  weixinlogin: function (e) {

    var user = new Bmob.User();//开始注册用户
    var newOpenid = wx.getStorageSync('openid');
    // console.log(newOpenid);
    var nickName = [];


    var userInfo = [];
    var nickName = [];
    var avatarUrl = [];

    // // 获取一行数据
    // var user_table = Bmob.Object.extend("_User");
    // var query = new Bmob.Query(user_table);
    // console.log(newOpenid);
    // query.get("fbb766d660", {
    //   success: function (result) {
    //     // The object was retrieved successfully.
    //     console.log("nickName" + result.get('nickName'));
    //   },
    //   error: function (result, error) {
    //     console.log("查询失败");
    //     console.log(result);
    //     console.log(error);
    //   }
    // });

    if (!newOpenid) {

      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);

            if (user.get("nickName")) {
              // 第二次访问
              console.log(user.get("nickName"), 'res.get("nickName")');
              nickName = user.get("nickName");
              console.log(nickName);
              wx.setStorageSync('openid', openid);
              wx.setStorageSync('nickName', nickName);
            } else {

              //保存用户其他信息
              wx.getUserInfo({
                success: function (result) {

                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;

                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号

                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();

                    }
                  });

                }
              });

            }

          }, function (err) {
            console.log(err, 'errr');
            wx.showToast({
              title: '登陆失败',
              icon: 'fail',
              duration: 2001
            });
          });
        }
      });


    }
    else {

      // console.log(wx.getStorageSync("openid"));
      // console.log(wx.getStorageSync("nickName"));
      nickName = wx.getStorageSync("nickName");
      // console.log(nickName);

      console.log('已经登陆:index');
      wx.showToast({
        title: '已经登陆',
        icon: 'success',
        duration: 2001
      });
    }
    // console.log(nickName);
    this.setData({
      nickName: nickName,
    })
  },
  scanlogin: function (e) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '扫描成功',
          icon: 'success',
          duration: 1002
        });
      }
    })
  },
  onlyscanlogin: function (e) {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '拍照扫描成功',
          icon: 'success',
          duration: 1001
        });
      }
    })
  },


  sports: function (e) {
    // 运动
    wx.onAccelerometerChange(function (res) {
      wx.showToast({
        title: res.x + res.y + res.z,
        icon: 'success',
        duration: 1001
      });
      console.log(res.x)
      console.log(res.y)
      console.log(res.z)
    })
    wx.startAccelerometer()
  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小数据顾问',
      path: 'page/component/index',
      success: function (res) {
        console.log('转发成功');
        // 转发成功

        // 转发时获取群信息 
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        };

        console.log('shareTickets\t' + shareTickets);
        console.log('shareTickets[0]\t' + shareTickets[0]);
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;

            console.log('res\t' + res);
            console.log(res);
            console.log('roomTopic\t' + res.roomTopic);
            console.log('encryptedData\t' + encryptedData);
            console.log('iv\t' + iv);
          }
        });

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
