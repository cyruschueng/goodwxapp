using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;

namespace SfSoft.web.game.brainsexpert.competition
{
    public partial class viewallrank : System.Web.UI.Page
    {
        public string HTMLData = "";
        public string HtmlBackLink = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string id="";
                if (Request.QueryString["id"] != null) {
                    id = Request.QueryString["id"].ToString();
                }
                string top = "50";
                if (Request.QueryString["top"] != null)
                {
                    top = Request.QueryString["top"].ToString();
                }
                LoadRankData("", id,int.Parse(top));
            }
        }
        private void LoadRankData(string openid, string activityid,int top)
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            DataSet ds = bll.GetList(openid, "", "", activityid, top);
            StringBuilder sb = new StringBuilder();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                int index = 0;
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    sb.Append("<tr>");
                    if (dr["Rank"].ToString() == "1")
                    {
                        sb.Append("<td style='width:15%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='images/ranking1.png' ></td>");
                    }
                    else if (dr["Rank"].ToString() == "2")
                    {
                        sb.Append("<td style='width:15%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='images/ranking2.png' ></td>");
                    }
                    else if (dr["Rank"].ToString() == "3")
                    {
                        sb.Append("<td style='width:15%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img class='rank' src='images/ranking3.png' ></td>");
                    }
                    else
                    {
                        sb.Append("<td style='width:15%; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='sn'>" + dr["Rank"].ToString() + "." + "</span></td>");
                    }
                    sb.Append("<td style='width:25%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><img  class='head' src='" + dr["HeaderImgUrl"] + "' alt='' ></td>");
                    sb.Append("<td style='width:35%; padding-left:0px; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='nickname'>" + dr["NickName"] + "</span><span class='label label-primary' style='margin-top:10px;'> " + dr["Score"].ToString() + "个积分 / " + TimeForamt(dr["UsingTime"].ToString()) + "</span></td>");
                    sb.Append("<td style='width:25%; padding-left:0px; text-align:right; vertical-align:middle; border-top:none; border-bottom:1px solid #ddd;'><span class='province'>" + dr["Province"].ToString() + "</span></td>");
                    sb.Append("</tr>");
                    
                    index += 1;
                }
                HTMLData = sb.ToString();
            }
        }
        private string TimeForamt(string timespan)
        {
            double t = double.Parse(timespan) / 1000;
            return t.ToString() + "秒";
        }
        private void BackLink()
        {
            string openid = "";
            if (Session["openid"] != null)
            {
                openid = Session["openid"].ToString();
            }
            string weixinid = "";
            if (Session["weixinid"] != null)
            {
                weixinid = Session["weixinid"].ToString();
            }
            if (openid != "" && weixinid != "")
            {
                HtmlBackLink = "../default.aspx?openid=" + openid.Replace("+", "%2B") + "&from=shenerhost&weixinid=" + weixinid;
            }
            else
            {
                HtmlBackLink = "javascript:void(0)";
            }

        }
    }
}
