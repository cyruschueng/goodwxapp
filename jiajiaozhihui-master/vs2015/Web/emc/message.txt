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
    public partial class message : System.Web.UI.Page
    {
        public string msg = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string MsgID = "";
                if (Request.Params["MsgID"] != null)
                {
                   MsgID = Request.Params["MsgID"].ToString();
                }
                if (Request.Params["msg"] != null)
                {
                    msg = Request.Params["msg"].ToString();
                }
                
 

            }
        }
    }
}


