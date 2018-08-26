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
    public partial class index : System.Web.UI.Page
    {
        public string HTMLPlayer = "";
        public string HTMLRank = "";
        public string HTMLGetPrize = "";
        public string HTMLPrize = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["id"] != null)
                {
                    string id = Request.QueryString["id"].ToString();
                    hfID.Value = id;
                }
                if (Request.QueryString["openid"] != null)
                {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                HTMLPlayer = "href='answer.aspx?id=" + hfID.Value + "&openid=" + hfOpenID.Value.Replace("+", "%2B") + "'";
                HTMLRank = "href='ranking.aspx?id=" + hfID.Value + "&openid=" + hfOpenID.Value.Replace("+", "%2B") + "'";
                HTMLGetPrize = GetUrl(hfOpenID.Value, hfID.Value);
                HTMLPrize = "href='prize.aspx'";
            }
        }
        private string  GetUrl(string openid, string activeid)
        {
            string _openid =openid;
            if (IsStart() == false && IsCurrentActive(activeid) == true && IsRank(_openid, activeid) == true)
            {
                return "href='get-prize.aspx?id=" + activeid + "&openid=" + openid.Replace("+", "%2B") + "'";
            }
            return "javascript:void(0)";
        }

        /// <summary>
        /// 是不是当前活动
        /// </summary>
        /// <param name="activeid"></param>
        /// <returns></returns>
        private bool IsCurrentActive(string activeid)
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            DataSet ds = bll.GetList("IsAct=1 and ID="+activeid);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 判断今天是不是活动日
        /// </summary>
        /// <returns></returns>
        private bool IsStart()
        {
            //Monday Tuesday Wednesday Thursday Friday Saturday Sunday
            string  dt = DateTime.Today.DayOfWeek.ToString(); 
            if(dt=="Thursday"){
                return true;
            }else{
                return false;
            }
        }

        /// <summary>
        /// 是不是获得排名
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="id"></param>
        private bool IsRank(string openid, string activeID)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" select top 20  row_number() over(order by Score desc) as ranking,* from (");
            sb.Append("select a.openid,a.UsingTime,a.HeaderImgUrl,a.NickName,a.Province,a.City,a.District,a.Longitude,a.Latitude,a.Grade,a.GradeName,b.Score  from ( ");
            sb.Append(" select a.*, b.HeaderImgUrl,b.NickName,b.Province,b.City,b.District,b.Longitude,b.Latitude,c.Grade,c.GradeName from (");
            sb.Append(" select   openid, score as Score,usingtime as UsingTime ");
            sb.Append(" from dbo.WX_TestQuestion_Item_Score ");
            sb.Append(" )a left join WX_TestQuestion_Player b on a.openid=b.serviceopenid ");
            sb.Append(" left join WX_TestQuestion_Grade c on a.score between c.lowerlimit and c.upperlimit");
            sb.Append(" )a");
            sb.Append(" left join (select  openid,item,score as Score from WX_TestQuestion_Item_Score where item=" + activeID + ") b on a.openid=b.openid");
            sb.Append(" where questionactiveid is not null ");
            sb.Append(" )a");

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            DataView dv = ds.Tables[0].DefaultView;
            dv.RowFilter = "openid='" + openid + "'";
            if (dv.Count > 0)
            {
                Session["rank"]= dv[0]["ranking"].ToString();
                return true;
            }
            return false;
        }
    }
}
