using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using System.Data;

namespace SfSoft.web.ZXS.Helper
{
    public class ZxsHomeProvide
    {
        private string _appId;
        private string _openId;
        public ZxsHomeProvide(string appId, string openId)
        {
            this._appId = appId;
            this._openId = openId;
        }
        public List<Models.Home.PlayerTask> GetTaks(string where, int pageSize, int pageIndex, string orderBy)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            DataSet ds = bll.GetList(pageSize, pageIndex, orderBy, where);
            List<Models.Home.PlayerTask> lists = new List<Models.Home.PlayerTask>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                IEnumerable<SfSoft.Model.WX_ZXS_Theme> Themes = GetThemes(_appId);
                Newtonsoft.Json.Linq.JObject AdminList = RightList();
                bool isRight = AdminList["admin"].Any(e => e.ToString() == _openId);
                var baseTaskList = GetBaseTaskList();
                var weekTaskList = GetWeekTaskList();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    var likes = GetLikes(_appId, dr.Field<int>("Id"));
                    var comments = GetComments(_appId, dr.Field<int>("Id"));
                    var weekTask = weekTaskList.FirstOrDefault(e => e.Id == dr.Field<int>("TaskId"));
                    var baseTask = baseTaskList.FirstOrDefault(e => e.Id == weekTask.TaskId);
                    var player = GetPlayer(_appId, dr.Field<string>("OpenId"));
                    var them = Themes.FirstOrDefault(e => e.Id == dr.Field<int>("ThemeId"));
                    lists.Add(new Models.Home.PlayerTask()
                    {
                        Comment = dr.Field<string>("Comment"),
                        Comments = comments,
                        CommentNumber = dr.Field<int?>("CommentNumber") ?? 0,
                        IsTop = dr.Field<int>("IsTop"),
                        LikeNumber = dr.Field<int?>("LikeNumber") ?? 0,
                        Likes = likes,
                        Medias = GetMedias(_appId, dr.Field<int>("Id")),
                        PlayerTaskId = dr.Field<int>("Id"),
                        ReleaseTime = GetReleaseTime(dr.Field<DateTime>("CreateDate")),
                        TaskId = dr.Field<int>("TaskId"),
                        ThemeId = dr.Field<int>("ThemeId"),
                        ThemeName = Themes.FirstOrDefault(e => e.Id == dr.Field<int>("ThemeId")).Title,
                        Week = dr.Field<int>("Week"),
                        UserInfo = GetUserInfo(dr.Field<string>("OpenId")),
                        IsLike = likes.Exists(e => e.OpenId == _openId),
                        Player = player,
                        IsRight = isRight,
                        TaskContent = baseTask.Remark,
                        TaskSn = them.Sn ?? 1,
                        IntervalDay = DateTime.Now.Date.Subtract(player.StartDate.Date).Days,
                        IsDelete = DateTime.Now.Date.Subtract(dr.Field<DateTime>("CreateDate").Date).Days == 0 && dr.Field<string>("OpenId") == _openId && dr.Field<string>("AppId") == _appId ? true : false
                    });
                }
                return lists;
            }
            else
            {
                return new List<Models.Home.PlayerTask>();
            }
        }
        public Models.Home.PlayerTask GetTask(int fileId)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            SfSoft.Model.WX_ZXS_PlayerTask model = bll.GetModel(fileId);
            if (model != null)
            {
                IEnumerable<SfSoft.Model.WX_ZXS_Theme> Themes = GetThemes(_appId);
                var likes = GetLikes(_appId, model.Id);
                var comments = GetComments(_appId, model.Id);
                var weekTask = GetWeekTask(model.TaskId ?? 0);
                var baseTask = GetBaseTask(weekTask.TaskId ?? 0);
                var player = GetPlayer(_appId, model.OpenId);
                var them = Themes.FirstOrDefault(e => e.Id == model.ThemeId);

                Models.Home.PlayerTask playerTask = new Models.Home.PlayerTask();
                playerTask.Comment = model.Comment;
                playerTask.CommentNumber = model.CommentNumber ?? 0;
                playerTask.Comments = comments;
                playerTask.IsLike = likes.Exists(e => e.OpenId == _openId);
                playerTask.IsTop = model.IsTop ?? 0;
                playerTask.LikeNumber = model.LikeNumber ?? 0;
                playerTask.Likes = likes;
                playerTask.Medias = GetMedias(_appId, model.Id);
                playerTask.Player = player;
                playerTask.PlayerTaskId = model.Id;
                playerTask.ReleaseTime = GetReleaseTime(Convert.ToDateTime(model.CreateDate));
                playerTask.TaskId = model.TaskId ?? 0;
                playerTask.ThemeId = model.TaskId ?? 0;
                playerTask.ThemeName = them.Title;
                playerTask.UserInfo = GetUserInfo(model.OpenId);
                playerTask.Week = model.Week ?? 0;
                playerTask.TaskContent = baseTask.Remark;
                playerTask.TaskSn = them.Sn ?? 1;
                playerTask.IntervalDay = player.StartDate.Date.Subtract(DateTime.Now.Date).Days;
                return playerTask;
            }
            else
            {
                return null;
            }
        }
        public static bool Delete(int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_PlayerTask bll = new SfSoft.BLL.WX_ZXS_PlayerTask();
            string sql = "update WX_ZXS_PlayerTask set Status=0 where Id=" + playerTaskId;
            int index = SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sql);
            return index > 0 ? true : false;
        }
        private Models.Home.UserInfo GetUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            SfSoft.Model.WX_UserInfo model = bll.GetModel(openId);

            if (model != null)
            {
                Models.Home.UserInfo userInfo = new Models.Home.UserInfo();
                userInfo.City = model.City;
                userInfo.HeadImgUrl = model.HeadImgUrl;
                userInfo.NickName = model.NickName;
                userInfo.OpenId = model.OpenId;
                userInfo.Province = model.Province;
                return userInfo;
            }
            return new Models.Home.UserInfo();
        }
        private IEnumerable<SfSoft.Model.WX_ZXS_Theme> GetThemes(string appId)
        {
            SfSoft.BLL.WX_ZXS_Theme bll = new SfSoft.BLL.WX_ZXS_Theme();
            return bll.GetModelList("AppId='" + appId + "'").AsEnumerable();
        }
        private string GetReleaseTime(DateTime dateTime)
        {
            var timeSpan = DateTime.Now.Subtract(dateTime);
            if (timeSpan.Days >= 2)
            {
                return Convert.ToInt32(timeSpan.TotalDays) + "天前";
            }
            else if (timeSpan.Days == 1)
            {
                return "昨天";
            }
            else
            {
                if (timeSpan.Hours >= 1 && timeSpan.Hours < 24)
                {
                    return Convert.ToInt32(timeSpan.Hours) + "小时前";
                }
                else if (timeSpan.Minutes > 0 && timeSpan.Minutes < 60)
                {
                    return Convert.ToInt32(timeSpan.Minutes) + "分钟前";
                }
                return "1分钟前";
            }
        }
        private List<Models.Home.Comment> GetComments(string appId, int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_Comment bll = new SfSoft.BLL.WX_ZXS_Comment();
            var lists = bll.GetModelList("AppId='" + appId + "' and PlayerTaskId=" + playerTaskId.ToString()).AsEnumerable();
            List<Models.Home.Comment> comments = new List<Models.Home.Comment>();
            foreach (var list in lists)
            {
                comments.Add(new Models.Home.Comment()
                {
                    NickName = list.NickName,
                    HeadImgUrl = list.HeadImgUrl,
                    Details = list.Details
                });
            }
            return comments;
        }

        private List<Models.Home.Like> GetLikes(string appId, int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_Like bll = new SfSoft.BLL.WX_ZXS_Like();
            var lists = bll.GetModelList("AppId='" + appId + "' and  PlayerTaskId=" + playerTaskId.ToString()).AsEnumerable();
            List<Models.Home.Like> liks = new List<Models.Home.Like>();
            foreach (var list in lists)
            {
                liks.Add(new Models.Home.Like()
                {
                    NickName = list.NickName,
                    HeadImgUrl = list.HeadImgUrl,
                    OpenId = list.OpenId
                });
            }
            return liks;
        }
        private List<Models.Home.Media> GetMedias(string appId, int playerTaskId)
        {
            SfSoft.BLL.WX_ZXS_MediaData bll = new SfSoft.BLL.WX_ZXS_MediaData();
            var medias = bll.GetModelList("AppId='" + appId + "' and PlayerTaskId=" + playerTaskId);
            List<Models.Home.Media> lists = new List<Models.Home.Media>();
            foreach (var media in medias)
            {
                lists.Add(new Models.Home.Media()
                {
                    MediaType = Convert.ToInt32(media.UrlType),
                    MediaUrl = string.IsNullOrEmpty(media.CloudUrl) == true ? media.TemporaryUrl : media.CloudUrl
                });
            }
            return lists;
        }
        private Models.Home.Player GetPlayer(string appId, string openId)
        {
            Models.Home.Player player = new Models.Home.Player();
            SfSoft.BLL.WX_ZXS_Players bll = new SfSoft.BLL.WX_ZXS_Players();
            SfSoft.Model.WX_ZXS_Players model = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").FirstOrDefault();
            if (model != null)
            {

                player.Age = (DateTime.Now.Year - (model.BorthDay ?? DateTime.Now).Year);
                player.PlayerType = Helper.Unify.GetPlayerTypeName(model.PlayerType ?? 0);
                player.StartDate = model.StartDate ?? DateTime.Now;
                player.Sex = model.Sex;
            }
            return player;
        }
        private Newtonsoft.Json.Linq.JObject RightList()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/App/Project/ZXS/SysData/admin.json");
            using (StreamReader sr = new StreamReader(path, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                return Newtonsoft.Json.Linq.JObject.Parse(json);
            }
        }
        private List<SfSoft.Model.WX_ZXS_WeekTask> GetWeekTaskList()
        {
            SfSoft.BLL.WX_ZXS_WeekTask bll = new SfSoft.BLL.WX_ZXS_WeekTask();
            return bll.GetModelList("");
        }
        private List<SfSoft.Model.WX_ZXS_Task> GetBaseTaskList()
        {
            SfSoft.BLL.WX_ZXS_Task bll = new SfSoft.BLL.WX_ZXS_Task();
            return bll.GetModelList("");
        }
        private SfSoft.Model.WX_ZXS_WeekTask GetWeekTask(int taskId)
        {
            SfSoft.BLL.WX_ZXS_WeekTask bll = new SfSoft.BLL.WX_ZXS_WeekTask();
            return bll.GetModel(taskId);
        }
        private SfSoft.Model.WX_ZXS_Task GetBaseTask(int taskId)
        {
            SfSoft.BLL.WX_ZXS_Task bll = new SfSoft.BLL.WX_ZXS_Task();
            return bll.GetModel(taskId);
        }
    }
}