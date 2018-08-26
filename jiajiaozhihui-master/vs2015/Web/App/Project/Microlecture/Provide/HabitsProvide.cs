using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class HabitsProvide
    {
        public Task UpdateSignNumAnsy(int habitId, string openId, string appId)
        {
            return Task.Run(() => {
                UpdateSignNum(habitId, openId, appId);
            });
        }
        /// <summary>
        /// 更新打卡次
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        public void UpdateSignNum(int habitId, string openId, string appId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "' and appid='" + appId + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                model.finish = (model.finish ?? 0) + 1;
                bll.Update(model);
            }
        }
        public bool ExistHabitByUser(int habitId, string openId, string appId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "' and appid='" + appId + "'");
            return list.Count > 0 ? true : false;
        }
        /// <summary>
        /// 填加个人习惯设置
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <param name="target"></param>
        /// <returns></returns>
        public Model.wx_habit_my AddHabitMy(int habitId, string openId, int target, string appId)
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
                target = target,
                appid = appId
            };
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            bll.Add(model);
            return model;
        }
    }
}