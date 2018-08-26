using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Habit.Provide
{
    public class HabitsRecordProvide
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        public int AddDetail(int habitid, string openid, string notes, string appId)
        {
            try
            {
                var model = new Model.wx_habit_my_detail()
                {
                    create_date = DateTime.Now,
                    habit_id = habitid,
                    notes = notes,
                    openid = openid,
                    appid=appId,
                    finish = FinishDay(habitid, openid,appId)
                };
                BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
                return bll.Add(model);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="detailId"></param>
        /// <returns></returns>
        public Model.wx_habit_my_detail GetDetail(int detailId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetModel(detailId);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="habitid"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public List<Model.wx_habit_my_detail> GetDetail(int habitid, string openId,string appId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetModelList("openid='" + openId + "' and habit_id=" + habitid+" and appid='"+appId+"'");
        }
        /// <summary>
        /// 推荐
        /// </summary>
        /// <param name="habitid"></param>
        public List<Model.wx_habit_my_detail> GetDetailByRecommend(int habitid)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetModelList("habit_id='" + habitid + "' and is_recommend=1");
        }
        /// <summary>
        /// 置顶
        /// </summary>
        /// <param name="habitid"></param>
        public Model.wx_habit_my_detail SetTopDetail(int detailId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            var model = bll.GetModel(detailId);
            model.is_top = 1;
            return model;
        }
        private int FinishDay(int habitId, string openId,string appId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "' and appid='"+appId+"'");
            if (list.Count > 0)
            {
                var model = list.First<Model.wx_habit_my>();
                var day = DateTime.Now.Date.Subtract(model.start_date.Date).Days;
                return day == 0 ? 1 : day;
            }
            return 1;
        }

        /// <summary>
        /// 获取今天打卡数据
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        public Model.wx_habit_my_punch_card GetDayPunchCard(int habitId, string openId,string appId)
        {
            BLL.wx_habit_my_punch_card bll = new BLL.wx_habit_my_punch_card();
            var list = bll.GetModelList("appid='"+ appId + "' and  openid='" + openId + "' and  habit_id=" + habitId + " and convert(nvarchar(10),punch_card_date,120)='" + DateTime.Now.ToString("yyyy-MM-dd") + "'");
            if (list.Count > 0)
            {
                return list.First<Model.wx_habit_my_punch_card>();
            }
            return null;
        }
        /// <summary>
        /// 打卡
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="habitId"></param>
        public void AddPunchCard(string openId, int habitId, string appId)
        {
            var model = GetDayPunchCard(habitId, openId, appId);
            if (model == null)
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