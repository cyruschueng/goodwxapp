using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class HabitMy
    {
        public Model.wx_habit_my GetHabitMy(string openId, int habitId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list= bll.GetModelList("openid='" + openId + "' and habit_id=" + habitId);
            if (list.Count > 0) {
                return list.First<Model.wx_habit_my>();
            }
            return null;
        }
        /// <summary>
        /// 填加个人习惯设置
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <param name="target"></param>
        /// <returns></returns>
        public Model.wx_habit_my AddHabitMy(int habitId,string openId,int target)
        {
            var model = new Model.wx_habit_my()
            {
                alarm_clock_on = 1,
                alarm_weeks = "1,2,3,4,5,6,7",
                alarm_time = "9:00",
                create_date = DateTime.Now,
                finish = 0,
                habit_id = habitId,
                is_act = 1,
                is_recommend = 0,
                is_top = 0,
                openid = openId,
                start_date = DateTime.Now,
                target = target
            };
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            bll.Add(model);
            return model;
        }
        /// <summary>
        /// 是否存在
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public bool IsExist(int habitId, string openId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("openid='" + openId + "' and habit_id=" + habitId);
            return list.Count > 0 ? true : false;
        }
        /// <summary>
        /// 更新个人习惯设置 
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <param name="target"></param>
        public void UpdateHabitMy(int habitId, string openId, int target)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("openid='" + openId + "' and habit_id=" + habitId);
            if (list.Count > 0) {
                var model = list.First();
                model.target = target;
                bll.Update(model);
            }
        }
        /// <summary>
        /// 是否重新开始计算习惯养成时间
        /// </summary>
        /// <returns></returns>
        public bool IsRestart(int habitId,string openId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list= bll.GetModelList("habit_id="+habitId+" and openid='"+openId+"'");
            if (list.Count > 0) {
                var model= list.First<Model.wx_habit_my>();
                HabitDetail provide = new HabitDetail();
                /*实际坚持数据*/
                var continueDay= provide.ContinueDay(habitId, openId, model.start_date);
                /*目标天数*/
                var targetDay = DateTime.Now.Subtract(model.start_date).Days;
                return continueDay >= targetDay ? false : true;
            }
            return true;
        }
        public void UpdateStartDate(int habitId, string openId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "'");
            if (list.Count > 0) {
                var model = list.First<Model.wx_habit_my>();
                model.start_date = DateTime.Now;
                bll.Update(model);
            }
        }
        public List<Model.wx_habit_my> GetMyHabitList(string openId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("openid='" + openId + "'");
            return list;
        }
        /// <summary>
        /// 更新打卡次
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        public void UpdatePunchCardNum(int habitId,string openId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "'");
            if (list.Count > 0) {
                var model = list.First();
                model.finish = (model.finish ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}