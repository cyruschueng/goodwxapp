using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using SfSoft.Common;

namespace SfSoft.web.MasterPage
{
    public partial class ApproveTemplate : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack)
            {
                txtAuditdate.Text = PageValidate.FormatSmallDate(DateTime.Now);
                txtAuditName.Text = Session["CnName"].ToString();
                if (Request.Params["PageFrom"] != null)
                {
                    hfPageFrom.Value = Request.Params["PageFrom"].ToString();
 
                }
            }
        }
    }
}
