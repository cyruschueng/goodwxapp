using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Gardenia.Helper
{
    public class TaskProvide
    {
        public dynamic GetTask(string openId,int groupType)
        {
            BLL.wx_gardenia_user userBll = new BLL.wx_gardenia_user();
            var userList= userBll.GetModelList("openid='" + openId + "'");
            if (userList.Count > 0)
            {
                var user = userList.First();
                BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
                var list = bll.GetModelList("class_id=" + user.class_id + " and is_act=1");
                return new
                {
                    everyDay = GetEveryDayData(list),
                    everyWeek = GetEveryWeekDta(list),
                    everyMonth = GetEveryMonthDta(list, openId),
                    wangMaMa = GetWangMaMaData(list)
                };
            }
            else {
                //临时用户
                var classId= getClassId(groupType);
                BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
                var list = bll.GetModelList("class_id=" + classId + " and is_act=1");
                return new
                {
                    everyDay = GetEveryDayData(list),
                    everyWeek = GetEveryWeekDta(list),
                    everyMonth = GetEveryMonthDta(list, openId),
                    wangMaMa = GetWangMaMaData(list)
                };
            }
            
        }
        /// <summary>
        /// 每日一课
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private dynamic GetEveryDayData(List<Model.wx_gardenia_task> list)
        {
            var dataList = list.Where(e => e.data_type == "everydata" && DateTime.Now.Date.Subtract(DateTime.Parse(e.startup).Date).Days==0);
            if (dataList.Count() > 0) {
                var data= dataList.First();
                var id = GetForeignKey(data.data);
                BLL.WX_Audio bll = new BLL.WX_Audio();
                var model= bll.GetModel(id);
                return new
                {
                    id=model.Id,
                    title=model.FullName,
                    source=model.SoundSource
                };
            }
            return new { };
        }
        /// <summary>
        /// 每日一课
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        private dynamic GetWangMaMaData(List<Model.wx_gardenia_task> list)
        {
            var dataList = list.Where(e => e.data_type == "wangmama" && DateTime.Now.Date.Subtract(DateTime.Parse(e.startup).Date).Days == 0);
            if (dataList.Count() > 0)
            {
                var data = dataList.First();
                var id = GetForeignKey(data.data);
                BLL.WX_Course bll = new BLL.WX_Course();
                var model = bll.GetModel(id);
                return new
                {
                    id = model.Id,
                    title = model.Name,
                    source = GetCoursesContent(model.Id).Url
                };
            }
            return new { };
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
            var weekOfYear =Math.Floor( (day / 7)) + oneDay;
            
             var dataList = list.Where(e => e.data_type == "everyweek" && DateTime.Now.Year == e.year && weekOfYear.ToString() == e.startup);
            if (dataList.Count() > 0)
            {
                var data = dataList.First();
                var id = GetForeignKey(data.data);
                BLL.WX_Course bll = new BLL.WX_Course();
                var model= bll.GetModel(id);
                return new
                {
                    id=model.Id,
                    title=model.Name,
                    intro=model.Intro,
                    exercisesId=model.ExercisesId
                };
            }
            return new{};
        }
        /// <summary>
        /// 习惯助手
        /// </summary>
        /// <param name="list"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        private dynamic GetEveryMonthDta(List<Model.wx_gardenia_task> list,string openId)
        {
            var dataList = list.Where(e => e.data_type == "everymonth" && DateTime.Now.Year == e.year && DateTime.Now.Month.ToString()== e.startup);
            if (dataList.Count() > 0)
            {
                var data = dataList.First();
                var habitId = GetForeignKey(data.data);
                BLL.wx_habit bll = new BLL.wx_habit();
                var model = bll.GetModel(habitId);
                var punchCardList = GetMyPunchCardList(model, openId);
                
                //var myHabit = new Habit.Provide.HabitMyProvide().GetHabitMy(openId, model.id, model.appid);
                var myHabit= GetMyHibit(model.id, openId, model.appid);
                var completed= punchCardList.Exists(e => e.punch_card_date.Date.Subtract(DateTime.Now.Date).Days == 0);
                return new
                {
                    id = model.id,
                    title = model.title,
                    is_today_completed = punchCardList.Exists(e=>e.punch_card_date.Date.Subtract(DateTime.Now.Date).Days==0), /*今天是否完成*/
                    target= myHabit.target,
                    completed=myHabit.finish??0,
                    habitid=habitId
                };
            }
            return new { };
        }
        private List<Model.wx_habit_my_punch_card> GetMyPunchCardList(Model.wx_habit habit,string openId)
        {
            BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
            var list= bll.GetModelList("openid='"+openId+"' and appid='"+habit.appid+"' and habit_id="+habit.id);
            return list;
        }
        private int GetForeignKey(string json)
        {
            Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(json);
            var key= jobject["foreignKey"].ToString();
            return string.IsNullOrEmpty(key) ? 0 : int.Parse(key);
        }
        private Model.wx_habit_my GetMyHibit(int habitId,string openId,string appId)
        {
            var provide = new Habit.Provide.HabitMyProvide();
            if (provide.IsExist(habitId, openId, appId) == true)
            {
                return provide.GetHabitMy(openId, habitId, appId);
            }
            else {
                var model= provide.AddHabitMy(habitId, openId, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month), appId);
                return model;
            }
        }
        private int getClassId(int groupType)
        {
            Generalize.Helper.GroupListProvide provide = new Generalize.Helper.GroupListProvide();
            var list= provide.GetGroupList(groupType);
            var query = list.Where(e => e.is_act == 1);
            if (query.Count() > 0) {
                return query.First().id;
            }
            return 0;
        }
        private Model.WX_Course_Content GetCoursesContent(int  coursesId)
        {
            BLL.WX_Course_Content bll = new BLL.WX_Course_Content();
            var list= bll.GetModelList("courseId=" + coursesId);
            if (list.Count > 0) {
                return list.First();
            }
            return new Model.WX_Course_Content();
        }
    }
}