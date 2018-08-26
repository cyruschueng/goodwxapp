using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class CourseProvide
    {
        public dynamic GetCorses(int classId)
        {
            var sql = "select top 14 * from wx_class_courses where class_Id=" + classId + " order by starting_date desc";
            var ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            List<dynamic> list = new List<dynamic>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    list.Add(new {
                        id = dr.Field<int>("id"),
                        resource=GetResource(dr.Field<int>("scource_id")),
                        startingDate =dr.Field<DateTime>("starting_date"),
                        role=dr.Field<string>("role"),
                        roleName= GetRoleName(dr.Field<string>("role")),
                        isPublic =dr.Field<int>("is_public")
                    });
                }
            }
            return new
            {
                latest = list.Take(7),
                history = list.Skip(7).Take(7)
            };
        }
        public dynamic GetCoursesDetail(int classId, string openId, int courseId)
        {
            var courses = GetClassCourse(courseId);
            if (courses == null) return null;
            return new
            {
                courses= courses,
                resourceList = GetResourceList(courses.scource_id),
                resource= GetResource(courses.scource_id),
                commentNumber=10,
                collectNumber=1600
            };
        }
        private dynamic GetResource(int resourceId)
        {
            ResourceProvide provide = new ResourceProvide();
            var model = provide.GetResource(resourceId);
            if (model != null) {
                return new
                {
                    id=resourceId,
                    title=model.title,
                    intro=model.intro,
                    imgSrc=model.img_src,
                    smallImgSrc=model.small_img_src,
                    expert = GetExpert(model.expert_id)
                };
            }
            return null;
        }
        private dynamic GetExpert(string expertId)
        {
            if (string.IsNullOrEmpty(expertId)) return null;
            int id = 0;
            int.TryParse(expertId, out id);
            ExpertProvide provide = new ExpertProvide();
            var model= provide.GetExpert(id);
            if (model != null) {
                return new
                {
                    nickName = model.NickName,
                    name = model.UName
                };
            }
            return null;
        }
        private dynamic GetResourceList(int resourceId)
        {
            ResourceProvide provide = new ResourceProvide();
            var query = provide.GetResourceDetail(resourceId).OrderBy(e=>e.sn);
            List<dynamic> list = new List<dynamic>();
            foreach (var m in query) {
                list.Add(new
                {
                    id=m.id,
                    fileTitle=m.file_title,
                    fileLink=m.file_link,
                    fileIntro=m.file_intro,
                    fileImg=m.img_src,
                });
            }
            return list;
        }
        public string GetRoleName(string role)
        {
            string result = "";
            switch (role) {
                case "001":
                    result = "初级班";
                    break;
                case "002":
                    result = "高级班";
                    break;
                case "003":
                    result = "卓越班";
                    break;
            }
            return result;
        }
        private Model.wx_class_courses GetClassCourse(int classCourseId)
        {
            BLL.wx_class_courses bll = new BLL.wx_class_courses();
            return bll.GetModel(classCourseId);
        }
        public dynamic GetTask(string openId)
        {
            BLL.wx_gardenia_user userBll = new BLL.wx_gardenia_user();
            var userList = userBll.GetModelList("openid='" + openId + "'");
            if (userList.Count > 0)
            {
                var user = userList.First();
                BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
                var list = bll.GetModelList("class_id=" + user.class_id + " and is_act=1");
                return GetEveryWeekDta(list);
            }
            throw new Exception();
        }
        /// <summary>
        /// 每周一课
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private dynamic GetEveryWeekDta(List<Model.wx_gardenia_task> list)
        {
            TimeSpan ts = DateTime.Now - Convert.ToDateTime(DateTime.Now.ToString("yyyy") + "-01-01");
            var day = Math.Floor(ts.TotalDays);
            int oneDay = (day % 7) >= 1 ? 1 : 0;//如果余数大于0 ，说明已经过了半周
            var weekOfYear = Math.Floor((day / 7)) + oneDay;

            List<dynamic> results = new List<dynamic>();
            var dataList = list.Where(e => e.data_type == "everyweek" && DateTime.Now.Year == e.year && weekOfYear.ToString() == e.startup);
            if (dataList.Count() > 0)
            {
                BLL.WX_Course bll = new BLL.WX_Course();
                foreach (var m in dataList) {
                    var id = GetForeignKey(m.data);
                    var catalogue = GetCatalogue(m.data);
                    var model = bll.GetModel(id);
                    results.Add(new
                    {
                        id = model.Id,
                        title = model.Name,
                        coverImg = FormatSrc(model.MiniImgUrl),
                        learnNumber = model.LearnNumber ?? 0,
                        lecturer = model.Lecturer,
                        catalogue= catalogue,
                        lecturerName = GetExperName(string.IsNullOrEmpty(model.Lecturer) ? 0 : int.Parse(model.Lecturer))
                    });
                }
            }
            return results;
        }
        /// <summary>
        /// 每天一课历史数据
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        public dynamic GetHistoryEveryDayData(int classId)
        {
            BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
            var list = bll.GetModelList("class_id=" + classId);
            var query = list.Where(e => e.data_type == "everydata" && DateTime.Now.Subtract(DateTime.Parse(e.startup)).Days > 0);
            BLL.WX_Audio audioBll = new BLL.WX_Audio();
            List<dynamic> tasks = new List<dynamic>();
            foreach (var m in query)
            {
                var id = GetForeignKey(m.data);
                var catalogue = GetCatalogue(m.data);
                var model = audioBll.GetModel(id);
                tasks.Add(new
                {
                    id = model.Id,
                    title = model.FullName,
                    source = model.SoundSource,
                    cover = FormatSrc(model.Cover),
                    startUp = m.startup,
                    catalogue=catalogue
                });
            }
            return tasks;
        }

        /// <summary>
        /// 每日一课
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private List<dynamic> GetEveryDayData(List<Model.wx_gardenia_task> list)
        {
            List<dynamic> values = new List<dynamic>();
            var dataList = list.Where(e => e.data_type == "everydata" && DateTime.Now.Date.Subtract(DateTime.Parse(e.startup).Date).Days == 0);
            if (dataList.Count() > 0)
            {
                BLL.WX_Audio bll = new BLL.WX_Audio();
                foreach (var m in dataList)
                {
                    var id = GetForeignKey(m.data);
                    var catalogue = GetCatalogue(m.data);
                    var model = bll.GetModel(id);
                    values.Add(new
                    {
                        id = model.Id,
                        title = model.FullName,
                        source = model.SoundSource,
                        cover = FormatSrc(model.Cover),
                        catalogue = catalogue
                    });
                }
            }
            return values;
        }
        private string FormatSrc(string src)
        {
            if (string.IsNullOrEmpty(src)) return src;
            return src.StartsWith("http://") == true ? src : App.Helper.WxBaseConfig.ServerUrl + src.Substring(1);
        }
        private List<Model.wx_habit_my_punch_card> GetMyPunchCardList(Model.wx_habit habit, string openId)
        {
            BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
            var list = bll.GetModelList("openid='" + openId + "' and appid='" + habit.appid + "' and habit_id=" + habit.id);
            return list;
        }
        private int GetForeignKey(string json)
        {
            Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(json);
            var key = jobject["foreignKey"].ToString();
            return string.IsNullOrEmpty(key) ? 0 : int.Parse(key);
        }

        private int GetCatalogue(string json)
        {
            Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(json);
            var key = jobject["catalogue"];
            return  key==null || string.IsNullOrEmpty(key.ToString()) ? 1 : int.Parse(key.ToString());
        }

        private Model.wx_habit_my GetMyHibit(int habitId, string openId, string appId)
        {
            var provide = new Habit.Provide.HabitMyProvide();
            if (provide.IsExist(habitId, openId, appId) == true)
            {
                return provide.GetHabitMy(openId, habitId, appId);
            }
            else
            {
                var model = provide.AddHabitMy(habitId, openId, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month), appId);
                return model;
            }
        }
        private int getClassId(int groupType)
        {
            Generalize.Helper.GroupListProvide provide = new Generalize.Helper.GroupListProvide();
            var list = provide.GetGroupList(groupType);
            var query = list.Where(e => e.is_act == 1);
            if (query.Count() > 0)
            {
                return query.First().id;
            }
            return 0;
        }
        private string GetExperName(int experId)
        {
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            var model = bll.GetModel(experId);
            return model == null ? "" : model.UName;
        }
    }
}