using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Habit.Provide
{
    public class HabitsProvide
    {
        public List<Model.wx_habit> GetHabits(string appId)
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            return bll.GetModelList("appid='" + appId + "'");
        }
        /// <summary>
        /// 获取习惯,已格式化一行两列
        /// </summary>
        /// <param name="appId"></param>
        /// <returns></returns>
        public List<dynamic> GetFormatHabits(string appId)
        {
            var list = GetHabits(appId);
            List<dynamic> row = new List<dynamic>();
            for (var i = 0; i < list.Count; i = i + 2)
            {
                try
                {
                    var m = list.GetRange(i, 2);
                    var query = OutHabit(m);
                    row.Add(query);
                }
                catch (ArgumentException ex)
                {
                    var m = list.GetRange(i, 1);
                    m.Add(new Model.wx_habit());
                    var query = OutHabit(m);
                    row.Add(query);
                }
            }
            return row;
        }
        /// <summary>
        /// 获取习惯,已格式化一行两列
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="classify"></param>
        /// <returns></returns>
        public List<dynamic> GetFormatHabits(string appId, int classify)
        {
            var list = GetHabitsByClassify(appId, classify);
            List<dynamic> row = new List<dynamic>();
            for (var i = 0; i < list.Count; i = i + 2)
            {
                try
                {
                    var m = list.GetRange(i, 2);
                    var query = OutHabit(m);
                    row.Add(query);
                }
                catch (ArgumentException ex)
                {
                    var m = list.GetRange(i, 1);
                    m.Add(new Model.wx_habit());
                    var query = OutHabit(m);
                    row.Add(query);
                }
            }
            return row;
        }
        public Model.wx_habit GetHabit(int habitId)
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            var model = bll.GetModel(habitId);
            if (model != null)
            {
                return model;
            }
            return new Model.wx_habit();
        }
        public List<Model.wx_habit> GetHabitsByClassify(string appId, int habit_classify)
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            return bll.GetModelList("habit_classify=" + habit_classify+" and appid='"+ appId + "'");
        }
        public List<dynamic> OutHabit(List<Model.wx_habit> list)
        {
            var website = Helper.Url.Host(false);
            var query = from x in list
                        select new { id = x.id, title = x.title, imgurl = website + x.imgurl, join_num = x.join_num };
            return query.ToList<dynamic>();
        }
        public void UpdateJoinNum(int habitId)
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            var model = bll.GetModel(habitId);
            if (model != null)
            {
                model.join_num = (model.join_num ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}