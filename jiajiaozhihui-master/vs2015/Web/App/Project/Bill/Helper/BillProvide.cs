using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Bill.Helper
{
    public class BillProvide
    {
        /// <summary>
        /// 入帐帐单
        /// </summary>
        /// <returns></returns>
        public static List<Model.WX_Bill> GetEntryBillByOrderId(string orderId)
        {
            BLL.WX_Bill bll = new BLL.WX_Bill();
            return bll.GetModelList("OrderId='" + orderId + "'");
        }
    }
}