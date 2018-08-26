using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using System.IO;

namespace SfSoft.web.game.brainsexpert
{
    public partial class home : System.Web.UI.Page
    {
        public string HTMLOpenID = "";
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLHeadUrl = "";
        public string HTMLNickName = "";
        public string HTMLScore = "";
        public string HTMLGrade = "";
        public string HTMLGradeName = "";
        public string HTMLGold= "";
        public string HTMLHistory = "";
        public string HTMLCurrProcess = "";
        public string HTMLProcessName = "";
        public string HTMLMaxProcess = "";
        public string HTMLRate = "";
        public string HTMLGradeImg = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                if (Request.QueryString["openid"] != null)
                {
                    string _openid = Request.QueryString["openid"].ToString();
                    HTMLOpenID = Request.QueryString["openid"].ToString().Replace("+", "%2B");
                    string openid = _openid;
                    hfOpenID.Value = _openid;
                    GetPlayerInfo(openid);
                    //ShowMyHistory(openid);
                }
            }
        }
        private void GetPlayerInfo(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openid);
            if (model != null)
            {
                HTMLHeadUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                GetGrade(openid);
                GetGold();
                GetNextGradeProcess(HTMLGrade, HTMLScore);
                HTMLGradeImg = GradeImgPath("../images/grade/title_"+HTMLGrade+".png");
            }
        }
        private void GetGrade(string openId)
        {

            BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
            List<Model.WX_TestQuestion_Item_Score> list = bllScore.GetModelList("openid='" + openId + "'");
            string value = (list.Sum(e => e.Score) ?? 0).ToString();
            HTMLScore = value;

            BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
            DataSet ds = bll.GetList("" + value + " between LowerLimit and UpperLimit");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLGrade = ds.Tables[0].Rows[0]["Grade"].ToString();
                HTMLGradeName = ds.Tables[0].Rows[0]["GradeName"].ToString();
            }
        }
        private void GetGold()
        {
            string openid = hfOpenID.Value;
            BLL.WX_TestQuestion_Gold bll = new BLL.WX_TestQuestion_Gold();
            Model.WX_TestQuestion_Gold model = bll.GetModelByOpenID(openid);
            if (model != null)
            {
                HTMLGold = model.Gold.ToString();
            }
        }
        private void GetNextGradeProcess(string currentGrade,string score)
        {
            if (currentGrade.Length != 0) {
                BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
                DataSet ds = bll.GetList(0, "", "grade desc");
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                    if (currentGrade == ds.Tables[0].Rows[0]["grade"].ToString())
                    {
                        HTMLCurrProcess = "100";
                        HTMLMaxProcess = "100";
                        HTMLProcessName = "LV." + currentGrade;
                    }
                    else {
                        DataView dv = ds.Tables[0].DefaultView;
                        dv.RowFilter = "grade=" + (int.Parse(currentGrade)+1).ToString();
                        HTMLCurrProcess = score;
                        HTMLMaxProcess = dv[0]["LowerLimit"].ToString();
                        HTMLRate=Math.Round(double.Parse(score)*100 / int.Parse(dv[0]["LowerLimit"].ToString())).ToString()+"%" ;
                        HTMLProcessName = "LV."+dv[0]["Grade"].ToString();
                    }
                }
            }
        }
        /*
        /// <summary>
        /// //显示答题历程 但不显示擂台答题记录
        /// </summary>
        /// <param name="openid"></param>
        private void ShowMyHistory(string openid)
        {
            string sql = "select a.*,b.activityname from (";
            sql += " select a.*,b.gold,c.rightnumber,d.errornumber from (";
            sql += " select openid,questionactiveid,sum(score)as score from dbo.WX_TestQuestion_Score where openid='"+openid+"' group by openid,questionactiveid";
            sql += " )a left join (select openid,questionactiveid,sum(gold) as gold from WX_TestQuestion_Gold_Detail where status=1 and openid='"+openid+"' group by openid,questionactiveid) b ";
            sql += " on a.openid=b.openid and a.questionactiveid=b.questionactiveid";
            sql += " left join (select openid,questionactiveid,count(1) as rightnumber from WX_TestQuestion_Answer_Record where openid='"+openid+"' and rightorerror=1 group by openid,questionactiveid )c";
            sql += " on a.openid=c.openid and a.questionactiveid=c.questionactiveid";
            sql += " left join (select openid,questionactiveid,count(1) as errornumber from WX_TestQuestion_Answer_Record where openid='"+openid+"' and rightorerror=0 group by openid,questionactiveid ) d";
            sql += " on a.openid=d.openid and a.questionactiveid=d.questionactiveid";
            sql += " )a left join WX_TestQuestion_Activity b on a.questionactiveid=b.id";
            sql += " where b.usingData not like 'wx.questionSorted.3%'";

            DataSet ds=SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                int row=0;
                StringBuilder sb = new StringBuilder();
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    sb.Append("<a href='history.aspx?openid=" + HTMLOpenID + "&activeid=" + dr["questionactiveid"].ToString() + "'>");
                    if (row % 2 == 0)
                    {
                        sb.Append("<div class='col-xs-6' style='margin-bottom:10px; padding-right:5px; padding-left:5px'>");
                    }
                    else {
                        sb.Append("<div class='col-xs-6' style='margin-bottom:10px; padding-left:5px; padding-right:5px'>");
                    }
                    sb.Append("<div class='media' style='border:1px solid #ccc; padding: 10px 5px;'>");
                    sb.Append("<div class='media-body'>");
                    sb.Append("<h4 class='media-heading' style='color:#fff;'>" + dr["activityname"].ToString() + "</h4>");
                    sb.Append("<p style='color:#fff;'>奖励：<span style='color:#EE5E0F'>积分x" + Format(dr["score"].ToString()) + " &nbsp;金币x" + Format(dr["gold"].ToString()) + " </span></p>");
                    sb.Append("<p style='color:#fff; font-size:11px;'>答对次数x" + Format(dr["rightnumber"].ToString()) + " &nbsp;答错次数x" + Format(dr["errornumber"].ToString()) + "</p>");
                    sb.Append("</div>");
                    sb.Append("</div>");
                    sb.Append("</div>");
                    sb.Append("</a>");
                    row += 1;
                }
                HTMLHistory = sb.ToString();
            }
        }
         * */
        private string  GradeImgPath(string path)
        {
            string _path = Server.MapPath(path);
            if (!File.Exists(_path)) {
                return "../images/grade/default_head.png";
            }
            return path;
        }
        private string Format(string number)
        {
            if (number.Length == 0) {
                return "0";
            }
            return number;
        }
    }
}
