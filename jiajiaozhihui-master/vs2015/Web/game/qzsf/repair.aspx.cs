using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf
{
    public partial class repair : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "";
        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                if (Session["myopenid"] != null)
                {
                    hfOpenID.Value = Session["myopenid"].ToString();
                }
                HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            }
            else {
                Response.Redirect("error.html");
            }
        }
    }
}
