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
    public partial class precedence : System.Web.UI.Page
    {
        public string HTMLData = "";
        public string HtmlBackLink = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string openid = "";
                if (Session["openid"] != null) { 
                    openid=Session["openid"].ToString();
                }
                string activityid="";
                if(Session["competition"]!=null){
                    activityid=Session["competition"].ToString();
                }
                if (openid !="" && activityid != "") {
                    LoadRankData(openid, activityid);
                }
                BackLink();
            }
        }
        private void LoadRankData(string openid,string activityid)
        {
            lib.Ranking ranking = new lib.Ranking(openid, int.Parse(activityid), "", "", 50);
            hfRanking.Value = ranking.ReturnRankingJson();
        }
        private string TimeForamt(string timespan) 
        {
            double t=double.Parse(timespan)/1000;
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
