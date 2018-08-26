using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentScheduler;

namespace SfSoft.web.emc.wxcourse.timer.lib
{
    public class TimeHelper
    {
        private static List<Model.WX_Course_Timer> StartTimeList;
        private static List<Model.WX_Course_Timer> EndTimeList;
        static TimeHelper()
        {
            BLL.WX_Course_Timer bll = new BLL.WX_Course_Timer();
            StartTimeList = bll.GetModelList("datediff(n,getdate(),StartDateTime)>0");
            EndTimeList = bll.GetModelList("datediff(n,getdate(),EndDateTime)>0");
        }
        public TimeHelper()
        { 
            
        }
        private void StartSchedule()
        {
            if (StartTimeList.Count > 0) { 
                foreach(var item in StartTimeList){
                    Update update = new Update(item.CourseId);
                    Action action = new Action(update.UpdateStartData);
                    if (update.CourseTimerInfo != null) {
                        //Schedule(action)
                    }
                }
            }
        }
        private void EndSchedule()
        { 
            
        }
        
    }
}