using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using SfSoft.SfEmc;
using System.Data;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using SfSoft.Common.QCloud.Api;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// info 的摘要说明
    /// </summary>
    public class info : IHttpHandler
    {
        const int APP_ID = 10010590;
        const string SECRET_ID = "AKID9cADvko08CVsbnncZMa8IFh27J2U7elh";
        const string SECRET_KEY = "WkdGcUZzqNsoJRskEAccjsaaVcMcehQh";
        const string BUCKET_NAME = "doublenove";
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
                case "order":
                    result = GetOrderInfo(context);
                    break;
                case "comment":
                    result = Comment(context);
                    break;
                case "delete":
                    result = Deleted(context);
                    break;
            }
            context.Response.Write(result);
        }

        private string Deleted(HttpContext context)
        {
            string result = "";
            try
            {
                string id = context.Request["id"].ToString();
                BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
                Model.WX_Doublenovember_File model = bll.GetModel(int.Parse(id));
                Cloud cloud = new Cloud(APP_ID, SECRET_ID, SECRET_KEY);
                string s= cloud.Delete(BUCKET_NAME, model.Fileid);//删除腾讯云上的数
                bll.Delete(int.Parse(id));
                result = "{\"code\":0,\"msg\":\"ok\"}";
            }
            catch (Exception ex)
            {
                result = "{\"code\":1,\"msg\":\""+ex.Message+"\"}";
            }
            return result;
        }
        private string GetData(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString().ConvertBase64TocChars();//点赞的人，是经加密码的
                if (openid != "") {
                    openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                }
                string friendopenid = context.Request["friendopenid"].ToString().ConvertBase64TocChars();
                if (friendopenid != "") {
                    friendopenid = DEncrypt.Decrypt(friendopenid, WXConfig.EncryptKey);
                }
                string share = context.Request["share"].ToString();
                if (share == "true")
                {
                    openid = friendopenid;
                }
                
                int pageindex = int.Parse(context.Request["pageindex"].ToString());
                int pagesize = int.Parse(context.Request["pagesize"].ToString());
                string orderby = context.Request["orderby"].ToString();
                StringBuilder sb = new StringBuilder();
                sb.Append("select top " + pagesize + " *  from (")
                    .Append(" select row_number() over(order by " + orderby + ") as RowRank, ")
                    .Append(" case  when exists(select top 1 * from WX_Doublenovember_Like where From_OpenID='" + openid + "' and FileID=a.ID) then 1")
                    .Append(" else 0 end as LikeState,")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,c.city as CityName,datediff(dd,e.FirstWorksDateTime,a.Create_date)+1 as AwayDay,")
                    .Append(" e.Sex,(year(getdate())-e.[Year]) as AwayYear,e.IsAlias,e.Alias,'" + share + "' as Share,f.MainWords,f.IsAct as UnscrambleAct,g.Grade,g.GradeName ")
                    .Append(" from (select * from  dbo.WX_Doublenovember_File where isnull(IsAct,1) <> 0) a ")
                    .Append(" left join dbo.WX_HomeCard b on a.openid=b.openid")
                    .Append(" left join WX_UserLocation c on a.openid=c.openid")
                    .Append(" left join WX_Doublenovember_Children e on a.openid=e.openid")
                    .Append(" left join dbo.WX_Doublenovember_File_unscramble f on a.BookName=f.BookName and a.PageNumber=f.PageIndex")
                    .Append(" left join vw_VX_Doublenovember_Grade g on a.Openid=g.Openid")
                    .Append(" where  a.OpenID='"+openid+"'")
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
                WXHelper.WriteNode("1game.doublenovember.server.info.ashx(openid:" + context.Request["openid"].ToString() + ")" + ex.Message);
                return result;
            }
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
                sb.Append(" select a.*,b.NickName,b.HeadimgUrl from ");
                sb.Append("(select * from dbo.WX_Doublenovember_Comment where FileID in(" + ids + ")) a");
                sb.Append(" left join dbo.WX_HomeCard b on a.openid=b.openid");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
            }
            return result;
        }
        private string GetOrderInfo(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString();
                openid = DEncrypt.Decrypt(openid.ConvertBase64TocChars(), WXConfig.EncryptKey);
                string id = context.Request["id"].ToString();
                StringBuilder sb = new StringBuilder();
                sb.Append(" select a.OpenID,a.GoodID,a.Name,a.Address,a.TelePhone,a.Province,a.Province,a.City,a.Remark,a.OrderDate,");
                sb.Append(" case a.IsSend");
                sb.Append(" when 1 then '已发货'");
                sb.Append(" when 0 then '未发货'");
                sb.Append(" when -1 then '无效'");
                sb.Append(" when 11 then 'VIP'  end as SendName,");
                sb.Append(" a.Price,a.PayNumber,isnull(a.SendDate,'') as SendDate,b.GoodName,c.AreaName as ProvinceName,d.AreaName as CityName");
                sb.Append(" from (select * from dbo.WX_PublicOrder where GoodID=" + id + ") a ");
                sb.Append(" left join (select * from dbo.WX_PublicGood where id=" + id + ") b on a.GoodID=b.ID");
                sb.Append(" left join (select * from dbo.Pub_Areas where AreaType=1)c on a.Province=c.AreaID");
                sb.Append(" left join (select * from dbo.Pub_Areas where AreaType=2)d on a.City=d.AreaID");
                sb.Append(" where  openid='" + openid + "'");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("game.doublenovember.server.info.ashx(openid:" + context.Request["openid"].ToString() + ")" + ex.Message);
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
                }
                result = "{\"code\":\"0\",\"newid\":\"" + index + "\",\"msg\":\"提交成功\"}";

            }
            catch (Exception ex)
            {
                result = "{\"code\":\"1\",\"newid\":\"0\",\"msg\":\"提交失败\"}";
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