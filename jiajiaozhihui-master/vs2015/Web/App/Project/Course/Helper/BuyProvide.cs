using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Helper
{
    public class BuyProvide
    {
        public static bool IsBuy(int courseId,string openId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var list = bll.GetModelList("CourseId=" + courseId + " and OpenId='" + openId + "' and isnull(BagId,0)=0");
            return list.Count > 0 ? true : false;
        }

        public static bool IsBagBuy(int bagId, string openId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var list = bll.GetModelList("BagId=" + bagId + " and OpenId='" + openId + "'");
            return list.Count > 0 ? true : false;
        }
    }
}