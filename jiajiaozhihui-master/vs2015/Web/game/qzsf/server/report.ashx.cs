using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.SfEmc;
using ShenerWeiXin;
using System.Text;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// report 的摘要说明
    /// </summary>
    public class report : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = GetData(context);
            context.Response.Write(result);
        }
        private string GetData(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString();//点赞的人，是经加密码的
                string share = "";
                string week=context.Request["week"];
                WeekDate weekDate= GetWeekDate(int.Parse(week), openid);
                StringBuilder sb = new StringBuilder();

                sb.Append(" select ")
                    .Append(" case  when exists(select top 1 * from WX_Doublenovember_Like where From_OpenID='" + openid + "' and FileID=a.ID) then 1")
                    .Append(" else 0 end as LikeState,")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,c.city as CityName,datediff(dd,e.FirstWorksDateTime,a.Create_date)+1 as AwayDay,")
                    .Append(" e.Sex,(year(getdate())-e.[Year]) as AwayYear,e.IsAlias,e.Alias,'" + share + "' as Share,f.MainWords,f.IsAct as UnscrambleAct,g.Grade,g.GradeName ")
                    .Append(" from (select * from  dbo.WX_Doublenovember_File where isnull(IsAct,1) <> 0) a ")
                    .Append(" left join (select * from dbo.WX_Items_User where ItemsId=1) b on a.openid=b.openid")
                    .Append(" left join WX_UserLocation c on a.openid=c.openid")
                    .Append(" left join WX_Doublenovember_Children e on a.openid=e.openid")
                    .Append(" left join dbo.WX_Doublenovember_File_unscramble f on a.BookName=f.BookName and a.PageNumber=f.PageIndex")
                    .Append(" left join vw_VX_Doublenovember_Grade g on a.Openid=g.Openid")
                    .Append(" where  a.OpenID='" + openid + "' and a.Create_Date between '" + weekDate.StartDate + "' and '" + weekDate.EndDate + "' order by a.Create_Date desc");

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
                sb.Append(" left join dbo.WX_Items_User b on a.openid=b.openid");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
            }
            return result;
        }
        private WeekDate GetWeekDate(int week, string openId)
        {
            SfSoft.BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            DateTime startDate = DateTime.Now;
            var list = bll.GetModelList("FirstWorksDateTime>'2016-09-01'");
            if (list != null) {
                startDate = list.FirstOrDefault().FirstWorksDateTime ?? DateTime.Now;
            }
            var index= (int)startDate.DayOfWeek;
            startDate = startDate.AddDays((7 - index) + 1);

            WeekDate weekdate = new WeekDate();
             weekdate.StartDate = startDate.AddDays(7*(week -1));
             weekdate.EndDate = startDate.AddDays(7 * week - 1);
             return weekdate;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
    public class WeekDate
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}