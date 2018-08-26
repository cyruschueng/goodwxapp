using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Containers;

namespace SfSoft.web.App
{
    public class OAuth
    {
        private Page page { get; set; }
        public OAuth(Page page)
        {
            this.page = page;
        }
        public string GetJsSdkConfig()
        {
            var noncestr= JSSDKHelper.GetNoncestr();
            var timestamp = JSSDKHelper.GetTimestamp();
            var jsapiTicket = JsApiTicketContainer.TryGetJsApiTicket(Helper.WxBaseConfig.AppID, Helper.WxBaseConfig.AppSecret);
            
            string host = page.Request.Url.Host;
            string path = page.Request.Url.PathAndQuery;
            string url = "http://" + host + path;
            var signature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(jsapiTicket, noncestr, timestamp, url);
            var  backage = new JsSdkUiPackage(SfSoft.web.App.Helper.WxBaseConfig.AppID, timestamp, noncestr, signature);
            return Newtonsoft.Json.JsonConvert.SerializeObject(backage, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new Helper.UnderlineSplitContractResolver() });
        }
        public void SSS(string state,Senparc.Weixin.MP.OAuthScope scope)
        {
            if (!string.IsNullOrEmpty(page.Request.QueryString["code"]))
            {
                //获取code码，以获取openid和access_token
                string code = page.Request.QueryString["code"];
                //GetOpenidAndAccessTokenFromCode(code);
            }
            else
            {
                //构造网页授权获取code的URL
                string host = page.Request.Url.Host;
                string path = page.Request.Url.PathAndQuery;
                string redirect_uri = HttpUtility.UrlEncode("http://" + host + path);

                var appId= Helper.WxBaseConfig.AppID;
                var appSecret= Helper.WxBaseConfig.AppSecret;

                var url= Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(appId, redirect_uri, state, scope);
                try
                {
                    //触发微信返回code码         
                    page.Response.Redirect(url);//Redirect函数会抛出ThreadAbortException异常，不用处理这个异常
                }
                catch (System.Threading.ThreadAbortException ex)
                {
                }
            }
        }

    }
}