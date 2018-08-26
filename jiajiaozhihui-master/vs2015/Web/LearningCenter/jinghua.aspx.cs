using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using SfSoft.DBUtility;

namespace SfSoft.web
{
    public partial class jinghua : System.Web.UI.Page
    {
        public string Content = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                //ShowData();
            }
        }
        private DataRowCollection   GetGroup()
        {
            string sql = "select distinct GroupTitle,b.RefValue,b.Orderid from  WX_JingHua a";
            sql += " left join  (select * from Pub_BaseData where RefObj='weixin.material.jinghua.groupname') b on a.GroupTitle=b.RefValueCode where  a.GroupTitle is not Null  and b.RefValue is not Null order by b.orderid desc";
            DataSet ds = DbHelperSQL.Query(sql);
            return ds.Tables[0].Rows;
        }

        private DataSet GetArticle()
        {
            BLL.WX_JingHua bll = new BLL.WX_JingHua();
            return bll.GetList(0, "", "isnull([order],9999)");
        }
        private void ShowData()
        {
            StringBuilder sb = new StringBuilder();
            DataRowCollection DataRows = GetGroup();
            if (DataRows != null) {
                DataSet ds = GetArticle();
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                    DataView dv = ds.Tables[0].DefaultView;
                    foreach (DataRow dr in DataRows)
                    {
                        sb.Append("<div class='appmsg'>");
                        sb.Append("<div class='appmsg_content'>");
                        dv.RowFilter = "GroupTitle='" + dr["GroupTitle"].ToString() + "' and IsHead=1";
                        if (dv != null && dv.Count>0) {
                            sb.Append("<div class='appmsg_info'>");
                            sb.Append("<em class='appmsg_date'>"+dr["RefValue"].ToString()+"</em>");                                
                            sb.Append("</div>");
                            sb.Append("<div class='cover_appmsg_item'>");
                            sb.Append("<h4 class='appmsg_title'>");
                            sb.Append("<a href='" + dv[0]["ArticleUrl"].ToString() + "' target='_blank'>" + dv[0]["Title"].ToString() + "</a>");
                            sb.Append("</h4>");
                            sb.Append("<div class='appmsg_thumb_wrp'><img src='"+dv[0]["ImgUrl"].ToString() +"'  class='appmsg_thumb'></div>");
                            sb.Append("</div>");
                        }
                        dv = ds.Tables[0].DefaultView;
                        dv.RowFilter = "GroupTitle='" + dr["GroupTitle"].ToString() + "' and IsHead<>1";
                        dv.Sort = "";
                        for (int i = 0; i < dv.Count; i++) {
                            sb.Append("<div class='appmsg_item'>");
                            sb.Append("<img src="+dv[i]["ImgUrl"].ToString()+" class='appmsg_thumb' />");
                            sb.Append("<h4 class='appmsg_title'>");
                            sb.Append("<a href=" + dv[i]["ArticleUrl"].ToString() + " target='_blank'>" + dv[i]["Title"].ToString() + "</a>");
                            sb.Append("</h4>");
                            sb.Append("</div>");
                        }
                        sb.Append("</div>");
                        sb.Append("</div>");
                    } 
                }
            }
            Content = sb.ToString();
        }

        private string ShowJinHuaData()
        {
            string result = "";

            return result;
        }
    }
}
