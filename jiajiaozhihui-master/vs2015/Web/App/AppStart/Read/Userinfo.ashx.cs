using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using SfSoft.web.App.Helper;

namespace SfSoft.web.AppStart.Read
{
    /// <summary>
    /// Userinfo 的摘要说明
    /// </summary>
    public class Userinfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetOpenidAndAccessToken(context);
        }
        private void GetOpenidAndAccessToken(HttpContext context)
        {
            string code = context.Request.QueryString["code"];
            string r = HttpContext.Current.Request.QueryString["r"];
            string redirect_url = r.Split('@')[0];
            string share = r.Split('@')[1];
            string state = HttpContext.Current.Request.QueryString["state"];
            state = state.Replace(":", "\":\"").Replace(",", "\",\"").Replace("}", "\"}").Replace("{", "{\"");
            //Helper.Log.WriteNode(state);
            if (!string.IsNullOrEmpty(code))
            {
                string jsonUserInfo = GetOpenidAndAccessTokenFromCode(code);
                Lib.UserInfoProvide userInfoProvide = new Lib.UserInfoProvide();
                SfSoft.Model.WX_UserInfo userInfo = userInfoProvide.Add(userInfoProvide.ConvertToUserInfo(jsonUserInfo));
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

                //state = state.Replace(":", ":\"").Replace(",", "\",").Replace("}", "\"}");
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
        }
        private string GetOpenidAndAccessTokenFromCode(string code)
        {
            string url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code", WxBaseConfig.AppID, WxBaseConfig.AppSecret, code);
            string result = App.Helper.HttpService.Get(url);
            JObject json = JObject.Parse(result);
            string openid = json["openid"].ToString();
            string accessToken = json["access_token"].ToString();

            url = string.Format("https://api.weixin.qq.com/sns/userinfo?access_token={0}&openid={1}&lang=zh_CN", accessToken, openid);
            return App.Helper.HttpService.Get(url);
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