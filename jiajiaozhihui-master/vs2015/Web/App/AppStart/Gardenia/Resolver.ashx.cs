using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;
using SfSoft.web.WarrantyCard.Helper;

namespace SfSoft.web.AppStart.Gardenia
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
            string o = context.Request["o"];
            string url = context.Request["url"];
            //return "";

            // 对参数o url解码
            o = o.Replace(" ", "+");
            try
            {
                Lib.BaseUserInfoProvide userInfoProvide=new Lib.BaseUserInfoProvide();
                //对参数o 解密
                o = App.Helper.EncryptUtils.DESDecrypt(o, WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);
                
                Lib.UrlParams query = new Lib.UrlParams(o,'&');
                /*
                    "o={0}&a={1}&h={2}&s={3}&id={4}&r={5}
                 */
                var data = new Model.WXParamsII {
                    AppId = query.GetQuery("a"),
                    Hash = query.GetQuery("h"),
                    OpenId = query.GetQuery("o"),
                    ObjectId = query.GetQuery("id"),
                    Sharer = query.GetQuery("s"),
                    Remark = query.GetQuery("r"),
                    JsSdk = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret),
                    WxUserInfo = userInfoProvide.GetUserInfo(query.GetQuery("o")),
                    Other = new {
                        Member = GetGardeniaUser(query.GetQuery("o")),
                        GardeniaInfo = GetGardeniaInfo()
                    } 
                };

                Model.ResolverData result = new Model.ResolverData();
                result.Info = data;
                result.Code = AppStart.Enums.EnumOAuthState.参数解析成功;
                result.Msg = AppStart.Enums.EnumOAuthState.参数解析成功.ToString();
                return Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            catch (Exception ex) {
                Model.OAuthResult result = new Model.OAuthResult();
                result.Code = AppStart.Enums.EnumOAuthState.参数解析失败;
                return Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
        }
        private dynamic GetGardeniaUser(string openId)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list= bll.GetModelList("openid='" + openId + "'");
            if (list.Count > 0) {
                var model = list.First();
                return new
                {
                    memberId=model.id,
                    classId=model.class_id,
                    className= Group.Helper.GroupProvide.GetSGroupContentById(model.class_id??0).title,
                    role =model.user_role,
                    state=model.is_act
                };
            }
            return new { state = 404 };
        }
        private SfSoft.Model.wx_gardenia GetGardeniaInfo()
        {
            BLL.wx_gardenia bll = new BLL.wx_gardenia();
            var list = bll.GetModelList("");
            if (list.Count > 0) {
                return list.First();
            }
            return new SfSoft.Model.wx_gardenia();
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