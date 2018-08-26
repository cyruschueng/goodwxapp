using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Book.Controller
{
    /// <summary>
    /// productcontroller 的摘要说明
    /// </summary>
    public class productcontroller : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            GetProductInfo(context);
        }
        private void GetProductInfo(HttpContext context)
        {
            var id = context.Request["productid"];
            var openid = context.Request["openid"];
            /*产品详情*/
            Product.Helper.ProductProvide provide = new Product.Helper.ProductProvide(int.Parse(id));
            var info = provide.GetProductInfo();
            /*有没有分享*/
            Helper.WxShareProvide shareProvide = new Helper.WxShareProvide();
            var isShare = shareProvide.Exist(openid);
            /*有没有关注*/
            var user= Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openid);
            var attention = user.subscribe;

            var result = new {
                productInfo= info,
                isShare=isShare,
                attention=attention
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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