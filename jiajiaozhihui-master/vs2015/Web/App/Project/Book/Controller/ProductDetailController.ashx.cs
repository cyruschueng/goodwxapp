using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Book.Controller
{
    /// <summary>
    /// ProductDetailController 的摘要说明
    /// </summary>
    public class ProductDetailController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            GetDetail(context);
        }
        private void GetDetail(HttpContext context)
        {
            var id = context.Request["id"];
            var openid = context.Request["openid"];
            var orderType= context.Request["ordertype"];
            Product.Helper.ProductProvide provide = new Product.Helper.ProductProvide(int.Parse(id));
            var info = provide.GetProductInfo();

            Helper.PayOrderProvide orderProvide = new Helper.PayOrderProvide();
            var exists= orderProvide.ExistOrder(openid, orderType,id);

            var result = new
            {
                info=info,
                exists=exists
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