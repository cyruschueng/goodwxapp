using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Course.Enum;
using System.Data;

namespace SfSoft.web.Course.Helper
{
    public class HomeProvide
    {
        public static List<Models.Course.Base> GetCourseList(CourseThemeEnum theme,string openId)
        {
            
            SfSoft.BLL.WX_Course bll = new BLL.WX_Course();
            var list = bll.GetModelList("SaleState=1 and LearnState=1 and Theme=" + (int)theme + " and Isnull(IsBags,0)=0 ");
            return ReturnCourseList(list, openId);
        }
       
        public static List<Models.Course.Base> ReturnCourseList(IEnumerable<Model.WX_Course> list,string openId)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            var lecturers = GetLecturer();
            var buyList = Helper.MyProvide.GetMyCourseList(openId);
            var dsTheme = GetTheme();
            List<Models.Course.Base> courses = new List<Models.Course.Base>();
            foreach (var model in list)
            {
                var sections = Helper.SectionProvide.GetCourseSection(model);
                
                courses.Add(new Models.Course.Base()
                {
                    Id = model.Id,
                    ImgUrl = model.ImgUrl.StartsWith("http") == true ? model.ImgUrl : website + model.ImgUrl,
                    MiniImgUrl = model.MiniImgUrl.StartsWith("http") == true ? model.MiniImgUrl : website + model.MiniImgUrl,
                    IsFree = (model.IsFree ?? 0).ToString(),
                    LearnNumber = model.LearnNumber ?? 0,
                    Lecturer = GetLectur(lecturers, model.Lecturer).UName,
                    OriginalPrice = model.OriginalPrice ?? 0,
                    PreferentialPrice = model.PreferentialPrice ?? 0,
                    Title = model.Name,
                    Theme = model.Theme ?? 0,
                    ThemeName=GetThemeName(dsTheme,(model.Theme??0).ToString()),
                    IsOline = model.CourseType ?? 1,
                    MediaType = model.MediaType ?? 0,
                    StartDate = model.Start,
                    EndDate = model.End,
                    IsBuy = buyList.Exists(e => e.CourseId == model.Id),
                    Section = sections.Count(),
                    Expert = GetLectur(lecturers, model.Lecturer),
                    BuyNumber = model.BuyNumber1 ?? 0,
                    CourseType=model.CourseType??1
                });
            }
            return courses;
        }
        public static Models.Course.Details GetCourse(int courseId,string openId)
        {
            SfSoft.BLL.WX_Course bll = new BLL.WX_Course();
            var model = bll.GetModel(courseId);
            var lecturers = GetLecturer();
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            Models.Course.Details details = new Models.Course.Details();
            if (model != null) {
                details.Id = model.Id;
                details.Detail = model.Details;
                details.ImgUrl =website+model.ImgUrl;
                details.MiniImgUrl = website + model.MiniImgUrl;
                details.Intro = model.Intro;
                details.IsFree = (model.IsFree ?? 0).ToString();
                details.IsOline = model.CourseType ?? 1;
                details.LearnNumber = (model.BuyNumber ?? 0) > 1000 ? (model.BuyNumber ?? 0) : (model.BuyNumber1 ?? 0);
                details.Lecturer = GetLectur(lecturers, model.Lecturer).UName;
                details.OriginalPrice = model.OriginalPrice ?? 0;
                details.PreferentialPrice = model.PreferentialPrice ?? 0;
                details.StartDate = model.Start;
                details.EndDate = model.End;
                /*讲师信息*/
                details.Teacher = GetLectur(lecturers, model.Lecturer);
                details.Theme = model.Theme ?? 0;
                details.Title = model.Name;
                /*课程章节*/
                details.Section = Helper.SectionProvide.GetCourseSection(model);
                details.IsBuy = Helper.BuyProvide.IsBuy(courseId, openId);
                details.Now = DateTime.Now;
                details.MediaType = model.MediaType ?? 0;
            }
            return details;
        }
        public static List<Models.Course.Bags> GetBags(string openId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var list = bll.GetModelList("IsAct=1");
            return ReturnBags(list, openId);
        }
        public static List<Models.Course.Bags> ReturnBags(IEnumerable<Model.WX_Course_SetBag> bags,string openId )
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            var buyList = Helper.MyProvide.GetMyCourseList(openId);
            var lecturers = GetLecturer();
            List<Models.Course.Bags> list = new List<Models.Course.Bags>();
            foreach (var  m in bags)
            {
                list.Add(new Models.Course.Bags()
                {
                    Id = m.Id,
                    Name =m.BagName,
                    ImgUrl = website + m.ImgUrl,
                    MiniImgUrl = website + m.MiniImgUrl,
                    MediaType =m.MediaType??0,
                    OriginalPrice =m.OriginalPrice??0,
                    PreferentialPrice =m.PreferentialPrice??0,
                    IsBuy = buyList.Exists(e => e.BagId ==m.Id),
                    ReadNumber =m.ReadNumber??0,
                    Expert = GetLectur(lecturers, m.Lecturer.ToString())
                });
            }
            return list;
        }
        private static List<Model.WX_JJZH_Expert> GetLecturer()
        {
            SfSoft.BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            return bll.GetModelList("");
        }
        private static Model.WX_JJZH_Expert GetLectur(List<Model.WX_JJZH_Expert> lecturers, string lecturerId)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            if (string.IsNullOrEmpty(lecturerId))
                return new Model.WX_JJZH_Expert();

            var model = lecturers.Select(e => new Model.WX_JJZH_Expert
            {
                Detail = e.Detail,
                HeadImgUrl = ForamImgSrc(e.HeadImgUrl),
                ImgUrl=website+e.ImgUrl,
                Id = e.Id,
                Intro = e.Intro,
                UName = e.UName,
            }).Where(e => e.Id == int.Parse(lecturerId)).FirstOrDefault<Model.WX_JJZH_Expert>();
            if (model == null) return new Model.WX_JJZH_Expert();
            return model;
        }
        private static string ForamImgSrc(string src)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            if (!src.StartsWith("http:")) {
                return website + src;
            }
            return src;
        }
        private static DataSet GetTheme()
        {
            BLL.Pub_BaseData bll = new BLL.Pub_BaseData();
            return bll.GetList("refobj='weixin.wxcourse.theme'");
        }
        private static string GetThemeName(DataSet ds,string value)
        { 
            if(ds!=null && ds.Tables[0]!=null && ds.Tables[0].Rows.Count>0){
                foreach (DataRow theme in ds.Tables[0].Rows) {
                    if (theme.Field<string>("RefValueCode") == value) {
                        return theme.Field<string>("RefValue");
                    }
                }
            }
            return "";
        }
    }
}