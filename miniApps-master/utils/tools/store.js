// 本文件为配置文件，保持现状，


let config = require('../config/config.js');

let db_prefix = config.db_prefix;



class Store {


  constructor() {

    this.prefix = db_prefix;

    this.staticName = {

      USER_TOKEN: "wx_user_token",
      USER_ACCESS_TOKEN: "wx_user_access_token",
      WX_CODE: "wx_code",
      USER_INFO: "wx_user_info",
      WX_ACCESS_OPENID: "wx_access_openid",
      WX_LOCAL_URL: "wx_local_url",

      WX_NONCESTR: "wx_my_nonce",
      WX_APPID: "wx_my_app_id",
      WX_TIME_STAMP: "wx_my_time_stamp",
      WX_SIGNATURE: "wx_my_signature",

      USER_AUTH: "wx_user_auth",

      WX_INI_PANEL: "wx_ini_panel",
      WX_UNINONID: "wx_my_uninonid"

    }

  }

  set(key, value, fn) {
    wx.setStorageSync(this.prefix + key, value);

    fn && fn();
  }
  
  get(key, fn) {
    if (!key) {
      throw new Error('没有找到key。');
      return;
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。');
      return;
    }

    var value = wx.getStorageSync(this.prefix + key);

    return value;
  }

  remove(key) {
    wx.removeStorageSync(this.prefix + key);
    //this.store.removeItem(this.prefix + key);
  }

  isNeedAuth() {
    //是否需要实名验证
    return this.get(this.staticName.USER_AUTH);

  }



}

export let myStore = new Store();
