using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class MyDetail
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        public int AddDetail(int habitid,string openid,string notes,int groupId)
        {
            try
            {
                var model = new Model.wx_habit_my_detail()
                {
                    create_date = DateTime.Now,
                    habit_id = habitid,
                    notes = notes,
                    openid = openid,
                    group_id= groupId,
                    finish = FinishDay(habitid, openid)
                };
                BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
                return bll.Add(model);
            }
            catch (Exception ex) {
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
        public List<Model.wx_habit_my_detail> GetDetail(int habitid, string openId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetModelList("openid='"+openId+ "' and habit_id="+habitid);
        }
        /// <summary>
        /// 推荐
        /// </summary>
        /// <param name="habitid"></param>
        public List<Model.wx_habit_my_detail> GetDetailByRecommend(int habitid)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetModelList("habit_id='"+habitid+"' and is_recommend=1");
        }
        /// <summary>
        /// 置顶
        /// </summary>
        /// <param name="habitid"></param>
        public Model.wx_habit_my_detail SetTopDetail(int detailId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            var model= bll.GetModel(detailId);
            model.is_top = 1;
            return model;
        }
        public int FinishDay(int habitId,string openId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list= bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "'");
            if (list.Count > 0) {
                var model = list.First<Model.wx_habit_my>();
                var day = DateTime.Now.Subtract(model.start_date).Days;
                return day == 0 ? 1 : day;
            }
            return 1;
        }
    }
}