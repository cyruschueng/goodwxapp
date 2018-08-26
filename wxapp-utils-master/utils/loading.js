/**
 *
 * @param {Object} options
 * @param {String} options.title
 * @param {Boolean} options.mask
 */
function show(options) {
  if (!wx.showLoading) return;

  const defaultOptions = {
    mask: true
  };

  const loadingOptions = Object.assign({}, defaultOptions, options);
  wx.showLoading(loadingOptions);
}

function hide() {
  if (wx.hideLoading) {
    wx.hideLoading();
  }
}

function showNav() {
  wx.showNavigationBarLoading()
}

function hideNav() {
  wx.hideNavigationBarLoading()
}

export default {
  show,
  hide,
  showNav,
  hideNav
}
