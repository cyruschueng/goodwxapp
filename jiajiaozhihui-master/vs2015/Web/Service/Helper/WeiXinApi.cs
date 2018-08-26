using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using ShenerWeiXin;

namespace Weixin.Service.Helper
{
    public delegate void CompleteOAuth();
    public class WeiXinApi:System.Web.UI.Page
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="redirectUrl">授权重定向的URL</param>
        /// <param name="state"></param>
        /// <param name="scope"></param>
        /// <param name="weixinId">如果为空，系统将会取默认值</param>
        public void InitWinXin(string redirectUrl,Uri uri, string state="null",Senparc.Weixin.MP.OAuthScope scope= Senparc.Weixin.MP.OAuthScope.snsapi_userinfo,string weixinId="")
        {
            int stateIndex = uri.Query.IndexOf("state=");
            int codeIndex = uri.Query.IndexOf("code=");
            SfSoft.Model.WX_WeiXinAccounts weixinAccounts = Helper.CommHelper.GetWeiXinAccounts(weixinId);
            //如果stateIndex codeIndex 都不会等-1 此时页面正处于授权模式
            if (stateIndex == -1 || codeIndex == -1)
            {
                string refleshToken = Helper.CommHelper.GetAuthExpires(weixinAccounts.WeiXinID);
                if (refleshToken == "")
                {
                    //重新授权
                    string url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(WXConfig.AgentAppID, redirectUrl, state, scope);
                    WXHelper.WriteNode("微信重授权(stateIndex == -1 || codeIndex == -1 && refleshToken =='' )", "debug.txt");
                    Response.Redirect(url);
                }
                else
                {
                    //获取用户信息
                    WXHelper.WriteNode("获取用户信息(stateIndex == -1 || codeIndex == -1) && refleshToken !='' ", "debug.txt");
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult accessTokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, refleshToken);
                    _oauthUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(accessTokenResult.access_token, WXConfig.AgentAppID);
                    UsingCompleteOauth();
                }
            }
            else {
                //此时页面正处于授权模式
                string code = "";
                string[] parameters=uri.Query.Split('&');
                foreach (string param in parameters) {
                    int index=param.IndexOf("code=");
                    if (index != -1) {
                        code =param.Substring(param.IndexOf("=")+1);
                        break;
                    }
                }
                if (code != "")
                {
                    string refleshToken = Helper.CommHelper.GetAuthExpires(weixinAccounts.WeiXinID);
                    //现次查找有reflesh有没有过期
                    if (refleshToken == "")
                    {
                        //直接从微信中读取用户数据
                        WXHelper.WriteNode("微信重授权后获取用户信息直接从微信中读取用户数据（code=" + code + "）", "debug.txt");
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult accessTokenResult =Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                        _oauthUserInfo=Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(accessTokenResult.access_token, WXConfig.AgentAppID);
                        Helper.CommHelper.UpDateRefleshAuth(weixinAccounts.WeiXinID, accessTokenResult.refresh_token);
                        UsingCompleteOauth();
                    }
                    else {
                        //防止redirect重定向两次，导致错误
                        WXHelper.WriteNode("微信重授权后刷新获取用户信息直接从微信中读取用户数据（刷新）", "debug.txt");
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult accessTokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, refleshToken);
                        _oauthUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(accessTokenResult.access_token, WXConfig.AgentAppID);
                        UsingCompleteOauth();
                    }
                }
                else { 
                    
                }
            }
        }
        private Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo _oauthUserInfo = null;
        public Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo OAuthUserInfo
        {
            get { return _oauthUserInfo; }
        }
        public event CompleteOAuth CompleteOAuthEvent;
        private void UsingCompleteOauth()
        {
            if (CompleteOAuthEvent != null) {
                Delegate[] delArray = CompleteOAuthEvent.GetInvocationList();
                foreach (Delegate del in delArray) {
                    CompleteOAuth method = (CompleteOAuth)del;
                    try
                    {
                        method();
                    }
                    catch (Exception ex) { 
                        
                    }
                }
            }
        }
    }
}