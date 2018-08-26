using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Course.Helper
{
    public class SectionProvide
    {
        /// <summary>
        /// 课程章节
        /// </summary>
        /// <param name="courseId"></param>
        public static IEnumerable<Models.Section.SectionInfo> GetCourseSection(Model.WX_Course course)
        {
            BLL.WX_Course_Section bll = new BLL.WX_Course_Section();
            var sections = bll.GetModelList("ClassifyId=" + course.Id);
            List<Models.Section.SectionInfo> list = new List<Models.Section.SectionInfo>();
            foreach (var m in sections.Where(e => (e.PId ?? 0) == 0)) { 
                list.Add(new Models.Section.SectionInfo(){
                     CourseId=int.Parse(m.ClassifyId),
                     SectionId=m.SectionId,
                     SectionName=m.SectionName,
                     SectionSn=(m.Sn??0)+1,
                     Contents = GetContents(m.ClassifyId,m.Id.ToString(),course)
                });
            }
            return list;
        }
        private static List<Models.Section.SubSectionInfo> GetSubSection(IEnumerable<Model.WX_Course_Section> sub)
        {
            List<Models.Section.SubSectionInfo> list = new List<Models.Section.SubSectionInfo>();
            foreach (var m in sub) {
                List<Models.Section.CourseContent> contents = GetContents(m.ClassifyId, m.Id.ToString(),null);
                list.Add(new Models.Section.SubSectionInfo()
                {
                    CourseId = int.Parse(m.ClassifyId),
                    SectionId = m.SectionId,
                    SectionName = m.SectionName,
                    SectionSn = (m.Sn ?? 0) + 1,
                    Contents = contents
                });
            }
            return list;
        }
        private static List<Models.Section.CourseContent> GetContents(string courseId, string id,Model.WX_Course course)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_Course_Content bll = new BLL.WX_Course_Content();
            List<Models.Section.CourseContent> list = new List<Models.Section.CourseContent>();
            var contents = bll.GetModelList("SectionId='" + courseId + "|" + id + "'").OrderBy(e=>e.Sn);
            //第一个动态显示的
            var duration = 0;
            var interval = 0;
            foreach (var m in contents)
            {
                if ((m.AtOnceShow ?? 0) == 0) {
                    
                    if (interval == 0)
                    {
                        interval = m.Interval ?? 0;
                    }
                    else {
                        interval +=duration+ (m.Interval ?? 0);
                    }
                    duration = Convert.ToInt32(m.Duration ?? 0);
                }
                list.Add(new Models.Section.CourseContent()
                {
                    Content = m.Content,
                    CourseId = m.CourseId,
                    Cover = m.Cover.Length>0?website+m.Cover:"",
                    Duration = m.Duration ?? 0,
                    Id = m.Id,
                    IsIframe = m.Isiframe ?? 0,
                    Responsive = m.Responsive,
                    SectionId = m.SectionId,
                    Sn = m.Sn ?? 0,
                    Type = m.Type ?? 0,
                    Url = m.Url,
                    Cname=m.Cname,
                    CreateDate=m.CreateDate,
                    Interval=m.Interval??0,
                    Roles=m.Roles,
                    ShowDateTime = (course.Start ?? DateTime.Now).AddSeconds(interval),
                    AtOnceShow=m.AtOnceShow??0
                });
            }
            return list;
        }
    }
}