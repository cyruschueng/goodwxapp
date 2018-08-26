import Promise from "../assets/promise"
import regeneratorRuntime from '../assets/regenerator'
import Tools from '../utils/tools'
import handleRequiredError from "handleRequiredError"

export default async () => {
  let info, T = new Tools;
  try {
    info = await T.wxPromise(wx.getUserInfo)()
  } catch (e) {
    handleRequiredError('您已拒绝授权，将无法正常使用HZFE小程序。请10分钟后再次点击授权，或者删除小程序重新进入。', '警告')
  }
  return info
}