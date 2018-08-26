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

namespace SfSoft.web.emc
{
    public partial class error : System.Web.UI.Page
    {
        public string msg = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params["msg"] != null)
            {
                msg = Request.Params["msg"].ToString();
            }
            string errmsg = "";
            if (Request.Params["errmsg"] != null)
            {
                errmsg = Request.Params["errmsg"].ToString();
            }
            if (errmsg != "")
            {
                divMsg1.Visible = false;
                divMsg2.Visible = true;
                divMsg2.InnerText = errmsg;
            }

        }
    }
}


