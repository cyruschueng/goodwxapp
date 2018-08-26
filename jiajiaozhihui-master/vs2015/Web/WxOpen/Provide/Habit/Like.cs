using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class Like
    {
        /// <summary>
        /// 获取点赞信息
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public Model.wx_habit_like GetHabit(int detailId,string openId)
        {
            BLL.wx_habit_like bll = new BLL.wx_habit_like();
            var list= bll.GetModelList("habit_detail_id=" + detailId + " and like_openid='" + openId + "'");
            if (list.Count > 0) {
                return list.First<Model.wx_habit_like>();
            }
            return null;
        }
        /// <summary>
        /// 获取点赞信息 
        /// 
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="top">显示前几个</param>
        /// <returns></returns>
        public List<Model.wx_habit_like> GetHabit(int detailId, int top=8)
        {
            BLL.wx_habit_like bll = new BLL.wx_habit_like();
            string where = "habit_detail_id=" + detailId;
            var list = bll.GetModelList(where).OrderByDescending(e=>e.create_date).Take<Model.wx_habit_like>(top);
            return list.ToList<Model.wx_habit_like>();
        }
        /// <summary>
        /// 获取点赞信息 
        /// 
        /// </summary>
        /// <param name="habitId"></param>
        /// <returns></returns>
        public List<Model.wx_habit_like> GetHabit(int detailId)
        {
            BLL.wx_habit_like bll = new BLL.wx_habit_like();
            string where = "habit_detail_id=" + detailId;
            var list = bll.GetModelList(where);
            return list;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        public int AddLike(int habitId,string openId,int detailId,int groupId)
        {
            var model = new Model.wx_habit_like()
            {
                create_date = DateTime.Now,
                habit_detail_id = detailId,
                habit_id=habitId,
                is_act=1,
                group_id= groupId,
                like_openid =openId
            };
            BLL.wx_habit_like bll = new BLL.wx_habit_like();
            return bll.Add(model);
        }
        /// <summary>
        /// 是否存在
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public bool Exist(int detailId, string openId)
        {
            BLL.wx_habit_like bll = new BLL.wx_habit_like();
            var list = bll.GetModelList("habit_detail_id=" + detailId + " and like_openid='" + openId + "'");
            return list.Count > 0 ? true : false;
        }
        /// <summary>
        /// 取消点赞（删除）
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public bool Delete(int detailId, string openId)
        {
            BLL.wx_habit_like bll = new BLL.wx_habit_like();
            var list = bll.GetModelList("habit_detail_id=" + detailId + " and like_openid='" + openId + "'");
            if (list.Count > 0) {
                var model = list.First();
                return bll.Delete(model.id);
            }
            return false;
        }
    }
}