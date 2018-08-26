function checkUpdateSystem() {
  const systemInfo = wx.getSystemInfoSync();
  if (!systemInfo.SDKVersion) {
    wx.showModal({
      title: '提示',
      content: '您的微信版本过低，升级微信之后就能玩到精美的诗词游戏啦~'
    });
    return true;
  }
  if (systemInfo.system.toLowerCase() === 'ios 10.0.2') {
    wx.showModal({
      title: '提示',
      content: '您的手机系统版本太老啦，无法正常使用程序。请在【通用】-【软件更新】中升级iOS哦~'
    });
    return true;
  }
  const ver = systemInfo.SDKVersion;
  const sum = ver.split('.').reduce(function (total, item, index) {
    return total + item * Math.pow(10, 3 * (3 - index));
  }, 0);
  // 版本号最低版本1.6.4，1006004000
  if (sum < 1006004000) {
    wx.showModal({
      title: '提示',
      content: '您的微信版本过低，升级微信之后就能玩到精美的诗词游戏啦~'
    });
    return true;
  }
  return false;
}

module.exports = {
  checkUpdateSystem
};
