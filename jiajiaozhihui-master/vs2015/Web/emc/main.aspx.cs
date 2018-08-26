using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Text;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.SfEmc;
using SfSoft.Common;
using SfSoft.DBUtility;
namespace SfSoft.web.emc
{
    public partial class main : System.Web.UI.Page
    {
        public DateTime curDate = DateTime.Now;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                
            }
        }

      

    }
}


