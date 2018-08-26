using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.ZXS.Controller
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
                    result=CreateOrder(context).ToString();
                    break;
                case "state":
                    result=OrderState(context).ToString();
                    break;
            }
            context.Response.Write(result);
        }
        public int CreateOrder(HttpContext context)
        {
            string appId=context.Request["appId"];
            string data = context.Request["data"];
            Models.WxPay.OrderInfo info = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.WxPay.OrderInfo>(data);
            try
            {
                int count = Helper.PersonalProvide.GetPlayerCount(appId);
                if (count >= 100) return -1;

                if (info.Name.Trim() == "" || info.TelePhone.Trim() == "" || info.Province == "" || info.City == "") return -2;

                SfSoft.Model.WX_PublicOrder model = new SfSoft.Model.WX_PublicOrder();
                model.Address = info.Province + " " + info.City + " " + info.District + info.Detail;
                model.Province = info.Province;
                model.City = info.City;
                model.District = info.District;
                model.GoodID = 79;
                model.GoodsType = 160806;
                model.IsPay = 0;
                model.IsSend = 0;
                model.Name = info.Name;
                model.OpenID = info.OpenId;
                model.OrderDate = DateTime.Now;
                model.Paymode = 1;
                model.PayNumber = 1;
                model.Price = 1500;
                model.TelePhone = info.TelePhone.Trim();
                model.Tradeno = info.Tradeno;

                SfSoft.BLL.WX_PublicOrder bll = new SfSoft.BLL.WX_PublicOrder();
                int index = bll.Add(model);
                return index;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int OrderState(HttpContext context)
        {
            string appId = context.Request["appId"];
            string openId = context.Request["openId"];
            //活动结束
            return 2;
            SfSoft.BLL.WX_PublicOrder bll = new SfSoft.BLL.WX_PublicOrder();
            int count = 0;
            count = bll.GetModelList("OpenId='" + openId + "' and GoodsType=160806 and IsPay=1").Count;
            if (count > 0) return 1;

            count = Helper.PersonalProvide.GetPlayerCount(appId);
            if (count >= 100) return 2;

            return 0;
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