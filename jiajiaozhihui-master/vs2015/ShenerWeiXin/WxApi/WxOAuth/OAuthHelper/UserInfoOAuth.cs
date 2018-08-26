using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;

namespace ShenerWeiXin.WxApi.WxOAuth
{
    /// <summary>
    /// 以snsapi_userinfo为scope发起的网页授权
    /// </summary>
    public class UserInfoOAuth
    {
        public Page Page { get; set; }

        public UserInfoOAuth(Page page)
        {
            this.Page = page;
            this.State = "123456789";
        }
        /// <summary>
        /// 授权后重定向的回调链接地址，请使用urlencode对链接进行处理 
        /// </summary>
        public string RedirectUrl { get; set; }
        /// <summary>
        /// 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节 
        /// </summary>
        public string State { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public OAuthResult OAuthResult { get; set; }
        /// <summary>
        /// 获取用户信息
        /// </summary>
        public void GetOAuthUserInfo(bool reflesh=false)
        {
            if (reflesh == false)
            {
                string code = this.Page.Request["code"];
                try
                {
                    if (code == null || code == "")
                    {
                        throw new WxOAuthException("code无效,重新授权");
                    }
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult tokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(ShenerWeiXin.WXConfig.AgentAppID,ShenerWeiXin.WXConfig.AgentAppSecret, code);
                    this.Page.Session["myaccesstoken"] = tokenResult.access_token;
                    this.Page.Session["myopenid"] = tokenResult.openid;
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(tokenResult.access_token, tokenResult.openid);
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.ok.ToString(), "ok", userInfo);
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode("(A)"+ex.Message, "error.txt");
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.error.ToString(), ex.Message, null);
                }
            }
            else
            {
                try
                {
                    string accessToken = this.Page.Session["myaccesstoken"].ToString();
                    string openid = this.Page.Session["myopenid"].ToString();
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(accessToken, openid);
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.ok.ToString(), "ok", userInfo);
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode("(D)"+ex.Message, "error.txt");
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.error.ToString(), ex.Message, null);
                }
            }
        }
        /// <summary>
        /// 以snsapi_userinfo为scope发起的网页授权
        /// </summary>
        public void Redirect()
        {
            if (RedirectUrl == "")
            {
                throw new WxOAuthException("没有设置授权后重定向的回调链接地址");
            }
            string url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl( ShenerWeiXin.WXConfig.AgentAppID, RedirectUrl, State, Senparc.Weixin.MP.OAuthScope.snsapi_userinfo);
            this.Page.Response.Redirect(url);
        }
        /// <summary>
        /// 检测AccessToken是否有效
        /// </summary>
        /// <returns></returns>
        public bool CheckAccessToken()
        {
            try
            {
                if (this.Page.Session["myaccesstoken"] != null && this.Page.Session["myopenid"] != null)
                {
                    string accessToken = this.Page.Session["myaccesstoken"].ToString();
                    string openid = this.Page.Session["myopenid"].ToString();
                    Senparc.Weixin.Entities.WxJsonResult result = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.Auth(accessToken, openid);
                    if (result.errcode.ToString() == "请求成功")
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            catch (Exception ex) {
                ShenerWeiXin.WXHelper.WriteNode("(E)"+ex.Message);
                return false;
            }
        }
    }
}
