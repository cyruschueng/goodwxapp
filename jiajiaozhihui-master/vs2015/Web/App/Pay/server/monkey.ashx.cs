using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.web.common;
using SfSoft.web.weixinconfig;

namespace SfSoft.web.wxpay.server
{
    /// <summary>
    /// monkey 的摘要说明
    /// </summary>
    public class monkey : IHttpHandler,System.Web.SessionState.IRequiresSessionState
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string type = context.Request.QueryString["type"];
            string result = "";
            switch (type)
            {
                case "save":
                    result = SaveData(context);
                    break;
                case "payconfig":
                    result = UpdateConfigPay(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string SaveData(HttpContext context)
        {
            ReturnJson json = new ReturnJson();
            if (context.Session["mymonkey"] != null && context.Session["WXJSPAYDATA"] != null)
            {
                try
                {
                    WxJsPayData wxJsPayData = context.Session["WXJSPAYDATA"] as WxJsPayData;
                    wxJsPayData.Tradeno = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
                    string goodId = context.Session["mymonkey"].ToString();
                    string tradeno = wxJsPayData.Tradeno;
                    string openId = wxJsPayData.OpenId;
                    DateTime orderDateTime = DateTime.Now;
                    int buyNumber = wxJsPayData.BuyNumber;
                    decimal price = wxJsPayData.Price/100;
                    string producttype = "";
                    if (context.Request["producttype"] != null)
                    {
                        producttype = context.Request["producttype"].ToString();
                    }
                    Model.WX_PublicOrder model = new Model.WX_PublicOrder();
                    model.Address = context.Request["address"];
                    model.City = context.Request["city"];
                    model.District = context.Request["district"];
                    model.GoodID =int.Parse(goodId);
                    model.GoodsType = (int)ShenerWeiXin.EnumOrderType.小猴子;
                    model.Name = context.Request["name"];
                    model.OpenID = openId;
                    model.OrderDate = DateTime.Now;
                    model.Paymode = 1;
                    model.PayNumber=buyNumber;
                    model.IsPay = 0;
                    model.Price=price;
                    model.Remark = "【" + producttype + "】";
                    model.Province = context.Request["province"];
                    model.TelePhone = context.Request["telephone"].Trim();
                    model.Tradeno = tradeno;
                    if (model.Name.Trim() == "" || model.Province.Trim() == "" || model.TelePhone.Trim() == "" || model.City == "") {
                        json.Code = (int)EnumReturnJson.UnAddress;
                        return json.Return();
                    }
                    BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
                    bll.Add(model);
                    context.Session["WXJSPAYDATA"] = wxJsPayData;
                    json.Code = (int)EnumReturnJson.Ok;
                    return json.Return();
                }
                catch (Exception ex)
                {
                    ShenerWeiXin.WXHelper.WriteNode(ex.Message, "monkey.txt");
                    json.Code = (int)EnumReturnJson.Error;
                    return json.Return();
                }
            }
            json.Code = (int)EnumReturnJson.Error;
            return json.Return();
        }
        private string  UpdateConfigPay(HttpContext context)
        {
            ReturnJson json = new ReturnJson();
            try
            {
                WxJsPayData pay = context.Session["WXJSPAYDATA"] as WxJsPayData;
                pay.BuyNumber = int.Parse(context.Request["number"]); ;
                pay.Price = Convert.ToDecimal(Convert.ToDecimal(context.Request["price"]) * 100);
                context.Session["WXJSPAYDATA"] = pay;
                json.Code = (int)EnumReturnJson.Ok;
                return json.Return();
            }
            catch (Exception ex) {
                json.Code = (int)EnumReturnJson.Error;
                return json.Return();
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