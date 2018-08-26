using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin.Share;
using ShenerWeiXin;
using ShenerWeiXin.User;
using SfSoft.Common;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// order 的摘要说明
    /// </summary>
    public class order : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = "";
            string result = "";
            if (context.Request["method"] != null)
            {
                method = context.Request["method"].ToString();
            }
            result = Submit(context);
            context.Response.Write(result);
        }

        public string Submit(HttpContext context)
        {
            string result = "{}";

            string openid = "";
            if (context.Request["openid"] != null)
            {
                try
                {
                    openid = context.Request["openid"].ToString();
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode(ex.Message,"order.txt");
                }
            }
            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["name"] != null)
            {
                name = context.Request["name"].ToString();
            }
            string address = "";
            if (context.Request["address"] != null)
            {
                address = context.Request["address"].ToString();
            }
            string telephone = "";
            if (context.Request["phone"] != null)
            {
                telephone = context.Request["phone"].ToString().Trim();
            }
            string province = "";
            if (context.Request["province"] != null)
            {
                province = context.Request["province"].ToString();
            }
            string city = "";
            if (context.Request["city"] != null)
            {
                city = context.Request["city"].ToString();
            }
            string remark = "";
            if (context.Request["remark"] != null)
            {
                remark = context.Request["remark"].ToString();
            }
            string mode = "";
            if (context.Request["mode"] != null)
            {
                mode = context.Request["mode"].ToString();
            }
            string friendid = "";
            if (context.Request["friendid"] != null)
            {
                friendid = context.Request["friendid"].ToString();
            }
            string number = "1";
            if (context.Request["txtNumber"] != null)
            {
                number = context.Request["txtNumber"].ToString();
            }
            string price = "0";
            if (context.Request["txtPrice"] != null)
            {
                price = context.Request["txtPrice"].ToString();
            }
            string postcode = "";
            if (context.Request["postcode"] != null)
            {
                postcode = context.Request["postcode"];
            }
            string district = "";
            if (context.Request["district"] != null)
            {
                district = context.Request["district"];
            }
            string area = "";
            if (context.Request["area"] != null)
            {
                area = context.Request["area"];
            }
            string tradeno = "";
            if (context.Request["tradeno"] != null)
            {
                tradeno = context.Request["tradeno"];
            }
            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(telephone) || string.IsNullOrEmpty(province) || string.IsNullOrEmpty(city))
            {
                return "{\"code\":\"3\",\"msg\":\"收货地址获取失败，重新获取!\"}"; //已订购
            }
            int orderID = 0;
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            if (UnDoOrder(telephone, goodsid) == true)
            {
                return "{\"code\":\"0\",\"msg\":\"已订购\"}"; //已订购
            }
            try
            {
                model.Address = area + address;
                model.City = city;
                model.District = district;
                model.GoodID = Convert.ToInt32(goodsid);
                model.GoodsType = 11;
                model.IsSend = 0;
                model.Name = name;
                model.OpenID = openid;
                model.OrderDate = DateTime.Now;
                model.PayNumber = Convert.ToInt32(number);
                model.Post = postcode;
                model.Price = Convert.ToDecimal(price);
                model.Province = province;
                model.Remark = remark;
                model.TelePhone = telephone;
                model.Tradeno = tradeno;
                orderID = bll.Add(model);
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode( ex.Message,"order.txt");
                return "{\"code\":\"2\",\"msg\":\"订购失败\"}";
            }

            return "{\"code\":\"1\",\"msg\":\"订购完成\",\"orderid\":\"" + orderID.ToString() + "\"}";
        }
        /// <summary>
        /// 是否存在未处理的订单
        /// 只针对货到付款判断
        /// </summary>
        /// <returns></returns>
        private bool UnDoOrder(string telephone, string goodsid)
        {
            string sql = "select * from WX_PublicOrder where goodID=" + goodsid + " and telephone='" + telephone + "' and isnull(Paymode,0)=0 and isnull(issend,0)=0";
            return SfSoft.DBUtility.DbHelperSQL.Exists(sql);
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