using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;

namespace ShenerWeiXin.WxApi.WxOAuth
{
   public  class testAuth
    {
        public Page Page { get; set; }

        public testAuth(Page page)
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
        public void GetOAuthUserInfo()
        {
            WXHelper.WriteNode("请求路径：" + this.Page.Request.Url.AbsoluteUri, "ymhtest.txt");
            if (this.Page.Session["SnsapiBaseRefreshToken"] == null)
            {
                string code = this.Page.Request["code"];
                WXHelper.WriteNode("我的code=" + code, "ymhtest.txt");
                try
                {
                    if (code == null || code == "")
                    {
                        WXHelper.WriteNode("我的code为空值","ymhtest.txt");
                        throw new WxOAuthException("code无效,重新授权");
                    }
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult tokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WxOAuthConfig.APPID, WxOAuthConfig.APPSECRET, code);
                    this.Page.Session["SnsapiBaseRefreshAccessToken"] = tokenResult.refresh_token;
                    this.Page.Session["myaccesstoken"] = tokenResult.access_token;
                    this.Page.Session["myopenid"] = tokenResult.openid;
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(tokenResult.access_token, tokenResult.openid);
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.ok.ToString(), "ok", userInfo);
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode("现在进入异常"+ex.Message, "ymhtest.txt");
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.error.ToString(), ex.Message, null);
                }
            }
            else {
                try
                {
                    WXHelper.WriteNode("我怎么会进入么这里呢", "ymhtest.txt");
                    string refreshToke = this.Page.Session["SnsapiBaseRefreshToken"].ToString();
                    WXHelper.WriteNode("我的refreshToke值为="+refreshToke, "ymhtest.txt");
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult tokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WxOAuthConfig.APPID, refreshToke);
                    this.Page.Session["myaccesstoken"] = tokenResult.access_token;
                    this.Page.Session["myopenid"] = tokenResult.openid;
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(tokenResult.access_token, tokenResult.openid);
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.ok.ToString(), "ok", userInfo);
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("这个是怎么产生的异常"+ex.Message, "ymhtest.txt");
                    OAuthResult = Helper.SetBaseOAuthResult(OAuthCodeEnum.error.ToString(), ex.Message, null);
                }
            }
        }
        /// <summary>
        /// 发起以snsapi_base静默登录
        /// </summary>
        public void Redirect()
        {
            if (RedirectUrl==null || RedirectUrl == "") {
                throw new WxOAuthException("没有设置授权后重定向的回调链接地址");
            }
            string url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(WxOAuthConfig.APPID, RedirectUrl, State, Senparc.Weixin.MP.OAuthScope.snsapi_base);
            this.Page.Response.Redirect(url);
        }
    }
}
