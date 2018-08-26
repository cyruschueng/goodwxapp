//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    offline: false,
    remind: '加载中',
    core: [
      { id: 'kebiao', name: '课表查询', disabled: false, offline_disabled: false },
      { id: 'chengji', name: '学校成绩', disabled: false, offline_disabled: false },
      { id: 'kaoshi', name: '考试安排', disabled: false, offline_disabled: false },
      { id: 'empty', name: '空教室', disabled: false, offline_disabled: true },
      { id: 'second', name: '补考安排', disabled: false, offline_disabled: true },
      { id: 'ncre', name: '双学位', disabled: false, offline_disabled: true },
      { id: 'register', name: '新生注册', disabled: false, offline_disabled: true },
      { id: 'mail', name: '院长信箱', disabled: false, offline_disabled: true },
      { id: 'calendar', name: '校园日历', disabled: false, offline_disabled: true },
      { id: 'club', name: '学校社团', disabled: false, offline_disabled: false },
    ],
    core1: [
      { id: 'cet', name: 'CET', disabled: false, offline_disabled: true },
      { id: 'ncre', name: 'NCRE', disabled: false, offline_disabled: true },
      { id: 'notice', name: '新生录取', disabled: false, offline_disabled: true },
    ],
    card: {
      'kb': {
        show: false,
        data: {}
      },
    },
    banner: [
      'http://www.ecjtuit.com.cn/templets/default/index_images/top_banner_1.png',
      'http://www.ecjtuit.com.cn/templets/default/index_images/top_banner_2.png',
      'http://www.ecjtuit.com.cn/templets/default/index_images/top_banner_3.png',
      'http://www.ecjtuit.com.cn/templets/default/index_images/top_banner_4.png',
      'http://www.ecjtuit.com.cn/templets/default/index_images/top_banner_5.png',
    ],
    user: {},
    disabledItemTap: false, //点击了不可用的页面
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '掌上交理',
      desc: '碎片化、一站式、一体化校园移动门户',
      path: '/pages/index/index'
    };
  },
  //轮播图地址获取
  loadBanner: function () {
    var _this = this;
    wx.request({
      url: 'https://www.jmideas.cn/api/banner.php',
      data: {},
      method: 'GET',
      success: function (res) {
        if (res.data && res.data.code === 200) {
          var data = res.data.data, banner = [];
          for (var i = 0; i < data.length; i++) {
            banner.push(data[i].imgUrl)
          }
          _this.setData({
            banner: banner
          })
        }
      },
    })
  },
  //轮播图点击事件
  showGoods: function () {
    app.showErrorModal('帝国理工模型协会欢迎2017新生', '模型协会')
    // wx.navigateTo({
    //   //url: '../goods/detail/detail?objectId=5816e3b22e958a0054a1d711'
    //   url: '/pages/More/Login/login'
    // });
  },
  onShow: function () {
    var _this = this;
    _this.setData({
      user: app._user
    });
    //离线模式重新登录
    if (_this.data.offline) {
      _this.login();
      return false;
    }

    function isEmptyObject(obj) { for (var key in obj) { return false; } return true; }
    function isEqualObject(obj1, obj2) { if (JSON.stringify(obj1) != JSON.stringify(obj2)) { return false; } return true; }
    var l_user = _this.data.user,  //本页用户数据
      g_user = app._user; //全局用户数据

    //排除第一次加载页面的情况（全局用户数据未加载完整 或 本页用户数据与全局用户数据相等）
    // if (isEmptyObject(l_user) || isEqualObject(l_user.we, g_user.we)) {
    if (isEmptyObject(l_user)) {
      _this.setData({
        'remind': '未绑定'
      });
      _this.getCardData();
      return false;
    }


    //全局用户数据和本页用户数据不一致时，重新获取卡片数据
    if (!isEqualObject(l_user.we, g_user.we)) {
      //判断绑定状态
      if (!g_user.is_bind) {
        _this.setData({
          'remind': '未绑定'
        });
      } else {
        _this.setData({
          'remind': '加载中'
        });
        //清空数据
        _this.setData({
          user: app._user,
          'card.kb.show': false,
        });
        _this.getCardData();
      }
    }
  },
  onLoad: function () {
    //this.loadBanner();
    this.login();
  },
  login: function () {
    var _this = this;
    //如果有缓存，则提前加载缓存
    if (app.cache.version === app.version) {
      try {
        _this.response();
      } catch (e) {
        //报错则清除缓存
        app.cache = {};
        wx.clearStorage();
      }
    }
    //然后再尝试登录用户, 如果缓存更新将执行该回调函数
    app.getUser(function (status) {
      _this.response.call(_this, status);
    });
  },
  response: function (status) {
    var _this = this;
    if (status) {
      if (status != '离线缓存模式') {
        //错误
        _this.setData({
          'remind': status
        });
        return;
      } else {
        //离线缓存模式
        _this.setData({
          offline: true
        });
      }
    }
    _this.setData({
      user: app._user
    });
    //判断绑定状态
    if (!app._user.is_bind) {
      _this.setData({
        'remind': '未绑定'
      });
    } else {
      _this.setData({
        'remind': '加载中'
      });
      _this.getCardData();
    }
  },
  disabled_item: function () {
    var _this = this;
    if (!_this.data.disabledItemTap) {
      _this.setData({
        disabledItemTap: true
      });
      setTimeout(function () {
        _this.setData({
          disabledItemTap: false
        });
      }, 2000);
    }
  },
  getCardData: function () {
    var _this = this, course = '';
    wx.showNavigationBarLoading();
    //判断并读取缓存
    if (app.cache.kb) {
      _this.kbRender(app.cache.kb);
    } else {
      _this.getKebiao();
    }
    if (_this.data.offline) { return; }
  },
  //获取课表数据
  getKebiao: function () {
    var _this = this, banji = '';
    if (app._user.we.student_no) {
      banji = app._user.we.student_no.trim().substring(0, 12);
      wx.request({
        url: app._server + "/school/api/kebiao.php",
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          banji: banji,
        },
        success: function (res) {
          if (res.data && res.data.code === 200) {
            var data = res.data;
            var _data = '';
            for (let key in data.data) {
              //key值为1-7,7次循环，天数
              for (let subKey in data.data[key]) {
                //subKey值为1-5,5次循环，上课节数
                for (let subSubKey in data.data[key][subKey]) {
                  //subSubKey值为。。。。。
                  let tmp = data.data[key][subKey][subSubKey];
                  tmp = tmp.split('{br}');
                  data.data[key][subKey][subSubKey] = {
                    'name': tmp[0],
                    'teacher': tmp[1],
                    'room': tmp[2],
                    'week': tmp[3]
                  }
                  _this._data = data.data;
                }
              }
            }
            if (_this._data) {
              //保存课表缓存
              app.saveCache('kb', _this._data);
              _this.kbRender(_this._data);
            } else { _this.setData({ remind: '暂无数据' }); }

          } else {
            app.removeCache('kb');
            _this.setData({
              remind: res.data.message || '未知错误'
            });
          }

        },
        fail: function (res) {
          if (_this.data.remind == '加载中') {
            _this.setData({
              remind: '网络错误'
            });
          }
          console.warn('网络错误');
        },
        complete: function () {
          if (_this.data.remind == '加载中') {
            _this.setData({
              remind: '首页暂无展示'
            });
          }
          wx.hideNavigationBarLoading();
        }
      });
    }
  },
  //课表渲染
  kbRender: function (_data) {
    var _this = this;
    var weeks = app._time[1],
      today = new Date().getDay(),
      list = [],
      time_list = _this.data.card.kb.time_list;
    today = today === 0 ? 7 : today;
    for (let subKey in _data[today]) {
      for (let subSubKey in _data[today][subKey]) {
        let course = _data[today][subKey][subSubKey];
        // 是否显示该门课 # 根据当前周数和单双周分析
        course['display'] = false;
        if (course['week']) {
          //更改单双周都有课后缀不完整（1-16）或者只有一节课的周数数据（8），完整形式1-16-0
          var add0 = course['week'].split('-').length - 1
          if (add0 == 0) {
            course['week'] = course['week'] + '-' + course['week'] + '-0'
          } else if (add0 == 1) {
            course['week'] = course['week'] + '-0'
          }
          let weekTime = course['week'].split('-');
          if (weeks >= weekTime[0] && weeks <= weekTime[1]) {
            switch (weekTime[2]) {
              case '0':
                course['display'] = true;
                break;
              case '1':
                if (weeks % 2 == 1) {
                  course['display'] = true;
                }
                break;
              case '2':
                if (weeks % 2 == 0) {
                  course['display'] = true;
                }
                break;
              default:
                break;
            }
          }
        }
        var jies = ['1-2', '3-4', '5-6', '7-8', '9-10'];
        var times = ['8:00 ~ 9:40', '10:05 ~ 11:45', '14:30 ~ 16:10', '16:35 ~ 18:15', '19:00 ~ 21:00'];
        if (course.display == true) {
          var jie = jies[subKey - 1];
          var time = times[subKey - 1];
          list.push({
            when: jie + '节' + '（' + time + '）',
            what: course.name,
            where: course.room.trim()
          });
        }
      }
    }

    // 保存渲染后的课程信息
    _this.setData({
      'card.kb.data': list,
      'card.kb.show': true,
      'card.kb.nothing': !list.length,
      remind: ''
    });
    wx.hideNavigationBarLoading();
  },
});