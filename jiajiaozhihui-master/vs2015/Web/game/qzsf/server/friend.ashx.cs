using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.Common;
using ShenerWeiXin;
using System.Text;
using System.Data;
using SfSoft.SfEmc;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// friend 的摘要说明
    /// </summary>
    public class friend : IHttpHandler
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
            }
            context.Response.Write(result);
        }

        private string GetData(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString();//点赞的人
                int pageindex = int.Parse(context.Request["pageindex"].ToString());
                int pagesize = int.Parse(context.Request["pagesize"].ToString());
                string orderby = context.Request["orderby"].ToString();
                StringBuilder sb = new StringBuilder();
                sb.Append("select top " + pagesize + " *  from (")
                    .Append(" select row_number() over(order by " + orderby + ") as RowRank, ")
                    .Append(" case  when exists(select top 1 * from WX_Doublenovember_Like where From_OpenID='" + openid + "' and FileID=a.ID) then 1")
                    .Append(" else 0 end as LikeState,")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,c.city as CityName,datediff(dd,e.FirstWorksDateTime,a.Create_date)+1 as AwayDay,")
                    .Append(" e.Sex,(year(getdate())-e.[Year]) as AwayYear,e.IsAlias,e.Alias,f.MainWords,f.IsAct as UnscrambleAct,g.Grade,g.GradeName ")
                    .Append(" from (select * from dbo.WX_Doublenovember_File where isnull(IsAct,1) <> 0) a ")
                    .Append(" left join (select * from dbo.WX_Items_User where ItemsId=1) b on a.openid=b.openid")
                    .Append(" left join WX_UserLocation c on a.openid=c.openid")
                    .Append(" left join WX_Doublenovember_Children e on a.openid=e.openid")
                    .Append(" left join dbo.WX_Doublenovember_File_unscramble f on a.BookName=f.BookName and a.PageNumber=f.PageIndex")
                    .Append(" left join vw_VX_Doublenovember_Grade g on a.openid=g.openid ")
                    .Append(" where Exists(select * from WX_Doublenovember_Invite where ((a.openid=FromOpenID or a.openid=ToOpenid) and ('" + openid + "'=FromOpenID or '" + openid + "'=ToOpenid)) and Status=1) or a.openid='" + openid + "'")
                    .Append(" )a where RowRank between  " + ((pageindex - 1) * pagesize + 1) + " and " + pageindex * pagesize)
                    .Append(" order by RowRank");
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
                WXHelper.WriteNode("(" + context.Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                return result;
            }
        }
        //点赞
        private string Like(HttpContext context)
        {
            string result = "{}";
            //作品
            string id = context.Request["id"].ToString();
            string openid = context.Request["openid"].ToString();//点赞的人，是经加密码的
            //解密openid,如果解密失败，将视为非法数据
            try
            {
                BLL.WX_Doublenovember_File bllFile = new BLL.WX_Doublenovember_File();
                Model.WX_Doublenovember_File modelFile = bllFile.GetModel(int.Parse(id));
                if (modelFile != null)
                {
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
                        result = "{\"code\":0,\"msg\":\"ok\",\"like\":" + like + "}";
                    }
                }
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("(" + context.Request.RawUrl + ")" + ex.Message, "qzsf.txt");
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
                string openid = context.Request["openid"].ToString();
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
                sb.Append(" select a.*,b.HeadimgUrl,case when c.IsAlias=1 then c.Alias else b.NickName end as NickName from ");
                sb.Append("(select * from dbo.WX_Doublenovember_Comment where FileID in(" + ids + ") ) a");
                sb.Append(" left join dbo.WX_Items_User b on a.openid=b.openid");
                sb.Append(" left join dbo.WX_Doublenovember_Children c on a.openid=c.openid");
                sb.Append(" order by a.id asc ");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
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