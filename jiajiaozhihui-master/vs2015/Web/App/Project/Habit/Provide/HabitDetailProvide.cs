using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SfSoft.web.Habit.Provide
{
    public class HabitDetailProvide
    {
        public List<dynamic> GetHabitDetail(string strWhere, string orderby, int startIndex, int endIndex, string openId, int habitId,string appId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            var ds = bll.GetListByPage(strWhere, orderby, startIndex, endIndex);
            List<dynamic> list = new List<dynamic>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                LikeProvide likeProvide = new LikeProvide();
                var habitList = new HabitsProvide().GetHabits(appId);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    var userInfo = User.Helper.LocaltionUser.GetUserInfo(dr.Field<string>("openid"));
                    var likes = likeProvide.GetHabit(dr.Field<int>("id"));
                    var myHabit = GetMyHabit(habitId, openId,appId);
                    list.Add(new
                    {
                        id = dr.Field<int>("Id"),
                        headImgUrl = userInfo.HeadImgUrl,
                        habitId = dr.Field<int>("habit_id"),
                        nickName = userInfo.NickName,
                        createDate = string.Format("{0:yyyy年MM月dd日}", dr.Field<DateTime>("create_date")),
                        message = dr.Field<string>("notes"),
                        like = new
                        {
                            isLike = likes.Exists(e => e.like_openid == openId),
                            list = GetLikeList(dr.Field<int>("Id"))
                        },
                        target = new
                        {
                            aim = myHabit.target,
                            finish = dr.Field<int>("finish"),
                            image = FormatUrl(dr.Field<string>("image_url")),
                            title = habitList.Find(e => e.id == habitId).title
                        },
                        comment = GetCommentList(dr.Field<int>("Id"))
                    });
                }
            }
            return list;
        }
        public List<dynamic> GetHabitDetail(string strWhere, string orderby, int startIndex, int endIndex, string openId,string appId)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            var ds = bll.GetListByPage(strWhere, orderby, startIndex, endIndex);
            List<dynamic> list = new List<dynamic>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                LikeProvide likeProvide = new LikeProvide();
                var habitList = new HabitsProvide().GetHabits(appId);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    //var myHabit = GetMyHabit(dr.Field<int>("habit_id"), openId,appId);
                    var myHabit = GetMyHabit(dr.Field<int>("habit_id"), dr.Field<string>("openid"), appId);
                    var userInfo = User.Helper.LocaltionUser.GetUserInfo(dr.Field<string>("openid"));
                    var likes = likeProvide.GetHabit(dr.Field<int>("id"));
                    list.Add(new
                    {
                        id = dr.Field<int>("Id"),
                        headImgUrl = userInfo.HeadImgUrl,
                        habitId = dr.Field<int>("habit_id"),
                        nickName = userInfo.NickName,
                        createDate = string.Format("{0:yyyy年MM月dd日}", dr.Field<DateTime>("create_date")),
                        message = dr.Field<string>("notes"),
                        like = new
                        {
                            isLike = likes.Exists(e => e.like_openid == openId),
                            list = GetLikeList(dr.Field<int>("Id"))
                        },
                        target = new
                        {
                            aim = myHabit.target,
                            finish = dr.Field<int>("finish"),
                            image = FormatUrl(dr.Field<string>("image_url")),
                            title = habitList.Find(e => e.id == dr.Field<int>("habit_id")).title
                        },
                        comment = GetCommentList(dr.Field<int>("Id"))
                    });
                }
            }
            return list;
        }
        private List<string> GetLikeList(int detailId)
        {
            string sql = "";
            sql = "select b.headImgUrl from (select * from wx_habit_like where habit_detail_id=" + detailId + ") a" +
                " left join WX_UserInfo b on a.like_openid=b.openid";

            var ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            List<string> list = new List<string>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    list.Add(dr.Field<string>("headImgUrl"));
                }
            }
            return list;
        }
        private List<dynamic> GetCommentList(int detailId)
        {
            string sql = "";
            sql = "select a.id, isnull(b.nickName,'') as observer ,isnull(c.nickName,'') as replier,a.comment from (select * from dbo.wx_habit_comment where habit_detail_id=" + detailId + ") a" +
                " left join WX_UserInfo b on a.openid=b.openid" +
                " left join WX_UserInfo c on a.comment_openid=c.openid";

            var ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            List<dynamic> list = new List<dynamic>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    var replier = dr.Field<string>("replier");
                    var observer = dr.Field<string>("observer");
                    list.Add(new
                    {
                        id = dr.Field<int>("id"),
                        name = string.IsNullOrEmpty(replier) == true ? observer : replier + " 回复 " + observer,
                        message = dr.Field<string>("comment")
                    });
                }
            }
            return list;
        }
        private string FormatUrl(string path)
        {
            if (string.IsNullOrEmpty(path)) return path;

            if (path.StartsWith("http://") || path.StartsWith("https://"))
            {
                return path;
            }
            else
            {
                var domain = App.Helper.WxBaseConfig.ServerUrl;
                if (domain.EndsWith("/"))
                {
                    domain = domain.Substring(0, domain.Length - 1);
                }
                return domain + path;
            }
        }
        /// <summary>
        /// 坚持天数
        /// </summary>
        /// <param name="habitId"></param>
        /// <param name="openId"></param>
        /// <param name="startDate">开始计算时间</param>
        /// <returns></returns>
        public int ContinueDay(int habitId, string openId, DateTime startDate)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            HashSet<string> set = new HashSet<string>();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "' and  datediff(day,'" + startDate.ToString() + "',create_date)>=0");
            foreach (var m in list)
            {
                set.Add(string.Format("{0:yyyy-MM-dd}", m.create_date));
            }
            return set.Count;
        }

        private Model.wx_habit_my GetMyHabit(int habitId, string openId,string appId)
        {
            BLL.wx_habit_my bll = new BLL.wx_habit_my();
            var list = bll.GetModelList("habit_id=" + habitId + " and openid='" + openId + "' and appid='"+ appId + "'");
            if (list.Count > 0)
            {
                return list.First<Model.wx_habit_my>();
            }
            return new Model.wx_habit_my();
        }
        /// <summary>
        /// 获取分页总条数
        /// </summary>
        /// <param name="habit"></param>
        /// <returns></returns>
        public int GetPageTotal(int habit)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetRecordCount("habit_id=" + habit);
        }
        /// <summary>
        /// 获取分页总条数
        /// </summary>
        /// <returns></returns>
        public int GetPageTotal()
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            return bll.GetRecordCount("");
        }
        public int GetPageTotal(string where)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();
            
            return bll.GetRecordCount(where);
        }
        public int GetMaxId(string where)
        {
            BLL.wx_habit_my_detail bll = new BLL.wx_habit_my_detail();

            var list= bll.GetModelList(where);
            return list.Max(e => e.id);
        }
    }
}