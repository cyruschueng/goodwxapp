using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gardenia.Helper
{
    public class Task2Provide
    {
        public dynamic GetTask(string openId)
        {
            BLL.wx_gardenia_user userBll = new BLL.wx_gardenia_user();
            var userList = userBll.GetModelList("openid='" + openId + "'");
            if (userList.Count > 0)
            {
                var user = userList.First();
                BLL.wx_gardenia_task bll = new BLL.wx_gardenia_task();
                var list = bll.GetModelList("class_id=" + user.class_id + " and is_act=1");
                return GetEveryDayData(list);
            }
            throw new Exception() ;
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
                var model = audioBll.GetModel(id);
                tasks.Add(new
                {
                    id = model.Id,
                    title = model.FullName,
                    source = model.SoundSource,
                    cover= FormatSrc(model.Cover),
                    startUp = m.startup
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
                foreach (var m in dataList) {
                    var id = GetForeignKey(m.data);
                    var model = bll.GetModel(id);
                    values.Add(new
                    {
                        id = model.Id,
                        title = model.FullName,
                        source = model.SoundSource,
                        cover = FormatSrc( model.Cover)
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
    }
}