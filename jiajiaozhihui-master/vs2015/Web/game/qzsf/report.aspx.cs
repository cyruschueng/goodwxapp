using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using ShenerWeiXin.WxApi.WxOAuth;

namespace SfSoft.web.game.qzsf
{
    public partial class report : System.Web.UI.Page
    {
        private Model.WX_Items_User WXItemUserModel = new Model.WX_Items_User();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                if (Session["myopenid"] != null)
                {
                    hfOpenID.Value = Session["myopenid"].ToString();
                }
                else
                {
                    Response.Redirect("error.html");
                }
            }
        }
    }
}
