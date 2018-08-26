using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.SfEmc;

namespace SfSoft.web.Service
{
    /// <summary>
    /// donate 的摘要说明
    /// </summary>
    public class donate : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            string method = "";
            method = context.Request["method"].ToString();
            context.Response.ContentType = "text/plain";

            switch (method)
            {
                case "donatepage":
                    result = DonatePage(context);
                    break;
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 课程报名 人员分页显示
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string DonatePage(HttpContext context)
        {
            string result = "{}";
            string activityid = "";
            if (context.Request["activityid"] != null)
            {
                activityid = context.Request["activityid"].ToString();
            }
            string startindex = "";
            if (context.Request["startindex"] != null)
            {
                startindex = context.Request["startindex"].ToString();
            }
            string endindex = "";
            if (context.Request["endindex"] != null)
            {
                endindex = context.Request["endindex"].ToString();
            }
            int count = 0;
            BLL.WX_ParticipatorList bll = new BLL.WX_ParticipatorList();
            DataSet ds = bll.GetList(0, "ActivityId=" + activityid,"id desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                count = ds.Tables[0].Rows.Count;
            }
            ds = bll.GetListByPage("ActivityId=" + activityid, "id desc", int.Parse(startindex), int.Parse(endindex));

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = FormatToJson.ToJson(ds);
                string json = ",\"count\":\"" + count + "\"";
                int index = result.LastIndexOf('}');
                result = result.Insert(index, json);
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