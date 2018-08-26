using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using SfSoft.web.App.Helper;

namespace SfSoft.web.AppStart.QA
{
    /// <summary>
    /// Baseinfo 的摘要说明
    /// </summary>
    public class Baseinfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            GetOpenidAndAccessToken(context);
        }

        private void GetOpenidAndAccessToken(HttpContext context)
        {
            string code = context.Request.QueryString["code"];
            if (!string.IsNullOrEmpty(code))
            {
                GetOpenidAndAccessTokenFromCode(code);
            }
            else
            {
                var redirect_url = HttpContext.Current.Request.QueryString["redirect_url"];
                var share = HttpContext.Current.Request.QueryString["share"];

                string url = string.Format("https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_base&state={2}#wechat_redirect",
                    WxBaseConfig.AppID,
                    WxBaseConfig.QuestionAnsweringRedirectBaseInfoUrl + "?r=" + redirect_url + "@" + share,
                    HttpContext.Current.Request.QueryString["state"]);

                context.Response.Redirect(url);
            }
        }

        private void GetOpenidAndAccessTokenFromCode(string code)
        {
            string url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code",
                WxBaseConfig.AppID,
                WxBaseConfig.AppSecret,
                code);
            try
            {
                string r = HttpContext.Current.Request.QueryString["r"];
                string redirect_url = r.Split('@')[0];
                string state = HttpContext.Current.Request.QueryString["state"];
                string share = r.Split('@')[1];

                Lib.UserInfoProvide userInfoProvide = new Lib.UserInfoProvide();
                string result = App.Helper.HttpService.Get(url);


                Newtonsoft.Json.Linq.JObject jsonResult = Newtonsoft.Json.Linq.JObject.Parse(result);


                if (userInfoProvide.ExistsOpenId(jsonResult["openid"].ToString()) == false)
                {
                    //HttpContext.Current.Response.Redirect("userinfo.ashx?r=" + redirect_url+"&state="+state+"&share="+share);


                    string uri = string.Format("https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_userinfo&state={2}#wechat_redirect",
                    WxBaseConfig.AppID,
                    WxBaseConfig.QuestionAnsweringRedirectUserInfoUrl + "?r=" + redirect_url + "@" + share,
                    state);
                    HttpContext.Current.Response.Redirect(uri);
                }
                else
                {
                    SfSoft.Model.WX_UserInfo userInfo = userInfoProvide.GetUserInfo(jsonResult["openid"].ToString());
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
            }
            catch (Exception ex)
            {
                throw new Exception("出错");
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