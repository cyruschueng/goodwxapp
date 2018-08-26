using SfSoft.web.App.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace SfSoft.web.AppStart.Microlecture
{
    /// <summary>
    /// RegistResolver 的摘要说明
    /// </summary>
    public class RegistResolver : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";


            string result = Out(context);
            context.Response.Write(result);
        }
        private string Out(HttpContext context)
        {
            var parameter = GetParameter(context);

            string o = parameter["o"].ToString();
            string url = parameter["url"].ToString();

            //return "";

            // 对参数o url解码
            o = o.Replace(" ", "+");
            try
            {
                Lib.BaseUserInfoProvide userInfoProvide = new Lib.BaseUserInfoProvide();
                //对参数o 解密
                o = App.Helper.EncryptUtils.DESDecrypt(o, WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);

                Lib.UrlParams query = new Lib.UrlParams(o, '&');
                /*
                    "o={0}&a={1}&h={2}&s={3}&id={4}&r={5}
                 */
                var data = new Model.WXParamsII
                {
                    AppId = query.GetQuery("a"),
                    Hash = query.GetQuery("h"),
                    OpenId = query.GetQuery("o"),
                    ObjectId = query.GetQuery("id"),
                    Sharer = query.GetQuery("s"),
                    Remark = query.GetQuery("r"),
                    JsSdk = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret),
                    WxUserInfo = userInfoProvide.GetUserInfo(query.GetQuery("o")),
                    Other = GetMember(query.GetQuery("o"))
                };

                Model.ResolverData result = new Model.ResolverData();
                result.Info = data;
                result.Code = AppStart.Enums.EnumOAuthState.参数解析成功;
                result.Msg = AppStart.Enums.EnumOAuthState.参数解析成功.ToString();
                return Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            catch (Exception ex)
            {
                Model.OAuthResult result = new Model.OAuthResult();
                result.Code = AppStart.Enums.EnumOAuthState.参数解析失败;
                return Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
        }
        /// <summary>
        /// 获取参数
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private Dictionary<String, Object> GetParameter(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            //得到json字符串：strJson={"key3":"xdp-gacl","key4":"白虎神皇"}
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            JavaScriptSerializer jss = new JavaScriptSerializer();
            //将json字符串反序列化成一个Dictionary对象
            Dictionary<String, Object> dicParameter = jss.Deserialize<Dictionary<String, Object>>(strJson);
            return dicParameter;
        }
        private dynamic GetMember(string openId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openid='" + openId + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                return new
                {
                    classNo = model.class_no,
                    className = model.class_name,
                    classType = model.class_type,
                    classTypeName = new SfSoft.web.Microlecture.Provide.CourseProvide().GetRoleName(model.class_type),
                    isact = model.is_act //0 未审核
                };
            }
            return new
            {
                classNo = "",
                className = ""
            };
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