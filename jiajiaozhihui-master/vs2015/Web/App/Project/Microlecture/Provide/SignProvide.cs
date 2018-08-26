using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class SignProvide
    {
        /// <summary>
        /// 获取今天打卡数据
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        public List<string> GetSign(int habitId, string openId, string appId)
        {
            BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
            List<string> results = new List<string>();
            var list = bll.GetModelList("appid='" + appId + "' and  openid='" + openId + "' and  habit_id=" + habitId + " and convert(nvarchar(4),punch_card_date,120)='" + DateTime.Now.Year + "'");
            if (list.Count > 0)
            {
                foreach (var m in list) {
                    results.Add(string.Format("{0:yyyy-MM-dd}", m.punch_card_date));
                }
            }
            return results;
        }
        /// <summary>
        /// 打卡
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="habitId"></param>
        public void AddSign(string openId, int habitId, string appId)
        {
            var list = GetSign(habitId, openId, appId);
            if (! list.Exists(e=>e==string.Format("{0:yyyy-MM-dd}",DateTime.Now) ))
            {
                BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
                var entity = new Model.wx_habit_my_punch_card()
                {
                    create_date = DateTime.Now,
                    habit_id = habitId,
                    openid = openId,
                    appid = appId,
                    punch_card_date = DateTime.Now
                };
                bll.Add(entity);
            }
        }
    }
}