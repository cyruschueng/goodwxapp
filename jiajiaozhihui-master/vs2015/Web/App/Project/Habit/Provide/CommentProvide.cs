using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Habit.Provide
{
    public class CommentProvide
    {
        /// <summary>
        /// 添加评论
        /// </summary>
        /// <param name="comment"></param>
        /// <param name="detailId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public int AddComment(string comment, int detailId, string openId, int habitId,string appId)
        {
            var model = new Model.wx_habit_comment()
            {
                comment = comment,
                create_date = DateTime.Now,
                habit_detail_id = detailId,
                openid = openId,
                comment_openid = "",
                habit_id = habitId,
                appid= appId,
                is_act = 1
            };
            BLL.wx_habit_comment bll = new BLL.wx_habit_comment();
            return bll.Add(model);
        }
        /// <summary>
        /// 回复评论
        /// </summary>
        /// <param name="comment"></param>
        /// <param name="detailId"></param>
        /// <param name="commentId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public int RePlyComment(string comment, int detailId, int commentId, string openId, int habitId,string appId)
        {
            BLL.wx_habit_comment bll = new BLL.wx_habit_comment();
            var model = bll.GetModel(commentId);
            if (model != null)
            {
                var item = new Model.wx_habit_comment()
                {
                    comment = comment,
                    create_date = DateTime.Now,
                    habit_detail_id = detailId,
                    openid = model.openid,
                    comment_openid = openId,
                    habit_id = habitId,
                    appid= appId,
                    is_act = 1
                };
                return bll.Add(item);
            }
            return 0;
        }
    }
}