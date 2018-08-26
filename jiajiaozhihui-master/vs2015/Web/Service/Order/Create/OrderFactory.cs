using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Order
{
    public abstract  class OrderFactory
    {
        public abstract IOrder Create(string openId);
    }
}