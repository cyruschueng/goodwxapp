using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Sale.Controller
{
    /// <summary>
    /// SaleController 的摘要说明
    /// </summary>
    public class SaleController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "init":
                    Init(context);
                    break;
                case "config":
                    GetPayConfig(context);
                    break;
            }
        }
        private void Init(HttpContext context)
        {
            var productId = context.Request["cid"];
            var model= Helper.SaleProvide.GetProductInfo(int.Parse(productId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model,
                new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetPayConfig(HttpContext context)
        {
            string cid=context.Request["cid"];
            string oid = context.Request["oid"];
            string page = context.Request["page"];
            
            var url =App.Helper.WxBaseConfig.WebSite+"app/pay/" + page + "?cid=" + cid + "&oid=" + oid;
            var result = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxPayConfig.APPID, App.Helper.WxPayConfig.APPSECRET);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        public void CreateOrder(HttpContext context)
        {
            /*
            string data = context.Request["data"];
            Models.Order.NewOrder info = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Order.NewOrder>(data);

            Helper.OrderProvide provide = new Helper.OrderProvide();
            var index = provide.AddCourseOrder(info);
            context.Response.Write(index);
             * */
        }
        /*
        public string PostPayAddress(Models.WxPay.Address address)
        {
            string parameter = "";
            try
            {
                Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult aouthAccessTokenResult =
                Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(App.Helper.WxPayConfig.APPID, App.Helper.WxPayConfig.APPSECRET, address.code);

                //构造需要用SHA1算法加密的数据
                WxPayData signData = new WxPayData();
                signData.SetValue("appid", PayConfig.APPID);
                signData.SetValue("url", address.url);
                signData.SetValue("timestamp", Senparc.Weixin.MP.Helpers.JSSDKHelper.GetTimestamp());
                signData.SetValue("noncestr", Senparc.Weixin.MP.Helpers.JSSDKHelper.GetNoncestr());
                signData.SetValue("accesstoken", aouthAccessTokenResult.access_token);
                string param = signData.ToUrl();
                //SHA1加密
                string addrSign = FormsAuthentication.HashPasswordForStoringInConfigFile(param, "SHA1");

                //获取收货地址js函数入口参数
                WxPayData afterData = new WxPayData();
                afterData.SetValue("appId", PayConfig.APPID);
                afterData.SetValue("scope", "jsapi_address");
                afterData.SetValue("signType", "sha1");
                afterData.SetValue("addrSign", addrSign);
                afterData.SetValue("timeStamp", signData.GetValue("timestamp"));
                afterData.SetValue("nonceStr", signData.GetValue("noncestr"));

                //转为json格式
                parameter = afterData.ToJson();
            }
            catch (Exception ex)
            {
                throw new WxPayException(ex.ToString());
            }
            return parameter;
        }
        */
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}