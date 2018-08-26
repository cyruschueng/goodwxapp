using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.brainsexpert.lib
{
    public class WxCourse
    {
        public static Model.WX_Course GetCourse(int courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            var model = bll.GetModel(courseId);
            if (model == null) return new Model.WX_Course();
            return model;
        }
        public static string RedireUrl(int courseId)
        {
            var url= SfSoft.web.ZXS.Helper.CourseTaskProvide.GetCourseUrl(courseId);
            return url;
        }
    }
}

