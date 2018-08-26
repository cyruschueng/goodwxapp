using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using System.Text;

namespace SfSoft.web.QA.Helper
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
        public Models.Home.PageData GetFile(string where, int pageSize, int pageIndex, string orderBy)
        {
            SfSoft.BLL.WX_QA_File bll = new SfSoft.BLL.WX_QA_File();
            DataSet ds = bll.GetList(pageSize, pageIndex, orderBy, where);
            Models.Home.PageData pageDate = new Models.Home.PageData();
            List<Models.Home.UserFile> lists = new List<Models.Home.UserFile>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                Newtonsoft.Json.Linq.JObject AdminList = RightList();
                bool isRight = AdminList["admin"].Any(e => e.ToString()== _openId);
                var experts = Helper.ExpertProvide.GetExperts();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    var likes = GetLikes(_appId, dr.Field<int>("Id"));
                    var comment = GetComment(_appId, dr.Field<int>("Id"), experts);
                    var player = GetPlayer(_appId, dr.Field<string>("OpenId"));

                    lists.Add(new Models.Home.UserFile()
                    {
                        Content = dr.Field<string>("Comment"),
                        Title=dr.Field<string>("Title"),
                        IsLike=likes.Exists(e=>e.OpenId== _openId),
                        Likes = likes,
                        Comment = comment,
                        CommentNumber = dr.Field<int?>("CommentNumber") ?? 0,
                        LikeNumber = dr.Field<int?>("LikeNumber") ?? 0,
                        BrowseNumber=dr.Field<int?>("BrowseNumber")??0,
                        IsTop = dr.Field<int?>("IsTop") ?? 0,
                        Medias = GetMedias(_appId, dr.Field<int>("Id")),
                        FileId = dr.Field<int>("Id"),
                        ReleaseTime = GetReleaseTime(dr.Field<DateTime>("CreateDate")),
                        WxUserInfo = GetWxUserInfo(dr.Field<string>("OpenId")),
                        Player = player,
                        IsRight = isRight,
                        FileType = dr.Field<int?>("FileType") ?? 0,
                        IsDelete =IsDel(dr.Field<string>("OpenId"),dr.Field<string>("AppId"),isRight),
                        IsBlack=isRight,
                        Vip = Helper.VipProvide.IsVip(dr.Field<string>("OpenId"))
                    });
                }
                pageDate.UserFileList = lists;
                pageSize = pageSize == 0 ? 10 : pageSize;
                var count = bll.GetRecordCount(where);
                var n = count / pageSize;
                var j = count % pageSize;
                pageDate.PageTotal = n + (j > 0 ? 1 : 0);
                return pageDate;
            }
            else
            {
                return new Models.Home.PageData();
            }
        }
        public Models.Home.UserFile GetFile(int fileId)
        {
            SfSoft.BLL.WX_QA_File bll = new SfSoft.BLL.WX_QA_File();
            SfSoft.Model.WX_QA_File model = bll.GetModel(fileId);
            if (model != null)
            {
                try
                {

                    var experts = Helper.ExpertProvide.GetExperts();
                    var comments = GetComments(_appId, model.Id, experts);
                    var player = GetPlayer(_appId, model.OpenId);
                    Models.Home.UserFile playerTask = new Models.Home.UserFile();
                    playerTask.Content = model.Comment;
                    playerTask.CommentNumber = model.CommentNumber ?? 0;
                    playerTask.Comments = comments;
                    playerTask.IsTop = model.IsTop ?? 0;
                    playerTask.Medias = GetMedias(_appId, model.Id);
                    playerTask.Player = player;
                    playerTask.FileId = model.Id;
                    playerTask.ReleaseTime = GetReleaseTime(Convert.ToDateTime(model.CreateDate));
                    playerTask.WxUserInfo = GetWxUserInfo(model.OpenId);
                    return playerTask;
                }
                catch (Exception ex) {
                    SfSoft.Common.LogHelper.ErrorLog("家教问答", ex);
                    return new Models.Home.UserFile();
                }
                
            }
            else
            {
                return new Models.Home.UserFile();
            }
        }
        public static bool Delete(int fileId)
        {
            SfSoft.BLL.WX_QA_File bll = new SfSoft.BLL.WX_QA_File();
            string sql = "update WX_QA_File set Status=0 where Id=" + fileId;
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
        private List<Models.Home.Comment> GetComments(string appId, int readFileId, List<Models.Expert.ExpertInfo> experts)
        {
            SfSoft.BLL.WX_QA_Comment bll = new SfSoft.BLL.WX_QA_Comment();
            var lists = bll.GetModelList("AppId='" + appId + "' and ReadFileId=" + readFileId.ToString()).OrderByDescending(e=>e.ExpertType??0).ThenBy(e=>e.CreateDate);
            List<Models.Home.Comment> comments = new List<Models.Home.Comment>();
            foreach (var list in lists)
            {
                string nickName = "", headImgUrl = "",sex="",uname="",imgUrl="";
                if ((list.ExpertType??0) != 0)
                {
                    var mode = experts.Find(e => e.OpenId == list.OpenId);
                    nickName = mode.NickName;
                    uname = mode.Uname;
                    imgUrl = mode.ImgUrl;
                    headImgUrl = mode.HeadImgUrl;
                    sex = mode.Sex;
                }
                else {
                    nickName = list.NickName;
                    headImgUrl = list.HeadImgUrl;
                    sex = list.Sex;
                    uname = list.NickName;
                    imgUrl = list.HeadImgUrl;
                }
                comments.Add(new Models.Home.Comment()
                {
                    Id=list.Id,
                    NickName = nickName,
                    HeadImgUrl = headImgUrl,
                    ImgUrl=imgUrl,
                    UName=uname,
                    Details = list.Details,
                    Sex = sex,
                    ReleaseData = GetReleaseTime(list.CreateDate.Value),
                    ExpertType = list.ExpertType ?? 0,
                    ExpertId=list.ExpertId??0,
                    OpenId=list.OpenId
                });
            }
            return comments;
        }
        private Models.Home.Comment GetComment(string appId, int readFileId,List<Models.Expert.ExpertInfo> experts )
        {
            SfSoft.BLL.WX_QA_Comment bll = new SfSoft.BLL.WX_QA_Comment();
            var lists = bll.GetModelList("AppId='" + appId + "' and ReadFileId=" + readFileId.ToString());
            var comment = lists.Where(e => (e.ExpertType??0) != 0).OrderByDescending(e => e.ExpertType??0).ThenByDescending(e=>e.CreateDate).FirstOrDefault();
            if (comment == null)
            {
                comment = lists.OrderByDescending(e => e.CreateDate).FirstOrDefault();
                if(comment!=null){
                    return new Models.Home.Comment(){
                        Id=comment.Id,
                        Details=comment.Details,
                        NickName=comment.NickName,
                        UName=comment.NickName,
                        ImgUrl=comment.HeadImgUrl,
                        HeadImgUrl=comment.HeadImgUrl,
                        Sex = comment.Sex,
                        ReleaseData = GetReleaseTime(comment.CreateDate.Value),
                        ExpertType=comment.ExpertType??0,
                        ExpertId=comment.ExpertId??0,
                        OpenId=comment.OpenId
                    };
                }else{
                    return new Models.Home.Comment(){
                        Id=0,
                         Details="",
                         HeadImgUrl="",
                         UName="",
                         ImgUrl="",
                         NickName="",
                         Sex="",
                         ReleaseData="",
                         ExpertType = 0,
                         ExpertId=0,
                         OpenId="",
                    };
                }
            }
            else {
                string nickName = "", headImgUrl = "",sex="",imgUrl="",uname="",openId="";
                if ((comment.ExpertType??0) != 0)
                {
                    var mode = experts.Find(e => e.OpenId == comment.OpenId);
                    if (mode == null) {
                        mode = new Models.Expert.ExpertInfo();
                    }
                    nickName = mode.NickName;
                    headImgUrl = mode.HeadImgUrl;
                    sex=mode.Sex;
                    imgUrl = mode.ImgUrl;
                    uname = mode.Uname;
                    openId=mode.OpenId;
                }
                else {
                    nickName = comment.NickName;
                    headImgUrl = comment.HeadImgUrl;
                    sex = comment.Sex;
                    imgUrl = comment.HeadImgUrl;
                    uname = comment.NickName;
                    openId=comment.OpenId;
                }
                return new Models.Home.Comment(){
                    Id= comment.Id,
                    Details =comment.Details,
                    NickName=nickName,
                    UName=uname,
                    ImgUrl=imgUrl,
                    HeadImgUrl=headImgUrl,
                    Sex = sex,
                    ReleaseData=GetReleaseTime(comment.CreateDate.Value),
                    ExpertType = comment.ExpertType ?? 0,
                    ExpertId=comment.ExpertId??0,
                    OpenId=openId
                };
            }
        }

        private List<Models.Home.Media> GetMedias(string appId, int fileId)
        {
            SfSoft.BLL.WX_QA_File_Data bll = new SfSoft.BLL.WX_QA_File_Data();
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
            SfSoft.BLL.WX_QA_User bll = new SfSoft.BLL.WX_QA_User();
            SfSoft.Model.WX_QA_User model = bll.GetModelList("AppId='" + appId + "' and OpenId='" + openId + "'").FirstOrDefault();
            if (model != null)
            {

                player.Age = (DateTime.Now.Year - (model.BorthDay ?? DateTime.Now).Year);
                player.PlayerType = "普通用户"; //Helper.Unify.GetPlayerTypeName(model.PlayerType ?? 0);
                player.Sex = model.Sex;
                player.OpenId = model.OpenId;
            }
            return player;
        }
        private Newtonsoft.Json.Linq.JObject RightList()
        {
            string path = System.Web.HttpContext.Current.Server.MapPath("~/App/Project/QA/SysData/admin.json");
            using (StreamReader sr = new StreamReader(path, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                return Newtonsoft.Json.Linq.JObject.Parse(json);
            }
        }
        private List<Models.Home.Like> GetLikes(string appId, int readFileId)
        {
            SfSoft.BLL.WX_QA_Like bll = new SfSoft.BLL.WX_QA_Like();
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
        public static int SetBrowserNumber(int fileId)
        {
            BLL.WX_QA_File bll = new BLL.WX_QA_File();
            var model = bll.GetModel(fileId);
            if (model != null)
            {
                model.BrowseNumber = (model.BrowseNumber ?? 0) + 1;
                bll.Update(model);
                return model.BrowseNumber??0;
            }
            else {
                model.BrowseNumber = 1;
                return 1;
            }
        }
        private string GetSex(string sex)
        {
            if (sex == "1") {
                return "男";
            }
            else if (sex == "2")
            {
                return "女";
            }
            else {
                return sex;
            }
        }
        private bool IsDel(string openId, string appId, bool isRight)
        {
            if (isRight == true)
            {
                return true;
            }
            else {
                if (openId == _openId)
                {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}