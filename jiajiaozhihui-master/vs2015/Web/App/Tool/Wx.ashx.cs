using System.Web;

namespace SfSoft.web.App.Tool
{
    /// <summary>
    /// Wx 的摘要说明
    /// </summary>
    public class Wx : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            var method = context.Request["method"];
            switch (method) { 
                case "authorizeurl":
                    AuthorizeUrl(context);
                    break;
                case "callback":
                    GetUserinfo(context);
                    break;
            }
        }
        
        private void GetUserinfo(HttpContext context)
        {
            string code = context.Request["code"];
            var accessToken = GetAccessToken(code);
            var model= GetWeiXinUsenInfo(accessToken);
            var state = GetParams(context);
            if (state != null && model!=null)
            {
                var cid = state["cid"].ToString();
                var ctype = state["ctype"].ToString();
                var url = App.Url.ServerUrl + "app/pay/course.html?cid=" + cid + "&ctype=" + ctype + "&oid=" + model.openid;
                context.Response.Redirect(url);
            }
            //http://161s5g6007.51mypc.cn/app/pay/course.html?cid=10&ctype=2&oid=oqmjZjh55_7kJKBAZOjwhPUiGEjc&v=0.08479336520129976
        }
        private void AuthorizeUrl(HttpContext context)
        {

            string redirect_uri = context.Request["redirect_uri"];
            string scope = context.Request["scope"];
            string state = context.Request["state"];
            string url = string.Format("https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri={1}&response_type=code&scope={2}&state={3}#wechat_redirect",
                    App.Helper.WxBaseConfig.AppID,
                    redirect_uri,
                    scope,
                    state
                    );
            //var url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(App.Helper.WxBaseConfig.AppID,absoleteUri, "userinfo", oauthScope);
            context.Response.Write(url);
        }
        private Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult GetAccessToken(string code)
        {
             var accessToken= Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret, code);
             return accessToken;
        }
        private Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo GetWeiXinUsenInfo(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult result)
        {
            var userInfo= Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(result.access_token, result.openid);

            return userInfo;
        }
        private Newtonsoft.Json.Linq.JObject GetParams(HttpContext context)
        {
            var state= context.Request["state"];
            return Newtonsoft.Json.Linq.JObject.Parse(state);
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