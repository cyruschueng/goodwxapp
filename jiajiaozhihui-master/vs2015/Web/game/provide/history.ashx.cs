using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// history 的摘要说明
    /// </summary>
    public class history : IHttpHandler
    {
        static string ENCRYPTKEY = "shenerxm";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = GetHistory(context);
            context.Response.Write(result);
        }
        private string GetHistory(HttpContext context)
        {
            string result = "{}";
            string openid = context.Request["openid"].ToString();
            openid =openid;
            string questionactiveid = context.Request["activeid"].ToString();
            string type = context.Request["type"].ToString();

            string sql = "select a.*,b.testquestion,rightanswer,answer1,answer2,answer3,answer4,accessoryurl from (";
            sql += " select * from dbo.WX_TestQuestion_Answer_Record ";
            sql += "where openid='" + openid + "' and questionactiveid=" + questionactiveid + " and rightorerror=" + type;
            sql += " )a left join dbo.WX_TestQuestion b on a.testquestionid=b.id";

            DataSet ds=SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
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