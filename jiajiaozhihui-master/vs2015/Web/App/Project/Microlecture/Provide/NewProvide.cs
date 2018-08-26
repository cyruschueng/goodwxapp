using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class NewProvide
    {
        private string appid = "app001";
        private string modules = "002";
        public Model.wx_comments AddComment(string message, string sender, string headImg, string nickName,string imgServerId)
        {
            BLL.wx_comments bll = new BLL.wx_comments();
            Model.wx_comments model = new Model.wx_comments();
            model.relation_id = 0;
            model.appid = appid;
            model.create_date = DateTime.Now;
            model.imgs = "";
            model.is_act = 1;
            model.like_quantity = 0;
            model.message = message;
            model.modules = modules;
            model.pid = 0;
            model.replier = "";
            model.replier_headimage = "";
            model.replier_nickname = "";
            model.sender = sender;
            model.sender_headimage = headImg;
            model.sender_nickname = nickName;
            var index = bll.Add(model);

            DownImage(imgServerId,index);

            model = bll.GetModel(index);
            return model;
        }

        public Model.wx_comments ReplyComment(int commentsId, string message, string replier, string nickName, string headImg)
        {
            BLL.wx_comments bll = new BLL.wx_comments();
            var model = bll.GetModel(commentsId);
            model.create_date = DateTime.Now;
            model.is_act = 1;
            model.message = message;
            model.pid = commentsId;
            model.replier = replier;
            model.replier_headimage = headImg;
            model.replier_nickname = nickName;
            bll.Add(model);
            return model;
        }

        public void AddLike(int commentsId, string liker, string nickName, string headImg)
        {
            BLL.wx_likes bll = new BLL.wx_likes();
            Model.wx_likes model = new Model.wx_likes();
            model.appid = appid;
            model.create_date = DateTime.Now;
            model.liker = liker;
            model.liker_headimage = headImg;
            model.liker_nickname = nickName;
            model.modules = modules;
            model.relation_id = commentsId;
            bll.Add(model);

            UpdateLikeNumber(commentsId, 1);
        }
        public void CancelLike(int commentsId, string liker)
        {
            BLL.wx_likes bll = new BLL.wx_likes();
            var list = bll.GetModelList("relation_id=" + commentsId + " and liker='" + liker + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                bll.Delete(model.id);
                UpdateLikeNumber(commentsId, -1);
            }
        }

        public dynamic GetComments(int pageSize, int pageIndex, string liker)
        {
            var sql = @"SELECT TOP " + pageSize + " * " +
                "FROM " +
                    "( " +
                        "SELECT ROW_NUMBER() OVER(ORDER BY id desc) AS RowNumber, * FROM wx_comments WHERE is_act=1 and modules='"+ modules + "' and  pid=0 " +
                    ") as A " +
                "WHERE RowNumber > " + pageSize + " * (" + pageIndex + " - 1)";
            var ds = DBUtility.DbHelperSQL.Query(sql);
            List<dynamic> list = new List<dynamic>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    var likedList = GetLikedList(appid, modules, dr.Field<int>("id"));
                    list.Add(new
                    {
                        id = dr.Field<int>("id"),
                        relation_id = dr.Field<int>("relation_id"),
                        message = dr.Field<string>("message"),
                        sender = dr.Field<string>("sender"),
                        sender_nick_name = dr.Field<string>("sender_nickname"),
                        sender_head_imgurl = dr.Field<string>("sender_headimage"),
                        create_date = dr.Field<DateTime>("create_date"),
                        like_quantity = dr.Field<int>("like_quantity"),
                        imgurl= FormatImgUrl( dr.Field<string>("imgs")),
                        is_like = IsLiked(liker, likedList),
                        replies= GetReply(dr.Field<int>("id")),
                        likers = likedList.Select(item=>new {
                            likerNickName=item.liker_nickname
                        })
                    });
                }
            }
            return list;
        }
        private void UpdateLikeNumber(int commentId, int number)
        {
            BLL.wx_comments bll = new BLL.wx_comments();
            var model = bll.GetModel(commentId);
            model.like_quantity = (model.like_quantity ?? 0) + number;
            bll.Update(model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="imagesServerId">微信临时文件ID</param>
        /// <param name="id"></param>
        private async void DownImage(string imagesServerId,int id)
        {
            if (!string.IsNullOrEmpty(imagesServerId)) {
                string accessToken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                var path = System.Web.HttpContext.Current.Server.MapPath("~/Files/microlecture/images/");
                var result= await Senparc.Weixin.MP.AdvancedAPIs.MediaApi.GetAsync(accessToken, imagesServerId, path);
                var index= result.LastIndexOf("\\")+1;
                UpdateImg(id, "/Files/microlecture/images/" + result.Substring(index));
            }
        }
        private void  UpdateImg(int id,string imgSrc)
        {
            BLL.wx_comments bll = new BLL.wx_comments();
            var model= bll.GetModel(id);
            if (model != null) {
                model.imgs = imgSrc;
                bll.Update(model);
            }
        }
        private dynamic GetReply(int pid)
        {
            BLL.wx_comments bll = new BLL.wx_comments();
            var query= bll.GetModelList("pid=" + pid);
            List<dynamic> list = new List<dynamic>();
            foreach (var m in query) {
                list.Add(new
                {
                    replierNickName=m.replier_nickname,
                    msg=m.message
                });
            }
            return list;
        }
        private List<Model.wx_likes> GetLikedList(string appid,string modules,int relationId)
        {
            LikesProvide provide = new LikesProvide();
            return provide.GetLikeList(appid, modules, relationId);
        }
        private bool IsLiked(string liker, List<Model.wx_likes> list )
        {
            return list.Exists(e => e.liker == liker);
        }
        private string FormatImgUrl(string src)
        {
            if (string.IsNullOrEmpty(src)) return "";
            if (src.StartsWith("http://") == false) {
                return App.Helper.WxBaseConfig.WebSite + src.Substring(1);
            }
            return src;
        }
    }
}