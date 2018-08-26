using System;
using System.Collections.Generic;
using System.Linq;

namespace SfSoft.web.Course.Helper
{
    public class CourseProvide
    {
        public static bool Learn(int courseId, string openId, int courseType)
        {
            if (courseType == 1) {
                return Learn(courseId, openId);
            }
            else if (courseType == 2) {
               return BagLearn(courseId, openId);
            }
            return false;
        }
        private  static bool Learn(int courseId, string openId)
        {
            try
            {
                if (IsLearn(courseId, openId) == false)
                {
                    Add(courseId, openId);
                }
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }
        private static bool BagLearn(int bagId, string openId)
        {
            try
            {
                if (IsBagLearn(bagId, openId) == false)
                {
                    AddBag(bagId, openId);
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static List<Models.Course.MyCourse> GetMyCourse(string openId)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var courses = bll.GetModelList("OpenId='" + openId + "' and  IsDele=0");
            List<Models.Course.MyCourse> list = new List<Models.Course.MyCourse>();
            var lecturers= GetLecturer();
            foreach (var m in courses) { 
                var course=GetCourse(m.CourseId);
                var section=GetCourseSection(m.CourseId);
                var teacher = "";
                if (!string.IsNullOrEmpty(course.Lecturer)) {
                    var te= lecturers.Where(e => e.Id == int.Parse(course.Lecturer));
                    if (te.Count()!=0)
                    {
                        teacher = te.FirstOrDefault<Model.WX_JJZH_Expert>().UName;
                    }
                }

                list.Add(new Models.Course.MyCourse()
                {
                    CourseId=m.CourseId,
                    CurrSection = m.CurrSection ?? 0,
                    ImgUrl =course.ImgUrl.StartsWith("http:")==true?course.ImgUrl:website+course.ImgUrl,
                    MiniImgUrl = course.MiniImgUrl.StartsWith("http:") == true ? course.MiniImgUrl : website + course.MiniImgUrl,
                    Title = course.Name,
                    TotalSection = section.Count,
                    Teacher =teacher,
                    Theme = course.Theme??3,
                    MediaType=course.MediaType??0,
                });
            }
            return list;
        }
        private static bool IsLearn(int courseId, string openId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var list = bll.GetModelList("CourseId=" + courseId + " and OpenId='" + openId + "' and Isnull(BagId,0)=0");
            return list.Count > 0 ? true : false;
        }
        private static bool IsBagLearn(int bagId, string openId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            var list = bll.GetModelList("OpenId='" + openId + "' and BagId="+bagId);
            return list.Count > 0 ? true : false;
        }
        public  static void Add(int courseId, string openId)
        {
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            Model.WX_Course_Personal model = new Model.WX_Course_Personal();
            model.CourseId = courseId;
            model.CurrSection = 1;
            model.IsDele = 0;
            model.LastDateTime = DateTime.Now;
            model.OpenId = openId;
            model.Tiem = 0;
            if((GetCourse(courseId).Theme??0)==1){
                model.OnlineId =courseId;
            };
            bll.Add(model);
        }
        /// <summary>
        /// 学习特训课程加入到个人的课程中
        /// </summary>
        /// <param name="bagId"></param>
        /// <param name="openId"></param>
        public static void AddBag(int bagId, string openId)
        {
            BLL.WX_Course_Bag bllBag = new BLL.WX_Course_Bag();
            var bags = bllBag.GetModelList("BagId="+bagId);
            BLL.WX_Course_Personal bll = new BLL.WX_Course_Personal();
            foreach (var bag in bags) {
                Model.WX_Course_Personal model = new Model.WX_Course_Personal();
                model.CourseId = bag.CourseId;
                model.CurrSection = 1;
                model.IsDele = 0;
                model.LastDateTime = DateTime.Now;
                model.OpenId = openId;
                model.Tiem = 0;
                model.BagId = bagId;
                bll.Add(model);
            }
        }
        /// <summary>
        /// 获取单课程信息
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public static Model.WX_Course GetCourse(int courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            var model = bll.GetModel(courseId);
            if (model != null) {
                return model;
            }
            return new Model.WX_Course();
        }
        public static Models.WxPay.CourseInfo CourseConvertToWxPayCourseInfo(Model.WX_Course model)
        {
            return new Models.WxPay.CourseInfo{
                CourseName = model.Name,
                CourseType = 1,
                Intro = model.Intro,
                Details=model.Details,
                MaxImgUrl = model.ImgUrl,
                MiniImgUrl = model.MiniImgUrl,
                OriginaPrice = model.OriginalPrice ?? 0,
                Price = model.PreferentialPrice ?? 0
            };
        }
        /// <summary>
        ///  获取课程章节
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public static List<Model.WX_Course_Section> GetCourseSection(int courseId)
        {
            BLL.WX_Course_Section bll = new BLL.WX_Course_Section();
            var list= bll.GetModelList("ClassifyId=" + courseId);
            return list;
        }
        public static List<Model.WX_JJZH_Expert> GetLecturer()
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            return bll.GetModelList("");
        }
        
        public static Models.Course.BagsDetail GetCourseBagsList(int bagId, string openId)
        {
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            BLL.WX_Course_Bag bll = new BLL.WX_Course_Bag();
            var list = bll.GetModelList("BagId="+bagId);
            SfSoft.BLL.WX_Course courseList= new BLL.WX_Course();
            Models.Course.BagsDetail courses = new Models.Course.BagsDetail();
            var bagInfo = GetBagsInfo(bagId);
            courses.IsBuy = Helper.BuyProvide.IsBagBuy(bagId, openId);
            courses.Intro = bagInfo.Intro;
            courses.CourseName = bagInfo.BagName;
            courses.PreferentialPrice = bagInfo.PreferentialPrice ?? 0;
            courses.BagImgUrl = website + bagInfo.ImgUrl;

            var  expertInfo = Helper.ExpertProvide.GetExpert(bagInfo.Lecturer ?? 0);
            courses.Expert = expertInfo;
            List<Models.Course.Base> detail = new List<Models.Course.Base>();
            var lecturers = GetLecturer();
            foreach (var c in list) {
                var model= courseList.GetModel(c.CourseId);
                if (model.SaleState != 1) {
                    continue;
                };
                var sections = Helper.SectionProvide.GetCourseSection(model);

                Model.WX_JJZH_Expert m = new Model.WX_JJZH_Expert();
                if (!string.IsNullOrEmpty(model.Lecturer)) {
                    var currLecturers = lecturers.Where(e => e.Id == int.Parse(model.Lecturer));
                    if (currLecturers.Count() != 0)
                    {
                        m = currLecturers.FirstOrDefault();
                    }
                }
                
                detail.Add(new Models.Course.Base()
                {
                    Id = model.Id,
                    ImgUrl = model.ImgUrl.StartsWith("http") == true ? model.ImgUrl : website + model.ImgUrl,
                    MiniImgUrl=model.MiniImgUrl.StartsWith("http")==true? model.MiniImgUrl:website+model.MiniImgUrl,
                    IsFree = (model.IsFree ?? 0).ToString(),
                    LearnNumber = (model.BuyNumber ?? 0) > 1000 ? (model.BuyNumber ?? 0) : (model.BuyNumber1 ?? 0),
                    Lecturer = m.UName,
                    OriginalPrice = model.OriginalPrice ?? 0,
                    PreferentialPrice = model.PreferentialPrice ?? 0,
                    Title = model.Name,
                    Theme = model.Theme ?? 0,
                    IsOline = model.CourseType ?? 1,
                    MediaType=model.MediaType??0,
                    EndDate=model.End,
                    StartDate=model.Start,
                    IsBuy = Helper.MyProvide.GetMyCourseList(openId).Exists(e => e.BagId == model.Id),
                    Section = sections.Count()
                });
            }
            courses.Detail = detail;
            return courses;
        }
        public static Model.WX_Course_SetBag GetBagsInfo(int bagId)
        {
            BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
            var model= bll.GetModel(bagId);
            if (model == null) {
                return new Model.WX_Course_SetBag();
            }
            return model;
        }
        public static Models.WxPay.CourseInfo BagConvertToWxPayCourseInfo(Model.WX_Course_SetBag model)
        {
            return new Models.WxPay.CourseInfo
            {
                CourseName=model.BagName,
                CourseType=2,
                Intro=model.Intro,
                MaxImgUrl=model.ImgUrl,
                MiniImgUrl=model.MiniImgUrl,
                OriginaPrice=model.OriginalPrice??0,
                Price=model.PreferentialPrice??0,
                Details=model.Details
            };
        }
        public static void SetViewNumber(int courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            var model = bll.GetModel(courseId);
            if (model != null)
            {
                model.LearnNumber = (model.LearnNumber ?? 0) + 1;
                bll.Update(model);
            }
        }
        public static Models.Course.CourseIntro ViewCourse(int courseId, Enum.CourseThemeEnum theme,string openId)
        {
            Models.Course.CourseIntro intro = new Models.Course.CourseIntro();
            var website = App.Helper.WxBaseConfig.WebSite.EndsWith("/") == true ? App.Helper.WxBaseConfig.WebSite.Substring(0, App.Helper.WxBaseConfig.WebSite.Length - 1) : App.Helper.WxBaseConfig.WebSite;
            if (theme!=Enum.CourseThemeEnum.Bag)
            {
                BLL.WX_Course bll = new BLL.WX_Course();
                var model= bll.GetModel(courseId);
                if (model != null) {
                    intro = new Models.Course.CourseIntro()
                    {
                        CourseId = model.Id,
                        CreateDate = model.OnLineDateTime,
                        Desc = model.Details,
                        
                        ImgUrl = website + model.ImgUrl,
                        Title = model.Name,
                        ViewNumber = model.LearnNumber ?? 0,
                        Expert = Helper.ExpertProvide.GetExpert(int.Parse(model.Lecturer)),
                        IsBuy=Helper.MyProvide.GetMyCourseList(openId).Exists(e=>e.CourseId==courseId),
                        IsFree=(model.PreferentialPrice??0)==0?true:false,
                        Price=model.PreferentialPrice??0,
                        CourseType=1,
                        Intro=model.Intro
                    };
                }
            }
            else {
                BLL.WX_Course_SetBag bll = new BLL.WX_Course_SetBag();
                var model= bll.GetModel(courseId);
                if (model != null) {
                    intro = new Models.Course.CourseIntro()
                    {
                        CourseId = model.Id,
                        CreateDate = model.CreateDate,
                        Desc = model.Details,
                        ImgUrl = website + model.ImgUrl,
                        Title = model.BagName,
                        ViewNumber = model.ReadNumber ?? 0,
                        Expert = Helper.ExpertProvide.GetExpert(model.Lecturer??0),
                        IsBuy = Helper.MyProvide.GetMyCourseList(openId).Exists(e => e.BagId == courseId),
                        IsFree = (model.PreferentialPrice ?? 0) == 0 ? true : false,
                        Price=model.PreferentialPrice??0,
                        CourseType = 2
                    };
                }
            }
            return intro;
        }
        /// <summary>
        /// 直播开始播放时，更新Already已表明直播了
        /// </summary>
        /// <param name="contentId"></param>
        public static void UpdateAlready(int contentId)
        {
            BLL.WX_Course_Content bll = new BLL.WX_Course_Content();
            Model.WX_Course_Content model = bll.GetModel(contentId);
            if (model != null) {
                model.Already = 1;
                bll.Update(model);
            }
        }
    }
}