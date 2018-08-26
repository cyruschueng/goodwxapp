using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.game.brainsexpert.competition
{
    public partial class help : System.Web.UI.Page
    {
        public string HTMLBackLink = "javascript:void(0)";
        public string HtmlBackLink = "";
        public string HTMLBody = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string id = Request.QueryString["id"];
                GetHelpe(id);
                BackLink();
            }
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
        private void GetHelpe(string id)
        {
            if(id!=null){
                BLL.WX_Article_Release bll = new BLL.WX_Article_Release();
                Model.WX_Article_Release model = bll.GetModel(int.Parse(id));
                HTMLBody = model.Detail;
            }
        }
    }
}
