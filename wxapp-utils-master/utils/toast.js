/**
 * 显示 toast 弹出框
 * @param {object} options
 * @param {string} options.title - 标题文本
 * @param {string} options.icon - success | loading
 * @param {string} options.image - 优先级大于 icon
 * @param {number} options.duration - 显示时长，单位毫秒。默认 60 秒
 * @param {boolean} options.mask
 * @param {Function} options.success
 * @param {Function} options.fail
 * @param {Function} options.complete
 */
function show(options) {
  const defaultOptions = {
    mask: true,
    duration: 60000
  }

  const toastOptions = Object.assign({}, defaultOptions, options);
  wx.showToast(toastOptions);
}

function hide() {
  wx.hideToast();
}

export default {
  show,
  hide
}
