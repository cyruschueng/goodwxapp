// kebiao.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    weekTitle: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    // 每节课通过 style 的 top 进行定位 # 第一个是占位符 →_→ 后面的数字 计算过程见文档
    courseTop: ['LaLaLa', 0, 210, 425, 635, 850],
    // 调色板 # 课程背景颜色
    palette: ['#3399CC', '#669999', '#CC9966', '#FF6666', '#666699', '#33CC99', '#996666', '#FF99CC', '#99CC33', '#99CCFF'],
    // 当前周数
    weeks: 0,
    // 课程信息
    courses: {}
  },

  showDetail: function (e) {
    let dataSet = e.currentTarget.dataset,
      course = this.data.courses[dataSet.day][dataSet.lesson][dataSet.id],
      weekTime = course['week'].split('-'),
      weekArr = ['', ', 单', ', 双'],
      week = '';

    week = weekTime[0] + '-' + weekTime[1] + ' 周' + weekArr[weekTime[2]];

    wx.showModal({
      title: '详情',
      content: course['name'] + ' / ' + course['teacher'] + ' / ' + course['room'] + ' / ' + week,
      confirmText: '多谢',
      showCancel: false
    });
  },

  onLoad: function () {
    var _this = this;
    if (!app._user.we.student_no) {
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    //判断并读取缓存
    if (app.cache.kb) {
      _this.kbRender(app.cache.kb);
    } else {
      _this.getKebiao();
    }
  },

  //下拉更新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getKebiao();
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
          console.log(res)
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
          wx.stopPullDownRefresh();
        }
      });
    }
  },


  //课表渲染
  kbRender: function (_data) {
    // 当前周数 # 根据开学日期和当前日期计算
    //学期开始未解决，，，，'termBegin': data.termBegin,   app.js
    var _this = this,
      weeks = app._time[1],
      resWeekTitle = [],
      index = 0,
      courseBg = {};
    for (let key in _data) {
      // 根据课程信息筛选 # 隐藏没有课的 周X
      resWeekTitle.push(_this.data.weekTitle[key - 1]);
      for (let subKey in _data[key]) {
        for (let subSubKey in _data[key][subKey]) {
          let course = _data[key][subKey][subSubKey];
          // 每门课一种颜色 # 以课程名字当索引
          let bgKey = course['name'];
          if (!courseBg[bgKey]) {
            courseBg[bgKey] = _this.data.palette[index++ % 10];
          }
          course['bg'] = courseBg[bgKey];
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
          //删除没有课的数组
          if (!_data[key][subKey][0].name) {
            delete _data[key][subKey];
          }

          //9-11 小节连上
          course['height'] = 0;
          if (_data[key][5].length > 0) {
            var tmp = _data[key][5]
            for (let tmpKey in tmp) {
              tmp[tmpKey]['height'] = 300;
            }
          }
          // 该课程是否多小节连上 # 如 1-4 / 5-8 / 9-11 小节连上
          if (_data[key][subKey - 1]) {
            // 如果上一节有课 进行对比
            let tmp = _data[key][subKey - 1];
            for (let tmpKey in tmp) {
              let tmp1 = course['name'] + course['week'] + course['room'],
                tmp2 = tmp[tmpKey]['name'] + tmp[tmpKey]['week'] + tmp[tmpKey]['room'];
              if (tmp1 == tmp2) {
                // 如果上一节课和当前课一样 即连上 修改上节的 height
                // # subkey 为 6 时表示第 11 小节 故设为 300 否则设为 410
                //tmp[tmpKey]['height'] = subKey == 6 ? 300 : 410;
                tmp[tmpKey]['height'] = 300;
                //需修改
                _data[key][subKey][0].height = 0.01;
                _data[key][subKey][0].display = false;
                // 删除当前这节课 # 不删也行 上一节课变长就挡住了这节
                //delete _data[key][subKey];
              }
            }
          }
        }
      }
    }
    // 保存渲染后的课程信息
    _this.setData({
      weekTitle: resWeekTitle,
      weeks: weeks,
      courses: _data,
      remind: ''
    });
  },
});  