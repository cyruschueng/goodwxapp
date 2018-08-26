// pages/core/student/student.js
//获取应用实例
var app = getApp();

Page({
  data: {
    header: {
      defaultValue: '',
      inputValue: '',
      help_status: false
    },
    main: {
      mainDisplay: true, // main 显示的变化标识
      total: 0,
      sum: 0,
      page: 0,
      message: '上滑加载更多'
    },
    testData: [],
    messageObj: { // 查询失败的提示信息展示对象
      messageDisplay: true,
      message: ''
    },
    grade: ['2017', '2016', '2015', '2014'],
    index: 0,
  },

  onLoad: function (options) {
    var _this = this;
    app.loginLoad(function () {
      _this.loginHandler.call(_this, options);
    });
  },

  //清除数据绑定
  bindClearSearchTap: function (e) {
    this.setData({
      'main.mainDisplay': true,
      'main.total': 0,
      'main.sum': 0,
      'main.page': 0,
      'main.message': '上滑加载更多',
      'testData': [],
      'header.inputValue': ''
    });
  },

  bindSearchInput: function (e) {
    this.setData({
      'header.inputValue': e.detail.value,
      'main.total': 0,
      'main.sum': 0,
      'main.page': 0,
      'main.message': '上滑加载更多',
      'testData': []
    });

    if (!this.data.messageObj.messageDisplay) {
      this.setData({
        'messageObj.messageDisplay': true,
        'messageObj.message': ''
      });
    }
    return e.detail.value;
  },

  // 点击搜索
  bindConfirmSearchTap: function () {
    this.setData({
      'main.total': 0,
      'main.sum': 0,
      'main.page': 0,
      'main.message': '上滑加载更多',
      'testData': []
    });
    this.search();
  },

  // 上滑加载更多
  onReachBottom: function () {
    if (this.data.main.message != '已全部加载' && this.data.main.message != '正在加载中') {
      this.search();
    }
  },

  // 搜索
  search: function (key) {
    var that = this,
      inputValue = key || that.data.header.inputValue,
      messageDisplay = false,
      message = '',
      reDdata = null,
      numberSign = false; // 用户输入的是姓名还是学号的标识

    // 消除字符串首尾的空格
    function trim(str) {

      return str.replace(/(^\s*)|(\s*$)/g, '');
    }

    inputValue = trim(inputValue);

    // 抽离对messageObj的设置成一个单独的函数
    function setMessageObj(messageDisplay, message) {

      that.setData({
        'messageObj.messageDisplay': messageDisplay,
        'messageObj.message': message
      });
    }

    // 对输入的是空格或未进行输入进行处理
    if (inputValue === '') {

      this.setData({
        'main.mainDisplay': true
      });

      return false;
    }

    // 防止注入攻击
    function checkData(v) {

      var temp = v;

      v = v.replace(/\\|\/|\.|\'|\"|\<|\>/g, function (str) { return ''; });
      v = trim(v);
      var no1 = v.length < temp.length,//非法字符
        no2 = /^[\u3220-\uFA29]+$/.test(v),//中文字符
        no3 = !isNaN(v), //检查数字
        no4 = v.length < 2;//最少2个数字
      if (no1 || no3) {
        messageDisplay = false;
        message = '亲，请检查输入哦!';
      } else if (!no2) {
        messageDisplay = false;
        message = '亲，只能输入中文哦!';
      } else if (no4) {
        messageDisplay = false;
        message = '亲，最少输入两个字符哦!';
      } else {
        messageDisplay = true;
      }
      return v;
    }

    // 对输入进行过滤
    inputValue = checkData(inputValue);

    setMessageObj(messageDisplay, message);
    this.setData({
      'header.inputValue': inputValue
    });

    // 存在非法输入只会提示错误消息而不会发送搜索请求
    if (messageDisplay === false) {
      return false;
    }

    // 处理成功返回的数据
    function doSuccess(data, messageDisplay) {
      var rows = data.data;
      // 对数据进行自定义加工 给每个数据对象添加一些自定义属性
      function doData(data) {
        var curData = null,
          curXm = null,
          len = data.length;

        // 若查询没有查出结果，则直接显示提示信息并退出
        if (len === 0) {
          doFail();
          return false;
        }

        // 对名字的匹配部分进行高亮划分
        function doXm(str, xm) {
          var activeName = '',
            arrXm = xm.split(''),
            strIndex = xm.indexOf(str),
            strLength = str.length;
          if (strIndex == -1) {
            return {
              activeName: '',
              xm: xm
            };
          } else {
            activeName = xm.substr(strIndex, strLength);
            arrXm.splice(strIndex, strLength);
            xm = arrXm.join('');

            return {
              activeName: activeName || '',
              xm: xm || ''
            };
          }
        }

        for (var i = 0; i < len; i++) {
          curData = data[i];
          curXm = doXm(inputValue, curData[2]);
          curData.display = false; // 添加控制隐藏列表信息显示的标识
          curData[12] = '/images/core/register.png';
          curData[10] = curXm.activeName || '';
          curData[11] = curXm.xm;
        }
        return data;
      }

      reDdata = doData(rows);

      // 若reDdata===false, 查询没有结果
      if (reDdata === false) {
        return false;
      }

      that.setData({
        'testData': that.data.testData.concat(reDdata),
        'main.mainDisplay': false,
        'main.total': data.data.length,
        'main.sum': that.data.main.sum + data.data.length,
        'messageObj.messageDisplay': messageDisplay,
        'main.message': '上滑加载更多'
      });
      wx.hideToast();

      if (reDdata.length === 1) {
        that.bindOpenList(0);
      }

      if (data.data.length <= that.data.main.sum) {
        that.setData({
          'main.message': '已全部加载'
        });
      }

    }

    // 处理没找到搜索到结果或错误情况
    function doFail(err) {
      var message = typeof err === 'undefined' ? '未搜索到相关结果' : err;
      setMessageObj(false, message);
      wx.hideToast();
    }

    that.setData({
      'main.message': '正在加载中',
      'main.page': that.data.main.page + 1
    });
    app.showLoadToast();

    wx.request({
      url: app._server + "/school/api/student_query.php",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        grade: that.data.grade[that.data.index],
        studentname: that.data.header.inputValue
      },
      success: function (res) {
        if (res.data && res.data.code === 200) {
          doSuccess(res.data, true);
        } else {
          app.showErrorModal(res.data.message);
          doFail(res.data.message);
        }
      },
      fail: function (res) {
        app.showErrorModal(res.errMsg);
        doFail(res.errMsg);
      }
    });
  },

  //学期选择器
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  // main——最优
  bindOpenList: function (e) {
    var index = !isNaN(e) ? e : parseInt(e.currentTarget.dataset.index),
      data = {};
    data['testData[' + index + '][13]'] = !this.data.testData[index][13];
    this.setData(data);
  },

  //让分享时自动登录
  loginHandler: function (options) {
    if (options.key) {
      this.setData({
        'main.mainDisplay': false,
        'header.defaultValue': options.key,
        'header.inputValue': options.key
      });
      this.search();
    }
  },

  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'header.help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'header.help_status': false
    });
  }
});