using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;

namespace SfSoft.web.start
{
    /// <summary>
    /// doublenovember2 的摘要说明
    /// </summary>
    public class doublenovember2 : IHttpHandler,System.Web.SessionState.IRequiresSessionState
    {

        private string OpenID = string.Empty;
        private string Mode = string.Empty;
        private string Share = string.Empty;
        private string ID = string.Empty;
        private string From = string.Empty;
        private string SharePath = string.Empty;

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Init(context);
            Run();
        }
        private void Init(HttpContext context)
        {
            if (HttpContext.Current.Session["OPENID11"] != null && HttpContext.Current.Session["OPENID11"].ToString() != "")
            {
                OpenID = HttpContext.Current.Session["OPENID11"].ToString().ConvertBase64TocChars();
                Mode = "";
            }
            else
            {
                Mode = "auth";
            }

            if (context.Request["share"] != null)
            {
                Share = context.Request["share"].ToString();
            }
            if (context.Request["sharepath"] != null)
            {
                SharePath = context.Request["sharepath"].ToString();
            }
            if (context.Request["id"] != null)
            {
                ID = context.Request["id"].ToString();
            }
        }
        private void Run()
        {
            string url = "";
            string redirectUrl = "";
            string state = "{'mode':'" + Mode + "','share':'" + Share + "','openid':'" + OpenID + "','id':'" + ID + "'}";
            state = DEncrypt.Encrypt(state, WXConfig.EncryptKey).ConvertEncryptToBase64();
            if (Share != null && Share != "")
            {
                //有户分享
                redirectUrl = WXConfig.AuthURL + SharePath;
            }
            else
            {
                //从微信原文链接 ，菜单，回复中进入（/game/doublenovember/index.aspx） 
                redirectUrl = WXConfig.AuthURL + "game/doublenovember/index.aspx";
            }
            url = GenerateUrl(redirectUrl, state);
            HttpContext.Current.Response.Redirect(url);
        }
        /// <summary>
        /// 生成可能的链接
        /// 如果用户已微信授权，直接登录，否则微信授权！
        /// </summary>
        /// <returns></returns>
        private string GenerateUrl(string redirectUrl, string state)
        {
            string url = "";
            if (OpenID != null && OpenID != "")
            {
                //微信已授权
                url = GetLocalLink(redirectUrl, state);
            }
            else
            {
                //微信未授权或授权已失效
                url = GetWeixinLink(redirectUrl, state);
            }
            return url;
        }
        private string GetWeixinLink(string redirectUrl, string state)
        {
            return Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(WXConfig.AgentAppID, redirectUrl, state, Senparc.Weixin.MP.OAuthScope.snsapi_userinfo);
        }
        private string GetLocalLink(string redirectUrl, string state)
        {
            return redirectUrl + "?state=" + state;
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