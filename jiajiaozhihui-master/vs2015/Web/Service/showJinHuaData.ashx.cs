using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;
using SfSoft.web.Service.Helper.Provide;

namespace SfSoft.web.Service
{
    /// <summary>
    /// showJinHuaData 的摘要说明
    /// </summary>
    public class showJinHuaData : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            int pageindex = 0;
            if (context.Request["pageindex"] != null) {
                pageindex = int.Parse(context.Request["pageindex"].ToString());
            }
            int pagesize = 0;
            if (context.Request["pagesize"] != null)
            {
                pagesize = int.Parse(context.Request["pagesize"].ToString());
            }
            var type= context.Request["type"];
            string result = ShowData(pageindex, pagesize, type);
            
            context.Response.Write(result);
        }
        private string ShowData(int pageindex, int pagesize, string type)
        {
            string result = "{}";
            StringBuilder sb = new StringBuilder();
            sb.Append(" select * from (");
            sb.Append(" select row_number() over(order by Orderid desc, IsHead desc) as sn, * from (");
            sb.Append(" select a.Id, a.Title,a.ArticleUrl,a.ImgUrl,a.GroupTitle,a.IsHead,b.RefValue,b.Orderid from  (select * from WX_JingHua where Isnull(ArticleType,0)="+type+") a");
            sb.Append(" left join  (select * from Pub_BaseData where RefObj='weixin.material.jinghua.groupname') b on a.GroupTitle=b.RefValueCode ");
            sb.Append(" where  a.GroupTitle is not Null  and b.RefValue is not Null");
            sb.Append(")a)a where sn between "+ ((pageindex-1)*pagesize +1)+" and "+pageindex*pagesize);

            DataSet ds = DBUtility.DbHelperSQL.Query(sb.ToString());
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