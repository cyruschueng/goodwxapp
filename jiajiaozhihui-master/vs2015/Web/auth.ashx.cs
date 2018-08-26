using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;
using System.Web.SessionState;
using SfSoft.Common;

namespace SfSoft.web
{
    /// <summary>
    /// auth 的摘要说明
    /// </summary>
    public class auth : IHttpHandler,IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            /*
            string address =context.Request.UserHostAddress;
            if (address == "113.91.72.228" || address == "14.17.37.145" || address == "127.0.0.1")
            {

            }
            else
            {
                context.Response.Redirect("./game/maintenance.html");
            }
             * */
            Redirect(context);
        }
        private void Redirect(HttpContext context)
        {
            string code = context.Request.QueryString["code"];
            //ShenerWeiXin.WXHelper.WriteNode(code);

            string _weixinid = context.Request.QueryString["weixinid"].ToString();
            string openId = GetOpenId(code);
            if (IsExist(openId))
            {
                string _serviceopenid = openId;
                string url = WXConfig.AuthURL + "game/brainsexpert/default.aspx?openid=" + _serviceopenid + "&weixinid=" + _weixinid + "&from=shenerhost";
                context.Response.Redirect(url);
            }
            else {
                string url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(ShenerWeiXin.WXConfig.AgentAppID, WXConfig.AuthURL + "game/brainsexpert/default.aspx", "weixinid=" + _weixinid + "",Senparc.Weixin.MP.OAuthScope.snsapi_userinfo);
                HttpContext.Current.Response.Redirect(url);
            }
        }
        private string  GetOpenId(string code)
        {
            Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult result=
                Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret, code);

            return result.openid;
        }
        private bool IsExist(string openId)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            return bll.ExistsByServiceOpenID(openId);
        }
        /*
        private void Redirect(HttpContext context)
        { 
            string name=context.Request.QueryString["name"].ToString();
            string _weixinid = context.Request.QueryString["weixinid"].ToString();
            if (context.Request.QueryString["from"] != null) {
                from = context.Request.QueryString["from"].ToString();
            }
            if (context.Request.QueryString["openid"] != null) {
                //这个是从微信
                openid = context.Request.QueryString["openid"].ToString();
            }
            switch (name) { 
                case "guoxuedaren":
                    WXHelper.VisitViewNumber(2);
                    if (from != "" && openid != "")
                    {
                        BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
                        Model.WX_TestQuestion_Player model = bll.GetModeByOpenID(openid);
                        if (model != null && model.ServiceOpenID != null)
                        {
                            //openid加密码
                            string _serviceopenid = SfSoft.Common.DEncrypt.DEncrypt.Encrypt(model.ServiceOpenID, WXConfig.EncryptKey).ConvertEncryptToBase64();
                            context.Response.Redirect(GetShenerUrl("game/brainsexpert/default.aspx", _weixinid, _serviceopenid));
                        }
                    }
                    else {
                        context.Response.Redirect(GetWeiXinUrl("game/brainsexpert/default.aspx",openid, _weixinid));
                    }
                    break;
            }
        }
         
        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <param name="weixinid"></param>
        /// <param name="openid"></param>
        /// <returns></returns>
        private string GetShenerUrl(string path, string weixinid, string openid = "")
        {
            return WXConfig.AuthURL + path + "?openid=" + openid + "&weixinid=" + weixinid + "&from=" + from;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <param name="weixinid"></param>
        /// <param name="scope"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        private string GetWeiXinUrl(string path, string openid, string weixinid, string scope = "snsapi_userinfo", string state = "1")
        {
            return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WXConfig.AgentAppID + "&redirect_uri=" + WXConfig.AuthURL + path + "?openid=" + openid + "&response_type=code&scope=" + scope + "&state=weixinid=" + weixinid + "#wechat_redirect";
        }
         * * */
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}