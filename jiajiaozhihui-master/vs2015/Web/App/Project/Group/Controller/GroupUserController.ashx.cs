using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Project.Group.Controller
{
    /// <summary>
    /// GroupUserController 的摘要说明
    /// </summary>
    public class GroupUserController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetGroupUserInfo(context);
        }

        private void GetGroupUserInfo(HttpContext context)
        {
            var openId = context.Request["openId"];

            string sql = "select a.*,b.class_name,b.catalogue,b.introduce,c.group_name from dbo.wx_gardenia_user a " +
                "left join dbo.WX_SGroup_Content b on a.class_id=b.id " +
                "left join dbo.WX_SGroup c on b.group_type=c.id "+
                "where a.openId='" + openId + "'";

            var ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                DataRow dr = ds.Tables[0].Rows[0];
                var data = new
                {
                    exist=true,
                    classId = dr.Field<int>("class_id"),
                    className = dr.Field<string>("class_name"),
                    catalogue = dr.Field<string>("catalogue"),
                    groupName = dr.Field<string>("group_name"),
                    introduce = dr.Field<string>("introduce")
                };
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            else {
                var data = new
                {
                    exist = false,
                };
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(data, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
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