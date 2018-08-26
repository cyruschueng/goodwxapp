var app = getApp();
var url = app.globalData.url;
Page({
  data: {
    joinedWarband: [],
    warband: [],
    page_end: false,
    timer: '',
    str: '',
    something: [],
    btnType: 1,
    scrollTop: 0,
  },
  onLoad(options) {
    let that = this;
    app.initPage(that);
    app.netWorkChange(that);
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    that.getInfo('', 1);
    app.netWorkChange(that);
  },
  onShow() {
  },
  //搜索战队
  searchSth(e) {
    let str = e.detail.value;
    let that = this;
    let timer = this.data.timer;
    //防止多次请求进行延时处理
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(x => {
      wx.showLoading({
        title: 'loading',
        mask: true
      });
      this.getInfo(str, 1);
    }, 1500);
    this.setData({
      timer: timer,
      str: str
    });
    app.initPage(that);
  },
  //所有战队勾选框
  checkbox1(e) {
    let that=this;
    let team = e.currentTarget.dataset.team;
    let index = e.currentTarget.dataset.index;
    let joinedWarband = this.data.joinedWarband;
    let warband = this.data.warband;
    let offsetTop = e.currentTarget.offsetTop;
    app.log("team", team);
    this.setData({
      scrollTop: offsetTop - 92
    });
    if (team.check == false) {
      warband[index].check = true;
      joinedWarband.push(team);
    } else {
      warband[index].check = false;
      joinedWarband.forEach((x, index) => {
        if (x.team_id === team.team_id) {
          joinedWarband.splice(index, 1);
        }
      });
    }
    this.setData({
      warband: warband,
      joinedWarband: joinedWarband
    });
  },
  //加入战队勾选框
  checkbox2(e) {
    let teams = e.currentTarget.dataset.team;
    let joinedWarband = this.data.joinedWarband;
    let warband = this.data.warband;
    //去除joinedWarband内数据
    joinedWarband.forEach((x, index) => {
      if (x.team_id === teams.team_id) {
        joinedWarband.splice(index, 1);
      }
    });
    //去除warband里勾号
    warband.forEach(x => {
      if (x.team_id === teams.team_id) {
        x.check = false;
      }
    });
    this.setData({
      joinedWarband: joinedWarband,
      warband: warband
    });
  },
  //上拉加载
  loadMore() {
    let that = this;
    let currentPage = this.data.currentPage;
    let str = this.data.str;
    let joinedWarband = this.data.joinedWarband;
    let warband = this.data.warband;
    //加载下一页内容
    if (str == '') {
      let request = {
        url: url + '/api/team/search',
        data: {
          search: '',
          page: currentPage,
          user_id: wx.getStorageSync('user_id') || 0
        }
      };
      //调用通用加载函数
      app.loadMore2(that, request, res => {
        let teams = res.data.data.teams;
        let page_end = res.data.data.page_end;
        //给新内容打上正确的勾选标签
        teams.forEach(x => {
          x.check = false;
        });
        teams.forEach(x => {
          joinedWarband.forEach(y => {
            if (x.team_id == y.team_id) {
              x.check = true;
            }
          });
        });
        let newWarband = warband.concat(teams);
        that.setData({
          warband: newWarband,
          page_end: page_end,
          requestCheck: true
        });
        app.log("warBand",that.data.warband);
      });
    }
  },
  //获取战队信息
  getInfo(search, page) {
    let that = this;
    let joinedWarband = that.data.joinedWarband;
    wx.request({
      url: url + '/api/team/search',
      data: {
        search: search,
        page: page,
        user_id: wx.getStorageSync('user_id') || 0
      },
      method: 'POST',
      success(res) {
        if (res.data.status_code === 2000000) {
          wx.hideLoading();
          let thisData = res.data.data;
          let teams = thisData.teams;
          teams.forEach(x => {
            x.check = false;
          });
          // 给已经加入的战队重新挂上check=true属性
          if (joinedWarband && teams && joinedWarband.length != 0) {
            teams.forEach(x => {
              joinedWarband.forEach(y => {
                if (x.team_id === y.team_id) {
                  x.check = true;
                }
              });
            });
          }
          //控制底部按钮组
          if (that.data.str == '') {
            that.setData({
              btnType: 1
            });
          } else {
            that.setData({
              btnType: 2
            });
          }
          that.setData({
            warband: teams,
            page_end: thisData.page_end
          });
        } else {
          app.errorHide(that, res, 3000);
        }
      }
    });
  },
  //确定
  certain() {
    let that = this;
    let joinedWarband = this.data.joinedWarband;
    let user_id = wx.getStorageSync('user_id');
    let parameter = [];
    if (joinedWarband.length === 0) {
      app.errorHide(that, '请选择战队', 3000);
    } else {
      joinedWarband.forEach(x => {
        let arr = [];
        arr.push(user_id);
        arr.push(x.team_id);
        parameter.push(arr);
      });
      app.log("joinedWarband",joinedWarband);
      app.log("parameter",parameter);
      wx.showLoading({
        title: 'loading',
        mask: true
      });
      wx.request({
        url: url + '/api/team/join',
        method: 'POST',
        data: {
          teams: parameter
        },
        success(res) {
          wx.hideLoading();
          if (res.data.status_code === 2000000) {
            app.href('/pages/contactsActivty/activtyRegister/activtyRegister');
          } else {
            app.errorHide(that, res.data.error_msg, 3000);
          }
        }
      });
    }
  },
  //创建战队
  createWarband() {
    app.href('/pages/contactsActivty/createWarband/createWarband');
  },
  //保存
  save() {
    this.setData({
      str: '',
      btnType: 1
    });
    this.getInfo('', 1);
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});