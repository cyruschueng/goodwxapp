using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.DBUtility;

namespace SfSoft.web.emc.service
{
    /// <summary>
    /// distributor 的摘要说明
    /// </summary>
    public class distributor : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            context.Response.ContentType = "text/plain";
            string disno = "";
            string method = "";
            if (context.Request.Form["method"] != null)
            {
                method = context.Request.Form["method"].ToString();
            }
            if (context.Request.Form["disno"] != null) {
                disno = context.Request.Form["disno"].ToString();
            }
            switch (method) { 
                case "validatedisno":
                    result=ValidateDisNo(disno);
                    break;
            }
            context.Response.Write(result);
        }
        private string ValidateDisNo(string disno) {
            string  result = "true";
            string sql = "select id from DRP_Distributor where disno='" + disno+ "'";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = "false";
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