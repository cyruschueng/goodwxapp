using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;

namespace SfSoft.web.AppStart.ZXS
{
    /// <summary>
    /// Resolver 的摘要说明
    /// </summary>
    public class Resolver : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = Out(context);
            context.Response.Write(result);
        }
        private string Out(HttpContext context)
        {
            string o = context.Request.QueryString["o"];
            string m = context.Request.QueryString["m"];

            //return "";

            // 对参数o url解码
            o = o.Replace(" ", "+");
            m = m.Replace(" ", "+");
            //md5加密
            string m1 =App.Helper.EncryptUtils.MD5Encrypt(o);
            if (m == m1)
            {
                //对参数o 解密
                o = App.Helper.EncryptUtils.DESDecrypt(o, WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);
                Model.OAuthResult result = new Model.OAuthResult();
                result.Info = o;
                result.Code =AppStart.Enums.EnumOAuthState.参数解析成功;
                result.Msg = AppStart.Enums.EnumOAuthState.参数解析成功.ToString();
                return Newtonsoft.Json.JsonConvert.SerializeObject(result);
            }
            else
            {
                Model.OAuthResult result = new Model.OAuthResult();
                result.Code = AppStart.Enums.EnumOAuthState.参数解析失败;
                return Newtonsoft.Json.JsonConvert.SerializeObject(result);
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