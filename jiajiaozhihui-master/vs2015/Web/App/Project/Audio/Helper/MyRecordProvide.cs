using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class MyRecordProvide
    {
        public static Model.WX_Audio_MyRecord GetMyRecord(string openId,int planId)
        {
            BLL.WX_Audio_MyRecord bll = new BLL.WX_Audio_MyRecord();
            var list = bll.GetModelList("OpenId='" + openId + "' and PlanId="+planId);
            if (list.Count>0) {
                return list.OrderByDescending(e => e.LearnDate).FirstOrDefault();
            }
            return new Model.WX_Audio_MyRecord();
        }
    }
}