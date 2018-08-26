using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class Habit
    {
        public List<Model.wx_habit> GetHabits()
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            return bll.GetModelList("");
        }
        public Model.wx_habit GetHabit(int habitId)
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            var model= bll.GetModel(habitId);
            if (model != null) {
                return model;
            }
            return new Model.wx_habit();
        }
        public List<Model.wx_habit> GetHabitsByClassify(int habit_classify)
        {
            BLL.wx_habit bll = new BLL.wx_habit();
            return bll.GetModelList("habit_classify="+habit_classify);
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
            var model= bll.GetModel(habitId);
            if (model != null) {
                model.join_num = (model.join_num ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}