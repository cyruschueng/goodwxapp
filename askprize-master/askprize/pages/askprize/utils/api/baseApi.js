/**
 * 微信统一接口类
 * 
 * @author fuqiang
 */
// 创建App对象常亮
const app = getApp();

function baseApi(page) {
  var that = this;
  // 统一缓存前缀
  that.cacheApiKey = 'cache_',
    // 单例模式获取缓存数据
    that.cacheValues = {},

    that.globalKey = {
      // 微信授权状态
      accredit: 'wx_accredit',
      // 位置信息
      location: 'user_city',
      // 登录信息
      login: 'user_info',
      // 手机号授权
      has_mobile: 'user_has_mobile'
    },

    /**
     * 数据是否存在
     * 
     * @param object      arr  [数组]
     * @param string|int  val   判断的值
     */
    that.contains = function (arr, val) {
      if (typeof (arr) != 'object') {
        return false;
      } else {
        var i = arr.length;
        while (i--) {
          if (arr[i] === val) {
            return true;
          }
        }
        return false;
      }
    },

    // 构造方法
    that.init = function (page) {
      // var that = this;
      that.page = page;
    },

    // 报错
    that.showError = function (title) {
      wx.showToast({
        title: title,
        image: '/pages/images/warning.png'
      });
    },

    /**
     * 页面统一一级回调方法
     */
    that.callback_page = function (func, res, opt) {
      var that = this;
      if (func && typeof (that.page[func]) == 'function') {
        console.log('wxapi callback function: ' + func + ' success');
        if (opt && typeof (opt) != 'undefined') {
          that.page[func](res, opt);
        } else {
          that.page[func](res);
        }
      } else if (typeof (that[func]) == 'function') {
        if (opt && typeof (opt) != 'undefined') {
          that[func](res, opt);
        } else {
          that[func](res);
        }
      }
    },

    /**
     * GET方式请求接口数据
     * 
     * @param enum    tag       [接口标识，详情本类全局变量apiURL]
     * @param array   args      [json数据，空为'[]']
     * @param string  callback  [页面回调方法名称]
     * 
     */
    that.getURLData = function (url, args, callback) {
      // 统一调用异步接口
      var that = this;
      that.curlData('get', url, args, callback);
    },

    /**
     * POST方式请求接口数据
     * 
     * @param enum    tag       [接口标识，详情本类全局变量apiUrl]
     * @param array   args      [json数据，空为'[]']
     * @param string  callback  [页面回调方法名称]
     * 
     */
    that.postURLData = function (url, args, callback) {
      // 统一调用异步接口
      var that = this;
      that.curlData('post', url, args, callback);
    },

    //  异步接口调用
    that.curlData = function (rtype, path, rdata, callback) {
      // 统一转化成小写
      rtype = rtype.toLowerCase();

      if (rtype == 'post' || rtype == 'get') {
        var that = this;
        // 数据类型容错处理
        if (typeof (rdata) != "object") {
          rdata = {};
        }
        
        // 当前登录用户信息
        var loginInfo = that._getUserInfo();
        // 登录token
        var loginToken = '';
        if (loginInfo && loginInfo.token) {
          loginToken = loginInfo.token;
        }
        // 参数自动拼接用户信息
        if (typeof (rdata.authorid) == 'undefined' && typeof (rdata.token) == 'undefined') {
          if (loginInfo.id) {
            // rdata.authorid = loginInfo.id;
          }
        }

        // http请求
        wx.request({
          url: getApp().apiHost + path,
          method: rtype,
          data: rdata,
          header: {
            'content-type': 'application/json',
            'appvars': "{ \"appVersion\": \"2.0\", \"fromplatid\": \"7\", \"loginToken\": \"" + loginToken + "\"}",
          },
          complete: function (res) {
            if (typeof (res.statusCode) == 'undefined' || res.statusCode != 200) {
              wx.showToast({
                title: '请求异常',
                image: '/pages/images/warning.png'
              });
            }
          },
          success: function (res) {
            // 页面方法回调
            that.callback_page(callback, res.data, rdata);
          }, // end wx.request.success
          fail: function (e) {

            wx.showToast({
              title: '查询失败',
              image: '/pages/images/warning.png'
            });
          },
          complete: function () {
            // complete当处理完数据刷新后，可以停止当前页面的下拉刷新。
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
          }

        }); // end wx.request

      }
    },

    /**
     * 获取用户信息
     */
    that._getUserInfo = function () {
      return wx.getStorageSync(that.globalKey.login);
    },

    /*******************缓存通用方法(start)******************/
    /**
     * 1. 缓存相关
     * 
     * @param [string]  ftype   [缓存类型]
     */
    that._getCache = function (ftype) {
      this.cacheValues[ftype] = wx.getStorageSync(this._getCacheKey(ftype));
      return typeof (this.cacheValues[ftype]) != 'object' ? [] : this.cacheValues[ftype];
    },

    /**
     * 2. 根据类型设置缓存
     *
     * @param [string]  ftype   [缓存类型]
     * @param [object]  args    [缓存数据对象，可以是数组/对象]
     */
    that._addCache = function (ftype, args) {
      // 获取缓存列表
      this.cacheValues[ftype] = this._getCache(ftype);
      // 初始化缓存值为string
      var val = this._parseCacheVal(args);
      if (val && !this.contains(this.cacheValues[ftype], val)) {
        this.cacheValues[ftype].push(val);
        return wx.setStorageSync(this._getCacheKey(ftype), this.cacheValues[ftype]);
      } else {
        return false;
      }
    },

    /**
    * 3. 缓存是否存在
  
     * @param [string]  ftype   [缓存类型]
     * @param [object]  args    [缓存数据对象，可以是数组/对象]
    */
    that._hasCache = function (ftype, args) {
      var val = this._parseCacheVal(args);
      this.cacheValues[ftype] = this._getCache(ftype);
      return this.contains(this.cacheValues[ftype], val);
    },

    /**
     * 4. 清除缓存单一值
     * 
     * @param [string]  ftype   [缓存类型]
     * @param [object]  args    [缓存数据对象，可以是数组/对象]
     */
    that._removeCache = function (ftype, args) {
      args = this._parseCacheVal(args);
      if (typeof (this.cacheValues[ftype]) == 'undefined') {
        this.cacheValues[ftype] = this._getCache(ftype);
      }
      var len = this.cacheValues[ftype].length;
      if (len > 0) {
        var i = this.cacheValues[ftype].length;
        while (len--) {
          if (this.cacheValues[ftype][len] == args) {
            this.cacheValues[ftype].splice(len, 1);
          }
        }
      }
      return wx.setStorageSync(this._getCacheKey(ftype), this.cacheValues[ftype]);
    },

    // 获取缓存key
    that._getCacheKey = function (ftype) {
      return this.cacheApiKey + '_' + ftype;
    },



    // 初始化缓存值转换成string
    that._parseCacheVal = function (args) {
      if (!args) {
        return args;
      }

      var arr = [];
      if (typeof (args) == 'object') {
        for (let k in args) {
          if (k != 'ftype') {
            arr.push(args[k]);
          }
        }
        arr = arr.join('_');
      } else {
        arr = args;
      }

      return arr;
    }


  /*******************缓存通用方法(end)******************/

}
module.exports.baseApi = baseApi;