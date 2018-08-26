using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Weixin.Service.Order.Entity;
using Weixin.Service.Helper;

namespace Weixin.Service.Order
{
    public interface IOrder
    {
        List<OrderEntity> GetOrderEntityList();
        List<OrderEntity> GetOrderEntityList(EnumOrder orderStatus);
        OrderEntity GetOrderEntityByOrderId(int orderId);
        int Count { get; set; }
    }
}