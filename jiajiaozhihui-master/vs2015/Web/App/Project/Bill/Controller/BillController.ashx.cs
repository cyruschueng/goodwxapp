using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Bill.Controller
{
    /// <summary>
    /// BillController 的摘要说明
    /// </summary>
    public class BillController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            GetPayUserList(context);
        }
        private void GetPayUserList(HttpContext context)
        {
            var orderId = context.Request["orderid"];
            var sql = "select NickName,HeadImgUrl from wx_userInfo a where exists(select 1 from WX_Bill b where orderId='"+orderId+"' and a.openId=b.openId  )";
            var ds= SfSoft.DBUtility.DbHelperSQL.Query(sql);

            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                var result = Newtonsoft.Json.JsonConvert.SerializeObject(ds.Tables[0], new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
                context.Response.Write(result);
            }
            else {
                context.Response.Write("");
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