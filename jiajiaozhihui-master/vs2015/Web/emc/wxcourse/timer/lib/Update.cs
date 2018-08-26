using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.timer.lib
{
    public class Update
    {
        private int CourseId = 0;
        public Update(int courseId)
        {
            CourseId = courseId;
            GetCourseTimerInfo();
        }
        public void UpdateStartData()
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(CourseId);
            //model.Start = 1;
            bll.Update(model);
        }
        public void UpdateEndData()
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            Model.WX_Course model = bll.GetModel(CourseId);
            //model.End = 1;
            bll.Update(model);
        }
        public Model.WX_Course_Timer CourseTimerInfo { get; private set; }
        private void GetCourseTimerInfo()
        {
            BLL.WX_Course_Timer bll = new BLL.WX_Course_Timer();
            CourseTimerInfo= bll.GetModel(this.CourseId);
        }
    }
}