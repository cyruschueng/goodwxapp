using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using System.Text;

namespace SfSoft.web.Yuedu.Helper
{
    public class HomeProvide
    {
        private string _appId;
        private string _openId;
        public HomeProvide(string appId, string openId)
        {
            this._appId = appId;
            this._openId = openId;
        }
        public List<Models.Home.ReadFile> GetFile(string where, int pageSize, int pageIndex, string orderBy)
        {
            SfSoft.BLL.WX_Yuedu_File bll = new SfSoft.BLL.WX_Yuedu_File();
            DataSet ds = bll.GetList(pageSize, pageIndex, orderBy, where);
            List<Models.Home.ReadFile> lists = new List<Models.Home.ReadFile>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                Newtonsoft.Json.Linq.JObject AdminList = RightList();
                bool isRight = AdminList["admin"].Any(e => e.ToString() == _openId);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    var likes = GetLikes(_appId, dr.Field<int>("Id"));
                    var comments = GetComments(_appId, dr.Field<int>("Id"));
                    var player = GetPlayer(_appId, dr.Field<string>("OpenId"));
                    
                    lists.Add(new Models.Home.ReadFile()
                    {
                        Comment = dr.Field<string>("Comment"),
                        Comments = comments,
                        CommentNumber = dr.Field<int?>("CommentNumber") ?? 0,
                        IsTop = dr.Field<int?>("IsTop")??0,
                        LikeNumber = dr.Field<int?>("LikeNumber") ?? 0,
                        Likes = likes,
                        Medias = GetMedias(_appId, dr.Field<int>("Id")),
                        FileId = dr.Field<int>("Id"),
                        ReleaseTime = GetReleaseTime(dr.Field<DateTime>("CreateDate")),
                        WxUserInfo = GetWxUserInfo(dr.Field<string>("OpenId")),
                        IsLike = likes.Exists(e => e.OpenId == _openId),
                        Player = player,
                        IsRight = isRight,
                        FileType=dr.Field<int?>("FileType")??0,
                        IntervalDay = DateTime.Now.Date.Subtract(player.StartDate.Date).Days+1,
                        IsDelete = DateTime.Now.Date.Subtract(dr.Field<DateTime>("CreateDate").Date).Days == 0 && dr.Field<string>("OpenId") == _openId && dr.Field<string>("AppId") == _appId ? true : false
                    });
                }
                return lists;
            }
            else
            {
                return new List<Models.Home.ReadFile>();
            }
        }
        public Models.Home.ReadFile GetFile(int fileId)
        {
            SfSoft.BLL.WX_Yuedu_File bll = new SfSoft.BLL.WX_Yuedu_File();
            SfSoft.Model.WX_Yuedu_File model = bll.GetModel(fileId);
            if (model != null)
            {
                var likes = GetLikes(_appId, model.Id);
                var comments = GetComments(_appId, model.Id);
                var player = GetPlayer(_appId, model.OpenId);

                Models.Home.ReadFile playerTask = new Models.Home.ReadFile();
                playerTask.Comment = model.Comment;
                playerTask.CommentNumber = model.CommentNumber ?? 0;
                playerTask.Comments = comments;
                playerTask.IsLike = likes.Exists(e => e.OpenId == _openId);
                playerTask.IsTop = model.IsTop ?? 0;
                playerTask.LikeNumber = model.LikeNumber ?? 0;
                playerTask.Likes = likes;
                playerTask.Medias = GetMedias(_appId, model.Id);
                playerTask.Player = player;
                playerTask.FileId = model.Id;
                playerTask.ReleaseTime = GetReleaseTime(Convert.ToDateTime(model.CreateDate));
                playerTask.WxUserInfo = GetWxUserInfo(model.OpenId);
                playerTask.IntervalDay = player.StartDate.Date.Subtract(DateTime.Now.Date).Days;
                return playerTask;
            }
            else
            {
                return null;
            }
        }
        public static bool Delete(int fileId)
        {
            SfSoft.BLL.WX_Yuedu_File bll = new SfSoft.BLL.WX_Yuedu_File();
            string sql = "update WX_Yuedu_File set Status=0 where Id=" + fileId;
            int index = SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sql);
            return index > 0 ? true : false;
        }
        private Models.Home.WxUserInfo GetWxUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new SfSoft.BLL.WX_UserInfo();
            SfSoft.Model.WX_UserInfo model = bll.GetModel(openId);

            if (model != null)
            {
                Models.Home.WxUserInfo userInfo = new Models.Home.WxUserInfo();
                userInfo.City = model.City;
                userInfo.HeadImgUrl = model.HeadImgUrl;
                userInfo.NickName = model.NickName;
                userInfo.OpenId = model.OpenId;
                userInfo.Province = model.Province;
                return userInfo;
            }
            return new Models.Home.WxUserInfo();
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
        private List<Models.Home.Comment> GetComments(string appId, int readFileId)
        {
            SfSoft.BLL.WX_Yuedu_Comment bll = new SfSoft.BLL.WX_Yuedu_Comment();
            var lists = bll.GetModelList("AppId='" + appId + "' and ReadFileId=" + readFileId.ToString()).AsEnumerable();
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

        private List<Models.Home.Like> GetLikes(string appId, int readFileId)
        {
            SfSoft.BLL.WX_Yuedu_Like bll = new SfSoft.BLL.WX_Yuedu_Like();
            var lists = bll.GetModelList("AppId='" + appId + "' and  ReadFileId=" + readFileId.ToString()).AsEnumerable();
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
        private List<Models.Home.Media> GetMedias(string appId, int fileId)
        {
            SfSoft.BLL.WX_Yuedu_File_Data bll = new SfSoft.BLL.WX_Yuedu_File_Data();
            var medias = bll.GetModelList("AppId='" + appId + "' and ReadFileId=" + fileId);
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
            SfSoft.BLL.WX_Yuedu_User bll = new SfSoft.BLL.WX_Yuedu_User();
            SfSoft.Model.WX_Yuedu_User model = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").FirstOrDefault();
            if (model != null)
            {

                player.Age = (DateTime.Now.Year - (model.BorthDay ?? DateTime.Now).Year);
                player.PlayerType = "普通用户"; //Helper.Unify.GetPlayerTypeName(model.PlayerType ?? 0);
                player.StartDate = model.RegionDate ?? DateTime.Now;
                player.Sex = model.Sex;
            }
            return player;
        }
        private Newtonsoft.Json.Linq.JObject RightList()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/App/Project/Yuedu/SysData/admin.json");
            using (StreamReader sr = new StreamReader(path, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                return Newtonsoft.Json.Linq.JObject.Parse(json);
            }
        }
    }
}