using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Helper
{
    /// <summary>
    /// 订单状态
    /// </summary>
    public enum EnumOrder 
    { 
        已发送=1,
        未发送=0,
        无效=-1,
        VIP=11
    }
}
