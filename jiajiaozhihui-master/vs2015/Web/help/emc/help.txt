using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace SfSoft.web.help.emc
{
    public partial class help : System.Web.UI.Page
    {
        public string  HelpID="";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["HelpID"] != null)
            {

                HelpID = Request.Params["HelpID"].ToString();
            }
        }
    }
}

