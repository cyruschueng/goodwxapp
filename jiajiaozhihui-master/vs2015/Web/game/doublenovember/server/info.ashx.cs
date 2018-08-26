using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using SfSoft.SfEmc;
using System.Data;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;

namespace SfSoft.web.game.doublenovember.server
{
    /// <summary>
    /// info 的摘要说明
    /// </summary>
    public class info : IHttpHandler
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
                case "order":
                    result = GetOrderInfo(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string GetData(HttpContext context)
        {
            string result = "{}";
            try
            {
                int pageindex = int.Parse(context.Request["pageindex"].ToString());
                int pagesize = int.Parse(context.Request["pagesize"].ToString());
                string orderby = context.Request["orderby"].ToString();
                string openid = context.Request["openid"].ToString().ConvertBase64TocChars();
                openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                StringBuilder sb = new StringBuilder();
                sb.Append("select top "+pagesize+" *  from (")
                    .Append(" select row_number() over(order by " + orderby + ") as RowRank, ")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,b.City from (select * from dbo.WX_Doublenovember_File where openid='"+openid+"') a")
                    .Append(" left join dbo.WX_HomeCard b on a.openid=b.openid")
                    .Append(" )a where RowRank between  " + ((pageindex - 1) * pagesize + 1) + " and " + pageindex * pagesize)
                    .Append(" order by RowRank");
            
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
                return result;
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("1game.doublenovember.server.info.ashx(openid:" + context.Request["openid"].ToString() + ")" + ex.Message);
                return result;
            }
        }
        private string GetOrderInfo(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString();
                openid = DEncrypt.Decrypt(openid.ConvertBase64TocChars(), WXConfig.EncryptKey);
                string id = context.Request["id"].ToString();
                StringBuilder sb = new StringBuilder();
                sb.Append(" select a.OpenID,a.GoodID,a.Name,a.Address,a.TelePhone,a.Province,a.Province,a.City,a.Remark,a.OrderDate,");
                sb.Append(" case a.IsSend");
                sb.Append(" when 1 then '已发货'");
                sb.Append(" when 0 then '未发货'");
                sb.Append(" when -1 then '无效'");
                sb.Append(" when 11 then 'VIP'  end as SendName,");
                sb.Append(" a.Price,a.PayNumber,isnull(a.SendDate,'') as SendDate,b.GoodName,c.AreaName as ProvinceName,d.AreaName as CityName");
                sb.Append(" from (select * from dbo.WX_PublicOrder where GoodID=" + id + ") a ");
                sb.Append(" left join (select * from dbo.WX_PublicGood where id=" + id + ") b on a.GoodID=b.ID");
                sb.Append(" left join (select * from dbo.Pub_Areas where AreaType=1)c on a.Province=c.AreaID");
                sb.Append(" left join (select * from dbo.Pub_Areas where AreaType=2)d on a.City=d.AreaID");
                sb.Append(" where  openid='" + openid + "'");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
            }
            catch (Exception ex) {
                WXHelper.WriteNode("game.doublenovember.server.info.ashx(openid:" + context.Request["openid"].ToString() + ")" + ex.Message);
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