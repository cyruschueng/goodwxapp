using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    /// <summary>
    /// 打卡
    /// </summary>
    public class PunchCard
    {
        /// <summary>
        /// 获取今天打卡数据
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        public Model.wx_habit_my_punch_card GetDayPunchCard(int habitId,string openId)
        {
            BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
            var list= bll.GetModelList("openid='" + openId + "' and  habit_id=" + habitId+ " and convert(nvarchar(10),punch_card_date,120)='" + DateTime.Now.ToString("yyyy-MM-dd")+"'");
            if (list.Count > 0) {
                return list.First<Model.wx_habit_my_punch_card>();
            }
            return null;
        }
        /// <summary>
        /// 打卡
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="habitId"></param>
        public string AddPunchCard(string openId, int habitId,int groupId)
        {
            try
            {
                var model = GetDayPunchCard(habitId, openId);
                if (model == null)
                {
                    BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
                    var entity = new Model.wx_habit_my_punch_card()
                    {
                        create_date = DateTime.Now,
                        habit_id = habitId,
                        openid = openId,
                        group_id=groupId,
                        punch_card_date = DateTime.Now
                    };
                    bll.Add(entity);
                    
                }
                return "success";
            }
            catch (Exception ex) {
                return "error";
            }
        }
        /// <summary>
        /// 上传图片后更新图片路径
        /// </summary>
        /// <param name="id"></param>
        /// <param name="url"></param>
        public void UpdateImage(int id, string url)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            var model = bll.GetModel(id);
            model.image_url = url;
            bll.Update(model);
        }
    }
}