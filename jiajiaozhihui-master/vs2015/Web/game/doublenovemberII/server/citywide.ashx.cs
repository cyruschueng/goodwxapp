using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.SfEmc;
using System.Data;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using System.Text;
using SfSoft.Common;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// citywide 的摘要说明
    /// </summary>
    public class citywide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = "";
            string method = context.Request["method"].ToString();
            switch (method)
            {
                case "data":
                    result = GetData(context);
                    break;
                case "like":
                    result = Like(context);
                    break;
                case "comment":
                    result = Comment(context);
                    break;
                case "invite":
                    result = Invite(context);
                    break;
            }
            context.Response.Write(result);
        }

        private string GetData(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString().ConvertBase64TocChars();//点赞的人，是经加密码的
                openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                int pageindex = int.Parse(context.Request["pageindex"].ToString());
                int pagesize = int.Parse(context.Request["pagesize"].ToString());
                string orderby = context.Request["orderby"].ToString();
                string city = context.Request["city"].ToString();

                StringBuilder sb = new StringBuilder();
                sb.Append("select top " + pagesize + " *  from (")
                    .Append(" select row_number() over(order by " + orderby + ") as RowRank, ")
                    .Append(" case  when exists(select top 1 * from WX_Doublenovember_Like where From_OpenID='" + openid + "' and FileID=a.ID) then 1")
                    .Append(" else 0 end as LikeState,")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,c.city as CityName,datediff(dd,e.FirstWorksDateTime,a.Create_date)+1 as AwayDay,")
                    .Append(" e.Sex,(year(getdate())-e.[Year]) as AwayYear,")
                    .Append(" case ")
                    .Append(" when exists(select * from WX_Doublenovember_Invite where Status=1 and (FromOpenID=a.OpenID or ToOpenID=a.OpenID )) then '1'")
                    .Append(" else '0' end as IsInvite,e.IsAlias,e.Alias,")
                    .Append(" case ")
                    .Append(" when a.openid='" + openid + "' then 1 else 0 end as My,f.MainWords,f.IsAct as UnscrambleAct,g.Grade,g.GradeName ")
                    .Append(" from (select * from dbo.WX_Doublenovember_File where isnull(IsAct,1) <> 0) a ")
                    .Append(" left join dbo.WX_HomeCard b on a.openid=b.openid")
                    .Append(" left join WX_UserLocation c on a.openid=c.openid")
                    .Append(" left join WX_Doublenovember_Children e on a.openid=e.openid")
                    .Append(" left join dbo.WX_Doublenovember_File_unscramble f on a.BookName=f.BookName and a.PageNumber=f.PageIndex")
                    .Append(" left join vw_VX_Doublenovember_Grade g on a.Openid=g.Openid")
                    .Append(" where c.city='"+city+"'" )
                    .Append(" )a where RowRank between  " + ((pageindex - 1) * pagesize + 1) + " and " + pageindex * pagesize)
                    .Append(" order by RowRank");
                //WXHelper.WriteNode(sb.ToString(), "sql" + openid + ".txt");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                    string s = GetComment(ds);
                    result = result.Insert(result.Length - 1, ",\"comment\":" + s);
                }
                return result;
            }
            catch (Exception ex)
            {

                WXHelper.WriteNode("(" + HttpContext.Current.Request.Url.AbsoluteUri + "openid1" + context.Request["openid"].ToString() + ")" + ex.Message);
                return result;
            }
        }
        //点赞
        private string Like(HttpContext context)
        {
            string result = "{}";
            //作品
            string id = context.Request["id"].ToString();
            string openid = context.Request["openid"].ToString().ConvertBase64TocChars();//点赞的人，是经加密码的
            //解密openid,如果解密失败，将视为非法数据
            try
            {
                BLL.WX_Doublenovember_File bllFile = new BLL.WX_Doublenovember_File();
                Model.WX_Doublenovember_File modelFile = bllFile.GetModel(int.Parse(id));
                if (modelFile != null)
                {
                    openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                    //是否已点赞
                    BLL.WX_Doublenovember_Like bll = new BLL.WX_Doublenovember_Like();
                    DataSet ds = bll.GetList("FileID=" + id + " and From_OpenID='" + openid + "'");
                    if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                    {

                    }
                    else
                    {
                        Model.WX_Doublenovember_Like model = new Model.WX_Doublenovember_Like();
                        model.Create_Date = DateTime.Now;
                        model.FileID = int.Parse(id);
                        model.From_OpenID = openid;
                        model.To_OpenID = modelFile.OpenID;
                        bll.Add(model);
                        int like = 0;
                        if (modelFile.Like_Number != null)
                        {
                            like = (int)modelFile.Like_Number + 1;
                        }
                        else
                        {
                            like = 1;
                        }
                        modelFile.Like_Number = like;
                        bllFile.Update(modelFile);
                        #region 给点赞人和获得赞的人加积份和金币
                        //给点赞加积份和金币
                        AwardItem awardFromOpenID = new AwardItem(model.From_OpenID);
                        awardFromOpenID.AwardByLikeOther();
                        //给获得赞的人加积份和金币
                        AwardItem awardToOpenID = new AwardItem(model.To_OpenID);
                        awardToOpenID.AwardByLike();
                        #endregion
                        result = "{\"code\":0,\"msg\":\"ok\",\"like\":" + like + "}";
                    }
                }
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("(" + HttpContext.Current.Request.Url.AbsoluteUri + " openid" + openid + ")" + ex.Message);
                result = "{\"code\":1,\"msg\":\"error\"}";
            }
            return result;
        }
        /// <summary>
        /// 提交评论
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string Comment(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = DEncrypt.Decrypt(context.Request["openid"].ToString(), WXConfig.EncryptKey);
                string content = context.Request["content"].ToString();
                string fileID = context.Request["fileid"].ToString();
                BLL.WX_Doublenovember_Comment bll = new BLL.WX_Doublenovember_Comment();
                Model.WX_Doublenovember_Comment model = new Model.WX_Doublenovember_Comment();
                model.Content = content;
                model.CreatDate = DateTime.Now;
                model.FileID = int.Parse(fileID);
                model.ModulesID = "emc.activity.double11";
                model.OpenID = openid;
                int index = bll.Add(model);

                BLL.WX_Doublenovember_File bllFile = new BLL.WX_Doublenovember_File();
                Model.WX_Doublenovember_File modelFile = bllFile.GetModel(int.Parse(fileID));
                if (modelFile != null)
                {
                    if (modelFile.Comment_Number == null)
                    {
                        modelFile.Comment_Number = 1;
                    }
                    else
                    {
                        modelFile.Comment_Number += 1;
                    }
                    bllFile.Update(modelFile);
                    #region 评论获得积分与金币
                    AwardItem award = new AwardItem(openid);
                    award.AwardByComment();
                    #endregion
                }
                result = "{\"code\":\"0\",\"newid\":\"" + index + "\",\"msg\":\"提交成功\"}";

            }
            catch (Exception ex)
            {
                result = "{\"code\":\"1\",\"newid\":\"0\",\"msg\":\"提交失败\"}";
            }
            return result;
        }
        /// <summary>
        /// 获取评论
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetComment(DataSet data)
        {
            string ids = "";
            string result = "{}";
            foreach (DataRow dr in data.Tables[0].Rows)
            {
                ids += dr["ID"].ToString() + ",";
            }
            if (ids.Length != 0)
            {
                ids = ids.Substring(0, ids.Length - 1);

                BLL.WX_Doublenovember_Comment bll = new BLL.WX_Doublenovember_Comment();
                StringBuilder sb = new StringBuilder();
                sb.Append(" select a.*,b.HeadimgUrl, case when c.IsAlias=1 then c.Alias else b.NickName end as NickName from ");
                sb.Append("(select * from dbo.WX_Doublenovember_Comment where FileID in(" + ids + ")) a");
                sb.Append(" left join dbo.WX_HomeCard b on a.openid=b.openid");
                sb.Append(" left join dbo.WX_Doublenovember_Children c on a.openid=c.openid");
                sb.Append(" order by a.id asc");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
            }
            return result;
        }
        private string Invite(HttpContext context)
        {
            string result = "{}";
            int status = -1;
            string to = context.Request["to"].ToString();
            string from = context.Request["from"].ToString();
            from = DEncrypt.Decrypt(from, WXConfig.EncryptKey);
            string content = content = context.Request["content"].ToString();
            BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
            Model.WX_Doublenovember_Invite model = bll.GetModel(from, to);
            if (model != null)
            {
                if (model.Status == 0)
                {
                    result = "{\"code\":0,\"msg\":\"正在邀请中。。。\"}";
                    status = 0;
                }
                else if (model.Status == 1)
                {
                    result = "{\"code\":1,\"msg\":\"邀请通过\"}";
                    status = 1;
                }
                else if (model.Status == 2)
                {
                    result = "{\"code\":2,\"msg\":\"邀请被她拒绝\"}";
                    status = 2;
                }
                else if (model.Status == 3)
                {
                    result = "{\"code\":3,\"msg\":\"邀请失效\"}";
                    status = 3;
                }
                else if (model.Status == 4)
                {
                    result = "{\"code\":4,\"msg\":\"已取消\"}";
                    status = 4;
                }
            }
            if (status == -1)
            {
                model = new Model.WX_Doublenovember_Invite();
                model.Content = content;
                model.FromOpenID = from;
                model.IsRead = 0;
                model.SendDate = DateTime.Now;
                model.Status = 0;
                model.ToOpenID = to;
                int index = bll.Add(model);
                result = "{\"code\":5,\"msg\":\"已发出邀请，请等待回应\"}";
            }
            else if (status == 2 || status == 3 || status == 4)
            {
                model.Status = 0;
                bll.Update(model);
                result = "{\"code\":5,\"msg\":\"已发出邀请，请等待回应\"}";
            }
            return result;
        }
        private string GetAdvertisement()
        {
            string result = "{}";
            BLL.WX_Advertisement bll = new BLL.WX_Advertisement();
            string sql = "Select ID,Name,ImgUrl,MediaUrl,Positions,CreateDate,Resume,datalength(TextContent) as ContentLength From WX_Advertisement where Own='emc.activity.double11' and isnull(IsAct,0)=1 ";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = FormatToJson.ToJson(ds);
            }
            return result;
        }
        /// <summary>
        /// 书法贴解说
        /// </summary>
        private string GetUnscramble(string bookName, string pageIndex)
        {
            string result = "{}";
            BLL.WX_Doublenovember_File_unscramble bll = new BLL.WX_Doublenovember_File_unscramble();
            int index = 0;
            if (int.TryParse(pageIndex, out index))
            {
                Model.WX_Doublenovember_File_unscramble model = bll.GetModel(bookName, index);
                if (model != null)
                {
                    result = FormatToJson.ToJson(model);
                }
            }
            return result;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}