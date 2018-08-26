using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// PayOrderController 的摘要说明
    /// </summary>
    public class PayOrderController : IHttpHandler
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
                    OrderState(context);
                    break;
            }
            context.Response.Write(result);
        }
        public void CreateOrder(HttpContext context)
        {
            string data = context.Request["data"];
            var courseId = context.Request["courseId"];
            var openId = context.Request["openId"];
            var price = context.Request["price"];
            var tradeno = context.Request["tradeno"];
            var courseType = context.Request["courseType"];
            Models.Order.NewOrder info = new Models.Order.NewOrder
            {
                CourseId = int.Parse(courseId),
                OpenId = openId,
                Price = decimal.Parse(price),
                CourseType =int.Parse(courseType),
                Tradeno = ""
            };


            //StreamReader reader = new StreamReader(context.Request.InputStream);
            //String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            //Models.Order.NewOrder info = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Order.NewOrder>(strJson);


            Helper.OrderProvide provide = new Helper.OrderProvide();
            var index= provide.AddCourseOrder(info);
            context.Response.Write(index);
        }
        public void OrderState(HttpContext context)
        {
            string openId = context.Request["oid"];
            string courseId = context.Request["cid"];
            string courseType = context.Request["ctype"]; 

            Models.WxPay.InitInfo info=new Models.WxPay.InitInfo();

            Helper.OrderProvide provide = new Helper.OrderProvide(openId);
            info.UnCompletedOrderInfo = provide.MyOrderInfo.UnCompletedOrders;
            info.CompletedOrderInfo = provide.MyOrderInfo.CompletedOrders.Where(e => e.CourseId == int.Parse(courseId) && e.CourseType == int.Parse(courseType)).FirstOrDefault();

            if (courseType == "1") { 
                var course=Helper.CourseProvide.GetCourse(int.Parse(courseId));
                info.CourseInfo = Helper.CourseProvide.CourseConvertToWxPayCourseInfo(course);
            }
            else if (courseType == "2")
            {
                var course = Helper.CourseProvide.GetBagsInfo(int.Parse(courseId));
                info.CourseInfo = Helper.CourseProvide.BagConvertToWxPayCourseInfo(course);
            }
            else {
                info.CourseInfo = new Models.WxPay.CourseInfo();
            }
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