using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class OrderProvide
    {
        public OrderProvide(string openId)
        {
            this.MyOrderInfo = GetMyOrder(openId);
        }
        public OrderProvide()
        {
            this.MyOrderInfo = new Models.Order.MyOrder();
        }
        public Models.Order.MyOrder MyOrderInfo { get; private set; }
        /// <summary>
        /// 填加订单
        /// </summary>
        /// <param name="order"></param>
        public string AddCourseOrder(Models.Order.NewOrder order)
        {
            try
            {
                BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
                Model.WX_Course_Order model = new Model.WX_Course_Order();
                model.BuyNumber = 1;
                model.CourseId = order.CourseId;
                model.IsAct = 0;
                model.IsDel = 0;
                model.IsPay = 0;
                model.Name = "";
                model.OpenId = order.OpenId;
                model.OrderDateTime = DateTime.Now;
                model.Price = order.Price;
                model.Referrer = "";
                model.Remark = "课程购买";
                model.SalesPlatform = 0;
                model.Telephone = "";
                model.Tradeno = App.Helper.Unity.Pay.GenerateOutTradeNo();
                model.OrderType = order.CourseType;
                bll.Add(model);
                return model.Tradeno;
            }
            catch (Exception ex) {
                return "";
            }
        }
        public bool DelOrder(int orderId)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            var model= bll.GetModel(orderId);
            if (model != null) {
                model.IsDel = 1;
                return bll.Update(model);
            }
            return false;
        }
        public Models.Order.OrderInfo UpdateOrder(string tradeno)
        {
            try
            {
                BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
                var model = bll.GetModelList("Tradeno='" + tradeno + "'").SingleOrDefault();
                model.IsPay = 1;
                bll.Update(model);
                Action myCourse = new Action(() =>
                {
                    if (model.OrderType == 1) {
                        Helper.CourseProvide.Add(model.CourseId, model.OpenId);
                    }
                    else if (model.OrderType == 2) {
                        Helper.CourseProvide.AddBag(model.CourseId, model.OpenId);
                    }
                });
                myCourse.BeginInvoke(null, null);
                return new Models.Order.OrderInfo
                {
                    BuyNumber = model.BuyNumber ?? 0,
                    CourseId = model.CourseId,
                    CourseType = model.OrderType ?? 0,
                    Id = model.Id,
                    IsPay = 1,
                    OpenId = model.OpenId,
                    OrderDateTime = model.OrderDateTime,
                    Price = model.Price,
                    Remark = model.Remark,
                    Tradeno = model.Tradeno
                };
            }
            catch (Exception ex) {
                return new Models.Order.OrderInfo();
            }
        }
        /// <summary>
        /// 我的订单（完成，未完成）
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        private   Models.Order.MyOrder GetMyOrder(string openId)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            var list = bll.GetModelList("OpenId='" + openId + "' and IsDel=0").ConvertAll(e => new Models.Order.OrderInfo
            {
                BuyNumber = e.BuyNumber ?? 0,
                CourseId = e.CourseId,
                CourseType = e.OrderType ?? 0,
                Id = e.Id,
                IsPay = e.IsPay ?? 0,
                OpenId = e.OpenId,
                OrderDateTime = e.OrderDateTime,
                Price = e.Price,
                Remark = e.Remark,
                Tradeno = e.Tradeno
            });

            Models.Order.MyOrder order = new Models.Order.MyOrder();
            order.CompletedOrders = list.Where(e => e.IsPay == 1);
            order.UnCompletedOrders = list.Where(e => e.IsPay == 0);
            return order;
        }
    }
}