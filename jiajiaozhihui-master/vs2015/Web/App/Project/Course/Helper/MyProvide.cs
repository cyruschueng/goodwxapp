using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Course.Enum;

namespace SfSoft.web.Course.Helper
{
    public class MyProvide
    {
        public static List<Model.WX_Course_Personal> GetMyCourseList(string openId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            return bll.GetModelList("OpenId='" + openId + "'");
        }

        public static List<string> GetOpenIdByCourseId(int courseId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var list = bll.GetModelList("CourseId=" + courseId).Select(x => x.OpenId).Distinct();
            return list.ToList();
        }

        public static List<Models.Course.Base> GetCourseList(CourseThemeEnum theme, string openId)
        {
            var listCourse = GetMyCourse(openId,theme);   
            SfSoft.BLL.WX_Course bll = new BLL.WX_Course();
            var list = bll.GetModelList("Theme=" + (int)theme + " and Isnull(IsBags,0)=0");
            var newList = list.Where(m => listCourse.Exists(e => e.CourseId == m.Id));
            return Helper.HomeProvide.ReturnCourseList(newList, openId);
        }
        public static List<Models.Course.Bags> GetBags(string openId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var list = bll.GetModelList("IsAct=1");
            return Helper.HomeProvide.ReturnBags(list, openId);
        }

        private static List<Models.My.MyCourseInfo> GetMyCourse(string openId, CourseThemeEnum theme)
        {
            List<Models.My.MyCourseInfo> infos = new List<Models.My.MyCourseInfo>();
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var list= bll.GetModelList("openId='"+openId+"'");

            switch (theme) { 
                case CourseThemeEnum.Bag:
                    var bag = list.Where(e => (e.BagId ?? 0)!=0);
                     var distinctBag = (from c in bag
                               select c.BagId??0)
                            .Distinct();
                     foreach (var m in distinctBag)
                     {
                         infos.Add(new Models.My.MyCourseInfo()
                         {
                             CourseId = m,
                             //ThemeEnum = (Enum.CourseThemeEnum)3
                         });
                     }
                     break;
                case CourseThemeEnum.Common:
                     var common = list.Where(e => (e.BagId ?? 0) == 0 && (e.OnlineId ?? 0) == 0);
                     var distinctCommon = (from c in common
                                  select c.CourseId)
                                 .Distinct();
                     foreach (var m in distinctCommon)
                     {
                         infos.Add(new Models.My.MyCourseInfo()
                         {
                             CourseId = m,
                             //ThemeEnum = (Enum.CourseThemeEnum)2
                         });
                     }
                     break;
                case CourseThemeEnum.Live:
                     var online = list.Where(e => (e.OnlineId ?? 0) != 0);
                    var distinctOnLine = (from c in online
                                  select c.CourseId)
                               .Distinct();
                    foreach (var m in distinctOnLine)
                    {
                        infos.Add(new Models.My.MyCourseInfo()
                        {
                            CourseId = m,
                            //ThemeEnum = (Enum.CourseThemeEnum)1
                        });
                    }
                     break;
            }
            return infos;
        }
    }
}