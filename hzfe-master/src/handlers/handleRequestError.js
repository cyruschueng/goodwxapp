import handleRequiredError from "handleRequiredError"

export default err => {
  console.log(err)
  const App = getApp()

  if (!err.http_status) {
    if (err.status) handleRequiredError(err.message)
    return
  };
  switch(err.http_status) {
    case 401:
      App.Tools.wxPromise(wx.showModal)({
        title: '提示',
        content: '登录已过期。点击确定，重新登录。',
        showCancel: false,
        confirmColor: '#ff0000'
      }).then(() => {
        App.getUserInfo();
        wx.showLoading({ title: "重新登录中" })
      })
      break;
    default:
      handleRequiredError(err.msg);
      break
  }
}