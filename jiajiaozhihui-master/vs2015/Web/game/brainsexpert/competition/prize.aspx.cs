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
    public partial class prize : System.Web.UI.Page
    {
        public string HTMLProduct = "";
        public string HtmlBackLink = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                GetProduct();
                BackLink();
            }
        }
        private void GetProduct()
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            List<Model.WX_PublicGood> list = bll.GetModelList("goodstype=8");
            DataSet ds = bll.GetList(0, "goodstype=8 and isnull(isact,0)=1", "OrderBy");
            StringBuilder sb = new StringBuilder();
            int row = 1;
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                sb.Append("<div class='col-xs-12' >");
                sb.Append("<a   href='productdetail.aspx?productid="+dr["ID"].ToString()+"'>");
                sb.Append("<div class='thumbnail'>");
                sb.Append("<img alt='' src='" + dr["ImgURL"].ToString() + "' />");
                sb.Append("<div>");
                sb.Append("<h5 class='ellipsis text-center'>" + dr["GoodName"].ToString() + "</h5>");
                sb.Append("</div>");
                sb.Append("</div>");
                sb.Append("</a>");
                sb.Append("</div>");
                row += 1;
            }
            if (sb.ToString().Length == 0)
            {
                sb.Append("<div class='col-xs-12' >");
                sb.Append("<div class='alert alert-info' role='alert'>奖品正在更新中。。。</div>");
                sb.Append("</div>");
            }
            HTMLProduct = sb.ToString();
        }

        private void BackLink()
        {
             string openid = "";
             if (Session["openid"] != null) {
                 openid = Session["openid"].ToString();
             }
             string weixinid = "";
             if (Session["weixinid"] != null) {
                 weixinid = Session["weixinid"].ToString();
             }
             if (openid != "" && weixinid != "")
             {
                 HtmlBackLink = "../default.aspx?openid=" + openid.Replace("+", "%2B") + "&from=shenerhost&weixinid=" + weixinid;
             }
             else {
                 HtmlBackLink = "javascript:void(0)";
             }
        }
    }
}
