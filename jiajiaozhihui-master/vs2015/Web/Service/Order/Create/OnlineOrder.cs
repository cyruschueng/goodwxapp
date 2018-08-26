using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Order
{
    public class OnlineOrder:IOrder
    {
        public OnlineOrder(string openId)
        { 
            
        }
        public List<Service.Order.Entity.OrderEntity> GetOrderEntityList()
        {
            throw new NotImplementedException();
        }

        public List<Service.Order.Entity.OrderEntity> GetOrderEntityList(Service.Helper.EnumOrder orderStatus)
        {
            throw new NotImplementedException();
        }

        public Service.Order.Entity.OrderEntity GetOrderEntityByOrderId(int orderId)
        {
            throw new NotImplementedException();
        }

        public int Count
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }
    }
}