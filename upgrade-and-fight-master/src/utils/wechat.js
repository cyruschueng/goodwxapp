

export function dialog(opt) {
  const defaultOpt = {
    title: '提示',
    content: '这是一个模态弹窗',
    showCancel: true,
    cancelText: '取消',
    confirmText: '确认',
  };
  const { title, content, showCancel, cancelText, confirmText } = Object.assign({}, defaultOpt, opt);

  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxSetStorage({ key, data }) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxGetStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxGetUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxHideShareMenu() {
  return new Promise((resolve, reject) => {
    wx.hideShareMenu({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxNavigateTo(url) {
  return new Promise((resolve, reject) => {
    wx.navigateTo({
      url,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxShowShareMenu() {
  return new Promise((resolve, reject) => {
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxGetShareInfo(shareTicket = []) {
  return new Promise((resolve, reject) => {
    wx.getShareInfo({
      shareTicket,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxConnectSocket({ url, data, protocols = [], method = 'GET' }) {
  return new Promise((resolve, reject) => {
    wx.connectSocket({
      url,
      data,
      header: {
        'content-type': 'application/json',
      },
      protocols,
      method,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxOnSocketOpen() {
  return new Promise((resolve) => {
    wx.onSocketOpen((res) => {
      resolve(res);
    });
  });
}

export function wxOnSocketError() {
  return new Promise((resolve) => {
    wx.onSocketError((res) => {
      resolve(res);
    });
  });
}

export function wxSendSocketMessage(data) {
  return new Promise((resolve, reject) => {
    wx.sendSocketMessage({
      data,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxOnSocketMessage() {
  return new Promise((resolve) => {
    wx.onSocketMessage((res) => {
      resolve(res);
    });
  });
}

export function wxCloseSocket({ code = 1000, reason = '' }) {
  return new Promise((resolve, reject) => {
    wx.closeSocket({
      code,
      reason,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
}

export function wxOnSocketClose() {
  return new Promise((resolve) => {
    wx.onSocketClose((res) => {
      resolve(res);
    });
  });
}

export function wxShowLoading({ title = '加载中', mask = false }) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title,
      mask,
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
}

export function wxHideLoading({ title = '', mask = false }) {
  return new Promise((resolve, reject) => {
    wx.hideLoading({
      title,
      mask,
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
}

export function wxPost({ url, data }) {
  return new Promise((resolve, reject) => {
    wxShowLoading({});
    wx.request({
      url: `https://killmonster.myscrm.cn${url}`,
      method: 'POST',
      data,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        resolve(res);
        wxHideLoading({});
      },
      fail: function (error) {
        reject(error);
        wxHideLoading({});
      },
    });
  });
}

export function wxGet({ url, data }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://killmonster.myscrm.cn${url}`,
      method: 'GET',
      data,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
}

export function wxShowToast({ title = '成功', icon = 'none', duration = 2000, mask = false }) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon,
      duration,
      mask,
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
}

export function wxHideToast({ title = '失败', icon = 'none', duration = 2000, mask = false }) {
  return new Promise((resolve, reject) => {
    wx.hideToast({
      title,
      icon,
      duration,
      mask,
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      },
    });
  });
}


export default wx;
