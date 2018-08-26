using Senparc.Weixin;
using Senparc.Weixin.Exceptions;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace SfSoft.web.App.Api.WX
{
    public class OAuth2Controller : ApiController
    {
        private string appId = Config.GxlmWxConfig.AppId;
        private string secret = Config.GxlmWxConfig.AppSecret;

        [HttpPost]
        [Route("api/wx/oauth2")]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult Index(Model.OAuth.RedirectUrl redirectUrl )
        {
            var returnUrl = redirectUrl.Url;
            var state = "jiajiaozhihui-" + DateTime.Now.Millisecond;//随机数，用于识别请求可靠性
            var url = OAuthApi.GetAuthorizeUrl(appId, returnUrl, state, Senparc.Weixin.MP.OAuthScope.snsapi_userinfo);

            Redirect(url);
            return Ok(url);
        }
        [HttpGet]
        [Route("api/wx/oauth2/usercallback/{code}/{state}/{returnUrl}")]
        public IHttpActionResult UserInfoCallback(string code, string state,string returnUrl)
        {
            if (string.IsNullOrEmpty(code))
            {
                return Ok("您拒绝了授权！");
            }
            OAuthAccessTokenResult result = null;
            try
            {
                result = OAuthApi.GetAccessToken(appId, secret, code);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
            if (result.errcode != ReturnCode.请求成功)
            {
                return Ok("错误：" + result.errmsg);
            }

            try
            {
                if (!string.IsNullOrEmpty(returnUrl))
                {
                    return Redirect(returnUrl);
                }

                OAuthUserInfo userInfo = OAuthApi.GetUserInfo(result.access_token, result.openid);
                return Ok(userInfo);
            }
            catch (ErrorJsonResultException ex)
            {
                return Ok(ex.Message);
            }
        }
        [HttpGet]
        [Route("api/wx/oauth2/basecallback/{code}/{state}/{returnUrl}")]
        public IHttpActionResult BaseCallback(string code, string state,string returnUrl)
        {
            if (string.IsNullOrEmpty(code))
            {
                return Ok("您拒绝了授权！");
            }
            var result = OAuthApi.GetAccessToken(appId, secret, code);
            if (result.errcode != ReturnCode.请求成功)
            {
                return Ok("错误：" + result.errmsg);
            }
            OAuthUserInfo userInfo = null;
            try
            {
                //已关注，可以得到详细信息
                userInfo = OAuthApi.GetUserInfo(result.access_token, result.openid);

                if (!string.IsNullOrEmpty(returnUrl))
                {
                    return Redirect(returnUrl);
                }
                return Ok(userInfo);
            }
            catch (ErrorJsonResultException ex)
            {
                //未关注，只能授权，无法得到详细信息
                //这里的 ex.JsonResult 可能为："{\"errcode\":40003,\"errmsg\":\"invalid openid\"}"
                return Ok("用户已授权，授权Token：" + result);
            }
        }
        public string Options()

        {

            return null; // HTTP 200 response with empty body

        }
    }
}
