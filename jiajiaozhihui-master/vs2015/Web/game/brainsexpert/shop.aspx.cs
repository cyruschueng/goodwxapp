using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Data;

namespace SfSoft.web.game.brainsexpert
{
    public partial class shop : System.Web.UI.Page
    {
        public string HTMLProduct = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string openid = "";
                if (Request.QueryString["openid"] != null) {
                    openid = Request.QueryString["openid"].ToString();
                }
                GetProduct(openid);
            }
        }
        private void GetProduct(string openid)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            List<Model.WX_PublicGood> list=bll.GetModelList("goodstype=7");
            DataSet ds = bll.GetList(0, "goodstype=7", "OrderBy");
            StringBuilder sb = new StringBuilder();
            int row = 1;
            foreach (DataRow dr  in ds.Tables[0].Rows) {
                if (row % 2 == 0)
                {
                    sb.Append("<div class='col-xs-6' style='padding-left:5px;'>");
                }
                else {
                    sb.Append("<div class='col-xs-6' style='padding-right:5px;'>");
                }
                sb.Append("<a   href='exchange.aspx?openid=" + openid.Replace("+", "%2B") + "&productid=" + dr["ID"].ToString()+ "'>");
                sb.Append("<div class='thumbnail'>");
                sb.Append("<img alt='' src='"+dr["ImgURL"].ToString()+"' />");
                sb.Append("<div>");
                sb.Append("<h5 class='ellipsis text-center'>" + dr["GoodName"].ToString() + "</h5>");
                sb.Append("<p class='ellipsis text-center' style='color:#F93535'>" + dr["Exchange"].ToString() + "金币</p>");
                sb.Append("<p class='text-center'><a class='btn btn-success btn-xs' href='exchange.aspx?openid=" + openid.Replace("+", "%2B") + "&productid=" + dr["ID"].ToString() + "'>立即兑换 </a></p>");
                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("</a>");
                sb.Append("</div>");
                row += 1;
            }
            if (sb.ToString().Length == 0) {
                sb.Append("<div class='col-xs-12' >");
                sb.Append("<div class='alert alert-info' role='alert'>商城正在更新中。。。</div>");
                sb.Append("</div>");
            }
            HTMLProduct = sb.ToString();
        }
    }
}
