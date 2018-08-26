using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.PayOrder.Controller
{
    /// <summary>
    /// OrderController 的摘要说明
    /// </summary>
    public class OrderController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "add":
                    CreateOrder(context);
                    break;
                case "state":
                    MyOrders(context);
                    break;
                case "updateaddress":
                    UpdateAddress(context);
                    break;
            }
            context.Response.Write(result);
        }

        private void UpdateAddress(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            App.Pay.Model.UserAddress model = Newtonsoft.Json.JsonConvert.DeserializeObject<App.Pay.Model.UserAddress>(strJson);
            var result= Helper.OrderProvide.UpdateAddress(model);

            context.Response.Write(result);
        }

        /// <summary>
        /// 创建订单
        /// </summary>
        /// <param name="context"></param>
        public void CreateOrder(HttpContext context)
        {
            /*
             contentType: “application/json ; charset=utf-8”
             * 
             StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());

            SfSoft.Model.WX_WarrantyCard model = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.Model.WX_WarrantyCard>(strJson);
             
             */

            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Order.NewOrder model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Order.NewOrder>(strJson);
            
            Helper.OrderProvide provide = new Helper.OrderProvide();
            var index = provide.AddOrder(model,null,null,null);
            context.Response.Write(index);
        }
        /// <summary>
        /// 我的订单
        /// </summary>
        /// <param name="context"></param>
        public void MyOrders(HttpContext context)
        {
            string openId = context.Request["openid"];
            string goodId = context.Request["goodid"];
            Helper.OrderProvide provide = new Helper.OrderProvide();
            var list= provide.GetMyOrder(openId,goodId);
            var data = new
            {
                CompletedOrder = list.Where(e => e.IsPay == 1),
                UnCompletedOrder = list.Where(e => e.IsPay == 0)
            };
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
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