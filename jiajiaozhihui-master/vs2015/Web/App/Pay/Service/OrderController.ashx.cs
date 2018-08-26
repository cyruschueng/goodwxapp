using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.App.Pay.Service
{
    /// <summary>
    /// OrderController 的摘要说明
    /// </summary>
    public class OrderController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            CreateOrder(context);
        }

        public void CreateOrder(HttpContext context)
        {
            var openId = context.Request["openId"]; 
            var number = context.Request["number"];
            var tradeno = context.Request["tradeno"];
            var productId = context.Request["product_id"];

            
            try
            {
                if (string.IsNullOrEmpty(productId))
                {
                    context.Response.Write("无效的产品Id");
                    return;
                }
                if (string.IsNullOrEmpty(number))
                {
                    context.Response.Write("购买数量无效");
                    return;
                }
                if (string.IsNullOrEmpty(openId))
                {
                    context.Response.Write("无效的用户");
                    return;
                }
                if (string.IsNullOrEmpty(tradeno))
                {
                    context.Response.Write("无效的订单号");
                    return;
                }



                //产品
                SfSoft.web.Product.Helper.ProductProvide provide = new SfSoft.web.Product.Helper.ProductProvide(int.Parse(productId));
                var productInfo = provide.GetProductInfo();
                //当前用户的地址
                var location = SfSoft.web.User.Helper.UserAddressProvide.GetUserAddress(openId);

                //新订单
                var model = new SfSoft.web.PayOrder.Models.Order.NewOrder()
                {
                    Address = location.Address,
                    BuyNumber = int.Parse(number),
                    City = location.City,
                    District = location.District,
                    GoodId = int.Parse(productId),
                    OpenId = openId,
                    OrderType = int.Parse(productInfo.ProductType),
                    Price = Convert.ToDecimal(productInfo.Price * int.Parse(number)),
                    Province = location.Province,
                    Remark = "",
                    Telephone = location.Mobile,
                    UserName = location.Name,
                    Tradeno = tradeno
                };
                SfSoft.web.PayOrder.Helper.OrderProvide order = new SfSoft.web.PayOrder.Helper.OrderProvide();
                tradeno = order.AddOrder(model, null, null, null);
                context.Response.Write(tradeno);
            }
            catch (Exception ex) {
                context.Response.Write("");
            }
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