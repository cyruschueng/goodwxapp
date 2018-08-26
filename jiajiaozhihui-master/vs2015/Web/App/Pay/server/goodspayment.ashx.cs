using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.web.common;

namespace SfSoft.web.wxpay.server
{
    /// <summary>
    /// goodspayment 的摘要说明
    /// </summary>
    public class goodspayment : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = Order(context);
            context.Response.Write(result);
        }

        private string Order(HttpContext context)
        {
            ReturnJson json = new ReturnJson();
            try
            {
                string openid = context.Request["openid"];
                string name = context.Request["name"];
                string telephone = context.Request["telephone"].Trim();
                string address = context.Request["address"];
                string province = context.Request["province"];
                string city = context.Request["city"];
                string district = context.Request["district"];
                string remark = context.Request["remark"];
                string goodsid = context.Request["goodsid"];
                string tradeno = context.Request["tradeno"];
                string number = context.Request["number"];
                string price=context.Request["price"];

                if (TestingAddress(telephone, name, address) == false) {
                    json.Code = (int)EnumReturnJson.UnAddress;
                    return json.Return();
                }
                if (ExistsOrder(goodsid, openid, "16618", telephone) == true) {
                    json.Code = (int)EnumReturnJson.Exist;
                    return json.Return();
                }

                BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
                Model.WX_PublicOrder model = new Model.WX_PublicOrder();

                model.Address = address;
                model.City = city;
                model.District = district;
                model.GoodID =int.Parse(goodsid);
                model.GoodsType = 16618;
                model.IsPay = 0;
                model.IsSend = 0;
                model.Name = name;
                model.OpenID = openid;
                model.OrderDate = DateTime.Now;
                model.PayNumber = int.Parse(number);
                model.Price = decimal.Parse(price);
                model.Province = province;
                model.Remark = remark;
                model.TelePhone = telephone;
                model.Tradeno = tradeno;
                bll.Add(model);

                json.Code = (int)EnumReturnJson.Ok;
                json.Msg = "订购成功";
                return json.Return();
            }
            catch (Exception ex) {
                json.Code = (int)EnumReturnJson.Error;
                json.Msg = "订购失败";
                return json.Return();
            }
        }
        /// <summary>
        /// 当订单有未处理的，不可以再下单
        /// </summary>
        /// <param name="goodsId"></param>
        /// <param name="openId"></param>
        /// <param name="goodsType"></param>
        /// <param name="telephone"></param>
        /// <returns></returns>
        private bool ExistsOrder(string goodsId,string openId,string goodsType,string telephone)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            DataSet ds = bll.GetList("GoodId=" + goodsId + " and IsSend=0 and openid='" + openId + "' and GoodsType=" + goodsType + " and TelePhone='"+telephone+"'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 验证收化信息是不是有效
        /// </summary>
        /// <param name="telephone"></param>
        /// <param name="name"></param>
        /// <param name="address"></param>
        /// <returns></returns>
        private bool TestingAddress(string telephone,string name,string address)
        {
            if (telephone.Trim() == "" || name.Trim() == "" || address.Trim() == "") {
                return false;
            }
            return true;
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