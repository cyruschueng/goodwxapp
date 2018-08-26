using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Helper
{
    public class PlanProvide
    {
        public static Model.WX_Audio_Plan GetTodayPlan()
        {
            BLL.WX_Audio_Plan bll = new BLL.WX_Audio_Plan();
            var list= bll.GetModelList("IsAct=1 and convert(char(10),getdate(),120)  between StartDate and EndDate");
            if (list.Count > 0) {
                return list.FirstOrDefault();
            }
            return new Model.WX_Audio_Plan();
        }
    }
}