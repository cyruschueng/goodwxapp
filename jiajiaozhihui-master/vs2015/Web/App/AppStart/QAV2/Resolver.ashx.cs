using System;
using System.Linq;
using System.Web;
using SfSoft.web.App.Helper;
using System.Net;
using System.IO;
using System.Text;

namespace SfSoft.web.AppStart.QAV2
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
                    AppId=query.GetQuery("a"),
                    Hash=query.GetQuery("h"),
                    OpenId=query.GetQuery("o"),
                    ObjectId = query.GetQuery("id"),
                    Sharer = query.GetQuery("s"),
                    Remark = query.GetQuery("r"),
                    JsSdk = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret),
                    WxUserInfo = userInfoProvide.GetUserInfo(query.GetQuery("o")),
                    Other = ReadQAInfo(query.GetQuery("a"),query.GetQuery("o"))
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
        private string PostWebRequest(string postUrl, string paramData, Encoding dataEncode)
        {
            string ret = string.Empty;
            try
            {
                byte[] byteArray = dataEncode.GetBytes(paramData); //转化
                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                webReq.Method = "POST";
                webReq.ContentType = "application/x-www-form-urlencoded";

                webReq.ContentLength = byteArray.Length;
                Stream newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入参数
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();
                StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.Default);
                ret = sr.ReadToEnd();
                sr.Close();
                response.Close();
                newStream.Close();
            }
            catch (Exception ex)
            {
                
            }
            return ret;
        }

        private SfSoft.web.QA.Models.Init.InitInfo ReadQAInfo(string appId, string openId)
        {
            SfSoft.web.QA.Helper.InitProvide.RegistUser(appId, openId);

            SfSoft.web.QA.Models.Init.InitInfo model = new SfSoft.web.QA.Models.Init.InitInfo();
            model.BaseInfo = SfSoft.web.QA.Helper.InitProvide.GetQAInfo(appId);
            model.UserInfo = SfSoft.web.QA.Helper.InitProvide.GetReadUserInfo(appId, openId);
            model.Award = SfSoft.web.QA.Helper.InitProvide.GetAwardList(openId);
            model.IsAttention = SfSoft.web.QA.Helper.InitProvide.IsAttention(openId);
            model.ExpertType = SfSoft.web.QA.Helper.InitProvide.GetExpertType(openId);
            model.ExpertNumber = SfSoft.web.QA.Helper.InitProvide.GetExpertNumber();
            model.MemberShipNumber = SfSoft.web.QA.Helper.InitProvide.GetMemberShipNumber();
            if (!string.IsNullOrEmpty(model.UserInfo.ExpertId))
            {
                model.Expert = SfSoft.web.QA.Helper.ExpertProvide.GetExperts().FirstOrDefault(e => e.Id == int.Parse(model.UserInfo.ExpertId));
            }
            return model;
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