using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.SfEmc;
using SfSoft.Common.DEncrypt;
using System.Text;
using System.Data;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// friend_manage 的摘要说明
    /// </summary>
    public class friend_manage : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = "";
            string method = context.Request["method"].ToString();
            switch (method)
            {
                case "get":
                    result = GetData(context);
                    break;
                case "getnew":
                    result = GetNewData(context);
                    break;
                case "cancel":
                    result = Cancel(context);
                    break;
                case "refuse":
                    result = Refuse(context);
                    break;
                case "agree":
                    result = Agree(context);
                    break;
            }
            context.Response.Write(result);
        }

        private string GetNewData(HttpContext context)
        {
            string result = "{}";
            string openid = context.Request["openid"].ToString();
            openid = DEncrypt.Decrypt(openid, ShenerWeiXin.WXConfig.EncryptKey);
            StringBuilder sb = new StringBuilder();
            sb.Append(" select a.*,b.Number from (")
                /*我邀请我的，但还没有通过的*/
                .Append(" select a.ID, a.FromOpenID as OpenID,a.Content,a.SendDate,isnull(a.ReplyDate,'') as ReplyDate,a.Status,a.IsRead,b.NickName,b.HeadimgUrl,1 as Type from (select * from WX_Doublenovember_Invite where status=0 and ToOpenID='" + openid + "')a left join WX_HomeCard b on a.FromOpenID=b.openid")
                .Append(" )a left join (select OpenID,count(1) as Number from  dbo.WX_Doublenovember_File group by OpenID) b on a.openid=b.openid");
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = FormatToJson.ToJson(ds);
            }
            return result;
        }

        private string GetData(HttpContext context)
        {
            string result = "{}";
            string openid=context.Request["openid"].ToString();
            openid=DEncrypt.Decrypt(openid,ShenerWeiXin.WXConfig.EncryptKey);
            StringBuilder sb = new StringBuilder();
            sb.Append(" select a.*,b.Number from (")
                /*自己*/
                .Append(" select a.ID, a.OpenID,'' as Content,'' as SendDate,'' as ReplyDate,1 as Status, 0 as IsRead, case when isnull(b.IsAlias,0)=0 then a.NickName else b.Alias end as NickName ,a.HeadimgUrl,3 as Type from (select * from WX_HomeCard where openid='" + openid + "' ) a ")
                .Append(" left join dbo.WX_Doublenovember_Children b on a.openid=b.openid")
                .Append(" union")
                /*我邀请的成为好友*/
                .Append(" select a.ID, a.ToOpenID  as OpenID,a.Content,a.SendDate,isnull(a.ReplyDate,'') as ReplyDate,a.Status,a.IsRead,case when isnull(c.IsAlias,0)=0 then b.NickName else c.Alias end as NickName ,b.HeadimgUrl,2 as Type from (select * from WX_Doublenovember_Invite where status=1 and FromOpenID='" + openid + "')a ")
                .Append(" left join WX_HomeCard b on a.ToOpenID=b.openid")
                .Append(" left join dbo.WX_Doublenovember_Children c on a.ToOpenID= c.openid")
                .Append(" union")
                /*邀请我的成为好友*/
                .Append(" select a.ID, a.FromOpenID  as OpenID,a.Content,a.SendDate,isnull(a.ReplyDate,'') as ReplyDate,a.Status,a.IsRead,case when isnull(c.IsAlias,0)=0 then b.NickName else c.Alias end as NickName,b.HeadimgUrl,2 as Type from (select * from WX_Doublenovember_Invite where status=1 and ToOpenID='" + openid + "')a ")
                .Append(" left join WX_HomeCard b on a.FromOpenID=b.openid")
                .Append(" left join dbo.WX_Doublenovember_Children c on a.FromOpenID= c.openid")
                .Append(" )a left join (select OpenID,count(1) as Number from  dbo.WX_Doublenovember_File group by OpenID) b on a.openid=b.openid")
                .Append("  order by a.Type desc");
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = FormatToJson.ToJson(ds);
            }
            return result;
        }
        /// <summary>
        /// 取消
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string Cancel(HttpContext context)
        {
            string result = "{}";
            try
            {
                string id = context.Request["id"].ToString();
                BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
                Model.WX_Doublenovember_Invite model = bll.GetModel(int.Parse(id));
                if (model != null)
                {
                    model.Status = 4;
                }
               bll.Update(model);
               result = "{\"code\":0,\"msg\":\"取消成功\"}";
            }
            catch (Exception ex) {
                result = "{\"code\":1,\"msg\":\"异常\"}";
            }
            return result;
        }
        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string Refuse(HttpContext context)
        {
            string result = "{}";
            try
            {
                string id = context.Request["id"].ToString();
                BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
                Model.WX_Doublenovember_Invite model = bll.GetModel(int.Parse(id));
                if (model != null)
                {
                    model.Status = 2;
                }
                bll.Update(model);
                result = "{\"code\":0,\"msg\":\"拒绝成功\"}";
            }
            catch (Exception ex)
            {
                result = "{\"code\":1,\"msg\":\"异常\"}";
            }
            return result;
        }
        /// <summary>
        /// 同意
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string Agree(HttpContext context)
        {
            string result = "{}";
            try
            {
                string id = context.Request["id"].ToString();
                BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
                Model.WX_Doublenovember_Invite model = bll.GetModel(int.Parse(id));
                if (model != null)
                {
                    model.Status = 1;
                }
                bll.Update(model);

                #region 结伴获取积分与金币
                AwardItem award = new AwardItem(model.FromOpenID);
                award.AwardByCompany();
                #endregion
                result = "{\"code\":0,\"msg\":\"同意成功\"}";
            }
            catch (Exception ex)
            {
                result = "{\"code\":1,\"msg\":\"异常\"}";
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