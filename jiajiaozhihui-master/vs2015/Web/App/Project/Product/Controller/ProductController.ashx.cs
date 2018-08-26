using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Product.Controller
{
    /// <summary>
    /// ProductController 的摘要说明
    /// </summary>
    public class ProductController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request["method"];
            switch (method)
            {
                case "type":
                    GetProductInfoByType(context);
                    break;
                case "detail":
                    GetProductDetailById(context);
                    break;
            }
        }
        private void GetProductInfoByType(HttpContext context)
        {
            var type = context.Request["type"];
            Helper.ProductProvide provide = new Helper.ProductProvide();
            var list= provide.GetProductByType(int.Parse(type));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(list, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetProductDetailById(HttpContext context)
        {
            var id = context.Request["id"];
            Helper.ProductProvide provide = new Helper.ProductProvide(int.Parse(id));
            var info = provide.GetProductInfo();
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(info, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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