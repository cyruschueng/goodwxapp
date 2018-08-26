using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;

namespace SfSoft.web.game.brainsexpert
{
    public partial class history : System.Web.UI.Page
    {
        public string HTMLHistory = "";
        static string ENCRYPTKEY = "shenerxm";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string openid = "";
                string activeid = "";
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                    openid = hfOpenID.Value;
                }
                if (Request.QueryString["activeid"] != null) {
                    hfQuestionActiveid.Value = Request.QueryString["activeid"].ToString();
                    activeid = hfQuestionActiveid.Value;
                }
                GetHistory(openid, activeid, "0");
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="questionactiveid"></param>
        /// <param name="type">0:答错的 1：答对的</param>
        private void GetHistory(string openid,string  questionactiveid, string type)
        {
            string sql = "select a.*,b.testquestion,rightanswer,answer1,answer2,answer3,answer4,accessoryurl from (";
            sql += " select * from dbo.WX_TestQuestion_Answer_Record ";
            sql += "where openid='" + openid + "' and questionactiveid=" + questionactiveid + " and rightorerror="+type;
            sql += " )a left join dbo.WX_TestQuestion b on a.testquestionid=b.id";

            DataSet ds=SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                StringBuilder sb = new StringBuilder();
                int row = 0;
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    sb.Append("<div class='panel panel-default' style=' margin-bottom:10px;'>");
                    sb.Append("<div class='panel-heading' role='tab' id='heading" + dr["ID"].ToString() + "'>");
                    sb.Append("<h4 class='panel-title'>");
                    if (row == 0)
                    {
                        sb.Append("<a role='button' style='display:block' data-toggle='collapse' data-parent='#accordion' href='#collapse" + dr["ID"].ToString() + "' aria-expanded='true' aria-controls='collapse" + dr["ID"].ToString() + "'>");
                    }
                    else {
                        sb.Append("<a class='collapsed' style='display:block' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse" + dr["ID"].ToString() + "' aria-expanded='false' aria-controls='collapse" + dr["ID"].ToString() + "'>");
                    }
                    
                    sb.Append(dr["testquestion"].ToString());
                    sb.Append("</a>");
                    sb.Append("</h4>");
                    sb.Append("</div>");
                    if (row == 0)
                    {
                        sb.Append("<div id='collapse" + dr["ID"].ToString() + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='heading" + dr["ID"].ToString() + "'>");
                    }
                    else {
                        sb.Append("<div id='collapse" + dr["ID"].ToString() + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading" + dr["ID"].ToString() + "'>");
                    }
                    
                    sb.Append("<div class='panel-body'>");
                    if (dr["accessoryurl"].ToString() != "") {
                        sb.Append("<div class='row'>");
                        sb.Append("<div class='col-xs-12 thumbnail' style='border:none'>");
                        sb.Append("<img src='" + dr["accessoryurl"].ToString() + "'");
                        sb.Append("</div>");
                        sb.Append("</div>");
                    }
                    sb.Append("<div class='row'>");
                    sb.Append(FormatAnswer(dr,  "answer1","a"));
                    sb.Append(FormatAnswer(dr, "answer2", "b"));
                    sb.Append(FormatAnswer(dr, "answer3", "c"));
                    sb.Append(FormatAnswer(dr, "answer4", "d"));
                    sb.Append("</div>");
                    sb.Append("</div>");
                    sb.Append("</div>");
                    sb.Append("</div>");
                    row += 1;
                }
                HTMLHistory = sb.ToString();
            }
        }

        private string FormatAnswer(DataRow dr, string matchingField,string answer)
        {
            string result = "";
            string rightAnswer = dr["rightanswer"].ToString().ToLower();
            string selectAnswer = dr["SelectAnswer"].ToString().ToLower();
            if (selectAnswer == answer)
            {
                if (rightAnswer == answer)
                {
                    result = "<div class='col-xs-6  text-center ' ><span class='btn btn-default select select-right'>" + dr[matchingField].ToString().Replace("/" + answer + "", "") + "</span></div>";
                }
                else
                {
                    result = "<div class='col-xs-6 text-center ' ><span class='btn btn-default select select-error'>" + dr[matchingField].ToString().Replace("/" + answer + "", "") + "</span></div>";
                }
            }
            else if (answer == rightAnswer) {
                result = "<div class='col-xs-6 text-center ' ><span class='btn btn-default select select-right'>" + dr[matchingField].ToString().Replace("/" + answer + "", "") + "</span></div>";
            }
            else
            {
                result = "<div class='col-xs-6 text-center '><span class='btn btn-default select'>" + dr[matchingField].ToString().Replace("/" + answer + "", "") + "</span></div>";
            }
            return result;
        }
    }
}
