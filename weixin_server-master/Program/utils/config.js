const baseUrl = "https://qun3.mryangping.com/"

const apiVersion = baseUrl + "api/v1/";
const UserWeixinToken = apiVersion+"UserWeixinToken/";
const WeixinBase = apiVersion+"Weixin/";
const customBase = apiVersion+"customization.wxhiddenlove.controller.WxGroupHiddenLove/";
const apiBase = apiVersion;


var config = {
  u_id:2,
  weixinBaseUrl :WeixinBase,
  getToken: `${UserWeixinToken}getToken`,
  encrypt: `${WeixinBase}encrypt`,
  wxuser: `${WeixinBase}wxuser`,
  get_session_key: `${WeixinBase}get_session_key`,
  getLikes:`${customBase}getLikes`,
  getGroup:`${customBase}getGroup`,
  getInit:`${customBase}getInit`,
  likeByShe:`${customBase}likeByShe`,
  getGroupDetail:`${customBase}getGroupDetail`

}

export default config;
