using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Weixin.Service.Helper;
using Weixin.Service.Order.Entity;

namespace Weixin.Service.Order
{
    /// <summary>
    /// 货到付款
    /// </summary>
    public class CodOrder:IOrder
    {
        private List<OrderEntity> _orderEntityList;
        private int _count = 0;

        public CodOrder(string openid)
        {
            GetOrderEntityList(openid);
        }
        /// <summary>
        /// 获取单个订单信息
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        public OrderEntity GetOrderEntityByOrderId(int orderId)
        {
            return _orderEntityList.Find(e => e.OrderId == orderId);
        }
        public List<OrderEntity> GetOrderEntityList()
        {
            return _orderEntityList;
        }
        public List<OrderEntity> GetOrderEntityList(EnumOrder orderStatus)
        {
            List<OrderEntity> _list = new List<OrderEntity>();
            _list = _orderEntityList.FindAll(e => e.OrderStatus == orderStatus.ToString());
            return _list;
        }
        private void GetOrderEntityList(string openid)
        {
            SfSoft.BLL.WX_PublicOrder bll = new SfSoft.BLL.WX_PublicOrder();
            List<SfSoft.Model.WX_PublicOrder> list = bll.GetModelList("openid='"+openid+"'");
            if (list.Count > 0) {
                _orderEntityList = new List<OrderEntity>();
                foreach (SfSoft.Model.WX_PublicOrder model in list) {
                    OrderEntity order = new OrderEntity()
                    {
                        Address = OrderHelper.GetProvince(Convert.ToInt32(model.Province)).AreaName + OrderHelper.GetCity(Convert.ToInt32(model.City)).AreaName + model.Address,
                        OrderId=model.ID,
                        Consignee = model.Name,
                        Logistics = model.Logistics,
                        OrderDate = (DateTime)model.OrderDate,
                        OrderStatus = Enum.GetName(typeof(EnumOrder), model.IsSend),
                        ProductName = GoodsHelper.GetGoods((int)model.GoodID).GoodName,
                        TelePhone = model.TelePhone
                    };
                    _orderEntityList.Add(order);
                }
            }
        }
        /// <summary>
        /// 整订单个数
        /// </summary>
        public int Count
        {
            get
            {
                return _count;
            }
            set
            {
                _count = _orderEntityList.Count;
            }
        }

    }
}