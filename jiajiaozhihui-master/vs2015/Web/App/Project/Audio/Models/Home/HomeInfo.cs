using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Audio.Models.Home
{
    public class HomeInfo
    {
        public List<Plan.PlanList> TodayPlans { get; set; }
        //i当前播放的
        public Model.WX_Audio_MyRecord CurrPlay { get; set; }
    }
}