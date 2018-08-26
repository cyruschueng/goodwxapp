using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.QA.Helper
{
    public class VipProvide
    {
        public static bool IsVip(string openId)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            var list = bll.GetModelList("OpenId='" + openId + "' and IsPay=1");
            return list.Count > 0 ? true : false;
        }
    }
}