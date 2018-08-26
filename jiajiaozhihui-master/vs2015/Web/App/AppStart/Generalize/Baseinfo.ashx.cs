using System;
using System.Web;
using SfSoft.web.App.Helper;
using SfSoft.web.AppStart.QA.Lib;

namespace SfSoft.web.AppStart.Generalize
{
    /// <summary>
    /// Baseinfo 的摘要说明
    /// </summary>
    public class Baseinfo :IHttpHandler
    {
        string AppId =App.Helper.WxBaseConfig.GxAppID;
        string AppSecret = App.Helper.WxBaseConfig.GxAppSecret;
        /// <summary>
        /// o=openid //用户id
        /// a=app001 //项目id
        /// h=hash // 描点
        /// s=openid //分享者
        /// id=某个产品
        /// r=其它参数
        /// 参数形式:p=o=123|a=app001|h=hash|s=456|id=1&r=ac;
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            if (WxBaseConfig.Debug == "true")
            {
                context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            }
            else {
                context.Response.AddHeader("Access-Control-Allow-Origin", "*.jiajiaozhihui.cn");
            }
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

                string url = string.Format("https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_base&state={2}#wechat_redirect",
                    AppId,
                    WxBaseConfig.ServerUrl + "app/appstart/Generalize/Baseinfo.ashx" + "?r=" + redirect_url,
                    "state");

                context.Response.Redirect(url);
            }
        }

        private void GetOpenidAndAccessTokenFromCode(string code)
        {
            string url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code",
                AppId,
                AppSecret,
                code);
            try
            {
                string result = App.Helper.HttpService.Get(url);
                Newtonsoft.Json.Linq.JObject jsonResult = Newtonsoft.Json.Linq.JObject.Parse(result);
                string r = HttpContext.Current.Request.QueryString["r"];
                UserInfoProvide userInfoProvide = new UserInfoProvide();

                if (userInfoProvide.ExistsOpenId(jsonResult["openid"].ToString()) == false)
                {
                    string uri = string.Format("https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_userinfo&state={2}#wechat_redirect",
                    AppId,
                    WxBaseConfig.ServerUrl + "app/appstart/Generalize/Userinfo.ashx" + "?r=" + r,
                    "state");
                    HttpContext.Current.Response.Redirect(uri);
                }
                else
                {
                    var p = HttpContext.Current.Request.QueryString["r"];
                    var a = p.Split('?')[1];
                    var index = a.IndexOf('=') + 1;

                    Lib.UrlParams param = new Lib.UrlParams(a.Substring(index) ,'|');
                    
                    // o=openid //用户id
                    // a=app001 //项目id
                    // h=hash // 描点
                    // s=openid //分享者
                    // id=某个产品
                    // r=其它参数
                    
                    string query = string.Format("o={0}&a={1}&h={2}&s={3}&id={4}&r={5}", jsonResult["openid"].ToString(), param.GetQuery("a"), param.GetQuery("h"), param.GetQuery("s"), param.GetQuery("id"),param.GetQuery("r"));
                    var newQuery= App.Helper.EncryptUtils.DESEncrypt(query, WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);

                    var redirect_url = p.Split('?')[0] + "?o=" + newQuery;
                    HttpContext.Current.Response.Redirect(redirect_url);
                    //HttpContext.Current
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