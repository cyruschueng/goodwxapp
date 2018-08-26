using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using SfSoft.DBUtility;

namespace SfSoft.web.emc.activity.useful
{
    public partial class webreport : System.Web.UI.Page
    {
        const int pagesize = 16;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string where = "1=1 ";
                if (Request.QueryString["goodid"] != null && Request.QueryString["goodid"].ToString() != "" && Request.QueryString["goodid"].ToString().ToLower() != "null")
                {
                    where += " and GoodID=" + Request.QueryString["goodid"].ToString();
                }
                if (Request.QueryString["issend"] != null && Request.QueryString["issend"].ToString() != "" && Request.QueryString["issend"].ToString().ToLower() != "null")
                {
                    where += " and isnull(IsSend,0)=" + Request.QueryString["issend"].ToString();
                }
                if (Request.QueryString["senddate"] != null && Request.QueryString["senddate"].ToString() != "" && Request.QueryString["senddate"].ToString().ToLower() != "null")
                {
                    where += " and Convert(varchar(10), SendDate,120)=Convert(varchar(10),'" + Request.QueryString["senddate"].ToString() + "',120)";
                }
                if (Request.QueryString["name"] != null && Request.QueryString["name"].ToString() != "" && Request.QueryString["name"].ToString().ToLower() != "null")
                {
                    where += " and Name='" + Request.QueryString["name"].ToString()+"'";
                }
                if (Request.QueryString["tel"] != null && Request.QueryString["tel"].ToString() != "" && Request.QueryString["tel"].ToString().ToLower() != "null")
                {
                    where += " and TelePhone='" + Request.QueryString["tel"].ToString() + "'";
                }
                if (Request.QueryString["province"] != null && Request.QueryString["province"].ToString() != "" && Request.QueryString["province"].ToString().ToLower() != "null")
                {
                    where += " and Province='" + Request.QueryString["province"].ToString() + "'";
                }
                if (Request.QueryString["city"] != null && Request.QueryString["city"].ToString() != "" && Request.QueryString["city"].ToString().ToLower() != "null")
                {
                    where += " and City='" + Request.QueryString["city"].ToString()+"'";
                }
                if (Request.QueryString["orderdate"] != null && Request.QueryString["orderdate"].ToString() != "" && Request.QueryString["orderdate"].ToString().ToLower() != "null")
                {
                    where += " and Convert(varchar(10), OrderDate,120) =Convert(varchar(10),'" + Request.QueryString["orderdate"].ToString() + "',120)";
                }
                DataSet ds = GetData(where);
                ShowData(ds);

            }
        }
        private DataSet GetData(string where)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.*,b.areaname as provincename,c.areaname as cityname,c.areacode as postcode from WX_PublicOrder a ");
            sb.Append(" left join (select * from dbo.Pub_Areas where areatype=1) b on a.province=b.AreaID ");
            sb.Append(" left join (select * from dbo.Pub_Areas where areatype=2) c on a.city=c.AreaID  ");
            sb.Append(" where " + where);
            DataSet ds = DbHelperSQL.Query(sb.ToString());
            return ds;
        }
        private void ShowData(DataSet ds)
        {
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                StringBuilder sb = new StringBuilder();
                int mo = ds.Tables[0].Rows.Count % pagesize;
                int page = 0;
                if (mo == 0)
                {
                    page = ds.Tables[0].Rows.Count / pagesize;
                }
                else
                {
                    page = (ds.Tables[0].Rows.Count / pagesize) + 1;
                }
                for (int m = 1; m < page + 1; m++)
                {
                    sb.Append("<table class='page'>");
                    for (int i = 0; i < pagesize; i += 2)
                    {
                        sb.Append("<tr class='item'>");
                        sb.Append("<td class='left-col'>");
                        sb.Append("<div class='customer'>");
                        sb.Append(Row(i, ds, m));
                        sb.Append("<span class='print'>印刷品</span>");
                        sb.Append("</div>");
                        sb.Append("</td>");
                        sb.Append("<td class='right-col'>");
                        sb.Append("<div class='customer'>");
                        sb.Append(Row(i + 1, ds, m));
                        sb.Append("<span class='print'>印刷品</span>");
                        sb.Append("</div>");
                        sb.Append("</td>");
                        sb.Append("</tr>");
                    }
                    sb.Append("</table>");
                }
                content.InnerHtml = sb.ToString();
            }
        }
        private string Row(int i,DataSet ds,int page)
        {
            StringBuilder sb = new StringBuilder();
            if ((page - 1) * pagesize + i < ds.Tables[0].Rows.Count)
            {
                int length = ds.Tables[0].Rows[(page - 1) * pagesize + i]["address"].ToString().Length;
                string address = ds.Tables[0].Rows[(page - 1) * pagesize + i]["address"].ToString();
                if (length > 19)
                {
                    address = address.Insert(19, "<br />");
                }
                sb.Append("<table>");
                sb.Append("<tr>");
                sb.Append("<td class='title'>邮政编码：</td><td class='value' colspan='2'>" + ds.Tables[0].Rows[(page - 1) * pagesize + i]["postcode"].ToString() + "</td>");
                sb.Append("</tr>");
                sb.Append("<tr>");
                sb.Append("<td class='title'>收  件  人：</td><td class='value'>"+ds.Tables[0].Rows[(page - 1) * pagesize + i]["name"].ToString() +"</td><td class='area'>省："+ds.Tables[0].Rows[(page - 1) * pagesize + i]["provincename"].ToString() +"&nbsp;&nbsp;市："+ ds.Tables[0].Rows[(page - 1) * pagesize + i]["cityname"].ToString() +"</td>");
                sb.Append("</tr>");
                sb.Append("<tr>");
                sb.Append("<td class='title'>收件地址：</td><td class='value' colspan='2'>" + address + "</td>");
                sb.Append("</tr>");
                sb.Append("<tr>");
                sb.Append("<td class='title'>寄  件 人：</td><td class='from' colspan='2'>神尔科技(深圳市南山区南海大道1079号数码大厦A座7楼)</td>");
                sb.Append("</tr>");
                sb.Append("<tr>");
                sb.Append("<td colspan='3' class='shared'>亲，收到礼品后，可以发送照片到 家教智慧，和我们分享您的喜悦！</td>");
                sb.Append("</tr>");
                sb.Append("<tr>");
                sb.Append("<td colspan='3' class='shared server-tel'>服务电话：0755-22200786</td>");
                sb.Append("</tr>");
                sb.Append("</table>");
            }
            return sb.ToString();
        }
    }
}


