using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.DBUtility;
using SfSoft.SfEmc;

namespace SfSoft.web.emc.service
{
    /// <summary>
    /// helper 的摘要说明
    /// </summary>
    public class helper : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write(GetCity(context));
        }
        private string GetCity(HttpContext context) {
            string result = "";
            string id=context.Request.Form["id"];
            string sql = "select cid,cname from City where pid=" + id;
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = FormatToJson.ToJson(ds);
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