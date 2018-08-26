using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Book.Helper
{
    public class PayOrderProvide
    {
        public bool ExistOrder(string openId,string orderType,string  goodId)
        {
            BLL.WX_PayOrder bll = new BLL.WX_PayOrder();
            var list= bll.GetModelList("openid='" + openId + "' and orderType=" + orderType + " and IsPay=1 and GoodId="+ goodId);
            return list.Count > 0 ? true : false;
        }
    }
}