class Cache {
  constructor() {
    this.postfix = '_Amos';
  }

  set(k, v, t) {
    wx.setStorageSync(k, v)
    var seconds = parseInt(t);
    if (seconds > 0) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000 + seconds;
      wx.setStorageSync(k + this.postfix, timestamp + "")
    } else {
      wx.removeStorageSync(k + this.postfix)
    }
  }

  get(k, def) {
    var deadtime = parseInt(wx.getStorageSync(k + this.postfix))
    if (deadtime) {
      if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
        if (def) {
          return def;
        } else {
          return;
        }
      }
    }
    var res = wx.getStorageSync(k);
    if (res) {
      return res;
    } else {
      return def;
    }
  }

  remove(k) {
    wx.removeStorageSync(k);
    wx.removeStorageSync(k + this.postfix);
  }

  clear() {
    wx.clearStorageSync();
  }
}
export { Cache };