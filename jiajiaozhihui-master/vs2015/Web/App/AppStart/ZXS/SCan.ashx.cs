using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using SfSoft.web.App.Helper;

namespace SfSoft.web.AppStart.ZXS
{
    /// <summary>
    /// SCan 的摘要说明
    /// </summary>
    public class SCan : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            GetInfo(context);
        }
        private void GetInfo(HttpContext context)
        {
            var redirect_url = HttpContext.Current.Request.QueryString["redirect_url"];
            string state = HttpContext.Current.Request.QueryString["state"];
            var share = HttpContext.Current.Request.QueryString["share"];

            string openId = context.Request["openId"];
            if (string.IsNullOrEmpty(openId)) return;

            Lib.UserInfoProvide userInfoProvide = new Lib.UserInfoProvide();
            SfSoft.Model.WX_UserInfo userInfo = userInfoProvide.GetUserInfo(openId);
            Senparc.Weixin.MP.Helpers.JsSdkUiPackage jsSdk = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(redirect_url, App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
            Model.WXParams wxParams = new Model.WXParams()
            {
                JsSdk = jsSdk,
                UserInfo = userInfo,
                State = state,
                Share = share
            };
            //加密
            string o = App.Helper.EncryptUtils.DESEncrypt(Newtonsoft.Json.JsonConvert.SerializeObject(wxParams), WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);
            //对原数据md5防篡改
            string m = App.Helper.EncryptUtils.MD5Encrypt(o);

            JObject json = JObject.Parse(state);
            string hash = json["hash"].ToString();
            if (string.IsNullOrEmpty(hash))
            {
                HttpContext.Current.Response.Redirect(redirect_url + "?o=" + HttpContext.Current.Server.UrlEncode(o) + "&m=" + HttpContext.Current.Server.UrlEncode(m));
            }
            else
            {
                HttpContext.Current.Response.Redirect(redirect_url + "#/" + hash + "?o=" + HttpContext.Current.Server.UrlEncode(o) + "&m=" + HttpContext.Current.Server.UrlEncode(m));
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}