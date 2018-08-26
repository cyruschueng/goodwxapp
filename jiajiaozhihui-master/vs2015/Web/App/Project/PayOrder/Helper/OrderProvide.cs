using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.PayOrder.Helper
{
    public class OrderProvide
    {
        /// <summary>
        /// 填加订单
        /// </summary>
        /// <param name="model"></param>
        /// <returns>反回订单号</returns>
        public string  AddOrder(Models.Order.NewOrder model, Action completedOrder, AsyncCallback callBack, object obj)
        {
            if (model != null)
            {
                Model.WX_PayOrder order = new Model.WX_PayOrder
                {
                    Address = model.Address,
                    BuyNumber = model.BuyNumber,
                    City = model.City,
                    CreateOrderDate = DateTime.Now,
                    District = model.District,
                    GoodId = model.GoodId,
                    IsAct = 0,
                    IsPay = 0,
                    OpenId = model.OpenId,
                    OrderType = model.OrderType,
                    Price = model.Price,
                    Province = model.Province,
                    Remark = model.Remark,
                    Telephone = model.Telephone,
                    Tradeno =model.Tradeno,
                    UserName = model.UserName
                };
                BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
                bll.Add(order);

                if (completedOrder != null) {
                    completedOrder.BeginInvoke(callBack, obj);
                }
                return order.Tradeno;
            }
            return "";
        }
        /// <summary>
        /// 删除订单
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public bool DelOrder(int orderId)
        {
            BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
            var model = bll.GetModel(orderId);
            if (model != null)
            {
                model.IsAct = 0;
                return bll.Update(model);
            }
            return false;
        }
        /// <summary>
        /// 支付完成后更新订单
        /// </summary>
        /// <param name="tradeno">订单号</param>
        /// <param name="completedOrder">更新后的回调</param>
        /// <param name="callBack">回调的回调</param>
        /// <param name="obj">回调的回调参数</param>
        /// <returns></returns>
        public Model.WX_PayOrder UpdateOrder(string tradeno, Action completedOrder,AsyncCallback callBack,object obj)
        {
            try
            {
                BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
                var model = bll.GetModelList("Tradeno='" + tradeno + "'").SingleOrDefault();
                model.IsPay = 1;
                model.IsAct = 1;
                if (completedOrder != null) {
                    completedOrder.BeginInvoke(callBack, obj);
                }
                bll.Update(model);
                return model;
            }
            catch (Exception ex)
            {
                return new Model.WX_PayOrder();
            }
        }
        /// <summary>
        /// 我的订单
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        public List<Model.WX_PayOrder> GetMyOrder(string openId)
        {
            BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
            return bll.GetModelList("OpenId='" + openId + "'");
        }
        /// <summary>
        /// 我的订单
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="goodId"></param>
        /// <returns></returns>
        public List<Model.WX_PayOrder> GetMyOrder(string openId, string goodId)
        {
            if (string.IsNullOrEmpty(goodId))
            {
                return GetMyOrder(openId);
            }
            else {
                BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
                return bll.GetModelList("OpenId='" + openId + "' And GoodId=" + goodId);
            }
        }
        /// <summary>
        /// 获取订单
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public Model.WX_PayOrder GetPayOrder(int orderId)
        {
            BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
            return bll.GetModel(orderId);
        }
        /// <summary>
        /// 是否存在订单
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public bool ExistPayOrder(string tradeno)
        {
            BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
            var list =bll.GetModelList("Tradeno='" + tradeno + "'");
            return list.Count > 0 ? true : false;
        }
        /// <summary>
        /// 生成订单号
        /// </summary>
        /// <param name="header">订单号前缀</param>
        /// <returns></returns>
        public static string GenerateOutTradeNo(string header)
        {
            var ran = new Random();
            return string.Format("{0}{1}{2}", header, DateTime.Now.ToString("yyyyMMddHHmmss"), ran.Next(999));
        }
        public static string  UpdateAddress(SfSoft.web.App.Pay.Model.UserAddress userAddress)
        {
            try
            {
                BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
                var list = bll.GetModelList("openid='" + userAddress.OpenId + "' and orderType=20161221");
                var adr = userAddress.Address;
                foreach (var m in list)
                {
                    m.Address = adr.DetailInfo;
                    m.City = adr.CityName;
                    m.District = adr.CountryName;
                    m.Province = adr.ProvinceName;
                    m.Telephone = adr.TelNumber;
                    m.UserName = adr.UserName;
                    bll.Update(m);
                }
                return "ok";
            }
            catch (Exception ex) {
                return "error";
            }
            
        }
        public bool IsProcessOrder(string Tradeno)
        {
            BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
            var list= bll.GetModelList("IsPay=1 and IsAct=1 and Tradeno='"+Tradeno+"'");
            return list.Count >0 ?true : false;
        }
    }
}