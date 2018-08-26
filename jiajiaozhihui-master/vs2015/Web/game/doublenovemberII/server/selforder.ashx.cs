using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// selforder 的摘要说明
    /// </summary>
    public class selforder : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = Update(context);
            context.Response.Write(result);
        }
        /// <summary>
        /// 更新货到付款
        /// </summary>
        /// <param name="telephone"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        private string Update(HttpContext context)
        {
            string goodsId=context.Request["goodsid"];
            string telephone=context.Request["telephone"];
            string name=context.Request["name"];
            string openid = context.Request["openid"];

            try
            {
                string sql = "select * from WX_PublicOrder where goodID=" + goodsId + " and telephone='" + telephone + "' and name='" + name + "' and  isnull(Paymode,0)=0 and openid not like 'oc6zzs%'";
                DataSet ds = DBUtility.DbHelperSQL.Query(sql);
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    sql = "update WX_PublicOrder set openid='" + openid + "' where goodId=" + goodsId + " and telephone='" + telephone + "' and name='" + name + "' and isnull(Paymode,0)=0 and openid not like 'oc6zzs%'";
                    SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sql);
                    return ReturnMsg("0", "更新成功");
                }
                else
                {
                    return ReturnMsg("1", "没有要更新的数据或输入的数据不正确");
                }
            }
            catch (Exception ex) {
                ShenerWeiXin.WXHelper.WriteNode("(selforder.ashx)" + ex.Message, "selforder.txt");
                return ReturnMsg("2", "更新失败");
            }
        }
        private string ReturnMsg(string code,string msg)
        {
            return "{\"code\":\""+code+"\",\"msg\":\""+msg+"\"}";
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