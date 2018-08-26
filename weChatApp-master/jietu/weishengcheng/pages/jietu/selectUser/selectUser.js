//index.js
//获取应用实例
var utils = require('../../../utils/util.js')
var api = require('../../../api.js')

function init(that, app, type) {
  var _app  = that.data[app]
  if(utils.isEmptyObject(_app)){_app = {};}
  if(utils.isEmptyObject(_app[type])){_app[type] = {};}
  if(utils.isEmptyObject(_app[type].users)){_app[type].users = [];}

  api.login(function (user) {
    if(utils.isEmptyObject(_app[type].users)){
      _app[type].users = [{"avatar":user.avatar,"name":user.user_name}];
      wx.setStorageSync("weixin", _app);
    }
    that.setData({
      list: _app[type].users,
    })
  },function () {
    that.setData({
      list: _app[type].users,
    })
  },'必须授权登录之后才能操作呢，是否重新授权登录？')
}

function edit(app, type, addType) {
  if(app=='weixin'&&type=='qunliao'){
    console.log(app+':'+type)
    wx.redirectTo({
      url: "/pages/jietu/weixin/qunliaoshezhi/qunliaoshezhi?addType="+addType
    })
  }

  else if(app=='weixin'&&type=='danliao'){
    console.log(app+'-'+type)
    wx.redirectTo({
      url: "/pages/jietu/weixin/danliaoshezhi/danliaoshezhi?addType="+addType
    })
  }
}

function selectUser(that, app, type, e) {
  console.log(e)
  var _app  = that.data[app]
  if(utils.isEmptyObject(_app)){_app = {};}
  if(utils.isEmptyObject(_app[type])){_app[type] = {};}
  if(utils.isEmptyObject(_app[type].list)){_app[type].list = [];}

  var index = wx.getStorageSync('current_'+app+'_'+type+'_index')

  if(!index){index = 0;}
  if(utils.isEmptyObject(_app[type].list[index])){_app[type].list[index] = {};}

  _app[type].list[index].avatar = e.currentTarget.dataset.avatar
  _app[type].list[index].name = e.currentTarget.dataset.name
  wx.setStorageSync(app, _app);

  that.setData({
    showEditUser: false
  })
}

function showEditUser(that, navigationBarTitle, app, type) {
  wx.setNavigationBarTitle({
    title: navigationBarTitle
  })
  that.setData({
    showEditUser: true
  })
  init(that, app, type)
}

function back(that, navigationBarTitle) {
  that.setData({
    showEditUser: false
  })
  wx.setNavigationBarTitle({
    title: navigationBarTitle
  })
}

module.exports = {
  init: init,
  edit: edit,
  selectUser: selectUser,
  showEditUser: showEditUser,
  back: back
}
