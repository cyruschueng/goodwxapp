using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxrrd.Controller
{
    /// <summary>
    /// OrderController 的摘要说明
    /// </summary>
    public class OrderController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Add(context);
        }
        public void Add(HttpContext context)
        { 
            var openId=context.Request["openId"];
            var goodId=context.Request["goodId"];
            var name=context.Request["name"];
            var province=context.Request["province"];
            var city=context.Request["city"];
            var district=context.Request["district"];
            var address=context.Request["address"];
            var telephone=context.Request["telephone"];
            var model=new Models.OrderInfo(){
                Address=address,
                City=city,
                District=district,
                GoodId=int.Parse(goodId),
                GoodsType=20161217,
                Name=name,
                OpenId=openId,
                OrderDate=DateTime.Now,
                Province=province,
                Telephone=telephone
            };
            var index= Helper.OrderProvide.AddOrder(model);
            context.Response.Write(index);
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

