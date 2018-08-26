using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.Helper
{
    public class Helper
    {
        public List<Models.CourseType> InitCourseType()
        {
            var list = new List<Models.CourseType>();
            list.Add(new Models.CourseType()
            {
                Name = "父母特训营",
                Value = 1
            });
            list.Add(new Models.CourseType()
            {
                Name = "微训营",
                Value = 2
            });
            list.Add(new Models.CourseType()
            {
                Name = "枙子会",
                Value = 3
            });
            return list;
        }

    }
}