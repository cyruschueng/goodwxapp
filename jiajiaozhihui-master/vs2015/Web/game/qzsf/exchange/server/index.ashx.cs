using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.qzsf.exchange.server
{
    /// <summary>
    /// index 的摘要说明
    /// </summary>
    public class index : IHttpHandler
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
            string type=context.Request["type"];
            string item=context.Request["item"];
            string sql = "select Id,Name,Image,Describe,Store,IsAct,Type,Quantity,Item,CreateDate FROM WX_Product_Exchange where type='"+type+"' and item='"+ item+"' and IsAct=1";
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