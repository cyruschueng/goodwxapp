var http = require("server")
/**
 * 全局常量
 */
const API_URL = "https://www.tongzhuhe.com/";
const SW_APP_ID = "1211231";
/**
 * 页面跳转通用接口
 */
function navToPage(that,options){
  wx.navigateTo({
    url: '/pages/filter/filter?page=' + options.currentTarget.dataset.page + '&params=' + JSON.stringify(options.currentTarget.dataset.params),
  })
}
/**
 * 通用带一个筛选的搜索
 * 改变筛选方法
 */
function simpleFilterPicker(that,params){
  console.log(params)
}
/**
 * 生命周期函数--监听页面加载
 */
function onLoad(that,params){
  var pageData = that.data.pageData;
  http.httpDemo(params.pageName,function(res){
    //设置标题栏蓝色
    wx.setNavigationBarColor({
      frontColor: res.config.titleBar.frontColor,
      backgroundColor: res.config.titleBar.backgroundColor,
    });
    //设置标题栏文字
    wx.setNavigationBarTitle({
      title: res.config.titleBar.text,
    })
    //该页面是否已经加载完成
    res.onLoad = true
    
    for (var i in res.components){
      if (params.params && res.components[i].name == params.params.implantation){
        res.components[i].data['implantationData'] = params.params.implantationData
        }
    }
    
    if(params.pageType == 'tabBar'){
      pageData[params.tabBarFlag] = res
      that.setData({
        pageData: pageData
      })
    } else if (params.pageType == 'nav'){
      that.setData({
        config: res.config,
        page: res.name,
        components: res.components
      })
    }

  })
}

/**
 * 底部栏改变选中状态
 */
function tabBarChange(that,e){
  var tabBar = that.data.tabBar;
  for(var i in tabBar.list){
    tabBar.list[i].active = false;
  }
  tabBar.list[e.currentTarget.dataset.params].active = true;
  that.setData({
    tabBar:tabBar,
    tabIndex: e.currentTarget.dataset.params
  })
}



function post(url, data, success, fail, method) {
  var that = this;
  let _data = data || {};
  let _success = success || function (e) {
    console.log(e)
  };
  let _fail = fail || function (e) {
    console.log(e)
  };
  let _method = method || 'POST';
  let _header = { 'content-type': 'application/x-www-form-urlencoded' };

  if (_method.toUpperCase() == 'GET') {
    _header = { 'content-type': 'application/json' };
  }
  if (arguments.length == 2 && typeof _data == 'function') {
    _success = _data
  }
  wx.request({
    url: API_URL + url,
    method: _method,
    header: _header,
    data: _data,
    success: function (res) {
      if (typeof _success == 'function' && res.statusCode != 404 && res.statusCode != 500 && res.statusCode != 400) {
        console.log(`======== 接口 ${url} 请求成功 ========`);
        _success(res.data);
      } else {
        if (typeof _success != 'function') {
          console.log(`========  ${_success} 不是一个方法 ========`);
        }
        console.log(`======== 接口 ${url} 错误 ${res.statusCode} ========`);
      }
    },
    fail: function (res) {
      console.log(`======== 接口 ${url} 请求失败 ========`);
      if (typeof _fail == 'function') {
        _fail(res);
      }
    }
  });
}


module.exports = {
  onLoad:onLoad,
  tabBarChange:tabBarChange,
  post:post,
  navToPage:navToPage,
  simpleFilterPicker: simpleFilterPicker
}