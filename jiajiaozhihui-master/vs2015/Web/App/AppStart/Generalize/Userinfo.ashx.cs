using System.Web;
using Newtonsoft.Json.Linq;
using SfSoft.web.App.Helper;

namespace SfSoft.web.AppStart.Generalize
{
    /// <summary>
    /// Userinfo 的摘要说明
    /// </summary>
    public class Userinfo : IHttpHandler
    {
        string AppId = App.Helper.WxBaseConfig.GxAppID;
        string AppSecret = App.Helper.WxBaseConfig.GxAppSecret;

        //http://161s5g6007.51mypc.cn/app/appstart/WarrantyCard/Userinfo.ashx.ashx?r=http://161s5g6007.51mypc.cn/app/Client/WarrantyCard/index.html?r=a=app001|h=start
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetOpenidAndAccessToken(context);
        }
        private void GetOpenidAndAccessToken(HttpContext context)
        {
            string code = context.Request.QueryString["code"];
            string r = HttpContext.Current.Request.QueryString["r"]; //http://161s5g6007.51mypc.cn/app/Client/WarrantyCard/index.html?r=a=app001|h=start
            
            if (!string.IsNullOrEmpty(code))
            {
                string jsonUserInfo = GetOpenidAndAccessTokenFromCode(code);
                Lib.BaseUserInfoProvide userInfoProvide = new Lib.BaseUserInfoProvide();
                SfSoft.Model.WX_UserInfo userInfo = userInfoProvide.Add(userInfoProvide.ConvertToUserInfo(jsonUserInfo));

                var p = HttpContext.Current.Request.QueryString["r"];
                var a = p.Split('?')[1];
                var index = a.IndexOf('=') + 1;

                Lib.UrlParams param = new Lib.UrlParams(a.Substring(index), '|');

                // o=openid //用户id
                // a=app001 //项目id
                // h=hash // 描点
                // s=openid //分享者
                // id=某个产品
                // r=其它参数

                string query = string.Format("o={0}&a={1}&h={2}&s={3}&id={4}&r={5}", userInfo.OpenId, param.GetQuery("a"), param.GetQuery("h"), param.GetQuery("s"), param.GetQuery("id"), param.GetQuery("r"));
                var newQuery = App.Helper.EncryptUtils.DESEncrypt(query, WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);

                var redirect_url = p.Split('?')[0] + "?o=" + newQuery;
                HttpContext.Current.Response.Redirect(redirect_url);
            }
        }
        private string GetOpenidAndAccessTokenFromCode(string code)
        {
            string url = string.Format("https://api.weixin.qq.com/sns/oauth2/access_token?appid={0}&secret={1}&code={2}&grant_type=authorization_code", AppId, AppSecret, code);
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