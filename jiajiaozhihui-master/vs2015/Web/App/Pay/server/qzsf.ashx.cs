using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxpay.server
{
    /// <summary>
    /// qzsf 的摘要说明
    /// </summary>
    public class qzsf : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = "";
            string result = "";
            if (context.Request.QueryString["method"] != null)
            {
                method = context.Request.QueryString["method"].ToString();
            }
            switch (method)
            {
                case "pay":
                    result = InitPay(context);
                    break;
                case "add":
                    result = Add(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string Add(HttpContext context)
        {
            string result = "{}";
            string openid = context.Request["openid"];
            string goodsid = context.Request["goodsid"];
            string price = context.Request["price"];
            string number = context.Request["number"];
            string province = context.Request["province"];
            string city = context.Request["city"];
            string telephone =context.Request["telephone"].Trim();
            string tradeno = context.Request["tradeno"];
            string address = context.Request["address"];
            string name = context.Request["name"];
            string postcode = context.Request["postcode"];
            string district = context.Request["district"];

            if ( !string.IsNullOrEmpty(openid) && !string.IsNullOrEmpty(goodsid) && !string.IsNullOrEmpty(price) && !string.IsNullOrEmpty(number) && !string.IsNullOrEmpty(province) && !string.IsNullOrEmpty(city)  && !string.IsNullOrEmpty(telephone) && !string.IsNullOrEmpty(tradeno) && !string.IsNullOrEmpty(tradeno) && !string.IsNullOrEmpty(address))
            {
                try
                {
                    Model.WX_PublicOrder model = new Model.WX_PublicOrder();
                    BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
                    if (bll.GetModelByTradeno(tradeno) == null)
                    {
                        model.Address = province + " " + city + " " + district + " " + address;
                        model.City = city;
                        model.GoodID = Convert.ToInt32(goodsid);
                        model.GoodsType = 11;
                        model.IsSend = 0;
                        model.Name = name;
                        model.OpenID = openid;
                        model.OrderDate = DateTime.Now;
                        model.PayNumber = Convert.ToInt32(number);
                        model.Price = Convert.ToDecimal(price);
                        model.Province = province;
                        model.TelePhone = telephone;
                        model.Tradeno = tradeno;
                        model.IsPay = 0;
                        model.Paymode = 1;
                        model.District = district;
                        model.Post = postcode;
                        bll.Add(model);
                    }
                    return MsgResult("1", "订单创建成功");
                }
                catch (Exception ex)
                {
                    return MsgResult("0", "订单创建失败");
                }
            }
            return MsgResult("0", "订单创建失败");
        }
        private string MsgResult(string code, string msg)
        {
            return "{\"code\":\"" + code + "\",\"msg\":\"" + msg + "\"}";
        }

        private string InitPay(HttpContext context)
        {
            string openid = context.Request["openid"].ToString();
            string number = context.Request["number"].ToString();
            string price = context.Request["price"].ToString();
            string tradeno = OutTradeno();

            ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI pay = new ShenerWeiXin.WxApi.WxPay.WeiXinJSPayAPI(null);
            pay.openid = openid;
            pay.total_fee = Convert.ToInt32(Convert.ToInt32(number) * Convert.ToDecimal(price) * 100);
            string body = "亲子书法教材";
            ShenerWeiXin.WxApi.WxPay.PayData data = pay.GetUnifiedOrderResult(body, "在线支付", tradeno, "goodsTag");
            string payConfig = pay.GetJsApiParameters();
            string value = ",\"tradeno\":\"" + tradeno + "\"";
            payConfig = payConfig.Insert(payConfig.Length - 1, value);
            return payConfig;
        }
        /// <summary>
        /// 创建预付订单
        /// </summary>
        private string OutTradeno()
        {
            return ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
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