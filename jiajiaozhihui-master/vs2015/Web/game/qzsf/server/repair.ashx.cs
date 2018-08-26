using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;
using SfSoft.Common;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf.server
{
    /// <summary>
    /// repair 的摘要说明
    /// </summary>
    public class repair : IHttpHandler
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
                case "correct":
                    result = Correct(context);
                    break;
            }
            context.Response.Write(result);
        }

        /// <summary>
        /// 查询
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetData(HttpContext context)
        {
            string result = "{}";
            string where = "";
            string telephone = context.Request["telephone"].ToString();
            string name = context.Request["name"].ToString();
            if (telephone != "")
            {
                where += " and TelePhone like '%" + telephone + "%'";
            }
            if (name != "")
            {
                where += " and Name like '%" + name + "%'";
            }
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            StringBuilder sb = new StringBuilder();
            sb.Append("select OpenID,GoodID,");
            sb.Append(" case");
            sb.Append(" when len(Name)=2 then left(Name,1)+'*'");
            sb.Append(" when len(Name)>2 then left(Name,1)+REPLICATE('*',len(Name)-2)+right(name,1)");
            sb.Append(" else '*' end as Name,");
            sb.Append(" case");
            sb.Append(" when len(TelePhone)=11 then left(TelePhone,3)+Replicate('*',5)+right(TelePhone,3)");
            sb.Append(" else '*' end as TelePhone,");
            sb.Append(" case isnull(IsSenD,0)");
            sb.Append(" when 1 then '已审核'");
            sb.Append(" when 0 then '未审核'");
            sb.Append(" when 11 then 'VIP'");
            sb.Append(" when -1 then '异常处理' end as SendName");
            sb.Append(" from WX_PublicOrder");
            sb.Append("  where GoodID=76 and (OpenID='oc6zzs0IEa49ASsb2mtVdqy4NzRw' or OpenID not like 'oc6zzs%')" + where);

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            return result;
        }
        /// <summary>
        /// 更正
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string Correct(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString();
                string telephone = context.Request["telephone"].ToString();
                string name = context.Request["name"].ToString();
                if (openid != "" || telephone != "" || name != "")
                {
                    string sql = "select * from WX_PublicOrder where TelePhone='" + telephone + "' and Name='" + name + "'";
                    if (DBUtility.DbHelperSQL.Exists(sql))
                    {
                        sql = "update WX_PublicOrder set openid='" + openid + "' where TelePhone='" + telephone + "' and Name='" + name + "'";
                        DBUtility.DbHelperSQL.ExecuteSql(sql);
                        result = "{\"code\":\"1\",\"msg\":\"更正完成\"}";
                    }
                    else
                    {
                        result = "{\"code\":\"0\",\"msg\":\"当前用户不用更正\"}";
                    }
                }
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("(" + context.Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                result = result = "{\"code\":\"-1\",\"msg\":\"当前用户更正失败\"}";
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