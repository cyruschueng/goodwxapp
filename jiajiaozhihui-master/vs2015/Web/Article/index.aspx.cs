using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using SfSoft.DBUtility;

namespace SfSoft.web.Article
{
    public partial class index : System.Web.UI.Page
    {
        public string Content = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ShowData();
            }
        }
        private DataSet  Weeks()
        {
            int index = 0;
            string sql = "select distinct Week  from WX_JingHua where isnull(ArticleType,0)=1";
            return DbHelperSQL.Query(sql);
        }

        private DataSet GetArticle()
        {
            BLL.WX_JingHua bll = new BLL.WX_JingHua();
            return bll.GetList(0, "isnull(ArticleType,0)=1", "isnull([order],9999)");
        }
        private void ShowData()
        {
            StringBuilder sb = new StringBuilder();
            DataSet ds = GetArticle();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                try
                {
                    DataView dv = ds.Tables[0].DefaultView;
                    DataSet WeeksDataSet = Weeks();

                    foreach (DataRow dr in WeeksDataSet.Tables[0].Rows)
                    {
                        sb.Append("<div class='appmsg'>");
                        sb.Append("<div class='appmsg_content'>");
                        dv.RowFilter = "isnull(Week,0)=" + dr["Week"].ToString() + " and IsHead=1";
                        if (dv != null && dv.Count > 0)
                        {
                            sb.Append("<div class='appmsg_info'>");
                            sb.Append("<em class='appmsg_date'>周" + dv[0]["Week"].ToString() + "</em>");
                            sb.Append("</div>");
                            sb.Append("<div class='cover_appmsg_item'>");
                            sb.Append("<h4 class='appmsg_title'>");
                            sb.Append("<a href='" + dv[0]["ArticleUrl"].ToString() + "' target='_blank'>" + dv[0]["Title"].ToString() + "</a>");
                            sb.Append("</h4>");
                            sb.Append("<div class='appmsg_thumb_wrp'><img src='" + dv[0]["ImgUrl"].ToString() + "'  class='appmsg_thumb'></div>");
                            sb.Append("</div>");
                        }
                        dv = ds.Tables[0].DefaultView;
                        dv.RowFilter = "isnull(Week,0)=" + dr["Week"].ToString() + " and isnull(IsHead,0)<>1";
                        for (int index = 0; index < dv.Count; index++)
                        {
                            sb.Append("<div class='appmsg_item'>");
                            sb.Append("<img src=" + dv[index]["ImgUrl"].ToString() + " class='appmsg_thumb' />");
                            sb.Append("<h4 class='appmsg_title'>");
                            sb.Append("<a href=" + dv[index]["ArticleUrl"].ToString() + " target='_blank'>" + dv[index]["Title"].ToString() + "</a>");
                            sb.Append("</h4>");
                            sb.Append("</div>");
                        }
                        sb.Append("</div>");
                        sb.Append("</div>");
                    }
                }
                catch (Exception ex) {
                }
            }
            Content = sb.ToString();
        }
    }
}
