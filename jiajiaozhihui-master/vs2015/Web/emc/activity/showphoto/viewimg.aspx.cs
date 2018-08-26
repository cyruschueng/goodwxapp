using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.emc.activity.showphoto
{
    public partial class viewimg : System.Web.UI.Page
    {
        public string imgurl = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                imgurl = HttpContext.Current.Request.Url.Host.ToString() + Request.QueryString["url"].ToString();
            }
        }
    }
}

